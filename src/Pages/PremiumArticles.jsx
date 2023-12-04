import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import useAllArticles from "../Hooks/useAllArticles";
import { AuthContext } from "../Provider/AuthProvider";

const PremiumArticles = () => {
  const { user } = useContext(AuthContext);
  const { data: premium, isLoading } = useAllArticles();

  const [allPremiumArticles, setAllPremiumArticles] = useState([]);
  const [isUserPremium, setIsUserPremium] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      const premiumArticles = premium.filter(
        (article) => article.isPremium == true
      );

      setAllPremiumArticles(premiumArticles);
    }
  }, [isLoading, premium]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(
          `https://newspapwer-a-12-server.vercel.app/users?email=${user?.email}`
        )
        .then((res) => setIsUserPremium(res.data));
    }
  }, [user?.email]);

  //  console.log(isUserPremium[0]?.premiumTaken);

  //  console.log(allPremiumArticles)

  // console.log(allPremiumArticles)
  return (
    <div>
      {isUserPremium[0]?.premiumTaken == null ? (
        <span className="font-bold flex justify-center h-[50vh] items-center">
          Please Take subscription
        </span>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {allPremiumArticles.map((article) => (
            <div key={article._id} className="card bg-base-100 shadow-xl">
              <figure>
                <img src={article?.image} alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {article?.title}
                  <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>{article?.description.slice(0, 50)}</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">
                    {article?.publisherName.label}
                  </div>
                  <button className="badge badge-outline bg-cyan-500 text-white p-3">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PremiumArticles;
