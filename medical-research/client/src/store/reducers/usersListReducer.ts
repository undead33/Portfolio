import { UsersListState, UsersListActionS, UsersListActionTypes } from 'types/usersList';
import initialState from 'store/reducers/initialState';

const usersListReducer = (state = initialState.usersList, action: UsersListActionS)
    : UsersListState => {
    switch (action.type) {
        case UsersListActionTypes.FETCH_USERSLIST:
            return { usersList: [], loading: true, error: null }

        case UsersListActionTypes.FETCH_USERSLIST_SUCCESS:
            return { usersList: action.payload, loading: false, error: null }

        case UsersListActionTypes.FETCH_USERSLIST_ERROR:
            return { usersList: [], loading: false, error: action.payload }

        default:
            return state;
    }
};

export default usersListReducer;
