import { createSlice, PayloadAction  } from "@reduxjs/toolkit";
import React from "react";

export interface GeneralState {
    dashboardText: string,
    dashboardOptions: React.ReactNode|null
}

const initialState: GeneralState = {
    dashboardText: "",
    dashboardOptions: null
}

export const generalSlice = createSlice({
    name: "general",
    initialState,
    reducers: {
        setDashboardText: (state, action: PayloadAction<string>) => {
            state.dashboardText = action.payload;
        },
        setDashboardOptions: (state, action: PayloadAction<React.ReactNode>) => {
            state.dashboardOptions = action.payload;
        }
    },
});

export const { setDashboardText, setDashboardOptions } = generalSlice.actions

export default generalSlice.reducer