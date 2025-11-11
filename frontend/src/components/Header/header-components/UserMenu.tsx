import { Box, Button } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { useTranslation } from 'react-i18next';

const UserMenu = ({ handleLaunchApp }) => {
    const { t } = useTranslation();

    return (
        <Box className="header-right-box" sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Button
                variant="contained"
                startIcon={<RocketLaunchIcon />}
                onClick={handleLaunchApp}
                className="launch-app-button"
            >
                {t('header.launchApp')}
            </Button>
        </Box>
    );
};

export default UserMenu;