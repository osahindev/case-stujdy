import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios';
import VariantInitialState from "../interfaces/VariantInitialState";
import Variant from "../interfaces/Variant";
import { setLoadingModalIsOpen, setMessage, setSuccessModalIsOpen, setTitle } from "../../modal/modalSlice";
import { handleUnauthorized } from "../../../helpers";
import { setErrors } from "../variantSlice";
import { ErrorResponse } from "../../product/interfaces/ProductInitialState";

export const updateVariant = createAsyncThunk("variants/updateVariantAsync", async ({ id, name }: Variant, { rejectWithValue, dispatch }) => {
    try {
        dispatch(setLoadingModalIsOpen(true));
        dispatch(setErrors({} as ErrorResponse));

        const { data } = await axios.patch("attribute/update", {
            "id": id,
            "name": name
        });

        if (data.result === "OK") {
            dispatch(setLoadingModalIsOpen(false));
            dispatch(setTitle("Başarılı !"));
            dispatch(setMessage("Varyasyon güncelleme işlemi başarıyla tamamlandı."));
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

export const updateVariantExtraReducer = (builder: ActionReducerMapBuilder<VariantInitialState>) => {
    builder.addCase(updateVariant.fulfilled, (state, action) => {
        if (action.payload.result === "OK") {
            state.selectedVariant = { ...state.selectedVariant, ...action.payload.data };
            state.newModalOpen = false;
        }
    });
};