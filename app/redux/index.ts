/**
 * Project HysacamCollecte
 * File index
 * Path app/redux
 * Created by BRICE ZELE
 * Date: 04/12/2021
 */
import {combineReducers} from 'redux';
import {configReducer} from './config/config.reducer';
import {signInReducer} from "./auth/oauth.reducer";
import {getTrajetReducer, signUpReducer, subscribeToTrajetReducer} from "./user/user.reducer";

export const API = 'API';
export const ApiAction = ({
                              url = '',
                              method = 'GET',
                              data = null,
                              accessToken = null,
                              onSuccess = () => {
                              },
                              onLoading = () => {
                              },
                              onError = () => {
                              },
                              ...rest
                          }) => ({
    type: API,
    payload: {
        url,
        method,
        data,
        accessToken,
        onLoading,
        onSuccess,
        onError,
        ...rest,
    },
});
export const RootReducer = combineReducers<any>({
    application: configReducer,
    user: signInReducer,
    signup: signUpReducer,
    getTrajet: getTrajetReducer,
    subscribeToTrajet: subscribeToTrajetReducer,
});

export type RootReducerType = ReturnType<typeof RootReducer>;
