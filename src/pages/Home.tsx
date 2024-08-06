import React from 'react';
import ProductList from '../components/product/ProductList';

const HomePage: React.FC = () => {
    return (
        <div className="home-page">
            <ProductList />
        </div>
    );
};

export default HomePage;
