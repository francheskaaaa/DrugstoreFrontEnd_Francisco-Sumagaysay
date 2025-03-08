// createInventory.js
import React, {useState, useEffect, useRef, useMemo, useCallback} from "react";
import APIHandler from "../utils/APIHandler";

const CreateInventory = ({isOpen, onClose, refreshInventory}) => {
    const formRef = useRef(null);
    const apiHandler = useMemo(() => new APIHandler(), []); // Memoize the handler instance

    const [productName, setProductName] = useState(""); // User's input in the product name field
    const [productOptions, setProductOptions] = useState([]); // Dropdown options
    const [selectedProductID, setSelectedProductID] = useState(null); // Selected product ID

    // Fetch product list based on user input
   const handleProductSearch = useCallback(
        async (event) => {
            const searchValue = event.target.value;
            setProductName(searchValue); // Update the state for the input field

            if (searchValue.length > 2) {
                // Trigger search only for input longer than 2 characters
                try {
                    const searchResults = await apiHandler.searchProductsByName(searchValue); // Call APIHandler
                    const options = (searchResults.data || []).map((item) => ({
                        product_id: item.product_id,
                        product_name: item.product_name,
                    })); // Map results to dropdown format
                    setProductOptions(options); // Update dropdown options
                } catch (error) {
                    console.error("Error fetching products:", error);
                }
            } else {
                setProductOptions([]); // Clear options if search text is too short
            }
        },
        [apiHandler]
    );
    // Handle dropdown selection
    const handleProductSelect = (product) => {
        setSelectedProductID(product.product_id); // Set the selected product ID
        setProductName(product.product_name); // Display the product name in the input
        setProductOptions([]); // Clear dropdown after selection
    };



    // Handle form submission
    const formSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        console.log("Form submitted!");

        if (!selectedProductID) {
            alert("Please select a product from the dropdown.");
            return;
        }

        // Collect input values using FormData
        const formData = new FormData(formRef.current);
        const values = Object.fromEntries(formData.entries()); // Converts to a plain object

        console.log("Extracted Form Data:", values);

        try {
            // Call the API to save inventory data
            await apiHandler.saveInventoryData(selectedProductID,
                values.product_id,
                values.batch_number,
                values.purchase_order_id,
                values.stock_in,
                values.stock_out,
                values.expiration_date,
                values.stock_available
            );

            // Inform the user of success
            alert("Inventory saved successfully!");

            if (refreshInventory) {
                await refreshInventory();
            }


            // Close the modal after successfully saving
            onClose();
        } catch (error) {
            console.error("Error while saving inventory data:", error);
        }
    };
    // Handle typing in the product name field



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