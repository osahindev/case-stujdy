import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/category/categorySlice';
import generalReducer from './slices/generalSlice';
import variantReducer from './slices/variant/variantSlice';
import productReducer from './slices/product/productSlice';
import importReducer from "./slices/import/importSlice"
import authReducer from "./slices/auth/authSlice"
import modalReducer from "./slices/modal/modalSlice"

const store = configureStore({
    reducer: {
        category: categoryReducer,
        general: generalReducer,
        variant: variantReducer,
        product: productReducer,
        importfile: importReducer,
        auth: authReducer,
        modal: modalReducer,
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch