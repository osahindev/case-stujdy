import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import ImportInitial from "./interfaces/ImportInitial";
import { uploadFileExtraReducer } from "./thunks/uploadFile";
import File from "./interfaces/File";
import { ErrorResponse } from "../product/interfaces/ProductInitialState";

const initialState: ImportInitial = {
    uploading: false,
    loading: false,
    progress: 0,
    error: null,
    errors: {} as ErrorResponse,
    files: [] as File[],
};

export const importSlice = createSlice({
    name: "import",
    initialState,
    reducers: {
        setProgress: (state, action: PayloadAction<number>) => {
          state.progress = action.payload;
        },
        setErrors: (state, action: PayloadAction<ErrorResponse>) => {
            state.errors = action.payload;
        },
    },
    extraReducers: (builder) => {
        uploadFileExtraReducer(builder);
    }
});

export const { setProgress, setErrors } = importSlice.actions

export default importSlice.reducer