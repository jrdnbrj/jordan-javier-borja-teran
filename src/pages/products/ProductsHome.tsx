import React from 'react';
import SearchCreateBar from '../../components/SearchCreateBar';
import Table from '../../components/Table';

const ProductsHome: React.FC = () => {
    return (
        <div className='products-home'>
            <SearchCreateBar />
            <Table />
        </div>
    );
};

export default ProductsHome;
