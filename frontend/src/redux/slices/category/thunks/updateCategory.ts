import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit"
import axios, { AxiosError } from 'axios';
import CategoryState from "../interfaces/CategoryInitialState";
import Category from "../interfaces/Category";
import { setLoadingModalIsOpen, setMessage, setSuccessModalIsOpen, setTitle } from "../../modal/modalSlice";
import { handleUnauthorized } from "../../../helpers";
import { ErrorResponse } from "../../product/interfaces/ProductInitialState";
import { setErrors } from "../categorySlice";

export const updateCategory = createAsyncThunk("categories/updateCategoryAsync", async (category: Category, { dispatch, rejectWithValue }) => {
    try {
        dispatch(setLoadingModalIsOpen(true));
        const { data } = await axios.patch("category/update", {
            "id": category.id,
            "name": category.name,
        });

        if (data.result == "OK") {
            dispatch(setLoadingModalIsOpen(false));
            dispatch(setTitle("Başarılı !"));
            dispatch(setMessage("Kategori güncelleme işlemi başarıyla tamamlandı."));
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

export const updateCategoryExtraReducer = (builder: ActionReducerMapBuilder<CategoryState>) => {
    builder.addCase(updateCategory.fulfilled, (state, action) => {
        if (action.payload.result === "OK") {
            state.categories = state.categories.map((category) => category.id === action.payload.data.id ? action.payload.data : category);
            state.editModalOpen = false;
        }
    });
};