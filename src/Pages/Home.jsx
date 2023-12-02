import Banner from "../components/Banner/Banner";
import Plans from "../components/Plans/Plans";
import Publisher from "../components/Publisher/Publisher";
import Statistics from "../components/Statistics/Statistics";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Publisher></Publisher>
            <Statistics></Statistics>
            <Plans></Plans>
        </div>
    );
};

export default Home;