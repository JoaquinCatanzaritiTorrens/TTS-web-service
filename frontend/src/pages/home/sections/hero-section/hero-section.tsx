import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LazyOnView from '../../../../_helpers/LazyOnView';
import './hero-section.css';

const HeroSection = () => {
    const { t } = useTranslation();

    return (
        <Box className="hero-section">
            <Container maxWidth="lg">
                <Box className="hero-layout">
                    <Box className="hero-content">
                        <Typography
                            variant="h1"
                            className="hero-title"
                            gutterBottom
                        >
                            {t('home.hero.title')}
                        </Typography>

                        <Typography
                            variant="h5"
                            className="hero-subtitle"
                            sx={{ mb: 4 }}
                        >
                            {t('home.hero.subtitle')}
                        </Typography>

                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={2}
                            className="hero-buttons"
                        >
                            <Button
                                variant="contained"
                                size="large"
                                className="hero-cta-primary"
                                component={Link}
                                to="/register"
                            >
                                {t('home.hero.cta')}
                            </Button>

                            <Button
                                variant="outlined"
                                size="large"
                                className="hero-cta-secondary"
                            >
                                {t('home.hero.ctaSecondary')}
                            </Button>
                        </Stack>
                    </Box>

                    <Box className="hero-visual">
                        <LazyOnView
                            importFn={() => import('./FloatingCards')}
                            skeleton={null}
                        />
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}; export default HeroSection;
