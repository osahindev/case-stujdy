import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface GlobalModalInitialState {
    successModalIsOpen: boolean,
    loadingModalIsOpen: boolean,
    title: string | undefined,
    message: string | undefined,
}

const initialState: GlobalModalInitialState = {
    successModalIsOpen: false,
    loadingModalIsOpen: false,
    title: undefined,
    message: undefined,
};

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setSuccessModalIsOpen: (state, action: PayloadAction<boolean>) => {
            state.successModalIsOpen = action.payload;
            
            if (!action.payload) {
                state.title = undefined;
                state.message = undefined;
            }
        },
        setLoadingModalIsOpen: (state, action: PayloadAction<boolean>) => {
            state.loadingModalIsOpen = action.payload;
        },
        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
        setMessage: (state, action: PayloadAction<string>) => {
            state.message = action.payload;
        }
    }
});

export const { setSuccessModalIsOpen, setLoadingModalIsOpen, setTitle, setMessage } = modalSlice.actions;


export default modalSlice.reducer;