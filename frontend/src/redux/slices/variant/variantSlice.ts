import { ActionReducerMapBuilder, PayloadAction, createSlice } from "@reduxjs/toolkit";
import VariantInitialState from "./interfaces/VariantInitialState";
import { getVariantsExtraReducer } from "./thunks/getVariants";
import Variant from "./interfaces/Variant";
import { removeVariantExtraReducer } from "./thunks/removeVariant";
import { newVariantExtraReducer } from "./thunks/newVariant";
import { getVariantDetailsWithDataExtraReducer } from "./thunks/getVariantDetailWithData";
import { updateVariantExtraReducer } from "./thunks/updateVariant";
import { VariantData } from "./interfaces/VariantData";
import { removeVariantDataExtraReducer } from "./thunks/removeVariantData";
import { newVariantDataExtraReducer } from "./thunks/newVariantData";
import { updateVariantDataExtraReducer } from "./thunks/updateVariantData";
import { getVariantsWithDataExtraReducer } from "./thunks/getVariantsWithData";
import { ErrorResponse } from "../product/interfaces/ProductInitialState";

const initialState: VariantInitialState = {
    variants: [],
    deleteModalOpen: false,
    newModalOpen: false,
    editModalOpen: false,
    errors: {} as ErrorResponse,
    selectedVariant: null,
    selectedVariantData: null,
};

export const variantSlice = createSlice({
    name: "variant",
    initialState,
    reducers: {
        setSelectedVariant: (state, action: PayloadAction<Variant>) => {
            state.selectedVariant = action.payload;
        },
        setSelectedVariantData: (state, action: PayloadAction<VariantData>) => {
            state.selectedVariantData = action.payload;
        },
        setDeleteModalOpen: (state, action: PayloadAction<boolean>) => {
            state.errors = {} as ErrorResponse;
            state.deleteModalOpen = action.payload;
        },
        setErrors: (state, action: PayloadAction<ErrorResponse>) => {
            state.errors = action.payload;
        },
        setEditModalOpen: (state, action: PayloadAction<boolean>) => {
            state.errors = {} as ErrorResponse;
            state.editModalOpen = action.payload;
        },
        setNewModalOpen: (state, action: PayloadAction<boolean>) => {
            state.errors = {} as ErrorResponse;
            state.newModalOpen = action.payload;
        },
    },
    extraReducers: (builder: ActionReducerMapBuilder<VariantInitialState>) => {
        getVariantsExtraReducer(builder);
        removeVariantExtraReducer(builder);
        newVariantExtraReducer(builder);
        getVariantDetailsWithDataExtraReducer(builder);
        updateVariantExtraReducer(builder);
        removeVariantDataExtraReducer(builder);
        newVariantDataExtraReducer(builder);
        updateVariantDataExtraReducer(builder); 
        getVariantsWithDataExtraReducer(builder);
    }
});

export const { setSelectedVariant, setDeleteModalOpen, setNewModalOpen, setSelectedVariantData, setEditModalOpen, setErrors } = variantSlice.actions;

export default variantSlice.reducer;