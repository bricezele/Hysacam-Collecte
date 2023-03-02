/**
 * Project Hysacam
 * File ApiClient
 * Path app/utils
 * Created by BRICE ZELE
 * Date: 02/12/2021
 */
import axios from 'axios';
import Config from 'react-native-config';
import {store} from '../store';
import {BaseSettings} from '../config/Settings';

export const ApiClient = async ({
    url,
    method,
    accessToken,
    onLoading,
    onSuccess,
    onError,
    data,
    timeout,
    ...rest
}) => {
    // axios default configs
    axios.defaults.baseURL = Config.API_SERVER_URL || '';
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    if (accessToken)
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    axios.defaults.headers.common['Accept-Language'] =
        store.getState().application.language ?? BaseSettings.defaultLanguage;

    const dataOrParams = ['GET', 'DELETE'].includes(method) ? 'params' : 'data';

    let result = await axios
        .request({
            url,
            [dataOrParams]: data,
            method,
            timeout: timeout || Number(Config.API_TIMEOUT),
            ...rest,
        })
        .then(response => {
            console.log('Data response', response);
            return {
                data: response.data,
                error: null,
            };
        })
        .catch(error => {
            if (error.response) {
                console.warn('Data error response', error.response);
                return {
                    loading: false,
                    error: error.response?.data,
                    data: null,
                };
            }
            if (error.request) {
                console.warn('Data error request', error.request);
                return {
                    loading: false,
                    error: error.request,
                    data: null,
                };
            }
            console.warn('Data error message', error.message);
            return {
                loading: false,
                error: error.message,
                data: null,
            };
        });

    return result;
};
