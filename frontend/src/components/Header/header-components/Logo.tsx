import Box from '@mui/material/Box';
import logo from '../../../assets/logo.webp';

const Logo = ({ onLogoClick }) => {
    return (
        <Box className="header-logo-box">
            <img
                src={logo}
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