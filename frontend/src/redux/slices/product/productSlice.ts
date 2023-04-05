import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import ProductInitialState, { ErrorResponse } from "./interfaces/ProductInitialState";
import { getProductsExtraReducer } from "./thunks/getProducts";
import ProductPaginate from "./interfaces/ProductPaginate";
import Variant from "../variant/interfaces/Variant";
import { addNewProductExtraReducer } from "./thunks/addNewProduct";
import { getProductDataExtraReducer } from "./thunks/getProductData";
import Product from "./interfaces/Product";
import { updateProductDataExtraReducer } from "./thunks/updateProduct";
import { getSubProductsExtraReducer } from "./thunks/getSubProducts";
import { deleteProductExtraReducer } from "./thunks/deleteProduct";

const initialState: ProductInitialState = {
    products: {
        has_next: false,
        has_prev: false,
        items: [] as Product[],
        page: 1,
        page_list: [] as number[],
        per_page: 0,
        total: 0,
    } as ProductPaginate,
    subProducts: {
        has_next: false,
        has_prev: false,
        items: [] as Product[],
        page: 1,
        page_list: [] as number[],
        per_page: 0,
        total: 0,
    } as ProductPaginate,
    error: null,
    errors: {} as ErrorResponse,
    newModalIsOpen: false,
    newSubModalIsOpen: false,
    editModalIsOpen: false,
    removeModalIsOpen: false,
    selectedVariants: [] as Variant[],
    selectedProduct: {} as Product,
    selectedSubProduct: null,
    selectedRemoveProduct: {} as Product,
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
        setSelectedVariants: (state, action: PayloadAction<Variant[]>) => {
            state.selectedVariants = [...action.payload];
        },
        addVariant: (state, action: PayloadAction<Variant>) => {
            state.selectedVariants = [...state.selectedVariants, action.payload];
        },
        setRemoveModalIsOpen: (state, action: PayloadAction<boolean>) => {
            state.removeModalIsOpen = action.payload;
        },
        setEditModalIsOpen: (state, action: PayloadAction<boolean>) => {
            if(!action.payload) {
                state.selectedVariants = [] as Variant[];
            }
            state.errors = {} as ErrorResponse;
            state.editModalIsOpen = action.payload;
        },
        removeVariant: (state, action: PayloadAction<Variant>) => {
            state.selectedVariants = state.selectedVariants.filter((variant) => {
                return variant.id !== action.payload.id;
            });
        },
        setErrors: (state, action: PayloadAction<ErrorResponse>) => {
            state.errors = action.payload;
        },
        setSelectedRemoveProduct: (state, action: PayloadAction<Product>) => {
            state.selectedRemoveProduct = action.payload;
        },
        setNewModalIsOpen: (state, action: PayloadAction<boolean>) => {
            if(!action.payload) {
                state.selectedVariants = [] as Variant[];
            }
            state.errors = {} as ErrorResponse;
            state.newModalIsOpen = action.payload;
        },
        setNewSubModalIsOpen: (state, action: PayloadAction<boolean>) => {
            if(!action.payload) {
                state.selectedVariants = [] as Variant[];
            }
            state.newSubModalIsOpen = action.payload;
        },
    },
    extraReducers(builder) {
        getProductsExtraReducer(builder);
        getProductDataExtraReducer(builder);
        addNewProductExtraReducer(builder);
        updateProductDataExtraReducer(builder);
        getSubProductsExtraReducer(builder);
        deleteProductExtraReducer(builder);
    },
});

export const { setErrors, addVariant, removeVariant, setNewModalIsOpen, setEditModalIsOpen, setSelectedProduct, setSelectedVariants, setNewSubModalIsOpen, setRemoveModalIsOpen, setSelectedRemoveProduct } = productSlice.actions;

export default productSlice.reducer;