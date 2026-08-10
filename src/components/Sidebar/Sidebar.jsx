import "./Sidebar.css";

import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  ReceiptText,
  CirclePlus,
  ChartPie,
  Moon,
  Sun,
  LogOut,
  ChevronLeft,
} from "lucide-react";

import { HiOutlineWallet } from "react-icons/hi2";

import { useAuth } from "../../context/AuthContext";
import { useSettings } from "../../context/SettingsContext";
import LanguageMenu from "../Settings/LanguageMenu";

function Sidebar({ collapsed, setCollapsed }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme, t } = useSettings();

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div>
        <div className="sidebar-logo">
          <div className="logo-wrapper">
            <HiOutlineWallet className="logo-icon" />

            {!collapsed && (
              <div className="logo-content">
                <span className="logo-text">MoneyMate</span>
                <small>{t("personalFinance")}</small>
              </div>
            )}
          </div>

          <button
            className="collapse-btn"
            onClick={() => setCollapsed(!collapsed)}
          >
            <ChevronLeft size={18} className={collapsed ? "rotate" : ""} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/" className="sidebar-link">
            <LayoutDashboard size={20} />
            {!collapsed && <span>{t("dashboard")}</span>}
          </NavLink>

          <NavLink to="/transactions" className="sidebar-link">
            <ReceiptText size={20} />
            {!collapsed && <span>{t("transactions")}</span>}
          </NavLink>

          <NavLink to="/add-transactions" className="sidebar-link">
            <CirclePlus size={20} />
            {!collapsed && <span>{t("addTransaction")}</span>}
          </NavLink>

          <NavLink to="/analytics" className="sidebar-link">
            <ChartPie size={20} />
            {!collapsed && <span>{t("analytics")}</span>}
          </NavLink>
        </nav>
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-settings">
          <LanguageMenu variant="sidebar" collapsed={collapsed} />

          <button
            className="sidebar-link"
            type="button"
            aria-label={t("switchTheme")}
            onClick={toggleTheme}
          >
            {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
            {!collapsed && (
              <span>
                {t("theme")}: {t(theme === "dark" ? "darkTheme" : "lightTheme")}
              </span>
            )}
          </button>
        </div>

        <div className="user-card">
          <div className="user-avatar">
            {user?.displayName?.charAt(0).toUpperCase()}
          </div>

          {!collapsed && (
            <div className="user-info">
              <strong>{user?.displayName}</strong>
              <span>{user?.email}</span>
            </div>
          )}
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
          {!collapsed && <span>{t("logout")}</span>}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
