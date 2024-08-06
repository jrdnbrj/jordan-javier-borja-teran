import React from 'react';
import { useParams } from 'react-router-dom';

const ProductForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div>
            Product Form
            <p>Product ID: {id}</p>
        </div>
    );
};

export default ProductForm;
