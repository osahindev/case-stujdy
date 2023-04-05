import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios';
import VariantInitialState from "../interfaces/VariantInitialState";
import { setLoadingModalIsOpen } from "../../modal/modalSlice";
import { handleUnauthorized } from "../../../helpers";

export const getVariants = createAsyncThunk("variants/getVariantsAsync", async (_, { rejectWithValue, dispatch }) => {
    try {
        dispatch(setLoadingModalIsOpen(true));

        const { data } = await axios.get("attribute/");

        dispatch(setLoadingModalIsOpen(false));

        return data;
    } catch (err: any) {
        handleUnauthorized(err, dispatch);
        return rejectWithValue(err.message);
    }
});

export const getVariantsExtraReducer = (builder: ActionReducerMapBuilder<VariantInitialState>) => {
    builder.addCase(getVariants.fulfilled, (state, action) => {
        if (action.payload.result === "OK") {
            state.variants = [...action.payload.data];
        }
    });
};