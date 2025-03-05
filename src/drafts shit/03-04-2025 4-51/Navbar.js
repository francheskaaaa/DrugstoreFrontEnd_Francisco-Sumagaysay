import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar bg-white shadow flex justify-between items-center px-6 py-4">
      {/* Menu Button (Hidden for now) */}
      {/*
      <button className="bars" onClick={onBarClick}>
        <i className="fas fa-bars"></i>
      </button>
      */}

      {/* Navbar Brand */}
      <div className="navbar-brand text-xl font-bold text-blue-500">
        Medical Store Management System
      </div>
    </nav>
  );
};

export default Navbar;