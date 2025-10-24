import { Box, Container, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './final-cta.css';

const FinalCTA = () => {
    const { t } = useTranslation();

    return (
        <Box className="final-cta-section">
            <Container maxWidth="md">
                <Box className="final-cta-content">
                    <Typography
                        variant="h3"
                        gutterBottom
                        sx={{
                            textAlign: 'center',
                            fontWeight: 700,
                            mb: 2,
                            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}
                    >
                        {t('home.cta.title')}
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{
                            textAlign: 'center',
                            opacity: 0.9,
                            maxWidth: '500px',
                            margin: '0 auto',
                            lineHeight: 1.5,
                            mb: 4
                        }}
                    >
                        {t('home.cta.subtitle')}
                    </Typography>

                    <Button
                        variant="contained"
                        size="large"
                        className="final-cta-button"
                        component={Link}
                        to="/register"
                    >
                        {t('home.cta.button')}
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default FinalCTA;
