import { ThemeState, ChangeThemeActionTypes, UserCheckActionS } from 'types/theme';
import initialState from 'store/reducers/initialState';

const researchReducer = (state = initialState.theme, action: UserCheckActionS)
    : ThemeState => {
    switch (action.type) {
        case ChangeThemeActionTypes.CHANGE_THEME_TO_DARK:
            return { color: 'dark', };

        case ChangeThemeActionTypes.CHANGE_THEME_TO_LIGHT:
            return { color: 'light', };

        case ChangeThemeActionTypes.CHANGE_THEME_TO_MIDDLE:
            return { color: 'middle', };

        default:
            return state;
    }
};

export default researchReducer;
