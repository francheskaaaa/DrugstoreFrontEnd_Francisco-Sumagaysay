import AuthHandler from "../utils/AuthHandler"; // Import AuthHandler
import Config from "../utils/Config";
import {useEffect, useRef, useState} from "react";

const AdminDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-lg bg-white shadow px-3 py-2 rounded-lg hover:bg-gray-200 transition focus:outline-none"
      >
        <span>Hello, Admin</span>
        <i className="fas fa-user-circle text-2xl ml-2 text-blue-500"></i>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 mt-2 w-48 bg-white shadow-lg p-4 rounded-lg z-10 transition-all duration-200 ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
        }`}
      >
        <div className="pb-2 border-b border-gray-300 mb-2">
          <p className="text-gray-800 font-bold">Admin</p>
          <p className="text-gray-500 text-sm">admin@example.com</p>
        </div>
        <button
          onClick={() => {
            // Perform logout logic
            AuthHandler.logout(); // Clear tokens
            window.location.href = Config.logoutUrl; // Redirect to /logout
          }}
          className="flex items-center text-red-500 hover:text-red-700 transition"
        >
          <i className="fas fa-sign-out-alt mr-2"></i> Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDropdown;