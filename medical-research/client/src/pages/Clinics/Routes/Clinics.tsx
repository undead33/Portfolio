import React from 'react';
import { useClinicsActions } from 'hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Loader from 'components/base/Loader';
import ClinicsTable from 'pages/Clinics/components/ClinicsTable';
import AddClinicModalWindow from 'pages/Clinics/components/AddClinicModalWindow';
import {
	EmptyDataListContainer, AddBtnModalWindowWrapper
} from 'components/base/DataListUI';

const ClinicsContainer = styled(Box)({
	display: 'grid',
	marginTop: 40,
});

const Clinics: React.FC = () => {
	const { fetchClinics } = useClinicsActions();
	const { clinics, error, loading } = useTypedSelector(state => state.clinics);
	const { email } = useTypedSelector(state => state.user);

	let ui = (
		<ClinicsContainer>
			<ClinicsTable clinics={clinics} />
			{email === 'admin@gmail.com'
				? <AddClinicModalWindow />
				: null}
		</ClinicsContainer>
	);

	React.useMemo(() => {
		fetchClinics();
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
							<AddClinicModalWindow />
						</AddBtnModalWindowWrapper>
					) : null}
			</EmptyDataListContainer>
		);
	}

	return ui;
}

export default Clinics;
