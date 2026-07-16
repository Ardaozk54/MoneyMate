import "./MainLayout.css";

import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar/Topbar";

function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="layout">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className={`content ${collapsed ? "collapsed" : ""}`}>
        <Topbar />

        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
