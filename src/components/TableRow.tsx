import React from 'react';
import OptionsButton from './OptionsButton';
import LogoCircle from './LogoCircle';

const TableRow: React.FC = ({ product }) => {

    const formatDate = (date) => new Date(date).toLocaleDateString();

    return (
        <div className="table-row" role="row">
            <div className="logo col-logo"><LogoCircle imageUrl={product.logo} /></div>
            <div className="col-name">{product.name}</div>
            <div className="col-description">{product.description}</div>
            <div className="col-release-date">{formatDate(product.date_release)}</div>
            <div className="col-restructuring-date">{formatDate(product.date_revision)}</div>
            <div className="col-options"><OptionsButton id={product.id} /></div>
        </div>
    );
};

export default TableRow;
