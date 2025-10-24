import { Box, Container, Typography, Card, CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Features = () => {
    const { t } = useTranslation();

    return (
        <Box
            sx={{
                py: 5,
                bgcolor: theme => theme.palette.mode === 'dark'
                    ? 'rgba(0, 0, 0, 0.3)'
                    : 'rgba(0, 0, 0, 0.08)'
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
                    <Typography
                        variant="h3"
                        gutterBottom
                        sx={{
                            textAlign: 'center',
                            fontWeight: 700,
                            mb: 2
                        }}
                    >
                        {t('home.features.title')}
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{
                            textAlign: 'center',
                            opacity: 0.8,
                            maxWidth: '600px',
                            margin: '0 auto',
                            lineHeight: 1.6,
                            mb: 6
                        }}
                    >
                        {t('home.features.subtitle')}
                    </Typography>
                </Box>

                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: 1.5,
                    mt: 2
                }}>
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                        <Card key={index} className="section-card feature-card">
                            <CardContent sx={{ p: '2rem 1.5rem' }}>
                                <Typography
                                    variant="h6"
                                    className="section-title"
                                    gutterBottom
                                >
                                    {t(`home.features.items.${index}.title`)}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    sx={{ opacity: 0.8, lineHeight: 1.6 }}
                                >
                                    {t(`home.features.items.${index}.description`)}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default Features;
