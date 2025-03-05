import React from "react";
import AdminDropdown from "./AdminDropdown";

const Home = () => {
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-xl font-bold text-purple-700">
          <i className="fas fa-home mr-2"></i> Dashboard
        </div>
        <div>
          <AdminDropdown /> {/* Use the new dropdown */}
        </div>
      </div>


      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-200 p-4 rounded-lg flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold">32</div>
            <div className="text-gray-600">Total Inventory</div>
          </div>
          <i className="fas fa-box text-gray-500"></i>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold">126</div>
            <div className="text-gray-600">Total Product</div>
          </div>
          <i className="fas fa-capsules text-gray-500"></i>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold">71</div>
            <div className="text-gray-600">Total Customer</div>
          </div>
          <i className="fas fa-users text-gray-500"></i>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold">78</div>
            <div className="text-gray-600">Total Sales</div>
          </div>
          <i className="fas fa-chart-line text-gray-500"></i>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold">18</div>
            <div className="text-gray-600">Total Supplier</div>
          </div>
          <i className="fas fa-truck text-gray-500"></i>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold">4</div>
            <div className="text-gray-600">Total User</div>
          </div>
          <i className="fas fa-user text-gray-500"></i>
        </div>
      </div>

      {/* Alerts Section */}
      <div className="grid grid-cols-2 gap-4">
        {/* Notifications */}
        <div>
          <div className="bg-purple-700 text-white p-4 rounded-lg mb-4">
            <h4 className="font-bold mb-2">Low Stock Alert</h4>
            <p>Paracetamol 500mg Tablets - Only 10 packs remaining!</p>
          </div>
          <div className="bg-purple-700 text-white p-4 rounded-lg">
            <h4 className="font-bold mb-2">Expired Products</h4>
            <p>Notify responsible staff to replace expired inventory items.</p>
          </div>
        </div>

        {/* Sales Stats */}
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-blue-500 text-2xl font-bold mb-4">
            Sales Overview
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-700">$120,000</div>
              <div className="text-gray-600">Total Sales Revenue</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-700">$75,500</div>
              <div className="text-gray-600">Total Profit</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;