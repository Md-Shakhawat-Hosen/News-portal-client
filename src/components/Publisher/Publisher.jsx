import Title from "../Title/Title";
import { useEffect, useState } from "react";
import axios from "axios";

const Publisher = () => {
  const [publisher, setPublisher] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/addPublisher")
      .then((res) => setPublisher(res.data));
  }, []);

  // console.log(publisher)

  return (
    <div>
      <Title title="Publisher" subTitle=""></Title>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {publisher.map((publish) => (
          <div key={publish._id} className="card  bg-base-100 shadow-xl">
            <figure className="px-3 pt-10">
              <img
                src={publish?.image}
                alt={publish?.title}
                className="rounded-full w-[300px] h-[300px]"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{publish?.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Publisher;
