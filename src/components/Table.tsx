import React from 'react';
import TableRow from './TableRow';
import Tooltip from './Tooltip';

const Table: React.FC = () => {
    return (
        <div className="table">
            <div className="table-header">
                <div className="col-logo">Logo</div>
                <div className="col-name">Nombre del producto</div>
                <div className="col-description">
                    Descripción <Tooltip text="Información sobre la descripción" />
                </div>
                <div className="col-release-date">
                    Fecha de Liberación <Tooltip text="Información sobre la fecha de liberación" />
                </div>
                <div className="col-restructuring-date">
                    Fecha de Revisión <Tooltip text="Información sobre la fecha de reestructuración" />
                </div>
                <div className="col-options"></div>
            </div>
            {[...Array(5)].map((_, index) => (
                <TableRow key={index} />
            ))}
        </div>
    );
};

export default Table;