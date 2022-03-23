export interface UsersListState {
    usersList: any[],
    loading: boolean,
    error: null | string,
};

export enum UsersListActionTypes {
    FETCH_USERSLIST = 'FETCH_USERSLIST',
    FETCH_USERSLIST_SUCCESS = 'FETCH_USERSLIST_SUCCESS',
    FETCH_USERSLIST_ERROR = 'FETCH_USERSLIST_ERROR',
}

interface FetchUsersListAction {
    type: UsersListActionTypes.FETCH_USERSLIST,
};

interface FetchUsersListSuccessAction {
    type: UsersListActionTypes.FETCH_USERSLIST_SUCCESS,
    payload: any[],
};

interface FetchUsersListErrorAction {
    type: UsersListActionTypes.FETCH_USERSLIST_ERROR,
    payload: string,
};

export type UsersListActionS = FetchUsersListAction
    | FetchUsersListSuccessAction | FetchUsersListErrorAction
