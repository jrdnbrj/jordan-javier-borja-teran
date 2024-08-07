import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/products/ProductsHome';
import ProductsLayout from '../components/layout/ProductsLayout';
import ProductForm from '../pages/products/ProductForm/ProductForm';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/products" element={<ProductsLayout />}>
                <Route index element={<Home />} />
                <Route path="create" element={<ProductForm />} />
                <Route path="edit/:id" element={<ProductForm />} />
            </Route>
            <Route path="*" element={<Navigate to="/products" />} />
        </Routes>
    );
};

export default AppRoutes;