import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Login
export const showClients = createAsyncThunk("clients/show", async ({ rejectWithValue }) => {
    console.log("showClients");
    try {
        const response = await axios.get("http://localhost:5000/clients")
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data.error)
    }
})
