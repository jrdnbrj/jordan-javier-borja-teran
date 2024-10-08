type ValidationRule = (value: string) => string | undefined;

export const required = (value: string): string | undefined => !value ? 'Este campo es requerido!' : undefined;

export const minLength = (length: number, message: string): ValidationRule => (value: string): string | undefined => 
    value.length < length ? message : undefined;

export const maxLength = (length: number, message: string): ValidationRule => (value: string): string | undefined => 
    value.length > length ? message : undefined;

export const exactDate = (date: Date, message: string): ValidationRule => (value: string): string | undefined => 
    new Date(value).getTime() !== date.getTime() ? message : undefined;

export const minDate = (date: Date, message: string): ValidationRule => (value: string): string | undefined => {
    const selectedDate = new Date(value);
    selectedDate.setHours(0, 0, 0, 0);
    const minAllowedDate = new Date(date);
    minAllowedDate.setHours(0, 0, 0, 0);
    return selectedDate >= minAllowedDate ? undefined : message;
};

export const validateField = (value: string, rules: ValidationRule[]): string | undefined => {
    for (const rule of rules) {
        const error = rule(value);
        if (error) return error;
    }
    return undefined;
};
