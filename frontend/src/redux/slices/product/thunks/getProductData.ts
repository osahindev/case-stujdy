import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios';
import ProductInitialState from "../interfaces/ProductInitialState";
import Product from "../interfaces/Product";
import { Attribute } from "../interfaces/NewProduct";
import { setLoadingModalIsOpen } from "../../modal/modalSlice";
import { handleUnauthorized } from "../../../helpers";

export const getProductData = createAsyncThunk("product/getProductDataAsync", async (id: number, { rejectWithValue, dispatch }) => {
    try {
        dispatch(setLoadingModalIsOpen(true));

        const { data } = await axios.get("product/details", {
            params: {
                id: id,
            }
        });

        dispatch(setLoadingModalIsOpen(false));

        return data;
    } catch (err: any) {
        handleUnauthorized(err, dispatch);
        return rejectWithValue(err.message);
    }
});

export const getProductDataExtraReducer = (builder: ActionReducerMapBuilder<ProductInitialState>) => {
    builder.addCase(getProductData.fulfilled, (state, action) => {
            if (action.payload.result === "OK") {
                const data = action.payload.data;

                const attributes: Attribute[] = data.attribute_data.map((attr: { attribute_id: number, id: number }) => {
                    return {
                        attribute_data_id: attr.id,
                        attribute_id: attr.attribute_id
                    } as Attribute;
                });

                const product = {
                    id: data.id,
                    name: data.name,
                    attribute_names: data.attribute_names,
                    category_id: data.category_id,
                    category_name: data.category_name,
                    attributes: attributes,
                    price: data.price,
                    price_range: data.price_range,
                    sku: data.sku,
                    stock_amount: data.stock_amount
                } as Product;

                state.selectedVariants = [];

                state.selectedProduct = product;
            }
        });
};