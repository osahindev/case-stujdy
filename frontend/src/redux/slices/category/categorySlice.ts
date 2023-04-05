import { ActionReducerMapBuilder, PayloadAction, createSlice } from "@reduxjs/toolkit";
import CategoryInitialState from "./interfaces/CategoryInitialState";
import { getCategoriesExtraReducer } from "./thunks/getCategories";
import { removeCategoryExtraReducer } from "./thunks/removeCategory";
import Category from "./interfaces/Category";
import { newCategoryExtraReducer } from "./thunks/newCategory";
import { updateCategoryExtraReducer } from "./thunks/updateCategory";
import { ErrorResponse } from "../product/interfaces/ProductInitialState";

const initialState: CategoryInitialState = {
    categories: [],
    selectedCategory: null,
    deleteModalOpen: false,
    newModalOpen: false,
    errors: {} as ErrorResponse,
    editModalOpen: false,
};

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setSelectedCategory: (state, action: PayloadAction<Category>) => {
            state.selectedCategory = action.payload;
        },
        setDeleteModalOpen: (state, action: PayloadAction<boolean>) => {
            state.deleteModalOpen = action.payload;
        },
        setNewModalOpen: (state, action: PayloadAction<boolean>) => {
            state.errors = {} as ErrorResponse;
            state.newModalOpen = action.payload;
        },
        setErrors: (state, action: PayloadAction<ErrorResponse>) => {
            state.errors = action.payload;
        },
        setEditModalOpen: (state, action: PayloadAction<boolean>) => {
            state.errors = {} as ErrorResponse;
            state.editModalOpen = action.payload;
        },
    },
    extraReducers: (builder: ActionReducerMapBuilder<CategoryInitialState>) => {
        getCategoriesExtraReducer(builder);
        removeCategoryExtraReducer(builder);
        newCategoryExtraReducer(builder);
        updateCategoryExtraReducer(builder);
    }
});

export const { setSelectedCategory, setDeleteModalOpen, setNewModalOpen, setEditModalOpen, setErrors } = categorySlice.actions;

export default categorySlice.reducer;