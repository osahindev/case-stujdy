import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios';
import VariantInitialState from "../interfaces/VariantInitialState";
import { setLoadingModalIsOpen, setMessage, setSuccessModalIsOpen, setTitle } from "../../modal/modalSlice";
import { handleUnauthorized } from "../../../helpers";
import { setErrors } from "../variantSlice";
import { ErrorResponse } from "../../product/interfaces/ProductInitialState";

interface NewVariantData {
    attribute_id: number,
    value: string,
}

export const newVariantData = createAsyncThunk("variants/newVariantDataAsync", async (variantData: NewVariantData, { rejectWithValue, dispatch }) => {
    try {
        dispatch(setLoadingModalIsOpen(true));

        const { data } = await axios.post('attribute/data/create', {
            "attribute_id": variantData.attribute_id,
            "value": variantData.value
        });

        if (data.result === "OK") {
            dispatch(setLoadingModalIsOpen(false));
            dispatch(setTitle("Başarılı !"));
            dispatch(setMessage("Varyasyon verisi ekleme işlemi başarıyla tamamlandı."));
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

export const newVariantDataExtraReducer = (builder: ActionReducerMapBuilder<VariantInitialState>) => {
    builder.addCase(newVariantData.fulfilled, (state, action) => {
        if (action.payload.result === "OK" && state.selectedVariant !== null) {
            state.selectedVariant.data?.push(action.payload.data);
            state.newModalOpen = false;
        }
    });
};