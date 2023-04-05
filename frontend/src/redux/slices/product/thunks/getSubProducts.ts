import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios';
import ProductInitialState from "../interfaces/ProductInitialState";
import Product from "../interfaces/Product";
import SubProductRequest from "../interfaces/SubProductRequest";
import { setLoadingModalIsOpen } from "../../modal/modalSlice";
import { handleUnauthorized } from "../../../helpers";
import { FilterProduct } from "../interfaces/FilterProduct";

export const getSubProducts = createAsyncThunk("product/getSubProductsAsync", async (props: FilterProduct, { rejectWithValue, dispatch }) => {
    try {
        dispatch(setLoadingModalIsOpen(true));

        const { data } = await axios.get("product/subProducts", {
            params: props
        });

        dispatch(setLoadingModalIsOpen(false));

        return data;
    } catch (err: any) {
        handleUnauthorized(err, dispatch);
        return rejectWithValue(err.message);
    }
});

export const getSubProductsExtraReducer = (builder: ActionReducerMapBuilder<ProductInitialState>) => {
    builder.addCase(getSubProducts.fulfilled, (state, action) => {
        if (action.payload.result === "OK") {
            state.subProducts.has_next = action.payload.data.has_next;
            state.subProducts.has_prev = action.payload.data.has_prev;
            state.subProducts.page = action.payload.data.page;
            state.subProducts.page_list = [...action.payload.data.page_list];
            state.subProducts.total = action.payload.data.total;
            state.subProducts.per_page = action.payload.data.per_page;

            let items = [] as Product[];

            action.payload.data.items.map((e: Product) => {
                const item = {
                    attribute_names: e.attribute_names,
                    category_name: e.category_name,
                    name: e.name,
                    price: e.price,
                    price_range: e.price_range,
                    sku: e.sku,
                    stock_amount: e.stock_amount,
                    id: e.id,
                } as Product;

                items.push(item);
            });

            state.subProducts.items = [...items] as Product[];
        }
    });
};