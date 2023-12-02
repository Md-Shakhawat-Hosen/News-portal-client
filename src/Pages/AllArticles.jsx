import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

import useAllArticles from "../Hooks/useAllArticles";


const AllArticles = () => {
    const [allArticles, setAllArticles] = useState([]);
    const {data,isLoading,refetch} = useAllArticles();


    useEffect(()=>{
        if(!isLoading){
           setAllArticles(data);
        }
        
    },[isLoading,data])

    console.log(allArticles)

    const handleArticleApprove = (id, val) =>{
        // console.log(id)
        // const singleArticle = allArticles.find( article => article._id === id);

        // console.log(singleArticle)
        const a = {val}
        axios.patch(`http://localhost:5000/addArticles/${id}`, a)
        .then(res => {
            console.log('add articles', res.data)
            if (res.data.modifiedCount > 0) {
                  refetch()
            }
        })
    }
    const handleArticleDelete = (id)=>{
        console.log(id)
         axios
           .delete(`http://localhost:5000/addArticles/${id}`)
           .then((res) => {
             console.log("add articles", res.data);
             if (res.data.deletedCount > 0) {
                refetch()
             }
           });
    }
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {allArticles.map((article) => (
          <div
            key={article?._id}
            className="w-full p-6  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="flex flex-col items-center pb-10">
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src={article?.articleAuthorPhoto}
                alt="Bonnie image"
              />
              <div className="">
                <div className="border-2 rounded-lg p-2">
                  <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    {article?.title}
                  </h5>
                  <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    {article?.postedDate}
                  </h5>
                </div>

                <div className="border-2 rounded-lg p-2 mt-2 space-y-2">
                  <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    Author Name: {article?.articleAuthorName}
                  </h5>
                  <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    Author Email: {article?.articleAuthorEmail}
                  </h5>
                  <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    Status:{" "}
                    <span className="bg-orange-500 text-white p-2 rounded-lg">
                      {article?.status}
                    </span>
                  </h5>
                  <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    Publisher Name: {article?.publisherName?.label}
                  </h5>
                </div>
              </div>

              <div className="flex mt-4 gap-3">
                <div className="flex gap-2">
                  {article?.status == "pending" ? (
                    <button
                      onClick={() =>
                        handleArticleApprove(article._id, "approve")
                      }
                      className="bg-blue-400 px-4"
                    >
                      Approve
                    </button>
                  ) : (
                    <button disabled={true} className="bg-blue-100 px-4">
                      Approved
                    </button>
                  )}
                  <button className="bg-blue-400 px-4">Decline</button>
                </div>
                <div className="flex gap-2">
                  {article?.isPremium ? (
                    <button disabled={true} className="bg-blue-100 px-4">
                      Already Premium
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        handleArticleApprove(article._id, "premium")
                      }
                      className="bg-blue-400 px-4"
                    >
                      Make Premium
                    </button>
                  )}
                  <button
                    onClick={() => handleArticleDelete(article._id)}
                    className="bg-red-400 p-4"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
};

export default AllArticles;