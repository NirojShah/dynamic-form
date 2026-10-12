import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Nav from "../../navigation/Nav";
import VertNav from "../../navigation/VertNav";
import FieldLibrary from "../../form/FieldLibrary";
import FieldLayout from "../../form/FieldLayout";

const MainLayout = () => {
  const location = useLocation();

  const isCreatePage = location.pathname.includes("/create-form") || location.pathname.includes("/update-form");

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* TOP NAV */}
      <Nav />

      {/* MAIN CONTENT */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDE */}
        <div className="border-r border-black/10 w-16 md:w-64">
          {isCreatePage ? <FieldLibrary /> : <VertNav />}
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#f5f5f3]">
          <Outlet />
        </div>

        <div>
          {
            isCreatePage && <FieldLayout />
          }

        </div>
      </div>
    </div>
  );
};

export default MainLayout;
