import React from 'react';
import '@testing-library/jest-dom';
import OptionsButton from '../components/OptionsButton';
import { render, screen, fireEvent } from '@testing-library/react';

it('OptionsButton toggles menu correctly and matches snapshots', () => {
    const { asFragment } = render(<OptionsButton />);
    
    expect(asFragment()).toMatchSnapshot();
    
    expect(screen.queryByText('Editar')).not.toBeInTheDocument();
    expect(screen.queryByText('Eliminar')).not.toBeInTheDocument();

    const optionsIcon = screen.getByRole('button');
    fireEvent.click(optionsIcon);
    
    expect(asFragment()).toMatchSnapshot();
    
    expect(screen.getByText('Editar')).toBeInTheDocument();
    expect(screen.getByText('Eliminar')).toBeInTheDocument();

    fireEvent.click(optionsIcon);
    
    expect(asFragment()).toMatchSnapshot();
    
    expect(screen.queryByText('Editar')).not.toBeInTheDocument();
    expect(screen.queryByText('Eliminar')).not.toBeInTheDocument();
});
