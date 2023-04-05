import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios';
import VariantInitialState from "../interfaces/VariantInitialState";
import { setLoadingModalIsOpen, setMessage, setSuccessModalIsOpen, setTitle } from "../../modal/modalSlice";
import { handleUnauthorized } from "../../../helpers";

export const removeVariantData = createAsyncThunk("variants/removeVariantDataAsync", async (id: number, { rejectWithValue, dispatch }) => {
    try {
        dispatch(setLoadingModalIsOpen(true));

        const { data } = await axios.delete('attribute/data/delete', {
            data: { id: id }
        });

        if (data.result === "OK") {
            dispatch(setLoadingModalIsOpen(false));
            dispatch(setTitle("Başarılı !"));
            dispatch(setMessage("Varyasyon verisi silme işlemi başarıyla tamamlandı."));
            dispatch(setSuccessModalIsOpen(true));
        }

        return data;
    } catch (err: any) {
        handleUnauthorized(err, dispatch);

        return rejectWithValue(err.message);
    }
});

export const removeVariantDataExtraReducer = (builder: ActionReducerMapBuilder<VariantInitialState>) => {
    builder.addCase(removeVariantData.fulfilled, (state, action) => {
        if (action.payload.result === "OK" && state.selectedVariant !== null) {
            state.selectedVariant = { ...state.selectedVariant, data: state.selectedVariant.data?.filter((data) => data.id !== parseInt(action.payload.data)) };
            state.deleteModalOpen = false;
        }
    });
};