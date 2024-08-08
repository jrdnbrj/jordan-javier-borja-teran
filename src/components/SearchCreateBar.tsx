import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../features/product/productSlice';
import { useNavigate } from 'react-router-dom';

const SearchCreateBar: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchValue(event.target.value));
    };

    return (
        <div className="search-create-bar">
            <input 
                type="text" 
                placeholder="Search..." 
                className="search-bar" 
                onChange={handleSearchChange} 
            />
            <button className="add-button" onClick={() => navigate('create')}>
                Agregar
            </button>
        </div>
    );
};

export default SearchCreateBar;
