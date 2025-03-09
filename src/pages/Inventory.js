import React, {useState, useEffect, useCallback, useMemo} from 'react';
import APIHandler from '../utils/APIHandler'; // For API calls
import CreateInventory from "./createInventory";
import DeleteConfirmation from "../components/DeleteConfirmation";
import AdminDropdown from "../components/AdminDropdown";

const Inventory = () => {
    const [inventoryData, setInventoryData] = useState([]); // Full inventory list
    const [isLoading, setIsLoading] = useState(true); // Loader
    const [isModalOpen, setModalOpen] = useState(false); // Modal for Create Inventory
    const [selectedInventory, setSelectedInventory] = useState(null); // State to store selected inventory for editing
    const [isEditing, setIsEditing] = useState(false); // Editing mode

    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); // Controls delete confirmation
    const [toDeleteId, setToDeleteId] = useState(null); // Tracks ID to delete

    const apiHandler = useMemo(() => new APIHandler(), []);

    // Fetch inventory data from API
    // Function to fetch inventory data
    const loadInventoryData = useCallback(async () => {
        setIsLoading(true); // Show loading indicator
        try {
            const response = await apiHandler.getInventoryData();
            // console.log("Inventory Data Received:", response.data); // Debugging
            // setInventoryData(response.data); // Set inventory table data

            // Format expiration_date to include time (local)
        const formattedData = response.data.map((item) => {
            if (item.expiration_date) {
                const expirationDateObj = new Date(item.expiration_date);
                const offset = expirationDateObj.getTimezoneOffset() * 60000; // Convert offset to milliseconds
                const localDate = new Date(expirationDateObj.getTime() - offset); // Adjust to local time
                item.expiration_date = localDate.toISOString().slice(0, 16); // Convert to YYYY-MM-DDTHH:mm
            }

            return item; // Return updated inventory item with formatted expiration_date
        });



        console.log("Formatted Inventory Data:", formattedData);
        setInventoryData(formattedData); // Set updated inventory data


        } catch (error) {
            console.error("Error fetching inventory data:", error);
        } finally {
            setIsLoading(false); // Hide loading indicator
        }
    }, [apiHandler]);

    // UseEffect to load data on component mount
useEffect(() => {
    (async () => {
        try {
            await loadInventoryData(); // Await the async call
        } catch (error) {
            console.error("Error during initial data load:", error);
        }
    })();
}, [loadInventoryData]); // Runs once on component mount
    // Handle adding a new inventory
    const handleAdd = () => {
        setIsEditing(false); // Open modal in creating mode
        setSelectedInventory(null); // No selected inventory
        setModalOpen(true); // Open the modal
    };

