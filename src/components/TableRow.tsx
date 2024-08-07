import React from 'react';
import OptionsButton from './OptionsButton';

const TableRow: React.FC = () => {
    return (
        <div className="table-row" role="row">
            <div className="logo" style={{ maxWidth: '6rem', minWidth: '6rem', alignContent: 'center' }}>JG</div>
            <div style={{ width: '30%' }}>Tarjetas de Crédito</div>
            <div style={{ width: '25%' }}>Tarjeta de consumo bajo la modalidad de crédito</div>
            <div style={{ width: '20%' }}>2023-02-01</div>
            <div style={{ width: '20%' }}>2024-02-01</div>
            <div style={{ width: '5%' }}><OptionsButton /></div>
        </div>
    );
};

export default TableRow;
