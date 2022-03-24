import { UsersListActionS, UsersListActionTypes } from 'types/usersList';
import { Dispatch } from 'redux';
import { getAllUsers } from 'api/user';
import axiosErrCatching from 'tools/axiosErrCatching';

export const fetchUsers = () =>
    async (dispatch: Dispatch<UsersListActionS>) => {
        dispatch({ type: UsersListActionTypes.FETCH_USERSLIST });
        let token: string | null = localStorage.getItem('token');

        try {
            const response = await getAllUsers(token);

            dispatch({
                type: UsersListActionTypes.FETCH_USERSLIST_SUCCESS,
                payload: response.data,
            });
        } catch (err: any) {
            let errMessage = axiosErrCatching(err.message, 'fetchUsers');

            dispatch({
                type: UsersListActionTypes.FETCH_USERSLIST_ERROR,
                payload: errMessage,
            });
        }
    };

export const clearUsersList = () => (dispatch: Dispatch<UsersListActionS>) => {
    dispatch({
        type: UsersListActionTypes.FETCH_USERSLIST_SUCCESS,
        payload: [],
    });
};
