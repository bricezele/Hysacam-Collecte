/**
 * Project YooLearn
 * File user.action
 * Path app/redux/user
 * Created by BRICE ZELE
 * Date: 26/08/2021
 */
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import UserActionsType from './user.types';
import {ApiAction} from '../index';
import ServerUrl from '../../config/ServerUrl';

export const fetchSignUpPending = () => ({
    type: UserActionsType.SIGN_UP_PENDING,
});
export const fetchSignUpReset =
    () => (dispatch: ThunkDispatch<{}, {}, AnyAction>) =>
        dispatch({
            type: UserActionsType.SIGN_UP_RESET,
        });
export const fetchSignUpSuccess = (user: any) => ({
    type: UserActionsType.SIGN_UP_SUCCESS,
    payload: user,
});
export const fetchSignUpError = (error: any) => ({
    type: UserActionsType.SIGN_UP_ERROR,
    payload: error,
});
export const fetchSignUp = (data) => {
    return ApiAction({
        url: ServerUrl.signup,
        method: 'POST',
        data,
        onLoading: fetchSignUpPending,
        // @ts-ignore
        onSuccess: fetchSignUpSuccess,
        // @ts-ignore
        onError: fetchSignUpError,
    });
};

export const fetchGetTrajetPending = () => ({
    type: UserActionsType.GET_TRAJET_PENDING,
});
export const fetchGetTrajetReset =
    () => (dispatch: ThunkDispatch<{}, {}, AnyAction>) =>
        dispatch({
            type: UserActionsType.GET_TRAJET_RESET,
        });
export const fetchGetTrajetSuccess = (user: any) => ({
    type: UserActionsType.GET_TRAJET_SUCCESS,
    payload: user,
});
export const fetchGetTrajetError = (error: any) => ({
    type: UserActionsType.GET_TRAJET_ERROR,
    payload: error,
});
export const fetchGetTrajet = (location) => {
    return ApiAction({
        url: `${ServerUrl.routes}?location=${location}`,
        method: 'GET',
        onLoading: fetchGetTrajetPending,
        // @ts-ignore
        onSuccess: fetchGetTrajetSuccess,
        // @ts-ignore
        onError: fetchGetTrajetError,
    });
};

export const fetchSubscribeToTrajetPending = () => ({
    type: UserActionsType.SUBSCRIBE_TO_TRAJET_PENDING,
});
export const fetchSubscribeToTrajetReset =
    () => (dispatch: ThunkDispatch<{}, {}, AnyAction>) =>
        dispatch({
            type: UserActionsType.SUBSCRIBE_TO_TRAJET_RESET,
        });
export const fetchSubscribeToTrajetSuccess = (user: any) => ({
    type: UserActionsType.SUBSCRIBE_TO_TRAJET_SUCCESS,
    payload: user,
});
export const fetchSubscribeToTrajetError = (error: any) => ({
    type: UserActionsType.SUBSCRIBE_TO_TRAJET_ERROR,
    payload: error,
});
export const fetchSubscribeToTrajet = (data) => {
    return ApiAction({
        url: ServerUrl.routeSubscribe,
        method: 'POST',
        data,
        onLoading: fetchSubscribeToTrajetPending,
        // @ts-ignore
        onSuccess: fetchSubscribeToTrajetSuccess,
        // @ts-ignore
        onError: fetchSubscribeToTrajetError,
    });
};

