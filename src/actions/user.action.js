import axios from 'axios';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const EDIT_USER_NAME = 'EDIT_USER_NAME';

export const loginUser = credentials => {
    return dispatch => {
        return axios
            .post(process.env.REACT_APP_API_URL + 'login', credentials)
            .then(res => {
                dispatch({
                    type: LOGIN_USER,
                    payload: {
                        email: credentials.email,
                        token: res.data.body.token,
                        firstName: credentials.firstName,
                        lastName: credentials.lastName,
                    },
                });
            })
            .catch(err => {
                console.log(err);
            });
    };
};

export const logoutUser = () => ({ type: LOGOUT_USER });

export const editUserName = credentials => {
    return dispatch => {
        return axios
            .put(
                process.env.REACT_APP_API_URL + 'profile',
                {
                    firstName: credentials.firstName,
                    lastName: credentials.lastName,
                },
                {
                    headers: {
                        Authorization: `Bearer ${credentials.token}`,
                    },
                }
            )
            .then(() => {
                dispatch({
                    type: EDIT_USER_NAME,
                    payload: {
                        firstName: credentials.firstName,
                        lastName: credentials.lastName,
                    },
                });
            })
            .catch(err => {
                console.log(err);
            });
    };
};
