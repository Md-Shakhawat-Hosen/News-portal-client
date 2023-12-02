import { useEffect, useState } from "react";
import axios from 'axios'
import useUsers from "../Hooks/useUsers";


const AllUsers = () => {
    const [allUsers, setAllUsers] = useState([]);
    const { data,isLoading,refetch } = useUsers();

    // console.log(data);
    
    console.log(isLoading)
          useEffect(() => {
            // axios.get("http://localhost:5000/users")
            // .then(res=>setAllUsers(res.data))
           if (!isLoading){
              setAllUsers(data);
           }
            
          
          }, [isLoading,data]);
    

   


    // console.log(allUsers)

    
    const handleMakeAdmin = (email)=>{
        // console.log(email)

        const makeAdmin = data.find(user => user.email == email);
        // console.log(makeAdmin)

        axios.patch("http://localhost:5000/users",makeAdmin)
        .then(res=>{
          console.log("PATCH request successful:", res.data);
          if (res.data.modifiedCount > 0) {
             refetch()
            //  setAllUsers(data)
          }
        })

        
    }
    return (
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user) => (
                <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src={user?.photo}
                      alt={user?.name}
                    />
                  </th>
                  <td className="px-6 py-4">{user?.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                      {user?.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {
                      user?.role == 'normal' ? <button onClick={()=>handleMakeAdmin(user?.email)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      Make Admin
                    </button>
                    :
                     <span>{user?.role}</span>
                    }
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default AllUsers;