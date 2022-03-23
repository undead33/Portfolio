import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import SmallMenu from 'pages/Account/components/SmallMenu';
import EditUserInfoForm from 'pages/Account/components/EditUserInfoForm';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { splitNameByUnderscore, splitNameByCamelCase } from 'tools/transformStrings';

const Container = styled(Box)({
	padding: 24,
	height: 200,
	width: '100%',
	display: 'grid',
	gridTemplateColumns: '100px 1fr 20px',
	gap: 15,
	alignItems: 'end',
	justifyItems: 'left',
	background: 'var(--colors-ui-base)',
});

const UserPhoto = styled(Avatar)({
	height: 100,
	width: 100,
	border: 'solid 2px white',
});

const UserName = styled(Typography)({
	marginBottom: 10,
	textTransform: 'capitalize',
	fontSize: 24,
	color: 'var(--colors-ui-secondary)',
});

const H1 = styled(Typography)({
	width: '100%',
	padding: '28px 24px 10px',
	fontSize: 28,
	color: 'var(--colors-ui-base)',
});

const H3 = styled(Typography)({
	width: 'calc(100% - 48px)',
	margin: '0 24px',
	padding: '0 0 14px 0',
	fontSize: 18,
	color: 'var(--colors-ui-base)',
	borderBottom: 'solid 1px var(--colors-ui-base)',
});

const Account: React.FC = () => {
	const { userName } = useTypedSelector((state) => state.user);
	const navigate = useNavigate();

	React.useEffect(() => {
		if (!userName) {
			navigate('/');
		}
	}, [userName, navigate]);

	return (
		<>
			<Container>
				<UserPhoto src={require('../../images/user.jfif')} />
				<UserName>
					{userName?.includes('_')
						? splitNameByUnderscore(userName)
						: userName && splitNameByCamelCase(userName)}
				</UserName>
				<SmallMenu />
			</Container>
			<H1>My Account</H1>
			<H3>View and edit your personal info below.</H3>
			<EditUserInfoForm />
		</>
	);
};

export default Account;
