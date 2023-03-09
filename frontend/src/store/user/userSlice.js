import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    userInfo: null,
    loading: false,
    success: false,
    error: null,
}

// se connecter, peut etre mettre dans un autre fichier
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
        // envoyer dans le localstorage les données de sa connection peut etre pendant 24h faut voir avec le back si je peux pas laisser tout le temps le token
    } catch (error) {
        return rejectWithValue(error.response.data.error)
    }
})



const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.userInfo = null;
            state.loading = false;
            state.success = false;
            state.error = null;
            localStorage.removeItem("user");
        }
    },
    extraReducers: {
        [loginUser.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [loginUser.fulfilled]: (state, { payload }) => {
            state.user = payload;
            state.loading = false;
            state.success = true;
        },
        [loginUser.rejected]: (state, { payload }) => {
            console.log('error');
            state.error = payload;
            state.loading = false;

            console.log(state.error);
        }
    }
})

export const { logoutUser } = userSlice.actions

export default userSlice.reducer