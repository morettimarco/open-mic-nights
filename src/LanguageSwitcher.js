import React from 'react';
import { useTranslation } from './i18n';

// Language flags mapping
const flags = {
  en: '🇬🇧',
  it: '🇮🇹'
};

const LanguageSwitcher = () => {
  const { language, changeLanguage, t, languages } = useTranslation();

  return (
    <div className="language-switcher">
      <div className="dropdown is-hoverable">
        <div className="dropdown-trigger">
          <button 
            className="button is-small" 
            aria-haspopup="true" 
            aria-controls="dropdown-menu"
          >
            <span className="flag-icon">{flags[language]}</span>
            <span className="language-name">{t.languageSelector[language]}</span>
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {languages.map(lang => (
              <a 
                key={lang}
                className={`dropdown-item ${lang === language ? 'is-active' : ''}`}
                onClick={() => changeLanguage(lang)}
              >
                <span className="flag-icon">{flags[lang]}</span>
                <span className="language-name">{t.languageSelector[lang]}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;