
export const validatePassword = (value: string) => {
    if (!value) {
        return "La contraseña es requerida";
    }
    if (value.length < 8) {
        return "La contraseña debe tener al menos 8 caracteres";
    }
    if (!/(?=.*[A-Z])/.test(value)) {
        return "La contraseña debe contener al menos una mayúscula";
    }
    if (!/(?=.*[0-9])/.test(value)) {
        return "La contraseña debe contener al menos un número";
    }
    if (!/(?=.*[!@#$%^&*])/.test(value)) {
        return "La contraseña debe contener al menos un carácter especial";
    }
    return true; 
};

export const validateUsername = (value: string) =>{
    if (!value) {
        return "El nombre de usuario es requerido" ;
    }
    return true; 
};
// Validación para el email
export const validateEmail = (value: string) => {
    if (!value) {
        return "El email es requerido";
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
        return "El formato del email no es válido";
    }
    return true;
};

// Validación para el teléfono
export const validatePhone = (value: string) => {
    if (!value) {
        return "El número de teléfono es requerido";
    }
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(value)) {
        return "El número de teléfono debe contener 10 dígitos";
    }
    return true;
};

// Validación para la empresa
export const validateCompany = (value: string) => {
    if (!value) {
        return "El nombre de la empresa es requerido";
    }
    if (value.length < 3) {
        return "El nombre de la empresa debe tener al menos 3 caracteres";
    }
    return true;
};

// Validación de confirmación de contraseña
export const validateConfirmPassword = (password: string, confirmPassword: string) => {
    if (!confirmPassword) {
        return "Por favor, confirma tu contraseña";
    }
    if (password !== confirmPassword) {
        return "Las contraseñas no coinciden";
    }
    return true;
};

export const validateName = (value: string) => {
    if (!value) {
        return "El nombre es requerido";
    }
    return true;
};

export const validateLastName = (value: string) => {
    if (!value) {
        return "El apellido es requerido";
    }
    return true;
};
