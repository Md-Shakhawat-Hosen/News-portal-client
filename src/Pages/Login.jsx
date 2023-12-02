
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const Login = () => {
    const { signInEmail, signInGoogle } = useContext(AuthContext);

    const navigate = useNavigate()


    const { register, handleSubmit } = useForm();

    const onSubmit = (data) =>{
         signInEmail(data.email, data.password)
        .then(()=>{
            
            toast.success('Login Successfully')
            navigate('/')

            
            
        })
        .catch(error=>{
            toast.error(`${error.message}`)
        })
    }


    const handleGoogleSign = async() =>{
        signInGoogle()
        .then(async(result)=>{
            toast.success('login Successfully')
            navigate('/')
            const user = result.user;

            const res = await axios.get(`http://localhost:5000/users?email=${user?.email}`);
            
           
          if (user?.email == res.data[0]?.email) {
            return;
          }else {
            const userDetails = {
              name: user?.displayName,
              email: user?.email,
              photo: user?.photoURL,
              role: "normal",
              premiumTaken: null,
            };

            try {
              const response = await axios.post(
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
          }
        })
        .catch(error=>{
            toast.error(`${error.message}`)
        })
    }
    return (
      <div>
        <Toaster position="top-center" reverseOrder={false} />
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="email"
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
                    {...register("password")}
                    type="password"
                    placeholder="password"
                    name="password"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Login</button>
                </div>
              </form>
              <div className="px-5">
                <div onClick={handleGoogleSign} className="flex items-center justify-center gap-3 border-2 p-4 rounded-lg">
                  <FcGoogle className="text-2xl" /> sign in with Google
                </div>
              </div>
              <div>
                <h1 className="flex justify-center p-5">
                  Are you a new user ?{" "}
                  <NavLink
                    className="font-bold text-xl underline text-cyan-600"
                    to="/register"
                  >
                    Register
                  </NavLink>{" "}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Login;