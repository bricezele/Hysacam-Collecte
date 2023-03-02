/**
 * Project Hysacam
 * File oauth.selector
 * Path app/redux/oauth
 * Created by BRICE ZELE
 * Date: 13/09/2021
 */
import {createSelector} from 'reselect';
import {RootReducerType} from '../index';

const selectUserReducer = (state: RootReducerType) => state.user;

export const selectUser = createSelector(
    [selectUserReducer],
    user => user,
);
