import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TranslateIcon from '@mui/icons-material/Translate';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const languages = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Español' }
    ];
    return (
        <Select
            value={i18n.language}
            onChange={(event) => i18n.changeLanguage(event.target.value)}
            variant='standard'
            disableUnderline={true}
            fullWidth={false}
            renderValue={() => <TranslateIcon />}
            sx={{
                '& .MuiSelect-select': {
                    display: 'flex',
                    alignItems: 'center',
                    paddingTop: 0,
                    paddingBottom: 0,
                    minHeight: 'auto'
                }
            }}
        >
            {languages.map((lang) => (
                <MenuItem value={lang.code} key={lang.code}>
                    {lang.name}
                </MenuItem>
            ))}
        </Select>
    );
};

export default LanguageSelector;