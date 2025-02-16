import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as enUS from '@/i18n/en-US.json';
import * as es from '@/i18n/es.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      'en-US': {
        translation: enUS,
      },
      'es': {
        translation: es,
      },
    },
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;