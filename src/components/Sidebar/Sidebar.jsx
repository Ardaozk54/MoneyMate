import "./Sidebar.css";

import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  ReceiptText,
  CirclePlus,
  ChartPie,
  Languages,
  Moon,
  LogOut,
  ChevronLeft,
} from "lucide-react";

import { HiOutlineWallet } from "react-icons/hi2";

import { useAuth } from "../../context/AuthContext";

function Sidebar({ collapsed, setCollapsed }) {
  const { user, logout } = useAuth();

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
                <small>Personal Finance</small>
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
            {!collapsed && <span>Dashboard</span>}
          </NavLink>

          <NavLink to="/transactions" className="sidebar-link">
            <ReceiptText size={20} />
            {!collapsed && <span>Transactions</span>}
          </NavLink>

          <NavLink to="/add-transactions" className="sidebar-link">
            <CirclePlus size={20} />
            {!collapsed && <span>Add Transaction</span>}
          </NavLink>

          <button className="sidebar-link">
            <ChartPie size={20} />
            {!collapsed && <span>Analytics</span>}
          </button>
        </nav>
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-settings">
          <button className="sidebar-link">
            <Languages size={20} />
            {!collapsed && <span>Language</span>}
          </button>

          <button className="sidebar-link">
            <Moon size={20} />
            {!collapsed && <span>Theme</span>}
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
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
