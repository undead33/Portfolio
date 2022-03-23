import { combineReducers } from 'redux';
import usersListReducer from 'store/reducers/usersListReducer';
import tasksReducer from 'store/reducers/tasksReducer';
import medicinesReducer from 'store/reducers/medicinesReducer';
import clinicsReducer from 'store/reducers/clinicsReducer';
import userReducer from 'store/reducers/userReducer';
import themeReducer from 'store/reducers/themeReducer';

export const rootReducer = combineReducers({
    usersList: usersListReducer,
    tasks: tasksReducer,
    medicines: medicinesReducer,
    clinics: clinicsReducer,
    user: userReducer,
    theme: themeReducer,
});

export type RootState = ReturnType<typeof rootReducer>
