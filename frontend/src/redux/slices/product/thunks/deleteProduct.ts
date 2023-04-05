import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios';
import ProductInitialState from "../interfaces/ProductInitialState";
import Product from "../interfaces/Product";
import { setLoadingModalIsOpen, setMessage, setSuccessModalIsOpen, setTitle } from "../../modal/modalSlice";
import { handleUnauthorized } from "../../../helpers";

export const deleteProduct = createAsyncThunk("product/deleteProductAsync", async (id: number, { rejectWithValue, dispatch }) => {
    try {
        dispatch(setLoadingModalIsOpen(true));

        const { data } = await axios.delete("product/delete", {
            data: {
                id: id,
            }
        });

        if(data.result === "OK") {
            dispatch(setLoadingModalIsOpen(false));
            dispatch(setTitle("Başarılı !"));
            dispatch(setMessage("Ürün silme işlemi başarıyla tamamlandı."));
            dispatch(setSuccessModalIsOpen(true));
        }
        
        return data;
    } catch (err: any) {
        handleUnauthorized(err, dispatch);

        return rejectWithValue(err.message);
    }
});

export const deleteProductExtraReducer = (builder: ActionReducerMapBuilder<ProductInitialState>) => {
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
        if (action.payload.result === "OK") {
            if (state.products.items && state.products.items.length > 0) {
                state.products.items = [...state.products.items.filter((product) => product.id !== action.payload.data)];
                state.products.total = state.products.total - 1;
            }
            if (state.subProducts.items && state.subProducts.items.length > 0) {
                state.subProducts.items = [...state.subProducts.items.filter((product) => product.id !== action.payload.data)];
                state.subProducts.total = state.subProducts.total - 1;
            }

            state.removeModalIsOpen = false;
            state.selectedRemoveProduct = {} as Product;
        }
    });
};