import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormField from '../pages/products/ProductForm/FormField';

jest.mock('../components/Skeleton', () => () => <div data-testid="skeleton">Loading...</div>);

describe('FormField Component', () => {
    const label = 'Test Label';
    const value = 'Test Value';
    const onChange = jest.fn();

    it('renders the label correctly', () => {
        render(<FormField label={label} value={value} onChange={onChange} />);
        expect(screen.getByText(label)).toBeInTheDocument();
    });

    it('renders an input field by default', () => {
        render(<FormField label={label} value={value} onChange={onChange} />);
        expect(screen.getByRole('textbox')).toHaveValue(value);
    });

    it('renders a textarea when textarea prop is true', () => {
        render(<FormField label={label} value={value} onChange={onChange} textarea />);
        expect(screen.getByRole('textbox')).toHaveValue(value);
    });

    it('calls onChange when input value changes', () => {
        render(<FormField label={label} value={value} onChange={onChange} />);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'New Value' } });
        expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('displays an error message when error prop is provided', () => {
        const error = 'Error message';
        render(<FormField label={label} value={value} onChange={onChange} error={error} />);
        expect(screen.getByText(error)).toBeInTheDocument();
    });

    it('renders a Skeleton when loading prop is true', () => {
        render(<FormField label={label} value={value} onChange={onChange} loading />);
        expect(screen.getByTestId('skeleton')).toBeInTheDocument();
    });

    it('applies the readOnly prop correctly', () => {
        render(<FormField label={label} value={value} onChange={onChange} readOnly />);
        expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
    });

    it('does not display an error message when there is no error', () => {
        render(<FormField label={label} value={value} onChange={onChange} />);
        expect(screen.queryByText('Error message')).not.toBeInTheDocument();
    });
});