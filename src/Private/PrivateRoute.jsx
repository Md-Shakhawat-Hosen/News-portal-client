import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";
import { AuthContext } from "../Provider/AuthProvider";



const PrivateRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext);

    // console.log(user?.email)

    if(loading){
        return <Spinner></Spinner>
    }

    if (user?.email) {
        return children;
    }

 
    return <Navigate to="/login" replace={true}></Navigate>;
    
};

export default PrivateRoute;