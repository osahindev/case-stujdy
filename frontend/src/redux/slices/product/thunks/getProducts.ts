import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios';
import ProductInitialState from "../interfaces/ProductInitialState";
import Product from "../interfaces/Product";
import { setLoadingModalIsOpen } from "../../modal/modalSlice";
import { handleUnauthorized } from "../../../helpers";
import { FilterProduct } from "../interfaces/FilterProduct";

export const getProducts = createAsyncThunk("product/getProductsAsync", async (props: FilterProduct, { rejectWithValue, dispatch }) => {
    try {
        dispatch(setLoadingModalIsOpen(true));

        console.log(props);
        

        const { data } = await axios.get("product/", {
            params: props
        });

        dispatch(setLoadingModalIsOpen(false));

        return data;
    } catch (err: any) {
        handleUnauthorized(err, dispatch);
        
        return rejectWithValue(err.message);
    }
});

export const getProductsExtraReducer = (builder: ActionReducerMapBuilder<ProductInitialState>) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
        if (action.payload.result === "OK") {
            state.products.has_next = action.payload.data.has_next;
            state.products.has_prev = action.payload.data.has_prev;
            state.products.page = action.payload.data.page;
            state.products.page_list = [...action.payload.data.page_list];
            state.products.total = action.payload.data.total;
            state.products.per_page = action.payload.data.per_page;

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

            state.products.items = [...items] as Product[];
        }
    });
};