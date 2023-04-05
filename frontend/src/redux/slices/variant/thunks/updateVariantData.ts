import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios';
import VariantInitialState from "../interfaces/VariantInitialState";
import { VariantData } from "../interfaces/VariantData";
import { setLoadingModalIsOpen, setMessage, setSuccessModalIsOpen, setTitle } from "../../modal/modalSlice";
import { handleUnauthorized } from "../../../helpers";
import { ErrorResponse } from "../../product/interfaces/ProductInitialState";
import { setErrors } from "../variantSlice";

export const updateVariantData = createAsyncThunk("variants/updateVariantDataAsync", async ({ id, value }: VariantData, { rejectWithValue, dispatch }) => {
    try {
        dispatch(setLoadingModalIsOpen(true));

        const { data } = await axios.patch("attribute/data/update", {
            "id": id,
            "value": value
        });

        if (data.result === "OK") {
            dispatch(setLoadingModalIsOpen(false));
            dispatch(setTitle("Başarılı !"));
            dispatch(setMessage("Varyasyon verisi güncelleme işlemi başarıyla tamamlandı."));
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

export const updateVariantDataExtraReducer = (builder: ActionReducerMapBuilder<VariantInitialState>) => {
    builder.addCase(updateVariantData.fulfilled, (state, action) => {
        if (action.payload.result === "OK" && state.selectedVariant !== null) {
            state.selectedVariant = { ...state.selectedVariant, data: state.selectedVariant.data?.map((data) => data.id !== parseInt(action.payload.data.id) ? data : action.payload.data) };
            state.editModalOpen = false;
        }
    });
};