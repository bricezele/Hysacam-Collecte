/**
 * Project YooLearn
 * File user.types
 * Path app/redux/user
 * Created by BRICE ZELE
 * Date: 26/08/2021
 */
const UserActionsType = {
    SIGN_UP_PENDING: 'SIGN_UP_PENDING',
    SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
    SIGN_UP_ERROR: 'SIGN_UP_ERROR',
    SIGN_UP_RESET: 'SIGN_UP_RESET',

    FIND_BY_EMAIL_PENDING: 'FIND_BY_EMAIL_PENDING',
    FIND_BY_EMAIL_SUCCESS: 'FIND_BY_EMAIL_SUCCESS',
    FIND_BY_EMAIL_ERROR: 'FIND_BY_EMAIL_ERROR',
    FIND_BY_EMAIL_RESET: 'FIND_BY_EMAIL_RESET',

    UPDATE_USER_PENDING: 'UPDATE_USER_PENDING',
    UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
    UPDATE_USER_ERROR: 'UPDATE_USER_ERROR',
    UPDATE_USER_RESET: 'UPDATE_USER_RESET',

    RESEND_CODE_EMAIL_PENDING: 'RESEND_CODE_EMAIL_PENDING',
    RESEND_CODE_EMAIL_SUCCESS: 'RESEND_CODE_EMAIL_SUCCESS',
    RESEND_CODE_EMAIL_ERROR: 'RESEND_CODE_EMAIL_ERROR',
    RESEND_CODE_EMAIL_RESET: 'RESEND_CODE_EMAIL_RESET',

    VALIDATE_ACCOUNT_PENDING: 'VALIDATE_ACCOUNT_PENDING',
    VALIDATE_ACCOUNT_SUCCESS: 'VALIDATE_ACCOUNT_SUCCESS',
    VALIDATE_ACCOUNT_ERROR: 'VALIDATE_ACCOUNT_ERROR',
    VALIDATE_ACCOUNT_RESET: 'VALIDATE_ACCOUNT_RESET',

    GET_TRAJET_PENDING: 'GET_TRAJET_PENDING',
    GET_TRAJET_SUCCESS: 'GET_TRAJET_SUCCESS',
    GET_TRAJET_ERROR: 'GET_TRAJET_ERROR',
    GET_TRAJET_RESET: 'GET_TRAJET_RESET',

    SUBSCRIBE_TO_TRAJET_PENDING: 'SUBSCRIBE_TO_TRAJET_PENDING',
    SUBSCRIBE_TO_TRAJET_SUCCESS: 'SUBSCRIBE_TO_TRAJET_SUCCESS',
    SUBSCRIBE_TO_TRAJET_ERROR: 'SUBSCRIBE_TO_TRAJET_ERROR',
    SUBSCRIBE_TO_TRAJET_RESET: 'SUBSCRIBE_TO_TRAJET_RESET',
};
export default UserActionsType;
