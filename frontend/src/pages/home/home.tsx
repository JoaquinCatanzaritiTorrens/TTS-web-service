import HeroSection from "./sections/hero-section/hero-section";
import LandingPageLayout from "src/components/_layouts/LandingPageLayout";
import "./home.css";

const Home = () => (
    <LandingPageLayout titleKey="pageTitles.home">
        <HeroSection />
    </LandingPageLayout>
);

export default Home;