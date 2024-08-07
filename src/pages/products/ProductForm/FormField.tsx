import React from 'react';
import Skeleton from '../../../components/Skeleton';

const FormField = ({ 
    label, type, value, onChange, error, textarea, readOnly, disabled, loading 
}) => {
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
