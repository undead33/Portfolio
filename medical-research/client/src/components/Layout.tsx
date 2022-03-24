import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import { GrTwitter, GrFacebookOption, GrLinkedinOption, GrLinkedin } from 'react-icons/gr';
import { FiTwitter, FiFacebook } from 'react-icons/fi';
import ResponsiveAppBar from 'components/ResponsiveAppBar';
import { useThemeActions } from 'hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { HomePageContainer, HomePageTitle } from 'pages/Home/components/Base';

const NavbarContainer = styled(Box)({
	marginBottom: 14,
	display: 'grid',
	gridTemplateColumns: '1fr 1fr 1fr',
	alignItems: 'center',
	padding: 0,
	width: '100%',
	height: '40px',
	borderTop: '2px solid var(--colors-ui-base)',
});

const NavLinkUI = styled(NavLink)({
	color: 'var(--colors-ui-base)',
	textDecoration: 'none',
	textAlign: 'center',
	padding: '12px 20px',
});

const FooterContainer = styled(Box)({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
});

const SocialLinksContainer = styled(Box)({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: '20px 0',
	width: 100,
});

const CopyrightContainer = styled(Box)({
	display: 'flex',
	alignItems: 'center',
	padding: '20px 0',
});

const Layout: React.FC = () => {
	const { userName } = useTypedSelector(state => state.user);
	const { color } = useTypedSelector(state => state.theme);
	const { changeThemeToDark, changeThemeToLight } = useThemeActions();
	const changeTheme = () => {
		if (color === 'light') {
			changeThemeToDark();
		} else {
			changeThemeToLight();
		}
	}

	React.useEffect(() => {
		document.body.setAttribute('data-theme', color);
	}, [color]);

	return (
		<>
			<header>
				<ResponsiveAppBar />
			</header>

			<main>
				{userName ? (
					<NavbarContainer>
						<NavLinkUI to='home'>Home</NavLinkUI>
						<NavLinkUI to='medicines'>Medicines</NavLinkUI>
						<NavLinkUI to='clinics'>Clinics</NavLinkUI>
					</NavbarContainer>
				) : (
					<>
						<NavbarContainer />
						{window.location.pathname === '/' ?
							<HomePageContainer>
								<HomePageTitle>
									For using this app you need to log in or sign up
								</HomePageTitle>
							</HomePageContainer> : null}
					</>
				)}

				<Outlet />
			</main>

			<footer>
				<FooterContainer>
					{color === 'light' ? (
						<SocialLinksContainer>
							<GrTwitter />
							<GrFacebookOption />
							<GrLinkedinOption />
						</SocialLinksContainer>
					) : (
						<SocialLinksContainer>
							<FiTwitter />
							<FiFacebook />
							<GrLinkedin />
						</SocialLinksContainer>
					)}

					<CopyrightContainer onClick={changeTheme}>
						&#169; 2020 Medical Research
					</CopyrightContainer>
				</FooterContainer>
			</footer>
		</>
	);
};

export default Layout;
