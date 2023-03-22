import { configureStore } from "@reduxjs/toolkit";
import clientsReducer from "../features/clients/clientsSlice";
import loginReducer from "../features/user/userSlice"

export default configureStore({
    reducer: {
        user: loginReducer,
        clients: clientsReducer,
    }
})