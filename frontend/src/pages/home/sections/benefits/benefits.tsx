import { Box, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
    Schedule,
    Star,
    Psychology,
    AttachMoney
} from '@mui/icons-material';
import './benefits.css';

const Benefits = () => {
    const { t } = useTranslation();

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'time':
                return <Schedule className="benefit-icon" />;
            case 'quality':
                return <Star className="benefit-icon" />;
            case 'easy':
                return <Psychology className="benefit-icon" />;
            case 'price':
                return <AttachMoney className="benefit-icon" />;
            default:
                return <Star className="benefit-icon" />;
        }
    };

    return (
        <Box className="benefits-section">
            <Container maxWidth="lg">
                <Box className="benefits-header">
                    <Typography
                        variant="h3"
                        gutterBottom
                        sx={{
                            textAlign: 'center',
                            fontWeight: 700,
                            mb: 2
                        }}
                    >
                        {t('home.benefits.title')}
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{
                            textAlign: 'center',
                            opacity: 0.8,
                            maxWidth: '500px',
                            margin: '0 auto',
                            lineHeight: 1.6,
                            mb: 6
                        }}
                    >
                        {t('home.benefits.subtitle')}
                    </Typography>
                </Box>

                <Box className="benefits-grid">
                    {[0, 1, 2, 3].map((index) => (
                        <Box key={index} className="benefit-item">
                            <Box className="benefit-icon-container">
                                {getIcon(t(`home.benefits.items.${index}.icon`))}
                            </Box>

                            <Typography
                                variant="h5"
                                className="benefit-title"
                                gutterBottom
                            >
                                {t(`home.benefits.items.${index}.title`)}
                            </Typography>

                            <Typography
                                variant="body1"
                                className="benefit-description"
                            >
                                {t(`home.benefits.items.${index}.description`)}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default Benefits;
