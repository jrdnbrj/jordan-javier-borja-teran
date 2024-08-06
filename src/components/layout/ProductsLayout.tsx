import React from 'react';
import { Outlet } from 'react-router-dom';

const ProductsLayout: React.FC = () => {
    return (
        <div>
            <h2>Products</h2>
            <Outlet /> {/* Esto renderizará las rutas anidadas */}
        </div>
    );
};

export default ProductsLayout;