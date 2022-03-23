import * as yup from 'yup';

const phoneRegExp = /^((\+?375-?)|(8-?0))(25|29|33|44|17)-?[1-9](\d{2}-?){2}\d{2}$/;

export const phoneNumberValidation = {
    phoneNumber: yup
        .string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .required('Phone number is required'),
};

export const namesValidation = {
    firstName: yup
        .string()
        .min(2, 'First name should be from 2 characters to 20')
        .max(20, 'First name should be from 2 characters to 20')
        .required('First name is required'),
    lastName: yup
        .string()
        .min(2, 'Last name should be from 2 characters to 20')
        .max(20, 'Last name should be from 2 characters to 20')
        .required('Last name is required'),
};

export const emailAndPasswordValidation = {
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(3, 'The minimum password length is 3')
        .max(20, 'The maximum password length is 20')
        .required('Password is required'),
};

export const taskValidation = {
    title: yup
        .string()
        .min(8, 'Task title should be from 8 characters to 20')
        .max(20, 'Task title should be from 8 characters to 20')
        .required('Title is required'),
};

export const confirmPasswordValidation = {
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), null], "Passwords don't match.")
        .required('Password is required'),
};

export const medicineValidation = {
    type: yup.string().required('Choose type of medicine'),
    dosageForm: yup.string().required('Choose dosage form of medicine'),
    container: yup.string().required('Choose container of medicine'),
    state: yup.string().required('Choose state of medicine'),
    expireAt: yup.string()
        .min(10, 'Minimum length is 10 characters')
        .required('Choose expiration date of medicine')
        .nullable(true),
    description: yup
        .string()
        .min(10, 'Minimum length is 10 characters')
        .max(100, 'Maximum length is 100 characters')
        .required('Write description of medicine'),
};

export const clinicValidation = {
    name: yup
        .string()
        .min(6, 'Clinic name should be from 6 characters to 20')
        .max(20, 'Clinic name should be from 6 characters to 20')
        .required('Clinic name is required'),
    city: yup
        .string()
        .min(6, 'City name should be from 6 characters to 20')
        .max(20, 'City name should be from 6 characters to 20')
        .required('City name is required'),
    address: yup
        .string()
        .min(6, 'Address should be from 6 characters to 20')
        .max(20, 'Address should be from 6 characters to 20')
        .required('Address is required'),
    phone: yup
        .string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .required('Phone number is required'),
};
