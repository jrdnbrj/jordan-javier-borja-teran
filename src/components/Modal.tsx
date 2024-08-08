import React from 'react';

interface ModalProps {
    title: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, onConfirm, onCancel, loading }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>¿Estás seguro de eliminar el producto "{title}"?</p>
                <div className="modal-actions">
                    <button className="modal-button cancel" onClick={onCancel}>
                        Cancelar
                    </button>
                    <button className={`modal-button confirm ${loading && 'disabled'}`} onClick={onConfirm} disabled={loading}>
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
