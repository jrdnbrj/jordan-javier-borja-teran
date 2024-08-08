import React from 'react';
import { render, screen } from '@testing-library/react';
import TableRow from '../components/TableRow';
import '@testing-library/jest-dom';
import { Product } from '../features/product/productSlice';

jest.mock('../components/LogoCircle', () => ({ imageUrl }: any) => <div data-testid="logo-circle">{imageUrl}</div>);
jest.mock('../components/OptionsButton', () => ({ id, name }: any) => <button data-testid="options-button">{`Options for ${name}`}</button>);

describe('TableRow Component', () => {
    const product: Product = {
        id: '1',
        name: 'Product 1',
        description: 'Description 1',
        logo: 'logo-url',
        date_release: '2023-01-01',
        date_revision: '2024-01-01',
    };

    const formatDate = (date: string | Date) => {
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        const day = String(dateObj.getUTCDate()).padStart(2, '0');
        const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
        const year = dateObj.getUTCFullYear();
        return `${day}/${month}/${year}`;
    };

    it('renders product information correctly', () => {
        render(<TableRow product={product} />);

        expect(screen.getByText(product.name)).toBeInTheDocument();
        expect(screen.getByText(product.description)).toBeInTheDocument();
        expect(screen.getByText(formatDate(product.date_release))).toBeInTheDocument();
        expect(screen.getByText(formatDate(product.date_revision))).toBeInTheDocument();
    });

    it('renders LogoCircle with correct imageUrl', () => {
        render(<TableRow product={product} />);
        expect(screen.getByTestId('logo-circle')).toHaveTextContent(product.logo);
    });

    it('renders OptionsButton with correct id and name', () => {
        render(<TableRow product={product} />);
        expect(screen.getByTestId('options-button')).toHaveTextContent(`Options for ${product.name}`);
    });

    it('formats date correctly when date is not a string', () => {
        const date = new Date('2023-01-01');
        const formattedDate = formatDate(date);
        expect(formattedDate).toBe('01/01/2023');
    });
});