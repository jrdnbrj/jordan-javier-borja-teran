import { combineReducers } from '@reduxjs/toolkit';
import productReducer from '../features/product/productSlice';
import alertSlice from '../features/alert/alertSlice';

const rootReducer = combineReducers({
    product: productReducer,
    alert: alertSlice,
});

export default rootReducer;
