import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { translations } from "../i18n/translations";

const SettingsContext = createContext();

function getStoredSetting(key, fallback) {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}

export function SettingsProvider({ children }) {
  const [theme, setTheme] = useState(() =>
    getStoredSetting("moneymate-theme", "dark"),
  );
  const [language, setLanguageState] = useState(() =>
    getStoredSetting("moneymate-language", "en"),
  );

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("moneymate-theme", theme);
  }, [theme]);

  useLayoutEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem("moneymate-language", language);
  }, [language]);

  const value = useMemo(() => {
    const t = (key) =>
      translations[language]?.[key] ?? translations.en[key] ?? key;

    return {
      theme,
      language,
      locale: language === "tr" ? "tr-TR" : "en-US",
      t,
      toggleTheme: () =>
        setTheme((current) => (current === "dark" ? "light" : "dark")),
      setLanguage: (nextLanguage) => setLanguageState(nextLanguage),
    };
  }, [language, theme]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

// The provider and consumer hook intentionally share this context module.
// eslint-disable-next-line react-refresh/only-export-components
export function useSettings() {
  return useContext(SettingsContext);
}
