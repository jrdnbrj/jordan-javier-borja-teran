export const required = value => !value ? 'Este campo es requerido!' : null;
export const minLength = (length, message) => value => value.length < length ? message : null;
export const maxLength = (length, message) => value => value.length > length ? message : null;
export const exactDate = (date, message) => value => new Date(value).getTime() !== date.getTime() ? message : null;
export const minDate = (date, message) => value => new Date(value) < date ? message : null;

export const validateField = (field, value, rules) => {
    for (let rule of rules) {
        const error = rule(value);
        if (error) return error;
    }
    return null;
};
