import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { showClients } from "./client"

const initialState = {
    clients: null
}

const clientSlice = createSlice({
    name: "client",
    initialState,
    reducers: {
        getClients: (state, action) => {
            console.log("tet");
            state.clients = action.payload
        }
    }
    // extraReducers: (builder) => {
    //     builder.addCase(showClients.fulfilled, (state, action) => {
    //         state.clients = action.payload
    //     })
    // }
})

export const showClients = (data) => async (dispatch) => {
    try {
        const response = await axios.get("http://localhost:5000/clients")
        dispatch(getClients(response.data));
        return response.data
    } catch (error) {
        return (error.response.data.error)
    }
};
export const { getClients } = clientSlice.actions;
export default clientSlice.reducer