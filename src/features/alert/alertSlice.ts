import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AlertState {
    message: string | null;
}

const initialState: AlertState = {
    message: null,
};

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setAlert: (state, action: PayloadAction<{ message: string }>) => {
            state.message = action.payload.message;
        },
        clearAlert: (state) => {
            state.message = null;
        },
    },
});

export const { setAlert, clearAlert } = alertSlice.actions;

export default alertSlice.reducer;
