import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getProducts, createProduct, updateProduct, deleteProduct, verifyProductId } from '../../api/productApi';
import { createPendingReducer, createRejectedReducer, createFulfilledReducer } from './productHelpers';

export interface Product {
    id: string;
    name: string;
    description: string;
    logo: string;
    date_release: string;
    date_revision: string;
}

export interface ProductState {
    products: Product[];
    loading: boolean;
    loadingSave: boolean;
    error: string | null;
    verificationResult: boolean | null;
    searchValue: string;
}

const initialState: ProductState = {
    products: [],
    loading: false,
    loadingSave: false,
    error: null,
    verificationResult: null,
    searchValue: '',
};

export const fetchProducts = createAsyncThunk(
    'product/fetchProducts',
    async () => await getProducts()
);

export const addProduct = createAsyncThunk(
    'product/addProduct',
    async (product: Product) => await createProduct(product)
);

export const editProduct = createAsyncThunk(
    'product/editProduct',
    async (product: Product) => await updateProduct(product)
);

export const removeProduct = createAsyncThunk(
    'product/removeProduct',
    async (id: string) => {
        await deleteProduct(id);
        return { id }
    }
);

export const verifyProduct = createAsyncThunk(
    'product/verifyProduct',
    async (id: string) => await verifyProductId(id)
);

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Products
            .addCase(fetchProducts.pending, createPendingReducer('loading'))
            .addCase(fetchProducts.fulfilled, createFulfilledReducer<Product[]>('products', 'loading'))
            .addCase(fetchProducts.rejected, createRejectedReducer('loading'))

            // Add Product
            .addCase(addProduct.pending, createPendingReducer('loadingSave'))
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loadingSave = false;
                state.products.push(action.payload);
            })
            .addCase(addProduct.rejected, createRejectedReducer('loadingSave'))

            // Edit Product
            .addCase(editProduct.pending, createPendingReducer('loadingSave'))
            .addCase(editProduct.fulfilled, (state, action) => {
                state.loadingSave = false;
                const index = state.products.findIndex(product => product.id === action.payload.id);
                if (index !== -1) state.products[index] = action.payload;
            })
            .addCase(editProduct.rejected, createRejectedReducer('loadingSave'))

            // Remove Product
            .addCase(removeProduct.pending, createPendingReducer('loadingSave'))
            .addCase(removeProduct.fulfilled, (state, action) => {
                state.loadingSave = false;
                state.products = state.products.filter(product => product.id !== action.payload.id);
            })
            .addCase(removeProduct.rejected, createRejectedReducer('loadingSave'))

            // Verify Product ID
            .addCase(verifyProduct.pending, () => {
                // state.loading = true;
                // state.verificationResult = null;
            })
            .addCase(verifyProduct.fulfilled, createFulfilledReducer<boolean>('verificationResult', 'loading'))
            .addCase(verifyProduct.rejected, createRejectedReducer('loading'));
    },
});

export const { setSearchValue } = productSlice.actions;

export default productSlice.reducer;
