import { Box, Container, Typography, Stack, Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './social-proof.css';

const SocialProof = () => {
    const { t } = useTranslation();

    const stats = [
        { number: '10,000+', label: 'Active Users' },
        { number: '500K+', label: 'Tasks Automated' },
        { number: '99.9%', label: 'Uptime' },
        { number: '24/7', label: 'Support' },
    ];

    const companies = [
        'TechCorp', 'StartupX', 'DesignStudio', 'MediaHouse', 'ConsultPro'
    ];

    return (
        <Box className="social-proof-section">
            <Container maxWidth="lg">
                <Box className="social-proof-content">
                    <Typography
                        variant="h4"
                        gutterBottom
                        sx={{
                            textAlign: 'center',
                            fontWeight: 600,
                            mb: 2
                        }}
                    >
                        {t('home.socialProof.title')}
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            textAlign: 'center',
                            opacity: 0.8,
                            maxWidth: '500px',
                            margin: '0 auto',
                            lineHeight: 1.6,
                            mb: 4
                        }}
                    >
                        {t('home.socialProof.subtitle')}
                    </Typography>                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        spacing={4}
                        className="stats-container"
                        sx={{ mb: 6 }}
                    >
                        {stats.map((stat, index) => (
                            <Box key={index} className="stat-item">
                                <Typography variant="h3" className="stat-number">
                                    {stat.number}
                                </Typography>
                                <Typography variant="body2" className="stat-label">
                                    {stat.label}
                                </Typography>
                            </Box>
                        ))}
                    </Stack>

                    <Stack
                        direction="row"
                        spacing={2}
                        className="companies-container"
                        flexWrap="wrap"
                        justifyContent="center"
                    >
                        {companies.map((company, index) => (
                            <Chip
                                key={index}
                                label={company}
                                variant="outlined"
                                className="company-chip"
                            />
                        ))}
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
};

export default SocialProof;
