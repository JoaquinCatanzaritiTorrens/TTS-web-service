import Box from '@mui/material/Box';
import { useCustomTheme } from '../../../context/theme-context/theme-context';
import logoWhite from '../../../assets/logo.webp';
import logoBlack from '../../../assets/logo-black.webp';

const Logo = ({ onLogoClick }) => {
    const { isDarkMode } = useCustomTheme();

    return (
        <Box className="header-logo-box">
            <img
                src={isDarkMode ? logoWhite : logoBlack}
                alt="Logo"
                className="header-logo-img"
                onClick={onLogoClick}
                loading="lazy"
                width={125}
                height={101}
                style={{ width: 'auto', height: '35px' }}
            />
        </Box>
    );
};

export default Logo;