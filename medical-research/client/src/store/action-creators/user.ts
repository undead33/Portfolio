import { LoginFormValues, EditedUserInfoValues, } from 'types/components';
import { UserActionS, UserActionTypes } from 'types/user';
import { Dispatch } from 'redux';
import { authorizationReq, updatedPersonalInfoReq } from 'api/user';
import axiosErrCatching from 'tools/axiosErrCatching';
import jwt_decode from 'jwt-decode';

export const userLoginSignup = (userData: LoginFormValues, requestType: string) =>
	async (dispatch: Dispatch<UserActionS>) => {
		dispatch({ type: UserActionTypes.USER_LOGIN });
		try {
			const response = await authorizationReq(userData, requestType);
			const { user, token } = response.data;
			const parsedToken: any = jwt_decode(token);

			localStorage.setItem('token', token);
			localStorage.setItem('tokenExpirationTime', `${(parsedToken.exp * 1000)}`);
			localStorage.setItem('user', JSON.stringify(user));

			dispatch({
				type: UserActionTypes.USER_LOGIN_SUCCESS,
				payload: { ...user, sessionExpiration: parsedToken.exp * 1000 },
			});
		} catch (err: any) {
			let errMessage = axiosErrCatching(err.message, requestType);

			dispatch({
				type: UserActionTypes.USER_LOGIN_ERROR,
				payload: errMessage,
			});
		}
	};

export const userUpdatePersonalInfo = (updatedPersonalInfo: EditedUserInfoValues) =>
	async (dispatch: Dispatch<UserActionS>) => {
		dispatch({ type: UserActionTypes.USER_LOGIN });
		let token: string | null = localStorage.getItem('token');

		try {
			const response = await updatedPersonalInfoReq(updatedPersonalInfo, token);

			if (response.status === 200 && token) {
				const parsedToken: any = jwt_decode(token);

				dispatch({
					type: UserActionTypes.USER_UPDATE_SUCCESS,
					payload: {
						...updatedPersonalInfo,
						sessionExpiration: parsedToken.exp * 1000
					},
				});
			}
		}
		catch (err: any) {
			let errMessage = axiosErrCatching(err.message, 'userUpdatePersonalInfo');

			dispatch({
				type: UserActionTypes.USER_LOGIN_ERROR,
				payload: errMessage,
			});
		}
	};

export const userLogout = () => (dispatch: Dispatch<UserActionS>) => {
	dispatch({ type: UserActionTypes.USER_LOGOUT, });
};
