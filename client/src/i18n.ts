import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from './constants/lang/en.json'
import de from './constants/lang/de.json'

const resources = {
  en: {
    translation: en
  },
  de: {
    translation: de
  },
};


i18n.use(initReactI18next).init({
  resources,
  lng: "de", 
  fallbackLng: "de", 
  interpolation: {
    escapeValue: false, 
  },
});

export default i18n;