// Toggle modal open/close and set editing state
    const handleEdit = (inventory) => {
        console.log("Editing Inventory:", inventory);

        setIsEditing(true);
        setSelectedInventory(inventory); // Set inventory data to be edited
        setModalOpen(true); // Open the modal
    };

    // Toggle modal's open/close state
    const toggleModal = () => {
        setModalOpen((prev) => !prev);
        if (!isModalOpen) {
            setIsEditing(false); // Reset editing state when closing
            setSelectedInventory(null); // Clear inventory being edited
        }
    };


    /*const handleDelete = (id) => {
        alert(`Deleting inventory with ID: ${id}`);
    };*/

    const openDeleteModal = (id) => {
        setToDeleteId(id);
        setDeleteModalOpen(true);
    };

    // Close delete confirmation modal
    const closeDeleteModal = () => {
        setToDeleteId(null);
        setDeleteModalOpen(false);
    };

    // Handle delete action
    const confirmDelete = async (id) => {
        try {
            await apiHandler.deleteInventory(id); // Delete the inventory
            alert(`Inventory with ID ${id} deleted successfully!`);
            closeDeleteModal();
            await loadInventoryData(); // Refresh the table after deletion
        } catch (error) {
            console.error("Error deleting inventory:", error);
            alert("Failed to delete inventory. Please try again.");
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center bg-purple-200 p-4 rounded">
                <div className="text-xl font-bold">
                    <i className="fas fa-box mr-2"></i> Inventory Management
                </div>
                <div className="flex items-center">
                    <div>
                        <AdminDropdown/> {/* Use the new dropdown */}
                    </div>
                </div>
            </div>

            {/* Search and Buttons */}
            <div className="flex justify-between items-center mt-4">
                <form className="flex items-center bg-white p-2 rounded shadow w-1/3">
                    <input
                        type="text"
                        placeholder="Search"
                        className="outline-none w-full"
                    />
                    <button type="submit" className="text-blue-500 hover:text-blue-700">
                        <i className="fas fa-search"></i>
                    </button>
                </form>

                <button
                    className="bg-purple-700 text-white px-4 py-2 rounded"
                    onClick={handleAdd} // Open the modal
                >
                    Add Inventory
                </button>
            </div>

            {/* Render Modal */}
            {/*<CreateInventory isOpen={isModalOpen} onClose={toggleModal}
            refreshInventory={loadInventoryData}
            />*/}
            {isModalOpen && (
                <CreateInventory
                    isOpen={isModalOpen}
                    onClose={toggleModal}
                    refreshInventory={loadInventoryData}
                    isEditing={isEditing} // Pass editing state
                    inventoryData={selectedInventory} // Pass the selected inventory for editing
                />)}

            {/* Table */}
            <div className="mt-4">
                <div className="overflow-auto rounded-lg shadow">
                    {isLoading ? (
                        <div className="text-center py-8">Loading...</div>
                    ) : (
                        <table className="w-full table-auto border-collapse border border-gray-300">
                            <thead className="bg-purple-500 text-white text-center">
                            <tr>
                                <th className="px-4 py-2 ">#</th>
                                {/* New column header */}
                                <th className="px-4 py-2">ID</th>
                                <th className="px-4 py-2">Product ID</th>
                                <th className="px-4 py-2">Batch Number</th>
                                <th className="px-4 py-2">Purchase Order ID</th>
                                <th className="px-4 py-2">Stock In</th>
                                <th className="px-4 py-2">Stock Out</th>
                                <th className="px-4 py-2">Expiration Date</th>
                                <th className="px-4 py-2">Stock Available</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {inventoryData.length > 0 ? (
                                inventoryData.map((inventory, index) => (
                                    <tr key={inventory.inventory_id} className="hover:bg-gray-100 transition-colors">
                                        <td className="border px-4 py-2 text-center">{index + 1}</td>
                                        {/* # column */}
                                        <td className="border px-4 py-2 text-center">{inventory.inventory_id}</td>
                                        <td className="border px-4 py-2 text-center">{inventory.product_id || 'N/A'}</td>
                                        <td className="border px-4 py-2 text-center">{inventory.batch_number || 'N/A'}</td>
                                        <td className="border px-4 py-2 text-center">{inventory.purchase_order_id || 'N/A'}</td>
                                        <td className="border px-4 py-2 text-center">{inventory.stock_in}</td>
                                        <td className="border px-4 py-2 text-center">{inventory.stock_out}</td>
                                        <td className="border px-4 py-2 text-center">
                                            {inventory.expiration_date
    ? new Date(inventory.expiration_date).toLocaleString("en-US", {
        month: "short", // Abbreviated month (e.g., "Mar")
        day: "2-digit", // Numeric day (e.g., "20")
        year: "numeric", // Full numeric year (e.g., "2025")
        hour: "numeric", // Hour (e.g., "3")
        minute: "numeric", // Minute (e.g., "34")
        hour12: true, // AM/PM format
      })
    : "N/A"} {/* If no expiration_date, display 'N/A' */}

                                        </td>
                                        <td className="border px-4 py-2 text-center">{inventory.stock_available}</td>
                                        <td className="border px-4 py-2 text-center">
                                            <div className="flex justify-center space-x-2">
                                                {/* Edit Button Icon */}
                                                <button
                                                    className="bg-blue-500 text-white p-2 w-8 rounded-lg hover:bg-blue-700"
                                                    onClick={() => handleEdit(inventory)}
                                                >
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                                {/* Delete Button Icon */}
                                                <button
                                                    className="bg-red-500 text-white p-2 rounded-lg w-8 hover:bg-red-700"
                                                    onClick={() => openDeleteModal(inventory.inventory_id)}

                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10" className="text-center text-gray-500 py-4">
                                        No inventory data available.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            <DeleteConfirmation
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onConfirm={confirmDelete}
                id={toDeleteId}
            />

        </div>
    );
};

export default Inventory;