import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: null,
    connected: false,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginSucces: (state, action) => {
            state.user = action.payload;
            state.connected = true;
        },
    }
})

export const postLoginAsync = (data) => async (dispatch) => {
    const user = data
    try {
        const response = await axios.post("http://localhost:5000/auth/login", JSON.stringify(user), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        dispatch(loginSucces(response.data));
        const data = JSON.stringify(response.data);
        localStorage.setItem("user", data);
        return response.data
        // envoyer dans le localstorage les données de sa connection peut etre pendant 24h faut voir avec le back si je peux pas laisser tout le temps le token
    } catch (error) {

        return error.response.data
    }
}

export const { loginSucces } = userSlice.actions

export default userSlice.reducer