import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import Title from "../../components/Title/Title";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import moment from "moment";
import useAllArticles from "../../Hooks/useAllArticles";
import { useParams } from "react-router-dom";

const UpdateArticles = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionPublisher, setSelectedOptionPublisher] = useState(null);
  const { user } = useContext(AuthContext);

  const [publisher, setPublisher] = useState([]);

  const { id } = useParams();
  //   console.log(id);

  const [updatedArticles, setUpdatedArticles] = useState([]);
  const { data, isLoading } = useAllArticles();

  useEffect(() => {
    if (!isLoading) {
      const singleUpdateArticles = data.find((own) => own._id == id);
      setUpdatedArticles(singleUpdateArticles);
    }
  }, [data, id, isLoading]);

  //   console.log(updatedArticles)

  useEffect(() => {
    axios
      .get("https://newspapwer-a-12-server.vercel.app/addPublisher")
      .then((res) => setPublisher(res.data));
  }, []);
  //  console.log(publisher);

  const publisherNames = publisher.map((item) => ({
    value: item.title.toLowerCase(),
    label: item.title.charAt(0).toUpperCase() + item.title.slice(1),
  }));

  const date = moment().format("MMMM Do YYYY");

  const options = [
    { value: "politics", label: "Politics" },
    { value: "business", label: "Business" },
    { value: "technology", label: "Technology" },
    { value: "entertainment", label: "Entertainment" },
    { value: "sports", label: "Sports" },
    { value: "health", label: "Health" },
    { value: "science", label: "Science" },
    { value: "education", label: "Education" },
    { value: "opinion", label: "Opinion" },
  ];

  const { register, handleSubmit } = useForm();

  const api_key = import.meta.env.VITE_image_api;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${api_key}`;

  const onSubmit = async (data) => {
    console.log(data);

    // console.log(selectedOption)
    // console.log(selectedOptionPublisher)

    const imageFile = { image: data.image[0] };
    const res = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res.data);

    // const addedArticles = {
    //     title: data.title,
    //     image: res.data.data.display_url,
    //     publisherTag: selectedOption,
    //     publisherName: selectedOptionPublisher

    // }

    if (res.data.success) {
      const addedArticles = {
        title: data.title,
        image: res.data.data.display_url,
        publisherTag: selectedOption,
        publisherName: selectedOptionPublisher,
        description: data.description,
        articleAuthorName: user?.displayName,
        articleAuthorEmail: user?.email,
        articleAuthorPhoto: user?.photoURL,
        postedDate: date,
        isPremium: false,
        status: "pending",
      };
      //   console.log(addedArticles);

      try {
        const response = await axios.put(
          `https://newspapwer-a-12-server.vercel.app/addArticles/${id}`,
          addedArticles
        );
        // console.log("Response from server:", response.data);
        if (response.data.modifiedCount > 0) {
          Swal.fire({
            title: "Good job!",
            text: "Updated Successfully and wait for admin approve",
            icon: "success",
          });
        }
      } catch (error) {
        console.error("Error making POST request:", error);
      }
    }
  };
  return (
    <div>
      <h1>update articles</h1>
      <Title title="Update Your Articles"></Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="w-full">
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Title</span>
              </div>
              <input
                type="text"
                defaultValue={updatedArticles?.title}
                placeholder="Type here"
                {...register("title", { required: true })}
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div className="w-full">
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Choose Image File</span>
              </div>
              <input
                type="file"
                {...register("image", { required: true })}
                className="file-input file-input-bordered w-full"
              />
            </label>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-3 mt-5">
          <div className="w-full">
            <div className="label">
              <span className="label-text">Publisher Tags</span>
            </div>
            <div className="App">
              <Select
                required
                isMulti
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
              />
            </div>
          </div>
          <div className="w-full">
            <div className="label">
              <span className="label-text">Publisher Name</span>
            </div>
            <div className="App">
              <Select
                required
                defaultValue={selectedOptionPublisher}
                onChange={setSelectedOptionPublisher}
                options={publisherNames}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Description</span>
            </div>
            <textarea
              type="text"
              defaultValue={updatedArticles?.description}
              {...register("description", { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="Bio"
            ></textarea>
          </label>
        </div>

        <button
          type="submit"
          className="bg-cyan-300 py-3 text-white w-full mt-10"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateArticles;
