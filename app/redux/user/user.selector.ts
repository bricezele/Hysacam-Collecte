/**
 * Project YooLearn
 * File user.selector
 * Path app/redux/user
 * Created by BRICE ZELE
 * Date: 14/09/2021
 */
import {createSelector} from 'reselect';
import {RootReducerType} from '../index';

const selectSignUpReducer = (state: RootReducerType) => state.signup;
const selectGetTrajetReducer = (state: RootReducerType) => state.getTrajet;
const selectSubscribeToProjetReducer = (state: RootReducerType) => state.subscribeToTrajet;


export const selectSignUp = createSelector(
    [selectSignUpReducer],
    signup => signup,
);

export const selectGetTrajet = createSelector(
    [selectGetTrajetReducer],
    getTrajet => getTrajet,
);

export const selectSubscribeToTrajet = createSelector(
    [selectSubscribeToProjetReducer],
    subscribeToTrajet => subscribeToTrajet,
);

