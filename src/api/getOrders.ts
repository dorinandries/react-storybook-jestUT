import axios from 'axios';
import {mockOrders} from "../mock/mockOrders";
import { log } from 'console';

// Function to GET /orders
export const getOrders = async () => {
    try {

        // alert("Using mock data from getOrders.ts");
        // console.log("Using mock data from getOrders.ts");
        
        // // Uncomment below to use real API
        // const response = await axios.get('/orders');
        // return response.data;

        // Return mock data for now
        return mockOrders;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};