import { useEffect } from "react";
import { useContext } from "react";

import { useState } from "react";
import Title from "../components/Title/Title";
import useAllArticles from "../Hooks/useAllArticles";

import {AuthContext} from '../Provider/AuthProvider'


const AllArticlesUser = () => {



    const {roleUser} = useContext(AuthContext)

    const [allArticles, setAllArticles] = useState([]);
    const {data, isLoading} = useAllArticles();



    useEffect(()=>{
        if (!isLoading) {
            setAllArticles(data)
        }

    },[data,isLoading])




    return (
      <div>
        <Title title="All Articles"></Title>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allArticles.map((article) => (
            <div
              key={article._id}
              className="card card-compact  bg-base-100 shadow-xl"
            >
              <figure>
                <img
                  className="h-[200px] w-[300px] rounded-lg"
                  src={article.image}
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <div className="flex justify-between">
                  <h2 className="card-title">{article.title}</h2>
                  <h2 className="card-title text-red-400">
                    {article?.publisherName?.label}
                  </h2>
                </div>
                <p>{article?.description.slice(0, 50)}</p>
                <div className="card-actions justify-end">
                  {roleUser[0]?.premiumTaken == null ? (
                    <>
                      <button
                       
                        disabled={true}
                        className="btn btn-primary"
                      >
                        Details
                      </button>
                  
                    </>
                  ) : (
                    <button className="btn btn-primary">Details</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default AllArticlesUser;