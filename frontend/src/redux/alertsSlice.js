import { createSlice } from "@reduxjs/toolkit";

export const alertsSlice = createSlice({
    name: "alerts",
    initialState: {
        loading: false,  // Correct initial state key
    },
    reducers: {
        showLoading: (state) => {
            state.loading = true;
        },
        hideLoading: (state) => {
            state.loading = false;
        },
    },
});

export const { showLoading, hideLoading } = alertsSlice.actions;

// export default alertsSlice.reducer;  // Export the reducer correctly
