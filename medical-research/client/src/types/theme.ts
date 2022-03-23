export interface ThemeState {
    color: string,
};

export enum ChangeThemeActionTypes {
    CHANGE_THEME_TO_DARK = 'CHANGE_THEME_TO_DARK',
    CHANGE_THEME_TO_LIGHT = 'CHANGE_THEME_TO_LIGHT',
    CHANGE_THEME_TO_MIDDLE = 'CHANGE_THEME_TO_MIDDLE',
}

interface ChangeThemeToDarkAction {
    type: ChangeThemeActionTypes.CHANGE_THEME_TO_DARK,
};

interface ChangeThemeToLightkAction {
    type: ChangeThemeActionTypes.CHANGE_THEME_TO_LIGHT,
};

interface ChangeThemeToMiddleAction {
    type: ChangeThemeActionTypes.CHANGE_THEME_TO_MIDDLE,
};

export type UserCheckActionS = ChangeThemeToDarkAction
    | ChangeThemeToLightkAction | ChangeThemeToMiddleAction
