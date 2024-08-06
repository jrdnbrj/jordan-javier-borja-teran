import { AnyAction, PayloadAction } from '@reduxjs/toolkit';

export const createPendingReducer = (state: any) => {
    state.loading = true;
};

export const createRejectedReducer = (state: any, action: AnyAction) => {
    state.loading = false;
    state.error = action.error.message || 'An error occurred';
};

export const createFulfilledReducer = <T>(key: string) => (state: any, action: PayloadAction<T>) => {
    state.loading = false;
    state[key] = action.payload;
};
