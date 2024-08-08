import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableRow from './TableRow';
import Tooltip from './Tooltip';
import Skeleton from './Skeleton';
import { fetchProducts, Product } from '../features/product/productSlice';
import { setAlert } from '../features/alert/alertSlice';
import { RootState, AppDispatch } from '../store';

const Table: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const [numResults, setNumResults] = useState(5);

    const products = useSelector((state: RootState) => state.product.products);
    const loading = useSelector((state: RootState) => state.product.loading);
    const error = useSelector((state: RootState) => state.product.error);
    const searchValue = useSelector((state: RootState) => state.product.searchValue);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            dispatch(setAlert({ 
                message: 'Ocurrió un problema cargando los productos. Vuelve a intentarlo.', 
                type: 'error' 
            }));
        }
    }, [error, dispatch]);

    if (loading) return <div className="table"><Skeleton width="100%" height="20rem" /></div>;

    const handleNumResultsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setNumResults(parseInt(event.target.value, 10));
    };

    const filteredProducts = searchValue 
        ? products.filter((product: Product) => 
            product.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
            product.description?.toLowerCase().includes(searchValue.toLowerCase())
          )
        : products;

    return (
        <div className="table">
            <div className="table-content">
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
                {filteredProducts.slice(0, numResults).map((product: Product, index: number) => 
                    <TableRow product={product} key={index} />
                )}
            </div>
            <div className="table-footer">
                <span className="results-text">{filteredProducts.length} Resultados</span>
                <select className="results-select" value={numResults} onChange={handleNumResultsChange}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </div>
        </div>
    );
};

export default Table;