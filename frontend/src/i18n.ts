import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationES from "./locales/es/translation.json"
import translationEN from "./locales/en/translation.json"

const savedLang = localStorage.getItem('language') || 'es';

i18n.use(initReactI18next).init({
    lng: savedLang,
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
    resources: {
        en: { translation: translationEN },
        es: { translation: translationES },
    },
});;

export default i18n