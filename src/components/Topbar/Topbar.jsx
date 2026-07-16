import "./Topbar.css";

import { Bell, Globe, Moon } from "lucide-react";

import { useAuth } from "../../context/AuthContext";

function Topbar() {
  const { user } = useAuth();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1>
          Welcome Back{" "}
          {user?.displayName ? `, ${user.displayName.split(" ")[0]}` : ""}
        </h1>

        <p>{today}</p>
      </div>

      <div className="topbar-right">
        <button className="topbar-btn">
          <Globe size={18} />
        </button>

        <button className="topbar-btn">
          <Moon size={18} />
        </button>

        <button className="topbar-btn">
          <Bell size={18} />
        </button>
      </div>
    </header>
  );
}

export default Topbar;
