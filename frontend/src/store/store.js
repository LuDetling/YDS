import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './user/userSlice'

export const store = configureStore({
    reducer: {
        user: loginReducer
    },
})

export default store
