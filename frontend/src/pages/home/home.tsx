import HeroSection from "./sections/hero-section/hero-section";
import LazyOnView from "src/_helpers/LazyOnView";
import PageLayout from "src/components/_layouts/PageLayout";
import SocialProofSkeleton from "./sections/social-proof/social-proof-skeleton";
import UseCasesSkeleton from "./sections/use-cases/use-cases-skeleton";
import BenefitsSkeleton from "./sections/benefits/benefits-skeleton";
import FeaturesSkeleton from "./sections/features/features-skeleton";
import FinalCTASkeleton from "./sections/final-cta/final-cta-skeleton";
import "./home.css";

const Home = () => {
    return (
        <PageLayout>
            <HeroSection />
                <LazyOnView
                    importFn={() => import('./sections/social-proof/social-proof')}
                    skeleton={<SocialProofSkeleton />}
                />
                <LazyOnView
                    importFn={() => import('./sections/use-cases/use-cases')}
                    skeleton={<UseCasesSkeleton />}
                />
                <LazyOnView
                    importFn={() => import('./sections/benefits/benefits')}
                    skeleton={<BenefitsSkeleton />}
                />
                <LazyOnView
                    importFn={() => import('./sections/features/features')}
                    skeleton={<FeaturesSkeleton />}
                />
                <LazyOnView
                    importFn={() => import('./sections/final-cta/final-cta')}
                    skeleton={<FinalCTASkeleton />}
                />
        </PageLayout>
    );
};

export default Home;