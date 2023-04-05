import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios';
import CategoryState from "../interfaces/CategoryInitialState";
import { setLoadingModalIsOpen, setMessage, setSuccessModalIsOpen, setTitle } from "../../modal/modalSlice";
import { handleUnauthorized } from "../../../helpers";

export const removeCategory = createAsyncThunk("categories/removeCategoryAsync", async (id: number, { dispatch, rejectWithValue }) => {
    try {
        dispatch(setLoadingModalIsOpen(true));

        const { data } = await axios.delete("category/delete", {
            data: {
                id: id
            }
        });

        if (data.result == "OK") {
            dispatch(setLoadingModalIsOpen(false));
            dispatch(setTitle("Başarılı !"));
            dispatch(setMessage("Kategori silme işlemi başarıyla tamamlandı."));
            dispatch(setSuccessModalIsOpen(true));
        }

        return data;
    } catch (err: any) {
        handleUnauthorized(err, dispatch);
        
        return rejectWithValue(err.message);
    }
});

export const removeCategoryExtraReducer = (builder: ActionReducerMapBuilder<CategoryState>) => {
    builder.addCase(removeCategory.fulfilled, (state, action) => {
            if (action.payload.result === "OK") {
                state.categories = state.categories.filter((category) => category.id !== parseInt(action.payload.data));
                state.selectedCategory = null;
                state.deleteModalOpen = false;
            }
        });
};