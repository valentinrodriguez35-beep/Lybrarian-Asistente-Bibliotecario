import React from "react";
import SideBar from "../components/sidebar/sideBar";
import { Outlet } from "react-router-dom";

const SystemLayout = () => {
  return (
    <div className="flex flex-row min-h-screen min-w-full ">
      <SideBar />
      <main className="flex flex-col flex-1 relative">
        <Outlet />
      </main>
    </div>
  );
};

export default SystemLayout;
