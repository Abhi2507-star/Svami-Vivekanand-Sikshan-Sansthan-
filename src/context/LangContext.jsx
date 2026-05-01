import { createContext, useContext, useState, useCallback } from 'react';
import translations from '../data/translations';

const LangContext = createContext();

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem('plps_lang') || 'en';
  });

  const setLanguage = useCallback((newLang) => {
    setLangState(newLang);
    localStorage.setItem('plps_lang', newLang);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLangState((prev) => {
      const next = prev === 'en' ? 'hi' : 'en';
      localStorage.setItem('plps_lang', next);
      return next;
    });
  }, []);

  const t = useCallback(
    (key) => {
      return translations[lang]?.[key] || translations['en']?.[key] || key;
    },
    [lang]
  );

  return (
    <LangContext.Provider value={{ lang, setLanguage, toggleLanguage, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LangContext);
  if (!context) throw new Error('useLang must be used within a LangProvider');
  return context;
}
