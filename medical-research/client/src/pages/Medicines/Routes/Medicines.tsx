import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import TableWithPagination from 'pages/Medicines/components/TableWithPagination';
import { AddMedicineModalWindow } from 'pages/Medicines/components/AddMedicineModalWindow';
import { useMedicinesActions } from 'hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';
import Loader from 'components/base/Loader';
import { EmptyDataListContainer, AddBtnModalWindowWrapper } from 'components/base/DataListUI';

const MedicinesContainer = styled(Box)({
	marginTop: 40,
	display: 'grid',
	gridTemplateRows: '40px 1fr',
	gridTemplateColumns: '1fr 1fr',
	gap: 10,
});

const SearchBar = styled(Box)({
	display: 'flex',
});

const StyledOutlinedInput = styled(OutlinedInput)({
	marginRight: 10,
	input: {
		width: 200,
		padding: 8.5,
	},
	display: 'grid',
});

const StyledSecondaryBtn = styled(Button)({
	background: 'var(--colors-bg-btns)',
	textTransform: 'capitalize',
	justifySelf: 'right',
});

const TableWithPaginationContainer = styled(Box)({
	gridColumnStart: 1,
	gridColumnEnd: 3,
});

const Medicines: React.FC = () => {
	const { fetchMedicines } = useMedicinesActions();
	const { medicines, error, loading } = useTypedSelector(state => state.medicines);
	const { email } = useTypedSelector(state => state.user);

	let ui = (
		<MedicinesContainer>
			<SearchBar>
				<StyledOutlinedInput placeholder='&#128269; Search...' />
				<StyledSecondaryBtn variant='contained'>
					go
				</StyledSecondaryBtn>
			</SearchBar>
			{email === 'admin@gmail.com'
				? <AddMedicineModalWindow />
				: null}
			<TableWithPaginationContainer>
				<TableWithPagination medicines={medicines} />
			</TableWithPaginationContainer>
		</MedicinesContainer>
	);

	React.useMemo(() => {
		fetchMedicines();
	}, []);

	if (loading) {
		ui = <><Loader /></>;
	} else if (error) {
		ui = (
			<EmptyDataListContainer>
				{error}
				{email === 'admin@gmail.com'
					? (
						<AddBtnModalWindowWrapper>
							<AddMedicineModalWindow />
						</AddBtnModalWindowWrapper>
					) : null}
			</EmptyDataListContainer>
		);
	}

	return ui;
};

export default Medicines;

// const medicines = [
// 	{

// 		id: '1dd',
// 		type: '1',
// 		description: 'dd',
// 		dosageForm: '1',
// 		container: '1',
// 		state: '1',
// 		expireAt: '2022-03-01T18:22:43.655Z',
// 	},
// 	{
// 		id: '2dd',
// 		type: '1',
// 		description: 'dd',
// 		dosageForm: '1',
// 		container: '1',
// 		state: '1',
// 		expireAt: '2022-03-01T18:22:43.655Z',
// 	},
// 	{
// 		id: '3dd',
// 		type: '1',
// 		description: 'dd',
// 		dosageForm: '1',
// 		container: '1',
// 		state: '1',
// 		expireAt: '2022-03-01T18:22:43.655Z',
// 	},
// 	{
// 		id: '4dd',
// 		type: '1',
// 		description: 'dd',
// 		dosageForm: '1',
// 		container: '1',
// 		state: '1',
// 		expireAt: '2022-03-01T18:22:43.655Z',
// 	},
// ];
