import { Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import './legal.css';

const PrivacyPolicy = () => {
    const { t } = useTranslation();

    return (
        <Container className="legal-container">
            <Typography variant="h4" gutterBottom>
                {t('legal.privacyPolicy.title')}
            </Typography>
            <Typography mb={2}>
                {t('legal.privacyPolicy.p1')}
            </Typography>
            <Typography mb={2}>
                {t('legal.privacyPolicy.p2')}
            </Typography>
            <Typography mb={2}>
                {t('legal.privacyPolicy.p3')}
            </Typography>
            <Typography mb={2}>
                {t('legal.privacyPolicy.p4')}
            </Typography>
        </Container>
    );
};

export default PrivacyPolicy;
