import { LOGIN_USER, LOGOUT_USER } from '../actions/user.action';

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
            };

        default:
            return state;
    }
}
