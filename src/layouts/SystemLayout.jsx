import React from "react";
import SideBar from "../components/sidebar/sideBar";
import { Outlet } from "react-router-dom";

const SystemLayout = () => {
  return (
    <div className="flex flex-row h-screen overflow-hidden">
      <SideBar />
      <main className="flex flex-col flex-1 min-h-0 relative">
        <Outlet />
      </main>
    </div>
  );
};

export default SystemLayout;
