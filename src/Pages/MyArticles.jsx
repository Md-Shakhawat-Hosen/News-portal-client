import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { NavLink } from "react-router-dom";
import Title from "../components/Title/Title";
import useAllArticles from "../Hooks/useAllArticles";
import { AuthContext } from "../Provider/AuthProvider";

const MyArticles = () => {
  const { user } = useContext(AuthContext);
  const [myArticles, setMyArticles] = useState([]);
  const { data, isLoading, refetch } = useAllArticles();

  useEffect(() => {
    if (!isLoading) {
      const ownArticles = data.filter(
        (articles) => user?.email == articles.articleAuthorEmail
      );
      setMyArticles(ownArticles);
    }
  }, [data, isLoading, user?.email]);

  // console.log(myArticles);

  const handleDeleteMyArticle = (id) => {
    // console.log(id)
    axios
      .delete(`https://newspapwer-a-12-server.vercel.app/addArticles/${id}`)
      .then((res) => {
        //    console.log("delete my articles", res.data);
        if (res.data.deletedCount > 0) {
          refetch();
          toast.success("Successfully Deleted");
        }
      });
  };
  return (
    <div>
      <div>
        <Toaster />
      </div>
      <Title title="My Articles"></Title>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>SL</th>
              <th>Title</th>
              <th>Status</th>
              <th>isPremium</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {myArticles.map((article, ind) => (
              <tr key={article._id}>
                <th>{ind + 1}</th>
                <td>{article.title}</td>
                <td>
                  {article.status}
                  {article?.isDecline && (
                    <button
                      onClick={() =>
                        document
                          .getElementById(`my_modal_1_${article?._id}`)
                          .showModal()
                      }
                      className="bg-red-400 text-white p-2 rounded-lg ml-2"
                    >
                      Reason
                    </button>
                  )}

                  <dialog id={`my_modal_1_${article?._id}`} className="modal">
                    <div className="modal-box">
                      <p className="py-4">Read Carefully...</p>
                      <div className="">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <textarea
                            disabled
                            defaultValue={article?.declineReason}
                            className="textarea textarea-accent w-full"
                            placeholder="Bio"
                          ></textarea>
                          <button className="btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </td>

                {/* Open the modal using document.getElementById('ID').showModal() method */}
                {/* <button
                    className="btn"
                    onClick={() =>
                      document.getElementById("my_modal_1").showModal()
                    }
                  >
                    open modal
                  </button> */}

                <td>{article.isPremium ? "YES" : "NO"}</td>

                <td className="flex flex-row gap-3">
                  <button className="bg-cyan-400 p-3 text-white">
                    Details
                  </button>
                  <NavLink
                    to={`/update-articles/${article._id}`}
                    className="bg-cyan-400 p-3 text-white"
                  >
                    Update
                  </NavLink>
                  <button
                    onClick={() => handleDeleteMyArticle(article?._id)}
                    className="bg-red-400 p-3 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyArticles;
