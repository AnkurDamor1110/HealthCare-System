import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user:null,  // Correct initial state key

    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
});

export const { setUser} = userSlice.actions;

export default userSlice.reducer;  // Export the reducer correctly
