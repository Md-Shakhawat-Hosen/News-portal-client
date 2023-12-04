import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import Title from "../components/Title/Title";
import { AuthContext } from "../Provider/AuthProvider";
const Profile = () => {
  const { register, handleSubmit } = useForm();

  const { user, userUpdateProfile } = useContext(AuthContext);

  // console.log(user)

  const api_key = import.meta.env.VITE_image_api;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${api_key}`;

  const onSubmit = async (data) => {
    // console.log(data);

    // console.log(selectedOption)
    // console.log(selectedOptionPublisher)

    const imageFile = { image: data.image[0] };
    const res = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // console.log(res.data);

    if (res.data.success) {
      userUpdateProfile(data.name, res.data.data.display_url).then(() => {
        toast.success("successfully Updated your Profile");
        setTimeout(function () {
          window.location.reload(1);
        }, 10);

        const updated = {
          email: user?.email,
          name: data.name,
          photo: res.data.data.display_url,
          isUpdate: true,
        };

        axios
          .patch("https://newspapwer-a-12-server.vercel.app/users", updated)
          .then((res) => {
            console.log("PATCH request successful:", res.data);
            //  if (res.data.modifiedCount > 0) {
            //    refetch();
            //    //  setAllUsers(data)
            //  }
          });
      });
    }
  };
  return (
    <div className="lg:w-1/2 mx-auto bg-slate-300 rounded-lg p-4">
      <Toaster />
      <Title title="Update Your Profile"></Title>
      <div className="flex justify-center">
        <img
          className="w-[100px] h-[100px] rounded-full"
          src={user?.photoURL}
          alt=""
        />
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col  gap-3">
            <div className="w-full">
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text">Name</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  defaultValue={user?.displayName}
                  {...register("name", { required: true })}
                  className="input input-bordered w-full"
                />
              </label>
            </div>
            <div className="w-full">
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text">Change your Image</span>
                </div>
                <input
                  type="file"
                  {...register("image", { required: true })}
                  className="file-input file-input-bordered w-full"
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="bg-cyan-300 py-3 text-white w-full mt-10"
          >
            submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
