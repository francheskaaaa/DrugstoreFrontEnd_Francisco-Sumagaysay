import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const MainComponent = ({ page }) => {
  return (
    <div className="bg-gray-100 h-screen flex">
      {/* Sidebar */}
      <Sidebar activePage={page} />

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-auto">
        {/* Render child components (like Home, Inventory, etc.) */}
        <Outlet />
      </div>
    </div>
  );
};

export default MainComponent;