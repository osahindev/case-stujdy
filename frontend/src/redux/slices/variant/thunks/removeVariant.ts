import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios';
import VariantInitialState from "../interfaces/VariantInitialState";
import { setLoadingModalIsOpen, setMessage, setSuccessModalIsOpen, setTitle } from "../../modal/modalSlice";
import { handleUnauthorized } from "../../../helpers";

export const removeVariant = createAsyncThunk("variants/removeVariantAsync", async (id: number, { rejectWithValue, dispatch }) => {
    try {
        dispatch(setLoadingModalIsOpen(true));

        const { data } = await axios.delete('attribute/delete', {
            data: { id: id }
        });

        if (data.result === "OK") {
            dispatch(setLoadingModalIsOpen(false));
            dispatch(setTitle("Başarılı !"));
            dispatch(setMessage("Varyasyon silme işlemi başarıyla tamamlandı."));
            dispatch(setSuccessModalIsOpen(true));
        }

        return data;
    } catch (err: any) {
        handleUnauthorized(err, dispatch);

        return rejectWithValue(err.message);
    }
});

export const removeVariantExtraReducer = (builder: ActionReducerMapBuilder<VariantInitialState>) => {
    builder.addCase(removeVariant.fulfilled, (state, action) => {
        if (action.payload.result === "OK") {
            state.variants = state.variants.filter((variant) => variant.id !== parseInt(action.payload.data));
            state.deleteModalOpen = false;
        }
    });
};