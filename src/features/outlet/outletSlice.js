import { createSlice } from "@reduxjs/toolkit";

export const outletSlice = createSlice({
    name: "shopSlice",
    initialState: {
        outlets: []
    },
    reducers: {
        setOutlets: (state, action) => {
            state.outlets = action.payload
        }
    }
});

export const { setOutlets } = outletSlice.actions;
export default outletSlice.reducer;