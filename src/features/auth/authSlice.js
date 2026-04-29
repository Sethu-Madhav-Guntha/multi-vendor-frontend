import { createSlice } from "@reduxjs/toolkit";

import { clearToken, setToken } from "../../utils/tokenStorage";

export const authSlice = createSlice({
    name: "authenticationSlice",
    initialState: {
        user: null,
        token: null,
    },
    reducers: {
        setUserInfo: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            setToken(token);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            clearToken();
        },
    },
});

export const { setUserInfo, logout } = authSlice.actions;
export default authSlice.reducer;
