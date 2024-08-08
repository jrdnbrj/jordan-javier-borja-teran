import { AnyAction, PayloadAction } from '@reduxjs/toolkit';

interface LoadingErrorState {
    loading: boolean;
    error: string | null;
    [key: string]: unknown;
}

export const createPendingReducer = (loadingKey: string) => (state: LoadingErrorState) => {
    state[loadingKey] = true;
};

export const createRejectedReducer = (loadingKey: string) => (state: LoadingErrorState, action: AnyAction) => {
    state[loadingKey] = false;
    state.error = action.error.message || 'Ocurrió un error inesperado.';
};

export const createFulfilledReducer = <T>(key: string, loadingKey: string) => (state: LoadingErrorState, action: PayloadAction<T>) => {
    state[loadingKey] = false;
    state[key] = action.payload;
};