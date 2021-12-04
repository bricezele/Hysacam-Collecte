/**
 * Project YooLearn
 * File Api
 * Path app/middleware
 * Created by BRICE ZELE
 * Date: 13/09/2021
 */
import axios from 'axios';
import Config from 'react-native-config';
import {API} from '../redux';
import {store} from '../store';
import {BaseSettings} from '../config/Settings';

const ApiMiddleware =
    ({dispatch}: any) =>
    next =>
    action => {
        next(action);

        if (action.type !== API) return;

        const {
            url,
            method,
            data,
            accessToken,
            onLoading,
            onSuccess,
            timeout,
            onError,
            ...rest
        } = action.payload;
        const dataOrParams = ['GET', 'DELETE'].includes(method)
            ? 'params'
            : 'data';
        // axios default configs
        axios.defaults.baseURL = Config.API_SERVER_URL || '';
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        if (accessToken)
            axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        axios.defaults.headers.common['Accept-Language'] =
            store.getState().application.language ??
            BaseSettings.defaultLanguage;

        dispatch(onLoading());

        axios
            .request({
                url,
                method,
                timeout: timeout || Number(Config.API_TIMEOUT),
                [dataOrParams]: data,
                ...rest,
            })
            .then(response => {
                console.log('Data response', response);
                console.log('Data response data', response.config.data);
                dispatch(onSuccess(response.data));
            })
            .catch(error => {
                if (error.response) {
                    console.warn('Data error response', error.response);
                    dispatch(onError(error.response?.data));
                } else if (error.request) {
                    console.warn('Data error request', error.request);
                    dispatch(onError(error.request));
                } else {
                    console.warn('Data error message', error.message);
                    dispatch(onError(error.message));
                }

                /*            if (error.response && error.response.status === 403) {
                                                                                                                                                                                                                                                                                            dispatch(accessDenied());
                                                                                                                                                                                                                                                                                        } */
            });
    };

export default ApiMiddleware;
