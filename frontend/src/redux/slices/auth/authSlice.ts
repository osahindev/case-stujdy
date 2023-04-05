import { ActionReducerMapBuilder, PayloadAction, createSlice } from "@reduxjs/toolkit";
import AuthInitialState from "./interfaces/AuthInitialState";
import { loginExtraReducer } from "./thunks/login";
import axios from "axios";
import { ErrorResponse } from "../product/interfaces/ProductInitialState";

const initialState: AuthInitialState = {
    token: undefined,
    loading: false,
    errors: {} as ErrorResponse,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.token = undefined;
            axios.defaults.headers.common.Authorization = undefined;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setErrors: (state, action: PayloadAction<ErrorResponse>) => {
            state.errors = action.payload;
        },
    },
    extraReducers: (builder: ActionReducerMapBuilder<AuthInitialState>) => {
        loginExtraReducer(builder);
    }
});

export const { logout, setErrors, setLoading } = authSlice.actions;

export default authSlice.reducer;