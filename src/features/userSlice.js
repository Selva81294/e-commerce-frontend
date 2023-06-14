import {createSlice} from '@reduxjs/toolkit'

// appAPI
import appAPI from '../sevices/appApi';


const initialState = null;

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        logout: () => initialState,
        addNotification: (state, action) => {
            state.notifications.unshift(action.payload)
        },
        resetNotification: (state) => {
            state.notifications.forEach((obj)=>{
                obj.status = 'read'
            })
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(appAPI.endpoints.signup.matchFulfilled, (_, {payload})=> payload);
        builder.addMatcher(appAPI.endpoints.login.matchFulfilled, (_, {payload})=> payload);
        builder.addMatcher(appAPI.endpoints.addToCart.matchFulfilled, (_, {payload})=> payload);
        builder.addMatcher(appAPI.endpoints.removeFromCart.matchFulfilled, (_, {payload})=> payload);
        builder.addMatcher(appAPI.endpoints.increaseCartProduct.matchFulfilled, (_, {payload})=> payload);
        builder.addMatcher(appAPI.endpoints.decreaseCartProduct.matchFulfilled, (_, {payload})=> payload);
        builder.addMatcher(appAPI.endpoints.createOrder.matchFulfilled, (_, {payload})=> payload);
    }
})

export const {logout, addNotification, resetNotification} = userSlice.actions
export default userSlice.reducer;