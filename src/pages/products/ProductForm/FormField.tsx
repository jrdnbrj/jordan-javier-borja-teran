import React from 'react';

const FormField = ({ label, type, value, onChange, error, textarea, readOnly }) => (
    <div className="form-group">
        <label>{label}</label>
        {textarea ? (
            <textarea
                value={value}
                onChange={onChange}
                className={error ? 'error' : ''}
                readOnly={readOnly}
            />
        ) : (
            <input
                type={type}
                value={value}
                onChange={onChange}
                className={error ? 'error' : ''}
                readOnly={readOnly}
            />
        )}
        {error && <span className="error-text">{error}</span>}
    </div>
);

export default FormField;