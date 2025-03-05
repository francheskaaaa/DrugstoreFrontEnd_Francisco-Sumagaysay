// createInventory.js
import React, {useEffect, useRef, useMemo} from "react";
import APIHandler from "../utils/APIHandler";

const CreateInventory = ({isOpen, onClose}) => {
    const formRef = useRef(null);
    const apiHandler = useMemo(() => new APIHandler(), []); // Memoize the handler instance
    // Handle form submission
    const formSubmit = async (event) => {
    event.preventDefault(); // Prevent default behavior
    console.log("Form submitted!");

    // Collect input values using FormData
    const formData = new FormData(formRef.current);
    const values = Object.fromEntries(formData.entries()); // Converts to a plain object

    console.log("Extracted Form Data:", values);

    // Perform the API call with properly mapped fields
    try {
        await apiHandler.saveInventoryData(
            values.product_id,
            values.batch_number,
            values.purchase_order_id,
            values.stock_in,
            values.stock_out,
            values.expiration_date,
            values.stock_available // Correctly named and mapped
        );
        alert("Inventory saved successfully!");
    } catch (error) {
        console.error("Error while saving inventory data:", error);
    }
};

    // Log inputs when the modal opens and call checkLogin
    useEffect(() => {
        if (isOpen) {
            const checkLoginAndLog = async () => {
                try {
                    console.log("Calling APIHandler checkLogin for refreshUrl and token:");
                    await apiHandler.checkLogin();
                } catch (error) {
                    console.error("Error in checking login:", error);
                }
            };

            checkLoginAndLog();
        }
    }, [isOpen, apiHandler]); // Add apiHandler here to avoid missing dependency warning// Run whenever isOpen changes

    // Render nothing if modal is not open
    if (!isOpen) return null;


    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#E0E7EC] p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-center text-2xl font-bold text-[#4B2354] mb-6">
                    Add Inventory Form
                </h2>
                <form ref={formRef} onSubmit={formSubmit}>
                    {/* Inventory ID and Product ID*/}
                    <div className="flex space-x-4 mb-6">
                        <div className="w-1/2">
                            <label className="block text-[#6B7280] mb-2" htmlFor="inventory-id">
                                Inventory ID
                            </label>
                            <input
                                className="w-full bg-[#E0E7EC] border-b-2 border-[#6B7280] focus:outline-none focus:border-[#3B82F6]"
                                type="number" min="0"
                                id="inventory-id"
                                name="inventory_id" // Added name attribute
                                placeholder="Inventory ID"
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-[#6B7280] mb-2" htmlFor="product-id">
                                Product ID
                            </label>
                            <input
                                className="w-full bg-[#E0E7EC] border-b-2 border-[#6B7280] focus:outline-none focus:border-[#3B82F6]"
                                type="number" min="0"
                                id="product-id"
                                name="product_id" // Added name attribute
                                placeholder="Product ID"
                            />
                        </div>
                    </div>

                    {/* Product Name */}
                    <div className="mb-6">
                        <label className="block text-[#6B7280] mb-2" htmlFor="product-name">
                            Product Name
                        </label>
                        <input
                            className="w-full bg-[#E0E7EC] border-b-2 border-[#6B7280] focus:outline-none focus:border-[#3B82F6]"
                            type="text"
                            id="product-name"
                            name="product_name" // Added name attribute
                            placeholder="Product Name"
                        />
                    </div>

                    {/* Batch Number / Purchase Order ID */}
                    <div className="flex space-x-4 mb-6">
                        <div className="w-1/2">
                            <label className="block text-[#6B7280] mb-2" htmlFor="batch-number">
                                Batch Number
                            </label>
                            <input
                                className="w-full bg-[#E0E7EC] border-b-2 border-[#6B7280] focus:outline-none focus:border-[#3B82F6]"
                                type="number" min="0"
                                id="batch-number"
                                name="batch_number" // Added name attribute
                                placeholder="Batch Number"
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-[#6B7280] mb-2" htmlFor="purchase-order-id">
                                Purchase Order ID
                            </label>
                            <input
                                className="w-full bg-[#E0E7EC] border-b-2 border-[#6B7280] focus:outline-none focus:border-[#3B82F6]"
                                type="number" min="0"
                                id="purchase-order-id"
                                name="purchase_order_id" // Added name attribute
                                placeholder="Purchase Order ID"
                            />
                        </div>
                    </div>

                    {/* Stock In / Stock Out */}
                    <div className="flex space-x-4 mb-6">
                        <div className="w-1/2">
                            <label className="block text-[#6B7280] mb-2" htmlFor="stock-in">
                                Stock In
                            </label>
                            <input
                                className="w-full bg-[#E0E7EC] border-b-2 border-[#6B7280] focus:outline-none focus:border-[#3B82F6]"
                                type="number" min="0"
                                id="stock-in"
                                name="stock_in" // Added name attribute
                                placeholder="Stock In"
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-[#6B7280] mb-2" htmlFor="stock-out">
                                Stock Out
                            </label>
                            <input
                                className="w-full bg-[#E0E7EC] border-b-2 border-[#6B7280] focus:outline-none focus:border-[#3B82F6]"
                                type="number" min="0"
                                id="stock-out"
                                name="stock_out" // Added name attribute
                                placeholder="Stock Out"
                            />
                        </div>
                    </div>

                    {/* Expiry Date / Low Stock Threshold */}
                    <div className="flex space-x-4 mb-8">
                        <div className="w-1/2">
                            <label className="block text-[#6B7280] mb-2" htmlFor="expiry-date">
                                Expiry Date
                            </label>
                            <div className="relative">
                                <input
                                    className="w-full bg-[#E0E7EC] border-b-2 border-[#6B7280] focus:outline-none focus:border-[#3B82F6]"
                                    type="datetime-local"
                                    id="expiration_date"
                                    name="expiration_date" // Added name attribute
                                    placeholder="Expiry Date"
                                />
                            </div>
                        </div>
                        <div className="w-1/2">
                            <label
                                className="block text-[#6B7280] mb-2"
                                htmlFor="stock_available"
                            >
                                Stock Available
                            </label>
                            <input
                                className="w-full bg-[#E0E7EC] border-b-2 border-[#6B7280] focus:outline-none focus:border-[#3B82F6]"
                                type="number" min="0"
                                id="stock_available"
                                name="stock_available" // Added name attribute
                                placeholder="Stock Available"
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-[#4B2354] text-white py-2 px-4 rounded-lg hover:bg-[#3A1A42]"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-[#0F3D4B] text-white py-2 px-4 rounded-lg hover:bg-[#0C2F3A]"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateInventory;