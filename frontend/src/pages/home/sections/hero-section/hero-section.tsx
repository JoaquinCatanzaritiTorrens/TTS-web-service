import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RecordVoiceOver, VolumeUp, Language } from '@mui/icons-material';
import { useUser } from '../../../../context/user-context/user-context';
import './hero-section.css';

const HeroSection = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { user } = useUser();

    const handleLaunchApp = () => {
        if (user) {
            navigate('/app');
        } else {
            navigate('/login');
        }
    };

    return (
        <Box className="hero-section">
            <Container maxWidth="lg">
                <Box className="hero-layout">
                    <Box className="hero-content">
                        <Typography
                            variant="h1"
                            className="hero-title"
                            sx={{
                                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                                fontWeight: 800,
                                lineHeight: 1.1,
                                mb: 3,
                                background: 'linear-gradient(135deg, #a78bfa 0%, #06b6d4 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}
                        >
                            {t('home.hero.title')}
                        </Typography>

                        <Typography
                            variant="h5"
                            className="hero-subtitle"
                            sx={{ 
                                mb: 4,
                                color: 'text.secondary',
                                fontSize: { xs: '1.1rem', md: '1.3rem' },
                                lineHeight: 1.6,
                                maxWidth: '700px'
                            }}
                        >
                            {t('home.hero.subtitle')}
                        </Typography>

                        <Stack 
                            direction="row" 
                            spacing={3} 
                            sx={{ mb: 4, flexWrap: 'wrap', gap: 2 }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <RecordVoiceOver sx={{ color: 'primary.main' }} />
                                <Typography variant="body2" fontWeight={600}>
                                    {t('home.hero.features.voiceCloning')}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Language sx={{ color: 'secondary.main' }} />
                                <Typography variant="body2" fontWeight={600}>
                                    {t('home.hero.features.spanish')}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <VolumeUp sx={{ color: 'primary.main' }} />
                                <Typography variant="body2" fontWeight={600}>
                                    {t('home.hero.features.naturalVoice')}
                                </Typography>
                            </Box>
                        </Stack>

                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={2}
                            className="hero-buttons"
                        >
                            <Button
                                variant="contained"
                                size="large"
                                className="launch-app-button"
                                onClick={handleLaunchApp}
                            >
                                {t('home.hero.cta')}
                            </Button>
                        </Stack>
                    </Box>

                    <Box className="hero-visual">
                        <Box
                            sx={{
                                position: 'relative',
                                width: '100%',
                                height: { xs: '300px', md: '400px' },
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 1
                            }}
                        >
                            {[...Array(20)].map((_, i) => (
                                <Box
                                    key={i}
                                    className="waveform-bar"
                                    sx={{
                                        width: { xs: '8px', md: '12px' },
                                        height: `${20 + Math.random() * 80}%`,
                                        background: `linear-gradient(180deg, 
                                            ${i % 2 === 0 ? '#a78bfa' : '#06b6d4'} 0%, 
                                            ${i % 2 === 0 ? '#8b5cf6' : '#0891b2'} 100%
                                        )`,
                                        borderRadius: '8px',
                                        animation: `waveAnimation ${1 + Math.random() * 2}s ease-in-out infinite`,
                                        animationDelay: `${i * 0.1}s`,
                                        opacity: 0.7,
                                        boxShadow: `0 4px 12px ${i % 2 === 0 ? 'rgba(167, 139, 250, 0.3)' : 'rgba(6, 182, 212, 0.3)'}`
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}; 

export default HeroSection;
