import { createSlice } from "@reduxjs/toolkit";
import { loginUser, signupUser } from "./auth"

const initialState = {
    userLogin: {
        userInfo: JSON.parse(localStorage.getItem("user")),
        loading: false,
        success: false,
        error: null,
    },
    userSignup: {
        loading: false,
        errorEmail: null,
        success: false,
        userInfo: {
            email: null,
            password: null
        }
    }
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.userLogin.userInfo = null;
            state.userLogin.success = false;
            state.userSignup.userInfo.email = null;
            state.userSignup.userInfo.password = null;
            localStorage.removeItem("user");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state, { payload }) => {
                state.userLogin.loading = true;
                state.userLogin.error = null;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.userLogin.userInfo = payload;
                state.userLogin.loading = false;
                state.userLogin.success = true;
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.userLogin.error = payload;
                state.userLogin.loading = false;
            })
            .addCase(signupUser.pending, (state, { payload }) => {
                state.userSignup.loading = true;
                state.userSignup.error = null;
            })
            .addCase(signupUser.fulfilled, (state, { payload }) => {
                state.userSignup.userInfo.email = payload.email;
                state.userSignup.userInfo.password = payload.password;
                state.userSignup.loading = false;
                state.userSignup.success = true;
            })
            .addCase(signupUser.rejected, (state, { payload }) => {
                state.userSignup.error = payload;
                state.userSignup.loading = false;
            })
    }
})

export const { logoutUser } = userSlice.actions

export default userSlice.reducer