import AuthHandler from "./AuthHandler";
import axios from "axios"; // Removed unnecessary {Axios} import
import Config from "./Config";
import { reactLocalStorage } from "reactjs-localstorage";

class APIHandler {
    // Function to refresh the token if needed
    async checkLogin() {
        if (AuthHandler.checkTokenExpiration()) {
            try {
                const response = await axios.post(Config.refreshUrl, {
                    refresh: AuthHandler.getRefreshToken(),
                });
                console.log(response);

                // Save the new token in localStorage
                reactLocalStorage.set("token", response.data.access);
            } catch (error) {
                console.error("Error refreshing token:", error);
                throw error; // Optional: Handle token refresh errors
            }
        }
    }

    // Save inventory data to the server
    async saveInventoryData(
    product_id,
    batch_number,
    purchase_order_id,
    stock_in,
    stock_out,
    expiration_date,
    stock_available
) {
    // Wait for the checkLogin function to complete before proceeding
    await this.checkLogin();

    try {
        console.log("Request URL:", Config.inventoryUrl);
        console.log("Request Headers:", {
            Authorization: "Bearer " + AuthHandler.getLoginToken(),
        });
        console.log("Request Payload:", {
            product_id,
            batch_number,
            purchase_order_id,
            stock_in,
            stock_out,
            expiration_date,
            stock_available,
        });

        const response = await axios.post(
            Config.inventoryUrl,
            {
                product_id: parseInt(product_id, 10), // Convert to integer
                batch_number, // String
                purchase_order_id: parseInt(purchase_order_id, 10), // Convert to integer
                stock_in: parseInt(stock_in, 10), // Ensure integer
                stock_out: parseInt(stock_out, 10), // Ensure integer
                expiration_date, // Date in ISO format
                stock_available: parseInt(stock_available, 10), // Ensure integer
            },
            {
                headers: {
                    Authorization: "Bearer " + AuthHandler.getLoginToken(),
                },
            }
        );

        console.log("Response:", response.data);

        // Return the response
        return response;
    } catch (error) {
        console.error("Error saving inventory data:", error);

        if (error.response) {
            console.error("Response Data:", error.response.data); // Debug server's error message
        }

        throw error; // Optional: Handle inventory save errors
    }
}
    // Fetch inventory data from the backend server
async getInventoryData() {
    // Ensure token validity before API call
    await this.checkLogin();

    try {
        const response = await axios.get(Config.inventoryUrl, {
            headers: {
                Authorization: "Bearer " + AuthHandler.getLoginToken(),
            },
        });
        console.log("Fetched inventory data:", response.data);
        return response.data; // Return the inventory data
    } catch (error) {
        console.error("Error fetching inventory data:", error);

        if (error.response) {
            console.error("Response Data:", error.response.data); // Log specific API error
        }

        throw error; // Throw error to be handled by the caller
    }
}

// APIHandler.js
    // Update Inventory Data
async updateInventoryData(inventoryData) {
    // Ensure token validity before updating
    await this.checkLogin();

    try {
        // Debugging: Check the values being sent
        console.log("Updating Inventory:", inventoryData);

        const response = await axios.put(
            `${Config.inventoryUrl}${inventoryData.inventory_id}/`, // Update URL with inventory ID
            inventoryData, // Send all inventory data as payload
            {
                headers: {
                    Authorization: `Bearer ${AuthHandler.getLoginToken()}`, // Token for authorization
                },
            }
        );

        console.log("Inventory updated successfully:", response.data);
        return response;
    } catch (error) {
        console.error("Error updating inventory:", error);

        if (error.response) {
            console.error("API Error Response:", error.response.data);
        }

        throw error; // Throw error for the caller to handle
    }
}

async deleteInventory(id) {
    // Ensure token validity before calling the API
    await this.checkLogin();

    try {
           const response = await axios.delete(`${Config.inventoryUrl}${id}/`, {
       headers: {
           Authorization: `Bearer ${AuthHandler.getLoginToken()}`,
       },
   });
        console.log(`Inventory with ID ${id} deleted.`, response.data);
        return response.data;
    } catch (error) {
        console.error("Error deleting inventory:", error);
        throw error; // Optional: Rethrow error for further handling
    }
}
    // Ensure the APIHandler has this function implemented as expected:
async getProductList() {
    await this.checkLogin(); // Ensure the token is valid
    try {
        const response = await axios.get(Config.productUrl, {
            headers: {
                Authorization: "Bearer " + AuthHandler.getLoginToken(),
            },
        });
        console.log("Product List Response:", response.data); // Log the API response data
        return response.data; // Return backend response
    } catch (error) {
        console.error("Error fetching product list:", error);
        throw error;
    }
}

async searchProductsByName(name) {
        await this.checkLogin(); // Ensure the token is valid before making the request

        try {
            const response = await axios.get(Config.productUrl, {
                params: { name }, // Pass `name` as a query parameter
                headers: {
                    Authorization: "Bearer " + AuthHandler.getLoginToken(), // Use token for secure requests
                },
            });
            console.log("Product search results:", response.data);
            return response.data; // Return the API response
        } catch (error) {
            console.error("Error searching products by name:", error);
            throw error; // Pass the error to the caller for further handling
        }
    }


}

export default APIHandler;