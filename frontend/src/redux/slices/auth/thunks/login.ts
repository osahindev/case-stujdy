import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios';
import AuthInitialState from "../interfaces/AuthInitialState";
import Login from "../interfaces/Login";
import { setErrors, setLoading } from "../authSlice";
import { ErrorResponse } from "../../product/interfaces/ProductInitialState";

export const login = createAsyncThunk("auth/loginAsync", async (user: Login, { dispatch, rejectWithValue }) => {
    try {
        dispatch(setErrors({} as ErrorResponse));
        dispatch(setLoading(true));

        const { data } = await axios.post("auth/login", user);

        dispatch(setLoading(false));

        return data;
    } catch (err: any) {
        dispatch(setLoading(false));

        if (err.response.status == 400) {
            dispatch(setErrors(err.response.data as ErrorResponse));
        }
        
        return rejectWithValue(err.message);
    }
});

export const loginExtraReducer = (builder: ActionReducerMapBuilder<AuthInitialState>) => {
    builder.addCase(login.fulfilled, (state, action) => {
        if (action.payload.result === "OK") {
            state.loading = false;
            state.token = action.payload.data.token;
            axios.defaults.headers.common.Authorization = "Barear " + action.payload.data.token;
        }
    });
};