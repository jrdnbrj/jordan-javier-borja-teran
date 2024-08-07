import React from 'react';
import SearchCreateBar from '../../components/SearchCreateBar';
import Table from '../../components/Table';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../features/alert/alertSlice';

const ProductsHome: React.FC = () => {
    const dispatch = useDispatch();

    const showAlert = (message: string, type: 'success' | 'error' | 'info') => {
        dispatch(setAlert({ message, type }));
    };

    return (
        <div className='products-home'>
            {/* <button onClick={() => showAlert('This is a success message ', 'success')}>
                Alert
            </button> */}
            <SearchCreateBar />
            <Table />
        </div>
    );
};

export default ProductsHome;
