import { InitialState } from 'types/initialState';
import { parseUserObj } from 'tools/transformStrings';

const initialState: InitialState = {
	user: {
		userName: parseUserObj()?.userName,
		email: parseUserObj()?.email,
		phoneNumber: parseUserObj()?.phoneNumber,
		images: parseUserObj()?.images,
		sessionExpiration: Number(localStorage.getItem('tokenExpirationTime')),
		loading: false,
		error: null,
	},
	medicines: {
		medicines: [],
		loading: false,
		error: null,
	},
	clinics: {
		clinics: [],
		loading: true,
		error: null,
	},
	theme: {
		color: 'light',
	},
	usersList: {
		usersList: [],
		loading: false,
		error: null,
	},
	tasks: {
		tasks: [],
		loading: false,
		error: null,
	}
};

export default initialState;
