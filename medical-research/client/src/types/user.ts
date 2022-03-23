export interface UserState {
    userName: string | undefined,
    email: string | null | undefined,
    phoneNumber: string | null | undefined,
    images: ImageObj[] | undefined,
    sessionExpiration: number,
    loading: boolean,
    error: null | string,
}

export interface UserObj {
    userName: string,
    email: string | null | undefined,
    phoneNumber: string | null | undefined,
    images: ImageObj[],
    sessionExpiration: number,
}

interface ImageObj {
    id: string,
    fileName: string,
    data: string | null | undefined,
}

export enum UserActionTypes {
    USER_LOGIN = 'USER_LOGIN',
    USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS',
    USER_LOGIN_ERROR = 'USER_LOGIN_ERROR',
    USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS',
    USER_LOGOUT = 'USER_LOGOUT',
}

interface UserLoginAction {
    type: UserActionTypes.USER_LOGIN,
};

interface UserLoginSuccessAction {
    type: UserActionTypes.USER_LOGIN_SUCCESS,
    payload: UserObj,
};

interface UserLoginErrorAction {
    type: UserActionTypes.USER_LOGIN_ERROR,
    payload: string,
};

interface UserUpdateInfoAction {
    type: UserActionTypes.USER_UPDATE_SUCCESS,
    payload: UserObj,
};

interface UserLogoutAction {
    type: UserActionTypes.USER_LOGOUT,
};

export type UserActionS = UserLoginAction | UserLoginSuccessAction |
    UserLoginErrorAction | UserUpdateInfoAction | UserLogoutAction;
