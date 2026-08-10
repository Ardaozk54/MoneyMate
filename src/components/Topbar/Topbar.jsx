import "./Topbar.css";

import { Bell, Moon, Sun } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { useSettings } from "../../context/SettingsContext";
import LanguageMenu from "../Settings/LanguageMenu";

function Topbar() {
  const { user } = useAuth();
  const { theme, toggleTheme, t, locale } = useSettings();

  const today = new Date().toLocaleDateString(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1>
          {t("welcomeBack")}{" "}
          {user?.displayName ? `, ${user.displayName.split(" ")[0]}` : ""}
        </h1>

        <p>{today}</p>
      </div>

      <div className="topbar-right">
        <LanguageMenu />

        <button
          className="topbar-btn"
          type="button"
          aria-label={t("switchTheme")}
          title={t(theme === "dark" ? "lightTheme" : "darkTheme")}
          onClick={toggleTheme}
        >
          {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <button
          className="topbar-btn"
          type="button"
          aria-label={t("notifications")}
        >
          <Bell size={18} />
        </button>
      </div>
    </header>
  );
}

export default Topbar;
