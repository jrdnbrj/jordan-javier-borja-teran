import { ChangeEventHandler } from 'react';
import Skeleton from '../../../components/Skeleton';

interface FormFieldProps {
    label: string;
    type?: string;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    error?: string;
    textarea?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
    loading?: boolean;
}

const FormField = ({ 
    label, type = 'text', value, onChange, error, textarea, readOnly, disabled, loading 
}: FormFieldProps) => {
    const renderField = () => {
        if (loading)
            return <Skeleton width="100%" height="2.7rem" />;

        if (textarea)
            return (
                <textarea
                    value={value}
                    onChange={onChange}
                    className={error ? 'error' : ''}
                    readOnly={readOnly}
                    disabled={disabled}
                />
            );

        return (
            <input
                type={type}
                value={value}
                onChange={onChange}
                className={error ? 'error' : ''}
                readOnly={readOnly}
                disabled={disabled}
            />
        );
    };

    return (
        <div className="form-group">
            <label>{label}</label>
            {renderField()}
            {error && <span className="error-text">{error}</span>}
        </div>
    );
};

export default FormField;