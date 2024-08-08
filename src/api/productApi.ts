import axios from 'axios';
import { Product } from '../features/product/productSlice';

const API_BASE_URL = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros';
const AUTHOR_ID = '984790449';

export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/bp/products`, {
            headers: { authorId: AUTHOR_ID },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching products');
    }
};

export const createProduct = async (product: Product) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/bp/products`, product, {
            headers: { authorId: AUTHOR_ID },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error creating product');
    }
};

export const updateProduct = async (product: Product) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/bp/products`, product, {
            headers: { authorId: AUTHOR_ID },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error updating product');
    }
};

export const deleteProduct = async (id: string) => {
    try {
        await axios.delete(`${API_BASE_URL}/bp/products`, {
            headers: { authorId: AUTHOR_ID },
            params: { id },
        });
        return id;
    } catch (error) {
        console.log(error);
        throw new Error('Error deleting product');
    }
};

export const verifyProductId = async (id: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/bp/products/verification`, {
            headers: { authorId: AUTHOR_ID },
            params: { id },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error verifying product ID');
    }
};
