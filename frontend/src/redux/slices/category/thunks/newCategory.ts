import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios';
import CategoryState from "../interfaces/CategoryInitialState";
import { setLoadingModalIsOpen, setMessage, setSuccessModalIsOpen, setTitle } from "../../modal/modalSlice";
import { handleUnauthorized } from "../../../helpers";
import { ErrorResponse } from "../../product/interfaces/ProductInitialState";
import { setErrors } from "../categorySlice";

export const newCategory = createAsyncThunk("categories/newCategoryAsync", async (name: string, { dispatch, rejectWithValue }) => {
    try {
        dispatch(setLoadingModalIsOpen(true));

        const { data } = await axios.post("category/create", {
            "name": name
        });

        if(data.result == "OK") {
            dispatch(setLoadingModalIsOpen(false));
            dispatch(setTitle("Başarılı !"));
            dispatch(setMessage("Kategori ekleme işlemi başarıyla tamamlandı."));
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

export const newCategoryExtraReducer = (builder: ActionReducerMapBuilder<CategoryState>) => {
    builder.addCase(newCategory.fulfilled, (state, action) => {
            if (action.payload.result === "OK") {
                state.categories = [...state.categories, action.payload.data];
                state.newModalOpen = false;
            }
        });
};