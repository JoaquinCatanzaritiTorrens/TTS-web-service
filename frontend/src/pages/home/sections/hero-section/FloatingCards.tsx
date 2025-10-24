import React from 'react';
import { Box, Typography } from '@mui/material';
import {
    RecordVoiceOver,
    Summarize,
    Image,
    AudioFile,
    PictureAsPdf,
    AutoAwesome
} from '@mui/icons-material';
import { useCustomTheme } from '../../../../context/theme-context/theme-context';

const FloatingCards: React.FC = () => {
    const { isDarkMode } = useCustomTheme();

    const floatingCards = [
        { icon: RecordVoiceOver, label: 'Text-to-Speech', delay: 0 },
        { icon: Summarize, label: 'AI Summarizer', delay: 1 },
        { icon: Image, label: 'Image Generation', delay: 2 },
        { icon: AudioFile, label: 'Audio Editor', delay: 3 },
        { icon: PictureAsPdf, label: 'PDF Tools', delay: 4 },
        { icon: AutoAwesome, label: 'AI Magic', delay: 5 },
    ];

    return (
        <Box className="floating-cards">
            {floatingCards.map((card, index) => {
                const IconComponent = card.icon;
                return (
                    <Box
                        key={index}
                        className={`floating-card ${isDarkMode ? 'floating-card-dark' : 'floating-card-light'}`}
                    >
                        <IconComponent className="card-icon" />
                        <Typography variant="caption" className="card-label">
                            {card.label}
                        </Typography>
                    </Box>
                );
            })}
        </Box>
    );
};

export default FloatingCards;
