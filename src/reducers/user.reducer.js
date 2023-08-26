import { LOGIN_USER, LOGOUT_USER, EDIT_USER_NAME, GET_USER_INFORMATIONS } from '../actions/user.action';

const initialState = {};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return action.payload;
        case LOGOUT_USER:
            return {
                ...state,
                email: null,
                token: null,
                firstName: null,
                lastName: null,
            };
        case EDIT_USER_NAME:
            return {
                ...state,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
            };
        case GET_USER_INFORMATIONS:
            return {
                ...state,
                ...action.payload,
            };

        default:
            return state;
    }
}
