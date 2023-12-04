import { useForm } from "react-hook-form";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const { createUserEmail, userUpdateProfile } = useContext(AuthContext);

  const api_key = import.meta.env.VITE_image_api;

  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${api_key}`;

  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    const imageFile = { image: data.image[0] };
    const res = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    console.log(res.data);
    if (res.data.success) {
      createUserEmail(data.email, data.password)
        .then(() => {
          toast.success("successfully login");
          userUpdateProfile(data.name, res.data.data.display_url).then(() => {
            const userDetails = {
              name: data.name,
              email: data.email,
              photo: res.data.data.display_url,
              role: "normal",
              premiumTaken: null,
            };
            try {
              const response = axios.post(
                "http://localhost:5000/users",
                userDetails
              );
              console.log("Response from server:", response.data);
              //    if(response.data.insertedId){
              //     Swal.fire({
              //       title: "Good job!",
              //       text: "You added the articles successfully and wait for admin approve!",
              //       icon: "success",
              //     });
              //    }
            } catch (error) {
              console.error("Error making POST request:", error);
            }
            navigate("/");
          });
        })
        .catch((error) => {
          toast.error(`${error.message}`);
        });
    }
  };

  return (
    <div>
      <Toaster />
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  {...register("name", { required: true })}
                  name="name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">your image</span>
                </label>
                <input
                  name="photo"
                  {...register("image")}
                  type="file"
                  className="file-input w-full max-w-xs"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  {...register("email", { required: true })}
                  name="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  {...register("password", { required: true })}
                  name="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Register</button>
              </div>
            </form>
            <h1 className="flex justify-center p-5">
              Already have an account?{" "}
              <NavLink
                to="/login"
                className="font-bold text-cyan-700 underline"
              >
                Login
              </NavLink>{" "}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
