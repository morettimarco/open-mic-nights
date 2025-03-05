import { useEffect, useState } from 'react';
import en from './en';
import it from './it';

// Available languages
export const languages = {
  en,
  it
};

// Function to get initial language preference
const getInitialLanguage = () => {
  // First try to get from localStorage
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage && languages[savedLanguage]) {
    return savedLanguage;
  }
  
  // Otherwise use browser language or default to English
  const browserLang = window.navigator.language.split('-')[0];
  return languages[browserLang] ? browserLang : 'en';
};

// Custom hook for managing translations
export const useTranslation = () => {
  const [language, setLanguage] = useState(getInitialLanguage());
  const [translations, setTranslations] = useState(languages[language]);

  // Change the language
  const changeLanguage = (lang) => {
    if (languages[lang]) {
      setLanguage(lang);
      localStorage.setItem('language', lang);
    }
  };

  // Update translations when language changes
  useEffect(() => {
    setTranslations(languages[language]);
  }, [language]);

  return {
    language,
    changeLanguage,
    t: translations,
    languages: Object.keys(languages),
  };
};