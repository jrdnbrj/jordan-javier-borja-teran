import React from 'react';
import { render, screen } from '@testing-library/react';
import Tooltip from '../components/Tooltip';
import '@testing-library/jest-dom';

describe('Tooltip Component', () => {
    const text = 'Información sobre la descripción';

    it('renders tooltip text correctly', () => {
        render(<Tooltip text={text} />);
        expect(screen.getByText(text)).toBeInTheDocument();
    });

    it('renders SVG icon', () => {
        render(<Tooltip text={text} />);
        expect(screen.getByRole('img')).toBeInTheDocument();
    });
});
