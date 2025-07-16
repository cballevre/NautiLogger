import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(backend)
  .use(detector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'fr'],
    backend: {
      loadPath: '/locales/{{lng}}.json',
    },
    fallbackLng: ['en'],
  });

export default i18n;
