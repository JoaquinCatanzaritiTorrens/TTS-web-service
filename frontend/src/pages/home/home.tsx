import HeroSection from "./sections/hero-section/hero-section";
import PageLayout from "src/components/_layouts/PageLayout";
import "./home.css";

const Home = () => {
    return (
        <PageLayout>
            <HeroSection />
        </PageLayout>
    );
};

export default Home;