import usersListReducer from 'store/reducers/usersListReducer';
import initialState from 'store/reducers/initialState';
import { UsersListState, UsersListActionS, UsersListActionTypes } from 'types/usersList';

it('should return the initial state', () => {
    const result = usersListReducer(initialState.usersList,
        { type: UsersListActionTypes.FETCH_USERSLIST }
    );

    expect(result).toEqual({ usersList: [], loading: true, error: null });
});

it('should return the users list', () => {
    const result = usersListReducer(initialState.usersList,
        { type: UsersListActionTypes.FETCH_USERSLIST_SUCCESS, payload: ['test', 'test'] }
    );

    expect(result).toEqual({ usersList: ['test', 'test'], loading: false, error: null });
});

// test('should handle a todo being added to an empty list', () => {
//   const previousState = []
//   expect(reducer(previousState, todoAdded('Run the tests'))).toEqual([
//     {
//       text: 'Run the tests',
//       completed: false,
//       id: 0
//     }
//   ])
// })

// test('should handle a todo being added to an existing list', () => {
//   const previousState = [
//     {
//       text: 'Run the tests',
//       completed: true,
//       id: 0
//     }
//   ]
//   expect(reducer(previousState, todoAdded('Use Redux'))).toEqual([
//     {
//       text: 'Run the tests',
//       completed: true,
//       id: 0
//     },
//     {
//       text: 'Use Redux',
//       completed: false,
//       id: 1
//     }
//   ])
// })