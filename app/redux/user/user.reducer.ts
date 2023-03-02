/**
 * Project Hysacam
 * File user.reducer
 * Path app/redux/user
 * Created by BRICE ZELE
 * Date: 26/08/2021
 */
import UserActionsType from './user.types';

interface UseActionsInterface {
    payload?: any;
    type: string;
}

const INITIAL_STATE = {
    loading: false,
    result: null,
    error: null,
};

export const signUpReducer = (
    state = INITIAL_STATE,
    action: UseActionsInterface,
) => {
    switch (action.type) {
        case UserActionsType.SIGN_UP_PENDING:
            return {
                ...state,
                loading: true,
            };
        case UserActionsType.SIGN_UP_SUCCESS:
            return {
                loading: false,
                result: action.payload,
                error: null,
            };
        case UserActionsType.SIGN_UP_ERROR:
            return {
                ...state,
                result: null,
                loading: false,
                error: action.payload,
            };

        case UserActionsType.SIGN_UP_RESET:
            return INITIAL_STATE;

        default:
            return state;
    }
};

export const getTrajetReducer = (
    state = INITIAL_STATE,
    action: UseActionsInterface,
) => {
    switch (action.type) {
        case UserActionsType.GET_TRAJET_PENDING:
            return {
                ...state,
                loading: true,
            };
        case UserActionsType.GET_TRAJET_SUCCESS:
            return {
                loading: false,
                result: action.payload,
                error: null,
            };
        case UserActionsType.GET_TRAJET_ERROR:
            return {
                ...state,
                result: null,
                loading: false,
                error: action.payload,
            };

        case UserActionsType.GET_TRAJET_RESET:
            return INITIAL_STATE;

        default:
            return state;
    }
};

export const subscribeToTrajetReducer = (
    state = INITIAL_STATE,
    action: UseActionsInterface,
) => {
    switch (action.type) {
        case UserActionsType.SUBSCRIBE_TO_TRAJET_PENDING:
            return {
                ...state,
                loading: true,
            };
        case UserActionsType.SUBSCRIBE_TO_TRAJET_SUCCESS:
            return {
                loading: false,
                result: action.payload,
                error: null,
            };
        case UserActionsType.SUBSCRIBE_TO_TRAJET_ERROR:
            return {
                ...state,
                result: null,
                loading: false,
                error: action.payload,
            };

        case UserActionsType.SUBSCRIBE_TO_TRAJET_RESET:
            return INITIAL_STATE;

        default:
            return state;
    }
};


