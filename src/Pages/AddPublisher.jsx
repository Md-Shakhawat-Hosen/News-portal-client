import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Title from "../components/Title/Title";

const AddPublisher = () => {

     const api_key = import.meta.env.VITE_image_api;
     const image_hosting_api = `https://api.imgbb.com/1/upload?key=${api_key}`;

    const { register, handleSubmit } = useForm();


        const onSubmit = async (data) => {
          console.log(data);


          const imageFile = { image: data.image[0] };
          const res = await axios.post(image_hosting_api, imageFile, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          console.log(res.data);


          if (res.data.success) {
            const addPublisher = {
              title: data.title,
              image: res.data.data.display_url,
              
            };
            console.log(addPublisher);

            try {
              const response = await axios.post(
                "http://localhost:5000/addPublisher",
                addPublisher
              );
              console.log("Response from server:", response.data);
              if (response.data.insertedId) {
                Swal.fire({
                  title: "Good job!",
                  text: "You added the Publisher successfully",
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
      <Title title='Add Publisher'></Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="w-full">
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Title</span>
              </div>
              <input
                type="text"
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

        <button type="submit" className="btn w-full mt-10">
          submit
        </button>
      </form>
    </div>
  );
};

export default AddPublisher;
