import React from 'react';
import OptionsButton from './OptionsButton';
import LogoCircle from './LogoCircle';
import { Product } from '../features/product/productSlice';

const TableRow: React.FC<{ product: Product }> = ({ product }) => {

    // Define the formatDate function
    const formatDate = (dateString: string): string => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

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
