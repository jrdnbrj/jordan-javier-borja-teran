import axios from 'axios';

// const API_BASE_URL = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros';
const API_BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

export const getProducts = () => {
    console.log('getProducts');
    // return axios.get(`${API_BASE_URL}/bp/products`, {
    return axios.get(`${API_BASE_URL}`, {
        headers: { authorId: 'borjajordan@hotmail.com' },
    });
};

export const verifyProductId = (id: string) => {
    return axios.get(`${API_BASE_URL}/bp/products/verification`, {
        headers: { authorId: 'borjajordan@hotmail.com' },
        params: { id },
    });
};
