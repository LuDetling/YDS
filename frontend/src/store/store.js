import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './user/userSlice'

export const userStore = configureStore({
    reducer: {
        login: loginReducer
    },
})

export default userStore
