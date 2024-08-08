import { required, minLength, maxLength, exactDate, minDate, validateField } from '../pages/products/ProductForm/formValidation';

describe('Validation Functions', () => {
    describe('required', () => {
        it('returns an error message when value is empty', () => {
            expect(required('')).toBe('Este campo es requerido!');
        });

        it('returns undefined when value is not empty', () => {
            expect(required('test')).toBeUndefined();
        });
    });

    describe('minLength', () => {
        const rule = minLength(5, 'Debe tener al menos 5 caracteres!');

        it('returns an error message when value is shorter than the minimum length', () => {
            expect(rule('test')).toBe('Debe tener al menos 5 caracteres!');
        });

        it('returns undefined when value meets the minimum length', () => {
            expect(rule('testing')).toBeUndefined();
        });
    });

    describe('maxLength', () => {
        const rule = maxLength(10, 'Debe tener como máximo 10 caracteres!');

        it('returns an error message when value is longer than the maximum length', () => {
            expect(rule('this is a long text')).toBe('Debe tener como máximo 10 caracteres!');
        });

        it('returns undefined when value meets the maximum length', () => {
            expect(rule('short')).toBeUndefined();
        });
    });

    describe('exactDate', () => {
        const rule = exactDate(new Date('2023-01-01'), 'La fecha debe ser exactamente 01/01/2023');

        it('returns an error message when date does not match', () => {
            expect(rule('2023-01-02')).toBe('La fecha debe ser exactamente 01/01/2023');
        });

        it('returns undefined when date matches', () => {
            expect(rule('2023-01-01')).toBeUndefined();
        });
    });

    describe('minDate', () => {
        const rule = minDate(new Date('2023-01-01'), 'La fecha debe ser igual o posterior a 01/01/2023');

        it('returns an error message when date is before the minimum date', () => {
            expect(rule('2022-12-31')).toBe('La fecha debe ser igual o posterior a 01/01/2023');
        });

        it('returns undefined when date is equal to or after the minimum date', () => {
            expect(rule('2023-01-01')).toBeUndefined();
            expect(rule('2023-01-02')).toBeUndefined();
        });
    });

    describe('validateField', () => {
        it('returns the first error message when a rule fails', () => {
            const rules = [required, minLength(5, 'Debe tener al menos 5 caracteres!')];
            expect(validateField('', rules)).toBe('Este campo es requerido!');
            expect(validateField('test', rules)).toBe('Debe tener al menos 5 caracteres!');
        });

        it('returns undefined when all rules pass', () => {
            const rules = [required, minLength(5, 'Debe tener al menos 5 caracteres!')];
            expect(validateField('testing', rules)).toBeUndefined();
        });
    });
});