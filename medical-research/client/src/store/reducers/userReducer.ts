import { UserState, UserActionTypes, UserActionS } from 'types/user';
import initialState from 'store/reducers/initialState';

const userReducer = (state = initialState.user, action: UserActionS): UserState => {
    const logoutUserState = {
        userName: '',
        email: '',
        phoneNumber: '',
        images: [],
        sessionExpiration: 0,
        loading: false,
        error: null,
    };

    switch (action.type) {
        case UserActionTypes.USER_LOGIN:
            return { ...logoutUserState, loading: true, };

        case UserActionTypes.USER_LOGIN_SUCCESS:
        case UserActionTypes.USER_UPDATE_SUCCESS:
            return { ...action.payload, loading: false, error: null };

        case UserActionTypes.USER_LOGIN_ERROR:
            return { ...logoutUserState, error: action.payload, };

        case UserActionTypes.USER_LOGOUT:
            return { ...logoutUserState };

        default:
            return state;
    }
};

export default userReducer;
