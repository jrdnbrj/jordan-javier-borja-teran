import React from "react";

const Header: React.FC = () => {
    return (
        <div className="header">
            <input type="text" placeholder="Search..." className="search-bar" />
            <button className="add-button">Agregar</button>
        </div>
    );
};

export default Header;
