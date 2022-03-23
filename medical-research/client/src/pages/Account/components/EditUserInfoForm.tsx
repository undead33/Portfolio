import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { EditUserInfoFormValues, EditedUserInfoValues, } from 'types/components';
import InputAdornment from '@mui/material/InputAdornment';
import { RiLock2Fill } from 'react-icons/ri';
import {
	GridForm, TextFieldContainer, TextField, TextFieldDisabled, ButtonWide, ErrorMessage,
} from 'components/base/FormElements';
import { useUserActions } from 'hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { splitNameByUnderscore, splitNameByCamelCase } from 'tools/transformStrings';
import { v4 as uuidv4 } from 'uuid';
import { namesValidation, phoneNumberValidation } from 'tools/formValidation';

const validationSchema = yup.object().shape({ ...namesValidation, ...phoneNumberValidation });

const EditUserInfoForm: React.FC<{}> = () => {
	const {
		userName, phoneNumber, email, images, error
	} = useTypedSelector((state) => state.user);
	const navigate = useNavigate();
	const { userUpdatePersonalInfo } = useUserActions();
	let formattedUserName: string | undefined = userName?.includes('_')
		? splitNameByUnderscore(userName)
		: userName && splitNameByCamelCase(userName)
	const initialFormValues: EditUserInfoFormValues = {
		firstName: formattedUserName ? formattedUserName.split(' ')[0] : '',
		lastName: formattedUserName && formattedUserName.split(' ')[1]
			? formattedUserName.split(' ')[1] : '',
		phoneNumber: phoneNumber,
		email: email,
		userAvatar: images && images.length ? images[images.length - 1].data : '',
	};

	const sendEditUserInfoForm = (values: EditUserInfoFormValues) => {
		const {
			firstName,
			lastName,
			phoneNumber,
			email,
			userAvatar,
		} = values;
		const updatedUserData: EditedUserInfoValues = {
			userName: `${firstName}_${lastName}`,
			email: email,
			phoneNumber,
			images: [{
				id: uuidv4(),
				fileName: `${firstName}_${lastName}_avatar`,
				data: userAvatar,
			}],
		};

		userUpdatePersonalInfo(updatedUserData);
		navigate(-1);
	};

	const formik = useFormik({
		initialValues: initialFormValues,
		validationSchema: validationSchema,
		onSubmit: sendEditUserInfoForm,
	});

	const setAvatar = (e: any) => {
		if (e && e?.currentTarget && e?.currentTarget?.files) {
			let fileByteArray: string[] = [];
			const reader = new FileReader();

			reader.readAsArrayBuffer(e.target.files[0]);
			reader.onloadend = (e: any) => {
				if (e.target.readyState === FileReader.DONE) {
					const arrayBuffer = e.target.result;
					const array = new Uint8Array(arrayBuffer);

					for (let i = 0; i < array.length; i++) {
						fileByteArray.push(array[i].toString(2));
					}

					const userAvatarStirng = fileByteArray.join('');

					formik.setFieldValue("userAvatar", '01010101');
				}
			}
		}
	};

	return (
		<>
			<GridForm onSubmit={formik.handleSubmit}>
				<TextFieldContainer width={['100%', '49%']}>
					<label htmlFor='firstName'>First name</label>

					<TextField
						id='firstName'
						name='firstName'
						placeholder='Enter your first name'
						value={formik.values.firstName}
						onChange={formik.handleChange}
						error={formik.touched.firstName && Boolean(formik.errors.firstName)}
						helperText={formik.touched.firstName && formik.errors.firstName}
					/>
				</TextFieldContainer>

				<TextFieldContainer width={['100%', '49%']}>
					<label htmlFor='lastName'>Last name</label>

					<TextField
						id='lastName'
						name='lastName'
						placeholder='Enter your last name'
						value={formik.values.lastName}
						onChange={formik.handleChange}
						error={formik.touched.lastName && Boolean(formik.errors.lastName)}
						helperText={formik.touched.lastName && formik.errors.lastName}
					/>
				</TextFieldContainer>

				<TextFieldContainer width={['100%', '49%']}>
					<label htmlFor='email'>Login email</label>

					<TextFieldDisabled
						disabled
						id='email'
						name='email'
						defaultValue={email}
						variant='filled'
						InputProps={{
							startAdornment: (
								<InputAdornment position='end'>
									<RiLock2Fill />
								</InputAdornment>
							),
						}}
					/>
				</TextFieldContainer>

				<TextFieldContainer width={['100%', '49%']}>
					<label htmlFor='phoneNumber'>Phone number</label>

					<TextField
						id='phoneNumber'
						name='phoneNumber'
						placeholder='Enter your phone number'
						value={formik.values.phoneNumber ? formik.values.phoneNumber : ''}
						onChange={formik.handleChange}
						error={
							formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
						}
						helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
					/>
				</TextFieldContainer>

				<ButtonWide variant='contained' type='submit'>
					Update info
				</ButtonWide>

				<input
					hidden
					accept='image/*'
					id="userAvatar"
					name="userAvatar"
					type="file"
					onChange={(event) => setAvatar(event)}
				/>

				<ErrorMessage width={['100%', '49%']}>{error || ''}</ErrorMessage>
			</GridForm>
		</>
	);
};

export default EditUserInfoForm;
