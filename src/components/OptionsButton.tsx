import React, { useState } from 'react';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeProduct, fetchProducts } from '../features/product/productSlice';
import { RootState, AppDispatch } from '../store';
import { setAlert } from '../features/alert/alertSlice';

interface OptionsButtonProps {
    id: string;
    name: string;
}

const OptionsButton: React.FC<OptionsButtonProps> = ({ id, name }) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const loadingSave = useSelector((state: RootState) => state.product.loadingSave);

    const toggleMenu = () => setOpen(!open);
    const closeModal = () => setModalOpen(false);

    const onEdit = () => navigate(`edit/${id}`);
    const onRemove = () => {
        dispatch(removeProduct(id))
            .unwrap()
            .then(() => {
                dispatch(setAlert({ message: 'Producto eliminado correctamente' }));
                setModalOpen(false);
                setOpen(false);
                dispatch(fetchProducts());
            })
            .catch(() => dispatch(setAlert({ message: 'Error al eliminar el producto' })))
    }

    const openModal = () => {
        setModalOpen(true);
        setOpen(false);
    }

    return (
        <div className="options-menu">
            <div onClick={toggleMenu} className="options-icon" role="button">
                <svg
                    fill="#000000"
                    width="16"
                    height="16"
                    viewBox="0 0 32 32"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M12.15 28.012v-0.85c0.019-0.069 0.050-0.131 0.063-0.2 0.275-1.788 1.762-3.2 3.506-3.319 1.95-0.137 3.6 0.975 4.137 2.787 0.069 0.238 0.119 0.488 0.181 0.731v0.85c-0.019 0.056-0.050 0.106-0.056 0.169-0.269 1.65-1.456 2.906-3.081 3.262-0.125 0.025-0.25 0.063-0.375 0.094h-0.85c-0.056-0.019-0.113-0.050-0.169-0.056-1.625-0.262-2.862-1.419-3.237-3.025-0.037-0.156-0.081-0.3-0.119-0.444zM20.038 3.988l-0 0.85c-0.019 0.069-0.050 0.131-0.056 0.2-0.281 1.8-1.775 3.206-3.538 3.319-1.944 0.125-3.588-1-4.119-2.819-0.069-0.231-0.119-0.469-0.175-0.7v-0.85c0.019-0.056 0.050-0.106 0.063-0.162 0.3-1.625 1.244-2.688 2.819-3.194 0.206-0.069 0.425-0.106 0.637-0.162h0.85c0.056 0.019 0.113 0.050 0.169 0.056 1.631 0.269 2.863 1.419 3.238 3.025 0.038 0.15 0.075 0.294 0.113 0.437zM20.037 15.575v0.85c-0.019 0.069-0.050 0.131-0.063 0.2-0.281 1.794-1.831 3.238-3.581 3.313-1.969 0.087-3.637-1.1-4.106-2.931-0.050-0.194-0.094-0.387-0.137-0.581v-0.85c0.019-0.069 0.050-0.131 0.063-0.2 0.275-1.794 1.831-3.238 3.581-3.319 1.969-0.094 3.637 1.1 4.106 2.931 0.050 0.2 0.094 0.394 0.137 0.588z"></path>
                </svg>
            </div>
            {open && (
                <div className="menu">
                    <div className="menu-item" onClick={onEdit}>Editar</div>
                    <div className="menu-item" onClick={openModal}>Eliminar</div>
                </div>
            )}
            {modalOpen && (
                <Modal
                    title={name}
                    onConfirm={onRemove}
                    onCancel={closeModal}
                    loading={loadingSave}
                />
            )}
        </div>
    );
};

export default OptionsButton;
