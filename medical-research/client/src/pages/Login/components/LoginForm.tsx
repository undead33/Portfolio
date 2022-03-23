import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { LoginFormValues } from 'types/components';
import {
	FlexForm, Label, TextField, ErrorMessage, Button,
} from 'components/base/FormElements';
import Stack from '@mui/material/Stack';
import { useUserActions } from 'hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { emailAndPasswordValidation } from 'tools/formValidation';

const validationSchema = yup.object().shape(emailAndPasswordValidation);

const initialFormValues: LoginFormValues = {
	email: '',
	password: '',
};

const LogInForm: React.FC<{}> = () => {
	const { userName, error } = useTypedSelector((state) => state.user);
	const navigate = useNavigate();
	const redirectToSignUpPage = () => navigate('/signup');
	const { userLoginSignup } = useUserActions();
	const sendLoginForm = (values: LoginFormValues) => {
		userLoginSignup(values, 'Login');
	};

	const formik = useFormik({
		initialValues: initialFormValues,
		validationSchema: validationSchema,
		onSubmit: sendLoginForm,
	});

	React.useEffect(() => {
		if (userName) {
			navigate('/home');
		}
	}, [userName, navigate]);

	return (
		<FlexForm onSubmit={formik.handleSubmit}>
			<Label>LOG IN</Label>

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

			<Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 2 }}>
				<Button variant='contained' type='submit'>
					Log In
				</Button>

				<Button variant='contained' onClick={redirectToSignUpPage}>
					Sign Up
				</Button>
			</Stack>

			<ErrorMessage>{error || ''}</ErrorMessage>
		</FlexForm>
	);
};

export default LogInForm;
