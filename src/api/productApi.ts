import axios from 'axios';

// const API_BASE_URL = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros';
const API_BASE_URL = 'https://jsonplaceholder.typicode.com/posts';
const AUTHOR_ID = 'borjajordan@hotmail.com';

export const getProducts = async () => {
    try {
        // const response = await axios.get(`${API_BASE_URL}/bp/products`, {
        const response = await axios.get(`${API_BASE_URL}`, {
            headers: { authorId: AUTHOR_ID },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching products');
    }
};

export const createProduct = async (product: any) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/bp/products`, product, {
            headers: { authorId: AUTHOR_ID },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error creating product');
    }
};

export const updateProduct = async (product: any) => {
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
        const response = await axios.delete(`${API_BASE_URL}/bp/products`, {
            headers: { authorId: AUTHOR_ID },
            params: { id },
        });
        return response.data;
    } catch (error) {
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
