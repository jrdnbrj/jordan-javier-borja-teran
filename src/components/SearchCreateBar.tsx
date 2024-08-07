import React from "react";
import { useNavigate } from 'react-router-dom';

const SearchCreateBar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="search-create-bar">
            <input type="text" placeholder="Search..." className="search-bar" />
            <button className="add-button" onClick={() => navigate('create')}>
                Agregar
            </button>
        </div>
    );
};

export default SearchCreateBar;
