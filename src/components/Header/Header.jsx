import { NavLink } from "react-router-dom";
import { HiOutlineWallet } from "react-icons/hi2";
import { FiLogOut } from "react-icons/fi";
import { toast } from "sonner";

import "./Header.css";

import { useAuth } from "../../context/AuthContext";

function Header() {
  const { user, logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();

      toast.success("Logged out successfully.");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <HiOutlineWallet className="logo-icon" />
          <span className="logo-text">MoneyMate</span>
        </div>

        <nav className="navigationContainer">
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            to="/"
          >
            Dashboard
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            to="/transactions"
          >
            Transactions
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            to="/add-transactions"
          >
            Add Transactions
          </NavLink>
        </nav>

        <div className="header-user">
          <span className="user-name">{user.displayName || user?.email}</span>

          <button className="logout-btn" onClick={handleLogout}>
            <FiLogOut />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
