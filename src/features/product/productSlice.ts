import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts, createProduct, updateProduct, deleteProduct, verifyProductId } from '../../api/productApi';
import { createPendingReducer, createRejectedReducer, createFulfilledReducer } from './productHelpers';

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
    verificationResult: boolean | null;
}

const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
    verificationResult: null,
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
    async (id: string) => await deleteProduct(id)
);

export const verifyProduct = createAsyncThunk(
    'product/verifyProduct',
    async (id: string) => await verifyProductId(id)
);

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Products
            .addCase(fetchProducts.pending, createPendingReducer)
            .addCase(fetchProducts.fulfilled, createFulfilledReducer<Product[]>('products'))
            .addCase(fetchProducts.rejected, createRejectedReducer)

            // Add Product
            .addCase(addProduct.pending, createPendingReducer)
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.push(action.payload);
            })
            .addCase(addProduct.rejected, createRejectedReducer)

            // Edit Product
            .addCase(editProduct.pending, createPendingReducer)
            .addCase(editProduct.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.products.findIndex(product => product.id === action.payload.id);
                if (index !== -1)
                    state.products[index] = action.payload;
            })
            .addCase(editProduct.rejected, createRejectedReducer)

            // Remove Product
            .addCase(removeProduct.pending, createPendingReducer)
            .addCase(removeProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter(product => product.id !== action.payload);
            })
            .addCase(removeProduct.rejected, createRejectedReducer)

            // Verify Product ID
            .addCase(verifyProduct.pending, createPendingReducer)
            .addCase(verifyProduct.fulfilled, createFulfilledReducer<boolean>('verificationResult'))
            .addCase(verifyProduct.rejected, createRejectedReducer);
    },
});

export default productSlice.reducer;