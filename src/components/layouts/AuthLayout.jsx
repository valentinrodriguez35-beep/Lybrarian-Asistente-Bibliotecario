import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex flex-row h-screen overflow-hidden bg-(--background-home)">
      <main className="flex flex-col flex-1 h-screen overflow-hidden relative">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
