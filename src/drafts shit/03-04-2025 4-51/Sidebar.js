import React from "react";
import { NavLink } from "react-router-dom";

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
    { name: "Logout", icon: "fa-sign-out-alt", link: "/logout" },
  ];

  return (
    <div className="w-1/5 bg-gradient-to-b from-blue-500 to-purple-700 text-white p-4 h-full overflow-hidden">
      <h1 className="text-2xl font-bold mb-6">Drugstore System</h1>
      <ul className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-opacity-30 scrollbar-track-transparent h-full">
        {menuItems.map((item, index) => (
          <li key={index} className="mb-3">
            <NavLink
              to={item.link}
              className={({ isActive }) =>
                `flex items-center p-2 w-full rounded-lg transform transition-all duration-300 ${
                  isActive
                    ? "bg-white text-blue-500 shadow"
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
  );
};

export default Sidebar;