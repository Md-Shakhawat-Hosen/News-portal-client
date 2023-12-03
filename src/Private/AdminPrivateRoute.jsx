import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";
import {AuthContext} from '../Provider/AuthProvider'

const AdminPrivateRoute = ({children}) => {
    const {user,loading,roleUser} = useContext(AuthContext);

    // console.log(roleUser);
    if (loading){
        return <Spinner></Spinner>
    }

    if (user?.email && roleUser[0]?.role == 'admin') {
         return children
    }


    return <Navigate to="/login" replace={true}></Navigate>
};

export default AdminPrivateRoute;