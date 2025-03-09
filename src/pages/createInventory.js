import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import APIHandler from "../utils/APIHandler";

const CreateInventory = ({ isOpen, onClose, refreshInventory, isEditing, inventoryData }) => {
    const formRef = useRef(null);
    const apiHandler = useMemo(() => new APIHandler(), []);

    // States for form fields
    const [productName, setProductName] = useState("");
    const [productOptions, setProductOptions] = useState([]);
    const [selectedProductID, setSelectedProductID] = useState(null);
    const [nextInventoryID, setNextInventoryID] = useState(0);
    const [inventoryID, setInventoryID] = useState(0);
    const [batchNumber, setBatchNumber] = useState("");
    const [purchaseOrderID, setPurchaseOrderID] = useState("");
    const [stockIn, setStockIn] = useState(0);
    const [stockOut, setStockOut] = useState(0);
    const [stockAvailable, setStockAvailable] = useState(0);
    const [expirationDate, setExpirationDate] = useState("");

    // Handle Product Search
    const handleProductSearch = useCallback(async (event) => {
        const searchValue = event.target.value;
        setProductName(searchValue);

        if (searchValue.length > 2) {
            try {
                const searchResults = await apiHandler.searchProductsByName(searchValue);
                const options = (searchResults.data || []).map((item) => ({
                    product_id: item.product_id,
                    product_name: item.product_name,
                }));
                setProductOptions(options);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        } else {
            setProductOptions([]);
        }
    }, [apiHandler]);

    // Handle Product Selection
    const handleProductSelect = (product) => {
        setSelectedProductID(product.product_id);
        setProductName(product.product_name);
        setProductOptions([]);
    };

    // Fetch Next Inventory ID
    const fetchNextInventoryID = useCallback(async () => {
        try {
            const response = await apiHandler.getInventoryData();
            const inventoryList = response.data || [];
            const inventoryIDs = inventoryList.map((item) => item.inventory_id);
            const maxID = Math.max(...inventoryIDs, 0); // Prevent -Infinity for empty arrays
            const newInventoryID = maxID + 1; // Calculate next inventory ID

            setNextInventoryID(newInventoryID);
            if (!isEditing) {
            setInventoryID(newInventoryID); // Set inventory ID only if creating
        }

        } catch (error) {
            console.error("Error fetching inventory ID:", error);
            setNextInventoryID(1); // Fallback to 1 if something goes wrong
        }
    }, [apiHandler, isEditing]);

    // Handle Cancel
    const handleCancel = () => {
        if (onClose) onClose();
    };

    // Submit Form
    const formSubmit = async (e) => {
        e.preventDefault();
        try {
            const inventoryData = {
                inventory_id: inventoryID,
                product_id: selectedProductID,
                batch_number: batchNumber,
                purchase_order_id: purchaseOrderID,
                stock_in: parseInt(stockIn, 10),
                stock_out: parseInt(stockOut, 10),
                expiration_date: expirationDate,
                stock_available: parseInt(stockAvailable, 10),
            };

            if (isEditing) {
    await apiHandler.updateInventoryData(inventoryData); // Call the update method
    alert("Inventory updated successfully!");
} else {
    await apiHandler.saveInventoryData(
        selectedProductID,
        batchNumber,
        purchaseOrderID,
        stockIn,
        stockOut,
        expirationDate,
        stockAvailable
    );
    alert("Inventory created successfully!");
}
            refreshInventory();
            onClose();
        } catch (error) {
            console.error("Error saving/updating inventory:", error);
            alert("An error occurred. Please try again.");
        }
    };

    // Effects
    useEffect(() => {
        const checkLoginAndFetchID = async () => {
            if (isOpen) {
                try {
                    await apiHandler.checkLogin();
                    fetchNextInventoryID();
                } catch (error) {
                    console.error("Error in checking login or fetching ID:", error);
                }
            }
        };
        checkLoginAndFetchID(); // Unconditionally calling the function
    }, [isOpen, apiHandler, fetchNextInventoryID]);

    useEffect(() => {
    const initializeForm = async () => {
        if (!isEditing) {
            await fetchNextInventoryID(); // Fetch next inventory ID for a new record
        } else if (inventoryData) {
            setInventoryID(inventoryData.inventory_id || 0); // Use existing inventory ID in edit mode
        }
    };

    initializeForm(); // Trigger form initialization
}, [isEditing, inventoryData, fetchNextInventoryID]);

    useEffect(() => {
        if (isOpen) {
            // Clear fields when the modal opens
            setStockIn(0);
            setStockOut(0);
            setBatchNumber("");
            setPurchaseOrderID("");
            setSelectedProductID(null);
        }
    }, [isOpen]);

    useEffect(() => {
        setStockAvailable(Math.max(0, stockIn - stockOut));
    }, [stockIn, stockOut]);

    useEffect(() => {
    if (isEditing && inventoryData) {
        // Populate fields for editing
        console.log("Inventory Data for Prefill: ", inventoryData);
        // Correct mappings for nested data
        setProductName(inventoryData.product?.product_name || ""); // Access nested product name
        setSelectedProductID(inventoryData.product?.product_id || 0); // Access nested product ID
        setInventoryID(inventoryData.inventory_id || 0); // Direct field
        setBatchNumber(inventoryData.batch_number || ""); // Direct field
        setPurchaseOrderID(inventoryData.purchaseOrder?.purchase_order_id || ""); // Nested purchase order ID
        setStockIn(inventoryData.stock_in || 0); // Direct field
        setStockOut(inventoryData.stock_out || 0); // Direct field
        setStockAvailable(inventoryData.stock_available || 0); // Direct field
        /*setExpirationDate(
            inventoryData.expiration_date
                ? new Date(inventoryData.expiration_date).toISOString().split("T")[0]
                : "" // Format date to YYYY-MM-DD
        );*/
        // Adjust expiration date to local timezone and format for datetime-local input
        if (inventoryData.expiration_date) {
            const expirationDateObj = new Date(inventoryData.expiration_date);
            const offset = expirationDateObj.getTimezoneOffset() * 60000; // Convert offset to milliseconds
            const localDate = new Date(expirationDateObj.getTime() - offset); // Adjust to local time
            const formattedDate = localDate.toISOString().slice(0, 16); // Slice into "YYYY-MM-DDTHH:mm"
            setExpirationDate(formattedDate);
        } else {
            setExpirationDate(""); // No expiration date
        }


    } else {
        // Default values when not editing
        console.log("Resetting Form to Defaults.");
        setProductName("");
        setSelectedProductID(0);
        setInventoryID(0);
        setBatchNumber("");
        setPurchaseOrderID("");
        setStockIn(0);
        setStockOut(0);
        setStockAvailable(0);
        setExpirationDate("");
    }
}, [isEditing, inventoryData]);


    useEffect(() => {
    if (!isEditing) {
        fetchNextInventoryID(); // Fetch the next inventory ID only when creating
    }
}, [isEditing, fetchNextInventoryID]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#E0E7EC] p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-center text-2xl font-bold text-[#4B2354] mb-6">
                    {isEditing ? "Edit Inventory Form" : "Add Inventory Form"}

                </h2>
                <form ref={formRef} onSubmit={formSubmit}>
                    {/* Inventory ID and Product ID*/}
                    <div className="flex space-x-4 mb-6">
                        <div className="w-1/2">
                            <label className="block text-[#6B7280] mb-2" htmlFor="inventory-id">
                                Inventory ID
                            </label>
                            <input
                                className="w-full text-black-50 bg-[#E0E7EC] border-b-2 border-[#6B7280] focus:outline-none focus:border-[#3B82F6]"
                                type="number" min="0"
                                id="inventory-id"
                                name="inventory_id" // Added name attribute
                                placeholder="Inventory ID"
                                value={!isEditing ? nextInventoryID : inventoryID}
                                readOnly={true}
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-[#6B7280] mb-2" htmlFor="product-id">
                                Product ID
                            </label>
                            <input
                                className="w-full text-black-50 bg-[#E0E7EC] border-b-2 border-[#6B7280] focus:outline-none focus:border-[#3B82F6]"
                                type="number" min="0"
                                id="product-id"
                                name="product_id" // Added name attribute
                                value={selectedProductID}
                                readOnly={true}
                                placeholder="Product ID"
                            />
                        </div>
                    </div>

                    {/* Product Name */}
                    <div className="mb-6">
                        <label className="block text-[#6B7280] mb-2" htmlFor="productName">
                            Product Name
                        </label>
                        <div className="relative mb-6">
                            <input
                                //className="w-full bg-[#E0E7EC] border-b-2 border-[#6B7280] focus:outline-none focus:border-[#3B82F6]"
                                type="text"
                                id="productName"
                                value={productName}
                                onChange={handleProductSearch}
                                className="w-full bg-[#E0E7EC] border-b-2 border-[#6B7280] focus:outline-none focus:border-[#3B82F6]"


                                //onChange={handleProductInputChange}
                                // placeholder="Type to search..."
                                //className="w-full bg-[#E0E7EC] border border-gray-300 rounded p-2 focus:ring-purple-500 focus:border-purple-500"
                                placeholder="Select a product"
                                // onClick={() => fetchProductList()} // Reload products when focused

                            />
                            {productOptions.length > 0 && (
                                <ul className="absolute bg-white border rounded shadow mt-1 w-full max-h-40 overflow-y-auto z-10">
                                    {/*{productOptions.map((product,index) => (
                                        <li
                                            key={`${product.product_id}-${index}`}*/}

                                    {productOptions.map((product) => (
                                        <li
                                            key={product.product_id}

                                            className="p-2 cursor-pointer hover:bg-gray-100 text-black color-[#4B2354]"
                                            onClick={() => {

                                                //setProductName(product.product_name);
                                                // setProductOptions([]);
                                                handleProductSelect(product)

                                            }}
                                        >
                                            {product.product_name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
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
                                value={batchNumber}
        onChange={(e) => setBatchNumber(e.target.value)}

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
                                value={purchaseOrderID}
                                onChange={(e) => setPurchaseOrderID(e.target.value)}


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

                                value={stockIn || ""}
                                onChange={(e) =>
                                    setStockIn(Math.max(0, Number(e.target.value))) // Ensure non-negative stockIn
                                }


                            />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-[#6B7280] mb-2" htmlFor="stock-out">
                                Stock Out
                            </label>
                            <input
                                className="w-full bg-[#E0E7EC] border-b-2 border-[#6B7280] focus:outline-none focus:border-[#3B82F6]"
                                type="number" min="0" max={stockIn}
                                id="stock-out"
                                name="stock_out" // Added name attribute
                                placeholder="Stock Out"

                                value={stockOut || ""}
                                onChange={(e) =>
                                    setStockOut(Math.max(0, Number(e.target.value))) // Ensure non-negative stockOut
                                }


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
                                    value={expirationDate} // Pre-filled with ISO format ("YYYY-MM-DD")
        onChange={(e) => setExpirationDate(e.target.value)}

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
                                className="w-full bg-[#E0E7EC] text-black-50 border-b-2 border-[#6B7280] focus:outline-none focus:border-[#3B82F6]"
                                type="number" min="0"
                                id="stock_available"
                                name="stock_available" // Added name attribute
                                placeholder="Stock Available"
                                value={stockAvailable || ""}
                                 onChange={(e) => setStockAvailable(Number(e.target.value))}

                                readOnly={true}
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between actions">
                        <button
                            type="button"
                            onClick={handleCancel}
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