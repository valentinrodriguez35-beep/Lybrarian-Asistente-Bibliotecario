import React from "react";
import SideBar from "../components/sidebar/sideBar";
import MapView from "../pages/map-view/map_view";
import HomeView from "../pages/map-view/map_view";
import ChatView from "../pages/chat-view/chat_view";
import { Outlet } from "react-router-dom";

const SystemLayout = () => {
  return (
    <div className="flex flex-row min-h-dvh min-full ">
      <SideBar />
      <main className="flex flex-col flex-1 relative">
        <Outlet />
      </main>
    </div>
  );
};

export default SystemLayout;
