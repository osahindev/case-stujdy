import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios';
import VariantInitialState from "../interfaces/VariantInitialState";
import { setLoadingModalIsOpen, setMessage, setSuccessModalIsOpen, setTitle } from "../../modal/modalSlice";
import { handleUnauthorized } from "../../../helpers";
import { setErrors } from "../variantSlice";
import { ErrorResponse } from "../../product/interfaces/ProductInitialState";

export const newVariant = createAsyncThunk("variants/newVariantAsync", async (name: string, { rejectWithValue, dispatch }) => {
    try {
        dispatch(setLoadingModalIsOpen(true));

        const { data } = await axios.post("attribute/create", {
            "name": name
        });

        if (data.result === "OK") {
            dispatch(setLoadingModalIsOpen(false));
            dispatch(setTitle("Başarılı !"));
            dispatch(setMessage("Varyasyon ekleme işlemi başarıyla tamamlandı."));
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

export const newVariantExtraReducer = (builder: ActionReducerMapBuilder<VariantInitialState>) => {
    builder.addCase(newVariant.fulfilled, (state, action) => {
        if (action.payload.result === "OK") {
            state.variants = [...state.variants, action.payload.data];
            state.newModalOpen = false;
        }
    });
};