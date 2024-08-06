import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/product/productSlice';
import { RootState } from '../../store';

const ProductList: React.FC = () => {
    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.product.products);
    const loading = useSelector((state: RootState) => state.product.loading);
    const error = useSelector((state: RootState) => state.product.error);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            hola
            {products.map((product, i) => (
                <div key={product.id}>{i+1}. {product.title}</div>
            ))}
        </div>
    );
};

export default ProductList;
