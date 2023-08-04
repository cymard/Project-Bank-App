import axios from 'axios';

export const LOGIN_USER = 'LOGIN_USER';

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
                    },
                });
            })
            .catch(err => {
                console.log(err);
            });
    };
};
