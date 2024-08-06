import React from 'react';
import ProductList from '../../components/product/ProductList';
import Header from '../../components/Header';
import Table from '../../components/Table';

const ProductsHome: React.FC = () => {
    return (
        <div>
            {/* <ProductList /> */}
            <Header />
            <Table />
        </div>
    );
};

export default ProductsHome;
