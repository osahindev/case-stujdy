import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import VariantInitialState from "../interfaces/VariantInitialState";
import Variant from "../interfaces/Variant";
import { VariantData } from "../interfaces/VariantData";
import { setLoadingModalIsOpen } from "../../modal/modalSlice";
import { handleUnauthorized } from "../../../helpers";

export const getVariantsWithData = createAsyncThunk(
    "variants/getVariantsWithDataAsync",
    async (_, { rejectWithValue, dispatch }) => {
        try {
            dispatch(setLoadingModalIsOpen(true));

            const { data } = await axios.get("attribute/with_data");

            dispatch(setLoadingModalIsOpen(false));

            return data;
        } catch (err: any) {
            handleUnauthorized(err, dispatch);
            return rejectWithValue(err.message);
        }
    }
);

export const getVariantsWithDataExtraReducer = (
    builder: ActionReducerMapBuilder<VariantInitialState>
) => {
    builder.addCase(getVariantsWithData.fulfilled, (state, action) => {
        if (action.payload.result === "OK") {
            state.variants = [];
            action.payload.data.map((element: any) => {
                const variant: Variant = {
                    id: element.id,
                    name: element.name,
                    data: [] as VariantData[]
                }



                element.data.map((elemantData: any) => {
                    const variantData: VariantData = {
                        id: elemantData.id,
                        value: elemantData.value
                    };

                    if (variant.data != undefined)
                        variant.data = [...variant.data, variantData]
                })

                state.variants = [...state.variants, variant]
            });
        }
    });
};
