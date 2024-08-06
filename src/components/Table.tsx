import React from 'react';
import TableRow from './TableRow';
import Tooltip from './Tooltip';

const Table: React.FC = () => {
    return (
        <div className="table">
            <div className="table-header">
                <div style={{ maxWidth: '6rem', minWidth: '6rem',  alignContent: 'center' }}>Logo</div>
                <div style={{ width: '30%' }}>Nombre del producto</div>
                <div style={{ width: '25%' }}>
                    Descripción <Tooltip text="Información sobre la descripción" />
                </div>
                <div style={{ width: '20%' }}>
                    Fecha de liberación <Tooltip text="Información sobre la fecha de liberación" />
                </div>
                <div style={{ width: '20%' }}>
                    Fecha de reestructuración <Tooltip text="Información sobre la fecha de reestructuración" />
                </div>
                <div style={{ width: '5%' }}></div>
            </div>
            {[...Array(5)].map((_, index) => (
                <TableRow key={index} />
            ))}
        </div>
    );
};

export default Table;