import React from 'react';
import Loader from 'components/base/Loader';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from 'hooks/useTypedSelector';
import TokenExpiredUI from 'components/base/TokenExpiredUI';
import { HomePageContainer, HomePageTitle } from 'pages/Home/components/Base';

const Home: React.FC = () => {
	const navigate = useNavigate();
	const { userName, email } = useTypedSelector(state => state.user);
	let { error, loading } = useTypedSelector(state => state.usersList);
	let ui = (
		<HomePageTitle>
			For using this app you need to log in or sign up
		</HomePageTitle>
	);

	React.useEffect(() => {
		if (email === 'admin@gmail.com') {
			navigate('users');
		} else if (email !== 'admin@gmail.com' && userName) {
			navigate('tasks');
		}
	}, []);

	if (localStorage.getItem('tokenExpirationTime') === 'expired') {
		setTimeout(() => localStorage.removeItem('tokenExpirationTime'), 1000);

		ui = <TokenExpiredUI error={'Your session time is over. Please, log in again.'} />;
	} else if (loading) {
		ui = <><Loader /></>;
	} else if (error) {
		ui = <>{error}</>;
	}

	return (
		<HomePageContainer>
			{ui}
		</HomePageContainer>
	);
};

export default Home;
