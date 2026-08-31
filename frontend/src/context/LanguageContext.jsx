import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "../config/i18n";

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    try {
      return ["es", "ca", "en"].includes(localStorage.getItem("celina-lang"))
        ? localStorage.getItem("celina-lang")
        : "es";
    } catch {
      return "es";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("celina-lang", lang);
    } catch {}
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
