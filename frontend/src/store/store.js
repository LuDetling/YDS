import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './user/userSlice'
import clientReducer from "./client/clientSlice"

export const store = configureStore({
    reducer: {
        user: loginReducer,
        client: clientReducer
    },
})

export default store
