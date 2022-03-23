import { ChangeThemeActionTypes, UserCheckActionS } from 'types/theme';
import { Dispatch } from 'redux';

export const changeThemeToDark = () => (dispatch: Dispatch<UserCheckActionS>) => {
    dispatch({ type: ChangeThemeActionTypes.CHANGE_THEME_TO_DARK });
}

export const changeThemeToLight = () => (dispatch: Dispatch<UserCheckActionS>) => {
    dispatch({ type: ChangeThemeActionTypes.CHANGE_THEME_TO_LIGHT });
}

export const changeThemeToMiddle = () => (dispatch: Dispatch<UserCheckActionS>) => {
    dispatch({ type: ChangeThemeActionTypes.CHANGE_THEME_TO_MIDDLE });
}
