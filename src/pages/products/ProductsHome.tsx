import React from 'react';
import SearchCreateBar from '../../components/SearchCreateBar';
import Table from '../../components/Table';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../features/alert/alertSlice';
import Skeleton from '../../components/Skeleton';

const ProductsHome: React.FC = () => {
    const dispatch = useDispatch();

    const showAlert = (message: string, type: 'success' | 'error' | 'info') => {
        dispatch(setAlert({ message, type }));
    };

    // return (
    //     <div className="products-home-skeleton">
    //         <Skeleton width="90%" height="20rem" />
    //         {/* <Skeleton width="200px" height="20px" /> */}
    //         {/* <Skeleton width="300px" height="20px" /> */}
    //     </div>
    // );

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
