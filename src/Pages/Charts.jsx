import axios from "axios";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import useAllArticles from "../Hooks/useAllArticles";

const Charts = () => {
  const { data: allArticles, isLoading } = useAllArticles();
  const [allPublisherArticles, setAllPublisherArticles] = useState([]);
  const [allPublisherName, setAllPublisherName] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      setAllPublisherArticles(allArticles);
    }
    axios
      .get("http://localhost:5000/addPublisher")
      .then((res) => setAllPublisherName(res.data));
  }, [allArticles, isLoading]);

  const myArticlesPublish = [["publisherName", "Article"]];
  for (let publish in allPublisherName) {
    let count = 0;
    let title = allPublisherName[publish].title.toLowerCase();
    for (let article in allPublisherArticles) {
      // console.log(allPublisherArticles[article].publisherName.label.toLowerCase());
      //   console.log(title);
      if (
        allPublisherArticles[article].publisherName.label.toLowerCase() == title
      ) {
        count = count + 1;
      }
    }
    myArticlesPublish.push([title, count]);
  }

  // console.log(myArticlesPublish)
  //  const data = [
  //    ["publisherName", "Article"],
  //    ["rokomari", 1],
  //    ["daily bazar", 3],
  //    ["daily star", 0]
  // //    ["Sausage", 10], // Below limit.
  // //    ["Anchovies", 9], // Below limit.
  //  ];

  const options = {
    title: "Popularity of Articles by Publisher",
    //    sliceVisibilityThreshold: 0.1, // 20%
  };

  return (
    <div>
      <Chart
        chartType="PieChart"
        data={myArticlesPublish}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    </div>
  );
};

export default Charts;
