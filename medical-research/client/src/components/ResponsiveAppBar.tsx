import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import DropDownMenu from 'components/base/DropDownMenu';
import { BsPersonCircle } from 'react-icons/bs';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { splitNameByUnderscore, splitNameByCamelCase } from 'tools/transformStrings';

const Headerbar = styled(Box)({
	width: '100%',
	maxWidth: 1024,
	height: 120,
	display: 'flex',
	justifyContent: 'space-between',
});

const CompanyLogo = styled.img({
	objectFit: 'cover',
	height: 120,
	width: 120,
});

const CurrentUserArea = styled(Box)({
	display: 'flex',
	alignItems: 'center',
	marginTop: 40,
});

const UserName = styled(Typography)({
	color: 'var(--colors-text-secondary)',
});

const LoginPageLink = styled(Link)({
	margin: '0 15px',
	color: 'var(--colors-text-secondary)',
	textDecoration: 'none',
});

const ResponsiveAppBar: React.FC = () => {
	const { userName } = useTypedSelector((state) => state.user);

	return (
		<Headerbar>
			<Link to='home'>
				<CompanyLogo src={require('../images/logo.png')} />
			</Link>

			{userName ? (
				<CurrentUserArea>
					<Avatar src={require('../images/user.jfif')} />

					<UserName marginLeft={3} fontSize={20} display={['none', 'block']}>
						{userName?.includes('_')
							? splitNameByUnderscore(userName)
							: userName && splitNameByCamelCase(userName)
						}
					</UserName>

					<DropDownMenu />
				</CurrentUserArea>
			) : (
				<CurrentUserArea>
					<BsPersonCircle size={40} color={'var(--colors-ui-base)'} />

					<LoginPageLink to='login'>Log In</LoginPageLink>
				</CurrentUserArea>
			)}
		</Headerbar>
	);
};

export default ResponsiveAppBar;
