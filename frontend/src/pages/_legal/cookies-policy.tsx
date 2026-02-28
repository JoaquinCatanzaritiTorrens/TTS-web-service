import { Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { usePageTitle } from "../../_helpers/use-page-title";
import './legal.css';

const CookiesPolicy = () => {
    const { t } = useTranslation();
    usePageTitle('pageTitles.cookiesPolicy');

    return (
        <Container className="legal-container">
            <Typography variant="h4" gutterBottom>
                {t('legal.cookiesPolicy.title')}
            </Typography>
            <Typography mb={2}>
                {t('legal.cookiesPolicy.p1')}
            </Typography>
            <Typography mb={2}>
                {t('legal.cookiesPolicy.p2')}
            </Typography>
            <Typography mb={2}>
                {t('legal.cookiesPolicy.p3')}
            </Typography>
            <Typography mb={2}>
                {t('legal.cookiesPolicy.p4')}
            </Typography>
        </Container>
    );
};

export default CookiesPolicy;
