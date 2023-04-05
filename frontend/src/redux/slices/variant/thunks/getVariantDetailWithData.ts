import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios';
import VariantInitialState from "../interfaces/VariantInitialState";
import { setLoadingModalIsOpen } from "../../modal/modalSlice";
import { handleUnauthorized } from "../../../helpers";

export const getVariantDetailWithData = createAsyncThunk("variants/getVariantDetailWithDataAsync", async (id: number, { rejectWithValue, dispatch }) => {
    try {
        dispatch(setLoadingModalIsOpen(true));

        const { data } = await axios.get("attribute/find_with_data", {
            params: {
                id: id
            }
        });

        dispatch(setLoadingModalIsOpen(false));

        return data;
    } catch (err: any) {
        handleUnauthorized(err, dispatch);
        return rejectWithValue(err.message);
    }
});

export const getVariantDetailsWithDataExtraReducer = (builder: ActionReducerMapBuilder<VariantInitialState>) => {
    builder.addCase(getVariantDetailWithData.fulfilled, (state, action) => {
        if (action.payload.result === "OK") {
            state.selectedVariant = { ...action.payload.data };
        }
    });
};