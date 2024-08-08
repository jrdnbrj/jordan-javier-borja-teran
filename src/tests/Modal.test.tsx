import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../components/Modal'; // Ajusta la ruta según sea necesario
import '@testing-library/jest-dom';

describe('Modal Component', () => {
    const mockOnConfirm = jest.fn();
    const mockOnCancel = jest.fn();

    it('renders the modal with the correct title', () => {
        render(
            <Modal 
                title="Test Product" 
                onConfirm={mockOnConfirm} 
                onCancel={mockOnCancel} 
                loading={false} 
            />
        );

        expect(screen.getByText('¿Estás seguro de eliminar el producto "Test Product"?')).toBeInTheDocument();
    });

    it('calls onConfirm when confirm button is clicked', () => {
        render(
            <Modal 
                title="Test Product" 
                onConfirm={mockOnConfirm} 
                onCancel={mockOnCancel} 
                loading={false} 
            />
        );

        fireEvent.click(screen.getByText('Confirmar'));
        expect(mockOnConfirm).toHaveBeenCalled();
    });

    it('calls onCancel when cancel button is clicked', () => {
        render(
            <Modal 
                title="Test Product" 
                onConfirm={mockOnConfirm} 
                onCancel={mockOnCancel} 
                loading={false} 
            />
        );

        fireEvent.click(screen.getByText('Cancelar'));
        expect(mockOnCancel).toHaveBeenCalled();
    });

    it('disables confirm button and adds disabled class when loading', () => {
        render(
            <Modal 
                title="Test Product" 
                onConfirm={mockOnConfirm} 
                onCancel={mockOnCancel} 
                loading={true} 
            />
        );

        const confirmButton = screen.getByText('Confirmar');
        expect(confirmButton).toBeDisabled();
        expect(confirmButton).toHaveClass('disabled');
    });
});
