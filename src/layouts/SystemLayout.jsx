import SideBar from "../components/sidebar/sideBar";
import { Outlet } from "react-router-dom";

const SystemLayout = () => {
  return (
    <div className="flex flex-row h-screen overflow-hidden bg-(--background-home)">
      <SideBar />
      <main className="flex flex-col flex-1 h-screen overflow-hidden relative">
        <Outlet />
      </main>
    </div>
  );
};

export default SystemLayout;
