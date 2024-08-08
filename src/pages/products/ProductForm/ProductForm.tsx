import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
    fetchProducts, addProduct, editProduct, Product, verifyProduct
} from '../../../features/product/productSlice';
import { setAlert } from '../../../features/alert/alertSlice';
import FormField from './FormField';
import { AppDispatch, RootState } from '../../../store';
import {
    required,
    minLength,
    maxLength,
    minDate,
    validateField
} from './formValidation';

interface FormErrors {
    id?: string;
    name?: string;
    description?: string;
    logo?: string;
    dateRelease?: string;
    [key: string]: string | undefined;
}

const ProductForm: React.FC = () => {
    const dispatch : AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { id: urlId } = useParams<{ id: string }>();

    const formatDate = (date: Date | string) => {
        if (!date) return '';
        return new Date(date).toISOString().split('T')[0];
    }

    const products = useSelector((state: RootState) => state.product.products);
    const loading = useSelector((state: RootState) => state.product.loading);
    const loadingSave = useSelector((state: RootState) => state.product.loadingSave);
    const error = useSelector((state: RootState) => state.product.error);

    const [initialValues, setInitialValues] = useState<Product>({} as Product);
    const [id, setId] = useState(urlId || '');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [logo, setLogo] = useState('');
    const [dateRelease, setDateRelease] = useState('');
    const [dateRevision, setDateRevision] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});

    useEffect(() => {
        if (error)
            dispatch(setAlert({ message: 'Ocurrió un problema cargando los productos. Vuelve a intentarlo.' }));
    }, [error]);

    useEffect(() => {
        if (products.length === 0 && urlId) {
            dispatch(fetchProducts());
        } else {
            if (!urlId) return;

            const productFind = products.find(p => p.id === urlId);
            if (!productFind) {
                dispatch(setAlert({ message: `No existe un producto con \n ID "${urlId}"` }));
            } else {
                const formattedProduct = {
                    ...productFind,
                    date_release: formatDate(productFind?.date_release),
                    date_revision: formatDate(productFind?.date_revision)
                };
                setInitialValues(formattedProduct);
                setId(formattedProduct?.id || '');
                setName(formattedProduct?.name || '');
                setDescription(formattedProduct?.description || '');
                setLogo(formattedProduct?.logo || '');
                setDateRelease(formattedProduct?.date_release || '');
                setDateRevision(formattedProduct?.date_revision || '');
            }
        }
    }, [products]);

    useEffect(() => {
        if (id.length < 10 && !urlId) {
            dispatch(verifyProduct(id))
                .unwrap()
                .then((result) => {
                    if (result) {
                        setErrors(prevErrors => ({
                            ...prevErrors,
                            id: 'ID ya existe!'
                        }));
                    } else {
                        setErrors(prevErrors => {
                            const { ...rest } = prevErrors;
                            return rest;
                        });
                    }
                })
                .catch(() => {
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        id: 'Error verificando el ID.'
                    }));
                });
            return;
        }

        const idError = validateField(id, [
            maxLength(10, 'Debe tener entre 3 y 10 caracteres!')
        ]);
        setErrors(prevErrors => {
            const { ...rest } = prevErrors;
            return idError ? { ...rest, id: idError } : rest;
        });
    }, [id]);
    
    useEffect(() => {
        if (name.length < 100) {
            setErrors(prevErrors => {
                const { ...rest } = prevErrors;
                return rest;
            });
            return;
        }

        const nameError = validateField(name, [
            maxLength(100, 'Debe tener entre 5 y 100 caracteres!')
        ]);
        setErrors(prevErrors => {
            const { ...rest } = prevErrors;
            return nameError ? { ...rest, name: nameError } : rest;
        });
    }, [name]);
    
    useEffect(() => {
        if (description.length < 200) {
            setErrors(prevErrors => {
                const { ...rest } = prevErrors;
                return rest;
            });
            return;
        }
        const descriptionError = validateField(description, [
            maxLength(200, 'Debe tener entre 10 y 200 caracteres!')
        ]);
        setErrors(prevErrors => {
            const { ...rest } = prevErrors;
            return descriptionError ? { ...rest, description: descriptionError } : rest;
        });
    }, [description]);
    
    useEffect(() => {
        if (logo) {
            const logoError = validateField(logo, [required]);
            setErrors(prevErrors => {
                const { ...rest } = prevErrors;
                return logoError ? { ...rest, logo: logoError } : rest;
            });
        }
    }, [logo]);
    
    useEffect(() => {
        const validateDateRelease = () => {
            if (!dateRelease) {
                setErrors(prevErrors => {
                    const { ...rest } = prevErrors;
                    return rest;
                });
                return;
            }
            const releaseDateError = validateField(dateRelease, [
                minDate(new Date(), 'Debe ser igual o mayor a la fecha actual!')
            ]);
            setErrors(prevErrors => {
                const { ...rest } = prevErrors;
                if (releaseDateError) {
                    return { ...rest, dateRelease: releaseDateError };
                } else {
                    const { ...restWithoutDateRelease } = rest;
                    return restWithoutDateRelease;
                }
            });
    
            if (!releaseDateError && dateRelease) {
                const newDateRevision = new Date(dateRelease);
                newDateRevision.setFullYear(newDateRevision.getFullYear() + 1);
                setDateRevision(formatDate(newDateRevision));
            }
        };
    
        if (!urlId)
            validateDateRelease();
        else if (dateRelease) {
            const newDateRevision = new Date(dateRelease);
            newDateRevision.setFullYear(newDateRevision.getFullYear() + 1);
            setDateRevision(formatDate(newDateRevision));
        }
    }, [dateRelease]);

    const validateForm = async () => {
        const newErrors: FormErrors = {};

        const addError = (field: string, error: string | undefined) => {
            if (error) newErrors[field] = error;
            else delete newErrors[field];
        };

        let idError = validateField(id, [
            required,
            minLength(3, 'Debe tener entre 3 y 10 caracteres!'),
            maxLength(10, 'Debe tener entre 3 y 10 caracteres!')
        ]);

        if (!idError && !urlId) {
            try {
                const result = await dispatch(verifyProduct(id)).unwrap();
                if (result) idError = 'ID ya existe!';
            } catch {
                idError = 'Error verificando el ID.';
            }
        }

        console.log('idError2', idError);
        addError('id', idError);
        addError('name', validateField(name, [
            required,
            minLength(5, 'Debe tener entre 5 y 100 caracteres!'),
            maxLength(100, 'Debe tener entre 5 y 100 caracteres!')
        ]));
        addError('description', validateField(description, [
            required,
            minLength(10, 'Debe tener entre 10 y 200 caracteres!'),
            maxLength(200, 'Debe tener entre 10 y 200 caracteres!')
        ]));
        addError('logo', validateField(logo, [required]));
        
        if (!urlId)
            addError('dateRelease', validateField(dateRelease, [
                required,
                minDate(new Date(), 'Debe ser igual o mayor a la fecha actual!')
            ]));
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if ((await validateForm()) === true) {
            const productData: Product = 
                { id, name, description, logo, date_release: dateRelease, date_revision: dateRevision };
            if (urlId)
                dispatch(editProduct(productData))
                    .unwrap()
                    .then(() => {
                        dispatch(setAlert({ message: 'Producto editado correctamente' }));
                        navigate('/products');
                    })
                    .catch(() => dispatch(setAlert({ message: 'Error al editar el producto. Vuelve a intentarlo.' })));
            else
                dispatch(addProduct(productData))
                    .unwrap()
                    .then(() => {
                        dispatch(setAlert({ message: 'Producto creado correctamente' }));
                        navigate('/products');
                    })
                    .catch(() => dispatch(setAlert({ message: 'Error al crear el producto. Vuelve a intentarlo.' })));
        }
    };

    const handleReset = useCallback(() => {
        setId(initialValues.id || '');
        setName(initialValues.name || '');
        setDescription(initialValues.description || '');
        setLogo(initialValues.logo || '');
        setDateRelease(initialValues.date_release || '');
        setDateRevision(initialValues.date_revision || '');
        setErrors({});
    }, [initialValues]);

    return (
        <div className="form-main">
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
                            disabled={!!urlId}
                        />
                        <FormField
                            label="Nombre"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            error={errors.name}
                            loading={loading}
                        />
                    </div>
                    <div className="form-row">
                        <FormField
                            label="Descripción"
                            textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            error={errors.description}
                            loading={loading}
                        />
                        <FormField
                            label="Logo"
                            type="text"
                            value={logo}
                            onChange={(e) => setLogo(e.target.value)}
                            error={errors.logo}
                            loading={loading}
                        />
                    </div>
                    <div className="form-row">
                        <FormField
                            label="Fecha Liberación"
                            type="date"
                            value={dateRelease}
                            onChange={(e) => setDateRelease(e.target.value)}
                            error={errors.dateRelease}
                            loading={loading}
                        />
                        <FormField
                            label="Fecha Revisión"
                            type="date"
                            value={dateRevision}
                            onChange={(e) => e.target.value = dateRevision}
                            loading={loading}
                            readOnly
                            disabled
                        />
                    </div>
                    <div className="form-actions">
                        <button type="button" className="cancel-button" onClick={handleReset}>Reiniciar</button>
                        <button 
                            type="submit" 
                            className={`submit-button ${Object.keys(errors).length > 0 || loadingSave ? 'disabled' : ''}`}
                        >
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProductForm;
