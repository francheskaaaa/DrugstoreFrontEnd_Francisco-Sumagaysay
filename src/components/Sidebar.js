import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo-sub.png";

const Sidebar = ({ activePage }) => {
  const menuItems = [
    { name: "Home", icon: "fa-home", link: "/home" },
    { name: "Inventory", icon: "fa-box", link: "/inventory" },
    { name: "Product", icon: "fa-capsules", link: "/product" },
    { name: "Customer", icon: "fa-users", link: "/customer" },
    { name: "Sales", icon: "fa-chart-line", link: "/sales" },
    { name: "Supplier", icon: "fa-truck", link: "/supplier" },
    { name: "User", icon: "fa-user", link: "/user" },
    { name: "Report", icon: "fa-file-alt", link: "/report" },
    { name: "Audit Log", icon: "fa-clipboard-list", link: "/audit-log" },
  ];

  const navigate = useNavigate();

  return (
    <div className="w-1/5 bg-gradient-to-b from-cyan-800 to-violet-900 text-white p-4 h-full flex flex-col">
      {/* Top Section */}
      <div>
        {/* Logo and Title */}
        <button
            onClick={() => navigate("/home")}
            className="flex flex-col items-center text-center mb-1"
        >
          <img src={logo} alt="Logo" className="h-20 mb-2 content-center"/>
          <h1 className="text-xl font-bold align-content-center mb-1">Drugstore System</h1>
        </button>

        {/* Separator */}
        <div className="border-t border-gray-300 mt-2 mb-3 opacity-50"></div>

        {/* Navigation Items */}
        <ul className="text-lg overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-opacity-30 scrollbar-track-transparent">
          {menuItems.map((item, index) => (
            <li key={index} className="mb-2">
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  `flex items-center p-2 w-full rounded-lg transform transition-all duration-300 no-underline ${
                    isActive
                      ? "bg-white text-blue-500 shadow font-bold"
                      : "hover:bg-blue-400 text-white no-underline"
                  }`
                }
              >
                <i className={`fas ${item.icon} mr-2`} />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Credits Section */}
      <div className="mt-0">
        {/* Separator */}
        <div className="border-t border-gray-300 mb-1 opacity-50"></div>

        {/* Credits */}
        <p className="text-center text-sm opacity-75">
          <i className="fas fa-copyright mr-1"></i>
          <span>2025 ITS120L - BM2 <br /> Francisco &bull; Sumagaysay</span>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;