import React from "react";
import SideBar from "../components/sidebar/sideBar";
import { Outlet } from "react-router-dom";

const SystemLayout = () => {
  return (
    <div className="flex flex-row h-screen overflow-hidden">
      <SideBar />
      <main className="flex flex-col flex-1 h-screen overflow-hidden relative">
        <Outlet />
      </main>
    </div>
  );
};

export default SystemLayout;
