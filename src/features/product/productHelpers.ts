import { AnyAction, PayloadAction } from '@reduxjs/toolkit';

export const createPendingReducer = (loadingKey: string) => (state: any) => {
    state[loadingKey] = true;
};

export const createRejectedReducer = (loadingKey: string) => (state: any, action: AnyAction) => {
    state[loadingKey] = false;
    state.error = action.error.message || 'Ocurrió un error inesperado.';
};

export const createFulfilledReducer = <T>(key: string, loadingKey: string) => (state: any, action: PayloadAction<T>) => {
    state[loadingKey] = false;
    state[key] = action.payload;
};