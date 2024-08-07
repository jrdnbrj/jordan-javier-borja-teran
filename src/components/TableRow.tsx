import React from 'react';
import OptionsButton from './OptionsButton';

const TableRow: React.FC = () => {
    return (
        <div className="table-row" role="row">
            <div className="logo" style={{ maxWidth: '6rem', minWidth: '6rem', alignContent: 'center' }}>JG</div>
            <div style={{ width: '30%' }}>Nombre del producto.</div>
            <div style={{ width: '25%' }}>Descripción.</div>
            <div style={{ width: '20%' }}>01/01/2000</div>
            <div style={{ width: '20%' }}>01/01/2001</div>
            <div style={{ width: '5%' }}>
                <OptionsButton />
            </div>
        </div>
    );
};

export default TableRow;