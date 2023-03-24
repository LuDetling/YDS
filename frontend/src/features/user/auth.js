import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Login
export const loginUser = createAsyncThunk("user/login", async (user, { rejectWithValue }) => {
    try {
        const response = await axios.post("http://localhost:5000/auth/login", JSON.stringify(user), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = JSON.stringify(response.data);
        localStorage.setItem("user", data);
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data.error)
    }
})

//Signup

export const signupUser = createAsyncThunk("user/signup", async (user, { rejectWithValue }) => {
    try {
        await axios.post("http://localhost:5000/auth/signup", JSON.stringify(user), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        // envoyer dans le localstorage les données de sa connection peut etre pendant 24h faut voir avec le back si je peux pas laisser tout le temps le token
        return user
    } catch (error) {
        console.log(error.response.data.error.meta);
        return rejectWithValue(error.response.data.error)

    }
})

// MODIF PROFIL