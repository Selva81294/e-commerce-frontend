import {createSlice} from '@reduxjs/toolkit'


// appAPI
import appAPI from '../sevices/appApi';

const initialState = [];

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers:{
        updateProducts: (_, action) => {
            return action.payload;
        }
    },
    extraReducers:(builder) => {
        builder.addMatcher(appAPI.endpoints.createProduct.matchFulfilled, (_, {payload})=> payload);
        builder.addMatcher(appAPI.endpoints.updateProduct.matchFulfilled, (_, {payload})=> payload);
        builder.addMatcher(appAPI.endpoints.deleteProduct.matchFulfilled, (_, {payload})=> payload);
    }
})

export const {updateProducts} = productSlice.actions;

export default productSlice.reducer;