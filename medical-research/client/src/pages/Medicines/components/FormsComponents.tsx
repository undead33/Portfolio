import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

export const SelectsContainer = styled(Box)({
	paddingTop: 5,
	display: 'grid',
	gridTemplateRows: 'repeat(86px, 4)',
});

export const InputsContainer = styled(Box)({
	paddingTop: 5,
	display: 'grid',
	gridTemplateRows: '56px 23px 237px',
});

export const FormHelper = styled(FormHelperText)({
	color: '#d32f2f',
});

export const DatePickerFormHelper = styled(FormHelperText)({
	color: '#d32f2f',
	marginLeft: 14,
});

interface BasicSelectProps {
	label: string;
	name: string;
	options: string[];
	value: any;
	onChange: any;
	error: any;
	helperText: any;
}

interface DatePickerProps {
	label: string;
	name: string;
	fieldValue: any;
	setField: any;
	error: any;
	helperText: any;
}

export const BasicSelect: React.FC<BasicSelectProps> = ({
	label, name, options, value, onChange, error, helperText
}) => {
	return (
		<Box>
			<FormControl fullWidth>
				<InputLabel id='demo-simple-select-label'>{label}</InputLabel>

				<Select
					labelId='demo-simple-select-label'
					id='demo-simple-select'
					name={name}
					value={value}
					onChange={onChange}
					label={label}
					error={error}
				>
					{options.map((option, i) => (
						<MenuItem key={option} value={i}>
							{option}
						</MenuItem>
					))}
				</Select>

				<FormHelper>{helperText}</FormHelper>
			</FormControl>
		</Box>
	);
};

export const DatePickerInput: React.FC<DatePickerProps> = ({
	label, setField, fieldValue, helperText, ...params
}) => {
	const date: Date | null = fieldValue ? new Date(fieldValue) : null;
	const [value, setValue] = React.useState(date);

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<DatePicker
				label={label}
				value={value}
				onChange={(newValue: Date | null) => {
					setValue(newValue);
					setField(params.name, newValue);
				}}
				renderInput={(params) => <TextField {...params} />}
			/>

			<DatePickerFormHelper>{helperText}</DatePickerFormHelper>
		</LocalizationProvider>
	);
};
