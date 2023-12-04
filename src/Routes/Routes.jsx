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
import Subscription from "../Pages/Subscription";
import AdminPrivateRoute from "../Private/AdminPrivateRoute";
import PrivateRoute from "../Private/PrivateRoute";



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
        element: (
          <PrivateRoute>
            <AddArticles></AddArticles>
          </PrivateRoute>
        ),
      },
      {
        path: "all-articles",
        element: <AllArticlesUser></AllArticlesUser>,
      },
      {
         path: '/subscription',
         element: <Subscription></Subscription>
      },
      {
        path: "my-articles",
        element: (
          <PrivateRoute>
            <MyArticles></MyArticles>
          </PrivateRoute>
        ),
      },
      {
        path: "update-articles/:id",
        element: <UpdateArticles></UpdateArticles>,
      },
      {
        path: "premium-articles",
        element: (
          <PrivateRoute>
            <PremiumArticles></PremiumArticles>
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <AdminPrivateRoute>
        <Dashboard></Dashboard>
      </AdminPrivateRoute>
    ),
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