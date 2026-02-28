import { Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { usePageTitle } from "../../_helpers/use-page-title";
import './legal.css';

const TermsOfService = () => {
    const { t } = useTranslation();
    usePageTitle('pageTitles.termsOfService');

    return (
        <Container className="legal-container">
            <Typography variant="h4" gutterBottom>
                {t('legal.termsOfService.title')}
            </Typography>
            <Typography mb={2}>
                {t('legal.termsOfService.p1')}
            </Typography>
            <Typography mb={2}>
                {t('legal.termsOfService.p2')}
            </Typography>
            <Typography mb={2}>
                {t('legal.termsOfService.p3')}
            </Typography>
            <Typography mb={2}>
                {t('legal.termsOfService.p4')}
            </Typography>
            <Typography mb={2}>
                {t('legal.termsOfService.p5')}
            </Typography>
        </Container>
    );
};

export default TermsOfService;
