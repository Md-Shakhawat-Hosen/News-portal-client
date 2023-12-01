import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import AddArticles from "../Pages/AddArticles";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";



const Routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children:[
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'add-articles',
                element:<AddArticles></AddArticles>
            }
        ]

    },
    {
       path: 'register',
       element: <Register></Register>
    },
    {
        path: 'login',
        element: <Login></Login>
    }
])


export default Routes;