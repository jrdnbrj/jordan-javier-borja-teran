import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts } from '../../api/productApi';

interface Product {
    id: string;
    name: string;
    description: string;
    logo: string;
    date_release: string;
    date_revision: string;
}

interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
};

export const fetchProducts = createAsyncThunk(
    'product/fetchProducts',
    async () => {
        const response = await getProducts();
        return response.data;
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch products';
            });
    },
});

export default productSlice.reducer;
