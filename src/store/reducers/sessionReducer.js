// reducers/sessionReducer.js
import {
    LOGIN_SUCCESS,
    LOGOUT,
    REFRESH_TOKEN,
} from "../actions/sessionActions";

const initialState = {
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
};

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                isAuthenticated: true,
            };
        case LOGOUT:
            return {
                ...state,
                accessToken: null,
                refreshToken: null,
                isAuthenticated: false,
            };
        case REFRESH_TOKEN:
            return {
                ...state,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
            };
        default:
            return state;
    }
};

export default sessionReducer;
