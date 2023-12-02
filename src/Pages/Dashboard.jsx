import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";


const Dashboard = () => {
    return (
      <div className="max-w-screen-xl mx-auto px-6">
      <Navbar></Navbar>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="grid lg:col-span-3 bg-cyan-300 h-[100vh] p-3">
            <div className="flex flex-col gap-6">
              <NavLink
                className={({ isActive }) => (isActive ? "bg-blue-600 p-3 text-white" : "")}
                to="/dashboard/allUsers"
              >
                All Users
              </NavLink>
              <NavLink
                className={({ isActive }) => (isActive ? "bg-blue-600 p-3 text-white" : "")}
                to="/dashboard/allArticles"
              >
                All Articles
              </NavLink>
              <NavLink
                className={({ isActive }) => (isActive ? "bg-blue-600 p-3 text-white" : "")}
                to="/dashboard/addPublisher"
              >
                Add Publisher
              </NavLink>
            </div>
          </div>
          <div className="grid lg:col-span-9">
            <div className="px-4">
              <Outlet></Outlet>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Dashboard;