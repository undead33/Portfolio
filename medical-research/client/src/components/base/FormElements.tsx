import { default as styledComponents } from 'styled-components';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import TypographyUI from '@mui/material/Typography';
import TextFieldUI from '@mui/material/TextField';
import FormControlLabelUI from '@mui/material/FormControlLabel';
import CheckboxUI from '@mui/material/Checkbox';
import ButtonUI from '@mui/material/Button';

export const FlexForm = styledComponents.form({
	minWidth: 327,
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	gridArea: 'form',
});

export const GridForm = styledComponents.form({
	minWidth: 279,
	width: '100%',
	padding: 24,
	display: 'flex',
	flexWrap: 'wrap',
	flexDirection: 'row',
	justifyContent: 'space-between',
	// display: 'grid',
	// gridTemplateRows: 'repeat(5, 90px)',
	// gridTemplateColumns: '1fr 1fr',
	// rowGap: 10,
	// columnGap: 15,
});

export const Container = styled(Box)({
	width: '100%',
	height: 'fit-content',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'space-between',
});

export const EmptyPlace = styled(Box)({
	height: 90,
	width: '100%',
});

export const TextFieldContainer = styled(Box)({
	height: 90,
	marginBottom: 10,
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
});

export const Label = styled(TypographyUI)({
	marginBottom: 15,
	fontSize: 32,
	fontWeight: 700,
	color: 'var(--colors-text-secondary)',
});

export const TextField = styled(TextFieldUI)({
	height: 66,
	background: 'var(--colors-bg)',
	width: '100%',
	label: {
		width: '100%',
		position: 'static',
	},
	input: {
		width: '100%',
		background: 'var(--colors-ui-secondary)',
		padding: 10,
		border: 'solid 1px',
	},
});

export const TextFieldDisabled = styled(TextFieldUI)({
	'div::before': {
		border: 0,
	},
	'marginBottom': 21,
	'border': 'solid 1px',
	'input': {
		padding: 0,
	},
	'div': {
		display: 'flex',
		flexDirection: 'row-reverse',
		padding: 10,
	},
});

export const FormControlLabel = styled(FormControlLabelUI)({
	margin: '15px 0 15px',
});

export const Checkbox = styled(CheckboxUI)({
	'height': 20,
	'width': 20,
	'color': 'var(--colors-ui-base)',
	'&.Mui-checked': {
		height: 20,
		width: 20,
		color: 'white',
		background: 'var(--colors-ui-base)',
		borderRadius: 0,
	},
});

export const ErrorMessage = styled(TypographyUI)({
	color: 'red',
	marginTop: 30,
	height: '60px',
	textAlign: 'center',
});

export const Button = styled(ButtonUI)({
	background: 'var(--colors-ui-base)',
	color: 'var(--colors-ui-secondary)',
	textAlign: 'center',
	width: 120,
	textTransform: 'capitalize',
	padding: '10px 0',
	fontSize: 14,
	fontWeight: 400,
	borderRadius: 0,
});

export const ButtonWide = styled(ButtonUI)({
	background: 'var(--colors-ui-base)',
	color: 'var(--colors-ui-secondary)',
	textAlign: 'center',
	margin: '0 26% 0 26%',
	width: '48%',
	textTransform: 'capitalize',
	padding: '10px 0',
	fontSize: 14,
	fontWeight: 400,
	borderRadius: 0,
});
