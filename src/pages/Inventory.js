import React, { useState, useEffect } from 'react';
import AuthHandler from "../utils/AuthHandler";
import CreateInventory from "./createInventory"; // Import the modal component

const Inventory = () => {
  // Check for token expiration
  useEffect(() => {
    AuthHandler.checkTokenExpiration();
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setModalOpen] = useState(false); // Modal state

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search Term:', searchTerm);
    alert(`Searching for: ${searchTerm}`);
  };


    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center bg-purple-200 p-4 rounded">
                <div className="text-xl font-bold">
                    <i className="fas fa-box mr-2"></i> Inventory Management
                </div>
                <div className="flex items-center">
                    <div className="mr-4">Hello, Admin</div>
                    <i className="fas fa-user-circle text-2xl"></i>
                </div>
            </div>

            {/* Search and Buttons */}
            <div className="flex justify-between items-center mt-4">
                <form
                    onSubmit={handleSearch}
                    className="flex items-center bg-white p-2 rounded shadow w-1/3"
                >
                    <input
                        type="text"
                        placeholder="Search"
                        className="outline-none w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="text-blue-500 hover:text-blue-700"
                    >
                        <i className="fas fa-search"></i>
                    </button>
                </form>

                {/* Buttons */}
                <div className="flex space-x-4">
                    <button
                        className="bg-purple-700 text-white px-4 py-2 rounded"
                        onClick={() => setModalOpen(true)} // Open modal
                    >
                        Add Inventory
                    </button>

                    {/*<button className="bg-gray-700 text-white px-4 py-2 rounded">
                        Manage Inventory
                    </button>*/}
                </div>
            </div>

            {/* Table */}
            {/* Table */}
            <div className="bg-gray-300 h-96 mt-4 rounded flex items-center justify-center text-4xl text-gray-500">
                TABLE
            </div>

            {/* Modal */}
            <CreateInventory isOpen={isModalOpen} onClose={() => setModalOpen(false)}/>
</div>
)
    ;
};

export default Inventory;