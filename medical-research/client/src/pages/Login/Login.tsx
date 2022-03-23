import React from 'react';
import Loader from 'components/base/Loader';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import LogInForm from 'pages/Login/components/LoginForm';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { useUsersListActions, useUserActions } from 'hooks/useActions';

export const LogInPageArea = styled(Box)({
	height: 640,
	width: '100%',
	justifySelf: 'center',
	maxWidth: 1024,
	display: 'grid',
	gap: '5%',
});

export const LogInPageImage = styled.img({
	objectFit: 'cover',
	width: '100%',
	height: '100%',
	gridArea: 'image',
});

const LogIn: React.FC = () => {
	const { loading } = useTypedSelector(state => state.user);
	const { userLogout } = useUserActions();
	const { clearUsersList } = useUsersListActions();

	React.useMemo(() => {
		userLogout();
		clearUsersList();

		localStorage.removeItem('token');
		localStorage.removeItem('tokenExpirationTime');
		localStorage.removeItem('user');
	}, []);

	if (loading) {
		return <><Loader /></>;
	}

	return (
		<LogInPageArea
			gridTemplateColumns={['1fr', '1fr 1fr']}
			gridTemplateAreas={['"form"', '"image form"']}
		>
			<Box display={['none', 'flex']}>
				<LogInPageImage src={require('../../images/loginAside.jpg')} />
			</Box>

			<LogInForm />
		</LogInPageArea>
	);
};

export default LogIn;
