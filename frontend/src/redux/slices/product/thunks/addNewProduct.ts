import { ActionReducerMapBuilder, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import axios, { AxiosError, AxiosResponse } from 'axios';
import ProductInitialState, { ErrorResponse } from "../interfaces/ProductInitialState";
import { NewProduct } from "../interfaces/NewProduct";
import Product from "../interfaces/Product";
import { setLoadingModalIsOpen, setMessage, setSuccessModalIsOpen, setTitle } from "../../modal/modalSlice";
import { handleUnauthorized } from "../../../helpers";
import { setErrors, setSelectedVariants } from "../productSlice";
import Variant from "../../variant/interfaces/Variant";

export const addNewProduct = createAsyncThunk("product/addNewProductAsync", async (product: NewProduct, { rejectWithValue, dispatch }) => {
    try {
        dispatch(setLoadingModalIsOpen(true));

        const { data } = await axios.post("product/create", product);

        if (data.result === "OK") {
            dispatch(setLoadingModalIsOpen(false));
            dispatch(setTitle("Başarılı !"));
            dispatch(setMessage("Ürün ekleme işlemi başarıyla tamamlandı."));
            dispatch(setSuccessModalIsOpen(true));
        }
        return data;
    } catch (err: any) {
        handleUnauthorized(err, dispatch);

        if(err.response.status == 400) {
            dispatch(setErrors(err.response.data as ErrorResponse));
        }

        return rejectWithValue(err.message);
    }
});

export const addNewProductExtraReducer = (builder: ActionReducerMapBuilder<ProductInitialState>) => {
    builder.addCase(addNewProduct.fulfilled, (state, action) => {
            if (action.payload.result === "OK") {
                const data = action.payload.data;

                const product = {
                    id: data.id,
                    name: data.name,
                    parent_id: data.parent_id,
                    price: data.price,
                    price_range: data.price_range,
                    sku: data.sku,
                    attribute_names: data.attribute_names,
                    stock_amount: data.stock_amount,
                    category_id: data.category_id,
                    category_name: data.category_name,
                } as Product;

                if (data.parent_id !== undefined && data.parent_id !== null) {
                    state.subProducts.total = state.subProducts.total + 1;

                    if (state.subProducts.items && state.subProducts.items.length >= state.subProducts.per_page) {
                        state.subProducts.items = [product, ...state.subProducts.items.filter((_, i) => i !== (state.subProducts.items.length - 1))];
                    } else {
                        state.subProducts.items = [product, ...state.subProducts.items];
                    }
                } else {
                    state.products.total = state.products.total + 1;

                    if (state.products.items && state.products.items.length >= state.products.per_page) {
                        state.products.items = [product, ...state.products.items.filter((_, i) => i !== (state.products.items.length - 1))];
                    } else {
                        state.products.items = [product, ...state.products.items];
                    }
                }

                state.newModalIsOpen = false;
            }
        });
};