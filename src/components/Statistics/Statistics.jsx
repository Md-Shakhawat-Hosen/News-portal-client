import { useState, useEffect } from "react";
import CountUp from "react-countup";
import useUsers from "../../Hooks/useUsers";
import Title from "../Title/Title";


const Statistics = () => {
  const [allUsersCount, setAllUsersCount] = useState(0);
  const [normalUsersCount, setNormalUsersCount] = useState(0);
  const [premiumUsersCount, setPremiumUsersCount] = useState(0);
  
  const {data, isLoading} = useUsers();
  
  useEffect(() => {
     
    if (!isLoading){
      const premiumUser = data.filter(premium => premium.premiumTaken != null);
       
       setAllUsersCount(data.length);
       setNormalUsersCount(data.length - premiumUser.length);
       setPremiumUsersCount(premiumUser.length);
    }
    // const fetchData = async () => {
    //   // Simulate fetching counts from an API or database
    //   // const allUsers = 10;
    //   // const normalUsers = 8;
    //   // const premiumUsers = 2;

    //   // Set state with fetched data
     
    // };

    // fetchData();
  }, [data,isLoading]); 

  return (
    <div className="my-6">
      <Title title="Statistics" subTitle=""></Title>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-cyan-100 p-4 rounded-lg">
          <h1 className="text-center text-4xl">All Users</h1>
          <p className="text-center text-3xl">
            <CountUp start={0} duration={5}  end={allUsersCount} />
          </p>
        </div>
        <div className="bg-cyan-100 p-4 rounded-lg">
          <h1 className="text-center text-4xl">Normal User</h1>
          <p className="text-center text-3xl">
            <CountUp start={0} duration={5}  end={normalUsersCount} />
          </p>
        </div>
        <div className="bg-cyan-100 p-4 rounded-lg">
          <h1 className="text-center text-4xl">Premium Users</h1>
          <p className="text-center text-3xl">
            <CountUp start={0} duration={5}  end={premiumUsersCount} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
