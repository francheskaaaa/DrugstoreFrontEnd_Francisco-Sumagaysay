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
}

export default APIHandler;