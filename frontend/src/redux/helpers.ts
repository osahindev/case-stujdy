import type { Dispatch } from "@reduxjs/toolkit";
import { setLoadingModalIsOpen } from "./slices/modal/modalSlice";
import { logout } from "./slices/auth/authSlice";

export const handleUnauthorized = (err: any, dispatch: Dispatch) => {
    dispatch(setLoadingModalIsOpen(false));

    if (err.response.data.error === "Unauthorized") {
        dispatch(logout());
    }
};