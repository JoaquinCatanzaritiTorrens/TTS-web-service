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
            onChange={(event) => {
                const lang = event.target.value;
                i18n.changeLanguage(lang);
                localStorage.setItem('language', lang);
            }}
            variant='standard'
            disableUnderline={true}
            IconComponent={() => null}
            renderValue={() => <TranslateIcon />}
            sx={{
                width: '40px',
                minWidth: '40px',
                height: '40px',
                '& .MuiSelect-select': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px !important',
                    minHeight: 'auto',
                    width: '40px',
                    height: '40px'
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