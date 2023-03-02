/**
 * Project Hysacam
 * File oauth.action
 * Path app/redux/oauth
 * Created by BRICE ZELE
 * Date: 13/09/2021
 */

import Config from 'react-native-config';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import AuthActions from './oauth.types';
import {ApiAction} from '../index';
import ServerUrl from '../../config/ServerUrl';
import {store} from '../../store';

export const fetchAuthKeyPending = () => ({
    type: AuthActions.AUTH_KEY_PENDING,
});

export const fetchAuthKeyReset =
    () => (dispatch: ThunkDispatch<{}, {}, AnyAction>) =>
        dispatch({
            type: AuthActions.AUTH_KEY_RESET,
        });

export const fetchAuthKeySuccess = (authkey: any) => ({
    type: AuthActions.AUTH_KEY_SUCCESS,
    payload: authkey,
});

export const fetchAuthKeyError = (error: any) => ({
    type: AuthActions.AUTH_KEY_ERROR,
    payload: error,
});

/*
export const fetchAuthKey = () =>
    ApiAction({
        url: ServerUrl.oauth,
        method: 'POST',
        auth: {
            username: Config.JWT_SECRET_LOGIN,
            password: Config.JWT_SECRET_KEY,
        },
        onLoading: fetchAuthKeyPending,
        // @ts-ignore
        onSuccess: fetchAuthKeySuccess,
        // @ts-ignore
        onError: fetchAuthKeyError,
    });*/

/**
 * ********************************************************
 */
export const fetchSignIn = (data) => {

    return ApiAction({
        url: ServerUrl.signin,
        method: 'POST',
        data,
        onLoading: fetchAuthKeyPending,
        // @ts-ignore
        onSuccess: fetchAuthKeySuccess,
        // @ts-ignore
        onError: fetchAuthKeyError,
    });
};
