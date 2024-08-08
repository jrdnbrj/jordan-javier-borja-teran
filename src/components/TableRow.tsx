import React from 'react';
import OptionsButton from './OptionsButton';
import LogoCircle from './LogoCircle';
import { Product } from '../features/product/productSlice';

const TableRow: React.FC<{ product: Product }> = ({ product }) => {

    const formatDate = (date: string) => {
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = dateObj.getFullYear();
        
        return `${day}/${month}/${year}`;
    }

    return (
        <div className="table-row">
            <div className="logo col-logo"><LogoCircle imageUrl={product.logo} /></div>
            <div className="col-name">{product.name}</div>
            <div className="col-description">{product.description}</div>
            <div className="col-release-date">{formatDate(product.date_release)}</div>
            <div className="col-restructuring-date">{formatDate(product.date_revision)}</div>
            <div className="col-options"><OptionsButton id={product.id} name={product.name} /></div>
        </div>
    );
};

export default TableRow;
