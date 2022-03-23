import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';
import Layout from 'components/Layout';
import HomeApp from 'pages/Home/HomeApp';
import LogIn from 'pages/Login/Login';
import SignUp from 'pages/Signup/Signup';
import MedicinesApp from 'pages/Medicines/MedicinesApp';
import ClinicsApp from 'pages/Clinics/ClinicsApp';
import NotFound from 'pages/NotFound';
import Account from 'pages/Account/Account';
import { userLogout } from 'store/action-creators/user';
import { setUpInterceptors } from 'api/user';

setUpInterceptors(() => userLogout()(store.dispatch));

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Layout />}>
						<Route path='home/*' element={<HomeApp />} />
						<Route path='login' element={<LogIn />} />
						<Route path='signup' element={<SignUp />} />
						<Route path='medicines/*' element={<MedicinesApp />} />
						<Route path='clinics/*' element={<ClinicsApp />} />
						<Route path='account' element={<Account />} />
						<Route path='*' element={<NotFound />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
