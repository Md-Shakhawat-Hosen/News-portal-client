import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";


const MainLayout = () => {
    return (
      <div className="max-w-screen-xl mx-auto">
        <Navbar></Navbar>
        <div className="px-7">
          <Outlet></Outlet>
        </div>
      </div>
    );
};

export default MainLayout;