import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import { AuthContext } from "../../Provider/AuthProvider";

import toast, { Toaster } from "react-hot-toast";
import logo_news from '../../../public/images/logoNews_prev_ui.png'

const Navbar = () => {
    const {user,logOut,roleUser,setRoleUser} = useContext(AuthContext);
    const navigate = useNavigate();

  
    const handleLogOut = () =>{
        logOut()
        .then(()=>{
           toast.success("Successfully logout!");
           setRoleUser([])
           navigate('/')
        })
        .catch(error =>{
            toast.error(`${error.message}`)
        })
    }

    // console.log(user)
    const navLinks = (
      <>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/add-articles">Add Articles</NavLink>
        </li>
        <li>
          <NavLink to="/all-articles">All Articles</NavLink>
        </li>
        <li>
          <NavLink to="/subscription">Subscription</NavLink>
        </li>

        {roleUser[0]?.role == "admin" ? (
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
        ) : (
          ""
        )}
        <li>
          <NavLink to="/my-articles">My Articles</NavLink>
        </li>
        <li>
          <NavLink to="/premium-articles">Premium Articles</NavLink>
        </li>
      </>
    );
    return (
      <div>
        <div>
          <Toaster />
        </div>
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                {navLinks}
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <img className="w-[60px]" src={logo_news} alt="" />
              <span className="font-bold text-xl mr-3">NewsPortal</span>
            </div>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navLinks}</ul>
          </div>
          {user ? (
            <div className="navbar-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <NavLink to="/profile" className=" w-[50px] h-[50px]">
                  <img
                    className="rounded-full "
                    alt={user?.displayName}
                    src={user?.photoURL}
                    referrerPolicy="no-referrer"
                  />
                </NavLink>
              </div>
              <button className="btn" onClick={handleLogOut}>
                Logout
              </button>
            </div>
          ) : (
            <div className="navbar-end">
              <div className="flex gap-3">
                <NavLink to="/login" className="btn">
                  Login
                </NavLink>
                <NavLink to="/register" className="btn">
                  Register
                </NavLink>
              </div>
            </div>
          )}
          {/* <div className="navbar-end">
            <h1>{user?.displayName}</h1>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt={user?.displayName} src={user?.photoURL} />
              </div>
            </div>

            {user ? (
              <button onClick={handleLogOut} className="btn">
                Logout
              </button>
            ) : (
              <NavLink to="/register" className="btn">
                Register
              </NavLink>
            )}
          </div> */}
        </div>
      </div>
    );
};

export default Navbar;