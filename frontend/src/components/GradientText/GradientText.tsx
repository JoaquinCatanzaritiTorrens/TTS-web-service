import React from 'react';
import Typography from '@mui/material/Typography';
import type { TypographyProps } from '@mui/material/Typography';
import './GradientText.css';

interface GradientTextProps extends Omit<TypographyProps, 'sx'> {
    children: React.ReactNode;
    animated?: boolean;
}

const GradientText: React.FC<GradientTextProps> = ({
    children,
    animated = true,
    variant = 'h2',
    component = 'h2',
    align = 'center',
    ...props
}) => {

    return (
        <Typography
            variant={variant}
            component={component}
            align={align}
            className={`gradient-text-component ${animated ? 'animated' : ''}`}
            sx={(theme) => ({
                fontWeight: 700,
                letterSpacing: '-0.025em',
                fontSize: variant === 'h2' ? '2.5rem' : undefined,
                marginBottom: variant === 'h2' ? 5 : 3,
                backgroundColor: 'transparent !important',
                background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%) !important'
                    : 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%) !important',
                WebkitBackgroundClip: 'text !important',
                WebkitTextFillColor: 'transparent !important',
                backgroundClip: 'text !important',
                color: 'transparent !important',
                backgroundSize: animated ? '200% 200%' : '100% 100%',
                backgroundPosition: '0% 50%',
                display: 'block',
                width: '100%',
                textAlign: align || 'center',
                boxShadow: 'none !important',
                border: 'none !important',
                overflow: 'visible'
            })}
            {...props}
        >
            {children}
        </Typography>
    );
};

export default GradientText;
