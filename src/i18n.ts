import i18next from 'i18next';
// import { initReactI18next } from 'react-i18next';
import  en_translation  from './i18n_en_translation.json';
import   pt_translation  from './i18n_pt_translation.json';

// import Backend from 'i18next-xhr-backend';
// import LanguageDetector from 'i18next-browser-languagedetector';
// not like to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

const resources = {
  en: {
    translation: en_translation
  }
  , pt: {
    translation: pt_translation
  }
};


i18next
// .use(SyncBackend)

// load translation using xhr -> see /public/locales
// learn more: https://github.com/i18next/i18next-xhr-backend
// .use(Backend)
// detect user language
// learn more: https://github.com/i18next/i18next-browser-languageDetector
// .use(LanguageDetector)
// pass the i18n instance to react-i18next.
// .use(initReactI18next)
// init i18next
// for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    lng: 'en',
    
    resources,
    initImmediate: false,
    
    fallbackLng: 'en',
    debug: true
    // interpolation: {
    //   escapeValue: false, // not needed for react as it escapes by default
    // }
  });


export default i18next;

