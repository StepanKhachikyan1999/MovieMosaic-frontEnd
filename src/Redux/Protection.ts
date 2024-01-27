import {logoutAction} from './Actions/userActions'

export const ErrorsAction = (error: any, dispatch: any, action: any) => {
    const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
    if (message === "Not authorized, token failed") {
        dispatch(logoutAction());
    }
    return dispatch({type: action, payload: message});
};

// api token protection
export const tokenProtection = (getState: () => { userLogin: { userInfo: any } }) => {
    const {
        userLogin: {userInfo},
    } = getState();
    if (!userInfo?.token) {
        return null;
    } else {
        return userInfo?.token;
    }
};