import { Moon, Sun } from "lucide-react";
import { HiOutlineWallet } from "react-icons/hi2";
import LanguageMenu from "../Settings/LanguageMenu";
import { useSettings } from "../../context/SettingsContext";
import "./AuthCard.css";

function AuthCard({ title, subtitle, children }) {
  const { theme, toggleTheme, t } = useSettings();

  return (
    <main className="auth-page">
      <div className="auth-page-settings">
        <LanguageMenu />
        <button
          className="topbar-btn"
          type="button"
          aria-label={t("switchTheme")}
          onClick={toggleTheme}
        >
          {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>

      <section className="auth-card">
        <div className="auth-header">
          <h1 className="auth-logo">
            <HiOutlineWallet />
            MoneyMate
          </h1>

          <h2>{title}</h2>

          <p>{subtitle}</p>
        </div>

        {children}
      </section>
    </main>
  );
}

export default AuthCard;
