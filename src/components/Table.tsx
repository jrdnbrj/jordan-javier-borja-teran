import React, { useEffect } from 'react';
import TableRow from './TableRow';
import Tooltip from './Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from './Skeleton';
import { fetchProducts } from '../features/product/productSlice';

const Table: React.FC = () => {
    const dispatch = useDispatch();

    const products = useSelector((state) => state.product.products);
    const loading = useSelector((state) => state.product.loading);
    const error = useSelector((state) => state.product.error);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        if (error) 
            dispatch(setAlert({ 
                message: 'Ocurrió un problema cargando los productos. Vuelve a intentarlo.', 
                type: 'error' 
            }));
    }, [error]);

    if (loading) return <div className="table"><Skeleton width="100%" height="20rem" /></div>

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
            {products.map((product, index) => <TableRow product={product} key={index} />)}
            <div className="table-footer">
                <span className="results-text">5 Resultados</span>
                <select className="results-select">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </div>
        </div>
    );
};

export default Table;