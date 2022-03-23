import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as UserActionCreators from 'store/action-creators/user';
import * as UsersListActionCreators from 'store/action-creators/usersList';
import * as MedicinesActionCreators from 'store/action-creators/medicines';
import * as ClinicsActionCreators from 'store/action-creators/clinics';
import * as TasksActionCreators from 'store/action-creators/tasks';
import * as ThemeActionCreators from 'store/action-creators/theme';

export const useUserActions = () => {
    const dispatch = useDispatch();

    return bindActionCreators(UserActionCreators, dispatch);
}

export const useUsersListActions = () => {
    const dispatch = useDispatch();

    return bindActionCreators(UsersListActionCreators, dispatch);
}

export const useMedicinesActions = () => {
    const dispatch = useDispatch();

    return bindActionCreators(MedicinesActionCreators, dispatch);
}

export const useClinicsActions = () => {
    const dispatch = useDispatch();

    return bindActionCreators(ClinicsActionCreators, dispatch);
}

export const useTasksActions = () => {
    const dispatch = useDispatch();

    return bindActionCreators(TasksActionCreators, dispatch);
}

export const useThemeActions = () => {
    const dispatch = useDispatch();

    return bindActionCreators(ThemeActionCreators, dispatch);
}
