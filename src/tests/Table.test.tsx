import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from '../components/Table';

it('Table renders with correct headers and rows', () => {
    render(<Table />);
    
    expect(screen.getByText('Logo')).toBeInTheDocument();
    expect(screen.getByText('Nombre del producto')).toBeInTheDocument();
    expect(screen.getByText('Descripción')).toBeInTheDocument();
    expect(screen.getByText('Fecha de liberación')).toBeInTheDocument();
    expect(screen.getByText('Fecha de reestructuración')).toBeInTheDocument();

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(5);
});

it('Table tooltips are displayed correctly on hover', () => {
    render(<Table />);
    
    const descripcionTooltipTrigger = screen.getByText('Descripción');
    const liberacionTooltipTrigger = screen.getByText('Fecha de liberación');
    const reestructuracionTooltipTrigger = screen.getByText('Fecha de reestructuración');

    fireEvent.mouseOver(descripcionTooltipTrigger);
    expect(screen.getByText('Información sobre la descripción')).toBeVisible();

    fireEvent.mouseOver(liberacionTooltipTrigger);
    expect(screen.getByText('Información sobre la fecha de liberación')).toBeVisible();

    fireEvent.mouseOver(reestructuracionTooltipTrigger);
    expect(screen.getByText('Información sobre la fecha de reestructuración')).toBeVisible();
});
