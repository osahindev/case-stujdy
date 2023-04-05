import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios';
import ProductInitialState, { ErrorResponse } from "../interfaces/ProductInitialState";
import Product from "../interfaces/Product";
import { setLoadingModalIsOpen, setMessage, setSuccessModalIsOpen, setTitle } from "../../modal/modalSlice";
import { handleUnauthorized } from "../../../helpers";
import { setEditModalIsOpen, setErrors } from "../productSlice";

export const updateProductData = createAsyncThunk("product/updateProductDataAsync", async (product: Product, { rejectWithValue, dispatch }) => {
    try {
        dispatch(setLoadingModalIsOpen(true));

        const { data } = await axios.patch("product/update", {
            ...product,
        });

        if (data.result === "OK") {
            dispatch(setLoadingModalIsOpen(false));
            dispatch(setEditModalIsOpen(false));
            dispatch(setTitle("Başarılı !"));
            dispatch(setMessage("Ürün güncelleme işlemi başarıyla tamamlandı."));
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

export const updateProductDataExtraReducer = (builder: ActionReducerMapBuilder<ProductInitialState>) => {
    builder.addCase(updateProductData.fulfilled, (state, action) => {
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

            if (data.parent_id != null) {
                state.subProducts.items = state.subProducts.items.map((prod) => {
                    if (prod.id == data.id) {
                        return {
                            ...product,
                        };
                    }

                    return prod;
                });
            } else {
                state.products.items = state.products.items.map((prod) => {
                    if (prod.id == data.id) {
                        return {
                            ...product,
                        };
                    }

                    return prod;
                });
            }
        }
    });
};