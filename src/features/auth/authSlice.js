import { createSlice } from "@reduxjs/toolkit";

const setTokenAtLocalStorage = (token) => {
    localStorage.setItem("token", token);
}

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
            setTokenAtLocalStorage(token);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.clear();
        },
    },
});

export const { setUserInfo, logout } = authSlice.actions;
export default authSlice.reducer;
