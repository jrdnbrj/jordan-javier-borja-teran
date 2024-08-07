import React from 'react';
import OptionsButton from './OptionsButton';
import LogoCircle from './LogoCircle';

const TableRow: React.FC = () => {
    return (
        <div className="table-row" role="row">
            <div className="logo col-logo"><LogoCircle imageUrl="https://i.imgur.com/CzXTtJV.jpg" /></div>
            <div className="col-name">Tarjetas de Crédito</div>
            <div className="col-description">Tarjeta de consumo bajo la modalidad de crédito</div>
            <div className="col-release-date">2023-02-01</div>
            <div className="col-restructuring-date">2024-02-01</div>
            <div className="col-options"><OptionsButton /></div>
        </div>
    );
};

export default TableRow;
