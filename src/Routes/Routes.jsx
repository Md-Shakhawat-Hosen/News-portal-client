import { createBrowserRouter } from "react-router-dom";
import NotFound from "../components/NotFound/NotFound";
import UpdateArticles from "../components/UpdateArticles/UpdateArticles";
import MainLayout from "../Layout/MainLayout";
import AddArticles from "../Pages/AddArticles";
import AddPublisher from "../Pages/AddPublisher";
import AllArticles from "../Pages/AllArticles";
import AllArticlesUser from "../Pages/AllArticlesUser";
import AllUsers from "../Pages/AllUsers";
import Charts from "../Pages/Charts";
import Dashboard from "../Pages/Dashboard";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import MyArticles from "../Pages/MyArticles";
import PremiumArticles from "../Pages/PremiumArticles";
import Register from "../Pages/Register";



const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "add-articles",
        element: <AddArticles></AddArticles>,
      },
      {
        path: "all-articles",
        element: <AllArticlesUser></AllArticlesUser>,
      },
      {
        path: "my-articles",
        element: <MyArticles></MyArticles>,
      },
      {
        path: "update-articles/:id",
        element: <UpdateArticles></UpdateArticles>,
      },
      {
        path: "premium-articles",
        element: <PremiumArticles></PremiumArticles>,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "/dashboard",
        element: <Charts></Charts>,
      },
      {
        path: "/dashboard/allUsers",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "/dashboard/addPublisher",
        element: <AddPublisher></AddPublisher>,
      },
      {
        path: "/dashboard/allArticles",
        element: <AllArticles></AllArticles>,
      },
    ],
  },

  {
    path: "register",
    element: <Register></Register>,
  },
  {
    path: "login",
    element: <Login></Login>,
  },
]);


export default Routes;