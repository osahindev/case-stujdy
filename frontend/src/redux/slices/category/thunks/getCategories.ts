import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios';
import CategoryState from "../interfaces/CategoryInitialState";
import { setLoadingModalIsOpen } from "../../modal/modalSlice";
import { handleUnauthorized } from "../../../helpers";

export const getCategories = createAsyncThunk("categories/getCategoriesAsync", async (_, { dispatch, rejectWithValue }) => {
    try {
        dispatch(setLoadingModalIsOpen(true));

        const { data } = await axios.get("category/");

        dispatch(setLoadingModalIsOpen(false));

        return data;
    } catch (err: any) {
        handleUnauthorized(err, dispatch);

        return rejectWithValue(err.message);
    }
});

export const getCategoriesExtraReducer = (builder: ActionReducerMapBuilder<CategoryState>) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
        if (action.payload.result === "OK") {
            state.categories = [...action.payload.data];
        }
    });
};