import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { SignupFormValues, NewUserDataValues } from 'types/components';
import {
	FlexForm, Label, TextField, ErrorMessage, Button
} from 'components/base/FormElements';
import Stack from '@mui/material/Stack';
import { useUserActions } from 'hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';
import {
	emailAndPasswordValidation, phoneNumberValidation,
	confirmPasswordValidation, namesValidation
} from 'tools/formValidation';

const validationSchema = yup.object().shape({
	...namesValidation,
	...emailAndPasswordValidation,
	...phoneNumberValidation,
	...confirmPasswordValidation,
});
const initialFormValues: SignupFormValues = {
	firstName: '',
	lastName: '',
	phoneNumber: '',
	email: '',
	password: '',
	passwordConfirmation: '',
};

const SignupForm: React.FC<{}> = () => {
	const { userName, error } = useTypedSelector((state) => state.user);
	const navigate = useNavigate();
	const redirectToLogInPage = () => navigate('/login');
	const { userLoginSignup } = useUserActions();
	const sendSignupForm = (values: SignupFormValues) => {
		const {
			firstName,
			lastName,
			phoneNumber,
			email,
			password,
			passwordConfirmation,
		} = values;
		const newUserData: NewUserDataValues = {
			email,
			userName: `${firstName}_${lastName}`,
			phoneNumber,
			password,
			confirmPassword: passwordConfirmation,
		};

		userLoginSignup(newUserData, 'Register');
	};

	const formik = useFormik({
		initialValues: initialFormValues,
		validationSchema: validationSchema,
		onSubmit: sendSignupForm,
	});

	React.useEffect(() => {
		if (userName) {
			navigate('/home');
		}
	}, [userName, navigate]);

	return (
		<>
			<FlexForm onSubmit={formik.handleSubmit}>
				<Label>SIGN UP</Label>

				<TextField
					id='firstName'
					name='firstName'
					placeholder='Enter your first name'
					value={formik.values.firstName}
					onChange={formik.handleChange}
					error={formik.touched.firstName && Boolean(formik.errors.firstName)}
					helperText={formik.touched.firstName && formik.errors.firstName}
				/>

				<TextField
					id='lastName'
					name='lastName'
					placeholder='Enter your last name'
					value={formik.values.lastName}
					onChange={formik.handleChange}
					error={formik.touched.lastName && Boolean(formik.errors.lastName)}
					helperText={formik.touched.lastName && formik.errors.lastName}
				/>

				<TextField
					id='phoneNumber'
					name='phoneNumber'
					placeholder='Enter your phone number'
					value={formik.values.phoneNumber}
					onChange={formik.handleChange}
					error={
						formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
					}
					helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
				/>

				<TextField
					id='email'
					name='email'
					placeholder='Enter your E-mail'
					value={formik.values.email}
					onChange={formik.handleChange}
					error={formik.touched.email && Boolean(formik.errors.email)}
					helperText={formik.touched.email && formik.errors.email}
				/>

				<TextField
					id='password'
					name='password'
					placeholder='Enter your password'
					type='password'
					value={formik.values.password}
					onChange={formik.handleChange}
					error={formik.touched.password && Boolean(formik.errors.password)}
					helperText={formik.touched.password && formik.errors.password}
				/>

				<TextField
					id='passwordConfirmation'
					name='passwordConfirmation'
					placeholder='Confirm your password'
					type='password'
					value={formik.values.passwordConfirmation}
					onChange={formik.handleChange}
					error={
						formik.touched.passwordConfirmation &&
						Boolean(formik.errors.passwordConfirmation)
					}
					helperText={
						formik.touched.passwordConfirmation &&
						formik.errors.passwordConfirmation
					}
				/>

				<Stack
					direction={{ xs: 'column', sm: 'row' }}
					spacing={{ xs: 2, sm: 2 }}>
					<Button variant='contained' type='submit'>
						Sign Up
					</Button>

					<Button variant='contained' onClick={redirectToLogInPage}>
						Log In
					</Button>
				</Stack>

				<ErrorMessage>{error || ''}</ErrorMessage>
			</FlexForm>
		</>
	);
};

export default SignupForm;
