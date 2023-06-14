import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./features/userSlice"
import productSlice from "./features/productSlice"
import appAPI from "./sevices/appApi"

//persist our store
import storage from 'redux-persist/lib/storage'
import { combineReducers } from "redux"
import { persistReducer} from "redux-persist"
import thunk from "redux-thunk"

//reducers
const reducer = combineReducers({
    user: userSlice,
    products: productSlice,
    [appAPI.reducerPath] : appAPI.reducer
})

const persistConfig = {
    key: "root",
    storage,
    blackList: [appAPI.reducerPath, "products"]
};

//persists our store:
const persistedReducer = persistReducer(persistConfig, reducer)

//creating the store:

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk, appAPI.middleware]
})

export default store;
