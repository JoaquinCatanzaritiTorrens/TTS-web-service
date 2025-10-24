import { Box, Container, Typography, Card, CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
    Mic,
    Business,
    Work
} from '@mui/icons-material';
import './use-cases.css';

const UseCases = () => {
    const { t } = useTranslation();

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'mic':
                return <Mic className="use-case-icon" />;
            case 'business':
                return <Business className="use-case-icon" />;
            case 'freelance':
                return <Work className="use-case-icon" />;
            default:
                return <Business className="use-case-icon" />;
        }
    };

    return (
        <Box className="use-cases-section">
            <Container maxWidth="lg">
                <Box className="use-cases-header">
                    <Typography
                        variant="h3"
                        gutterBottom
                        sx={{
                            textAlign: 'center',
                            fontWeight: 700,
                            mb: 2
                        }}
                    >
                        {t('home.useCases.title')}
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
                        {t('home.useCases.subtitle')}
                    </Typography>
                </Box>

                <Box className="use-cases-grid">
                    {[0, 1, 2].map((index) => (
                        <Card key={index} className="use-case-card">
                            <CardContent className="use-case-content">
                                <Box className="use-case-icon-container">
                                    {getIcon(t(`home.useCases.cases.${index}.icon`))}
                                </Box>

                                <Typography
                                    variant="h5"
                                    className="use-case-card-title"
                                    gutterBottom
                                >
                                    {t(`home.useCases.cases.${index}.title`)}
                                </Typography>

                                <Typography
                                    variant="body1"
                                    className="use-case-description"
                                >
                                    {t(`home.useCases.cases.${index}.description`)}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default UseCases;
