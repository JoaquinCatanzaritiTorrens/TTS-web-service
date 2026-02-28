import LandingPageLayout from 'src/components/_layouts/LandingPageLayout';
import ContactPageView from './contact-page-view/contact-page-view';

const ContactPage = () => (
    <LandingPageLayout titleKey="pageTitles.contact">
        <ContactPageView />
    </LandingPageLayout>
);

export default ContactPage;