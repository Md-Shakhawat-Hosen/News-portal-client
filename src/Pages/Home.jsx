import Banner from "../components/Banner/Banner";
import Footer from "../components/Footer/Footer";
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
            <Footer></Footer>
        </div>
    );
};

export default Home;