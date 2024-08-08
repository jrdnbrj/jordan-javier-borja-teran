import { combineReducers } from '@reduxjs/toolkit';
import productReducer from '../features/product/productSlice';
import alertReducer from '../features/alert/alertSlice';

const rootReducer = combineReducers({
    product: productReducer,
    alert: alertReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
