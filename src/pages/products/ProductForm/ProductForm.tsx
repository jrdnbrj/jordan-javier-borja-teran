import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FormField from './FormField';
import {
    required,
    minLength,
    maxLength,
    exactDate,
    minDate,
    validateField
} from './formValidation';

const ProductForm: React.FC = () => {
    const { id: urlId } = useParams();

    const [id, setId] = useState(urlId || '');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [logo, setLogo] = useState('');
    const [dateRelease, setDateRelease] = useState('');
    const [dateRevision, setDateRevision] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (id.length >= 3 || id.length > 10) {
            const idError = validateField('id', id, [
                minLength(3, 'Debe tener entre 3 y 10 caracteres!'),
                maxLength(10, 'Debe tener entre 3 y 10 caracteres!')
            ]);
            setErrors(prevErrors => {
                const { id, ...rest } = prevErrors;
                return idError ? { ...rest, id: idError } : rest;
            });
        }
    }, [id]);
    
    useEffect(() => {
        if (name.length >= 5 || name.length > 100) {
            const nameError = validateField('name', name, [
                minLength(5, 'Debe tener entre 5 y 100 caracteres!'),
                maxLength(100, 'Debe tener entre 5 y 100 caracteres!')
            ]);
            setErrors(prevErrors => {
                const { name, ...rest } = prevErrors;
                return nameError ? { ...rest, name: nameError } : rest;
            });
        }
    }, [name]);
    
    useEffect(() => {
        if (description.length >= 10 || description.length > 200) {
            const descriptionError = validateField('description', description, [
                minLength(10, 'Debe tener entre 10 y 200 caracteres!'),
                maxLength(200, 'Debe tener entre 10 y 200 caracteres!')
            ]);
            setErrors(prevErrors => {
                const { description, ...rest } = prevErrors;
                return descriptionError ? { ...rest, description: descriptionError } : rest;
            });
        }
    }, [description]);
    
    useEffect(() => {
        if (logo) {
            const logoError = validateField('logo', logo, [required]);
            setErrors(prevErrors => {
                const { logo, ...rest } = prevErrors;
                return logoError ? { ...rest, logo: logoError } : rest;
            });
        }
    }, [logo]);
    
    useEffect(() => {
        const releaseDateError = validateField('dateRelease', dateRelease, [
            minDate(new Date(), 'Debe ser igual o mayor a la fecha actual!')
        ]);
    
        if (!releaseDateError && dateRelease) {
            const newDateRevision = new Date(dateRelease);
            newDateRevision.setFullYear(newDateRevision.getFullYear() + 1);
            setDateRevision(newDateRevision.toISOString().split('T')[0]);
        }
    
        setErrors(prevErrors => {
            const { dateRelease, dateRevision, ...rest } = prevErrors;
            return releaseDateError ? { ...rest, dateRelease: releaseDateError } : rest;
        });
    }, [dateRelease]);

    const validateForm = () => {
        const newErrors = {};
    
        newErrors.id = validateField('id', id, [
            required,
            minLength(3, 'Debe tener entre 3 y 10 caracteres!'),
            maxLength(10, 'Debe tener entre 3 y 10 caracteres!')
        ]);
        newErrors.name = validateField('name', name, [
            required,
            minLength(5, 'Debe tener entre 5 y 100 caracteres!'),
            maxLength(100, 'Debe tener entre 5 y 100 caracteres!')
        ]);
        newErrors.description = validateField('description', description, [
            required,
            minLength(10, 'Debe tener entre 10 y 200 caracteres!'),
            maxLength(200, 'Debe tener entre 10 y 200 caracteres!')
        ]);
        newErrors.logo = validateField('logo', logo, [required]);
        newErrors.dateRelease = validateField('dateRelease', dateRelease, [
            required,
            minDate(new Date(), 'Debe ser igual o mayor a la fecha actual!')
        ]);
    
        if (!newErrors.id) {
            const idExists = false; // TODO: Call API to check if ID exists
            if (idExists) newErrors.id = 'ID ya existe!';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(errors)
        if (validateForm()) {
            console.log('Formulario enviado');
        }
    };

    return (
        <div className="form-container">
            <h1>Formulario de Registro</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <FormField
                        label="ID"
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        error={errors.id}
                    />
                    <FormField
                        label="Nombre"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        error={errors.name}
                    />
                </div>
                <div className="form-row">
                    <FormField
                        label="Descripción"
                        type="text"
                        textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        error={errors.description}
                    />
                    <FormField
                        label="Logo"
                        type="text"
                        value={logo}
                        onChange={(e) => setLogo(e.target.value)}
                        error={errors.logo}
                    />
                </div>
                <div className="form-row">
                    <FormField
                        label="Fecha Liberación"
                        type="date"
                        value={dateRelease}
                        onChange={(e) => setDateRelease(e.target.value)}
                        error={errors.dateRelease}
                    />
                    <FormField
                        label="Fecha Revisión"
                        type="date"
                        value={dateRevision}
                        readOnly
                        onFocus={(e) => e.target.blur()}
                        onChange={(e) => e.target.value = dateRevision}
                    />
                </div>
                <div className="form-actions">
                    <button type="button" className="cancel-button" onClick={() => {
                        setId('');
                        setName('');
                        setDescription('');
                        setLogo('');
                        setDateRelease('');
                        setDateRevision('');
                        setErrors({});
                    }}>Reiniciar</button>
                    <button type="submit" className={`submit-button ${Object.keys(errors).length > 0 ? 'disabled' : ''}`}>Enviar</button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;