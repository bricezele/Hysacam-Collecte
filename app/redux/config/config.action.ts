/**
 * Project YooLearn
 * File config.action
 * Path app/redux/config
 * Created by BRICE ZELE
 * Date: 25/08/2021
 */
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {ConfigTypes} from './config.types';
import {Currency} from '../../enum/Currency.enum';

const changeTheme = (theme: string) => ({
    type: ConfigTypes.CHANGE_THEME,
    theme,
});

const changeFont = (font: any) => ({
    type: ConfigTypes.CHANGE_FONT,
    font,
});

const forceTheme = (force_dark: any) => ({
    type: ConfigTypes.FORCE_APPEARANCE,
    force_dark,
});

const changeLanguge = (language: any) => ({
    type: ConfigTypes.CHANGE_LANGUAGE,
    language,
});

const changeCurrency = (currency: string) => ({
    type: ConfigTypes.CHANGE_CURRENCY,
    currency,
});

const appIntroduction = (introSlidesShown: boolean) => ({
    type: ConfigTypes.APP_INTRO,
    introSlidesShown,
});

const showConfettiAction = (showConfetti: boolean) => ({
    type: ConfigTypes.SHOW_CONFETTI,
    showConfetti,
});

export const onAppIntroduction =
    (introSlidesShown: boolean) =>
    (dispatch: ThunkDispatch<undefined, undefined, AnyAction>) => {
        try {
            dispatch(appIntroduction(introSlidesShown));
        } catch (error) {
            // log.error('appIntroduction', error);
        }
    };

export const onShowConfetti =
    (isConfettiShow: boolean) =>
    (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
        dispatch(showConfettiAction(isConfettiShow));
    };

export const onChangeTheme =
    (theme: string) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
        dispatch(changeTheme(theme));
    };

export const onForceTheme =
    (mode: any) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
        dispatch(forceTheme(mode));
    };

export const onChangeFont =
    (font: any) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
        dispatch(changeFont(font));
    };

export const onChangeLanguage =
    (language: any) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
        dispatch(changeLanguge(language));
    };

export const onChangeCurrency =
    (currency: string) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
        dispatch(changeCurrency(currency));
    };
