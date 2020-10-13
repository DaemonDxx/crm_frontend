import {http} from '../../HttpClient'
import {ALARM_SYSTEM_ACTIONS} from "@/store/alarmSystem";
import {UserActions} from "@/store/users";

const ACTION_LOGIN = 'ACTION_LOGIN';
const ACTION_SIGNUP = 'ACTION_SIGNUP';
const ACTION_POSITIONS = 'ACTION_POSITIONS';
const ACTION_LOGOUT = 'ACTION_LOGOUT';

const MUTATION_SET_POSITIONS = 'MUTATION_SET_POSITIONS';
const MUTATION_LOGOUT = 'MUTATION_LOGOUT';
const MUTATION_LOGIN = 'MUTATION_LOGIN';


const Auth = {
    state: () => {
        return  {
            isAuth: !!localStorage.jwt,
            positions: [],
        }
    },

    actions: {
        async [ACTION_LOGIN]({commit, dispatch}, {username, password, isRememberMe}) {
            try {
                dispatch(ALARM_SYSTEM_ACTIONS.ACTION_SEND_REQUEST, null, {root: true});
                const response = await http.post('/auth/login', {username, password});
                const {access_token, user} = response.data;
                commit(MUTATION_LOGIN, {token: access_token, isRemember: isRememberMe});
                dispatch(UserActions.REQUEST_GET_SELF_INFO, user);
                dispatch(ALARM_SYSTEM_ACTIONS.ACTION_REQUEST_DONE, 'Вход выполнен успешно');
                return true;
            } catch ({message}) {
                dispatch(ALARM_SYSTEM_ACTIONS.ACTION_REQUEST_ERROR, message);
                return false;
            }

        },
        async [ACTION_SIGNUP] ({dispatch}, payload) {
            try {
                dispatch(ALARM_SYSTEM_ACTIONS.ACTION_SEND_REQUEST);
                await http.post('/auth/signup', payload);
                dispatch(ALARM_SYSTEM_ACTIONS.ACTION_REQUEST_DONE, 'Вы успешно зарегистрированы');
                return true;
            } catch ({message}) {
                dispatch(ALARM_SYSTEM_ACTIONS.ACTION_REQUEST_ERROR, message);
                return false;
            }
        },
        async [ACTION_POSITIONS] ({commit, dispatch}) {
            try {
                const response = await http.get('/user/positions');
                const positions = response.data;
                commit(MUTATION_SET_POSITIONS, positions);
                dispatch(ALARM_SYSTEM_ACTIONS.ACTION_REQUEST_ERROR, response.data.message);
            } catch ({message}) {
                dispatch(ALARM_SYSTEM_ACTIONS.ACTION_REQUEST_ERROR, message);
            }
        },
        [ACTION_LOGOUT] ({commit, dispatch}) {
            commit(MUTATION_LOGOUT);
            dispatch(UserActions.CLEAR_USER_STATE);
        }

    },

    mutations: {
        [MUTATION_SET_POSITIONS] (state, positions) {
            state.positions = positions
        },

        [MUTATION_LOGOUT] (state) {
            state.isAuth = false;
            delete localStorage.jwt;
        },

        [MUTATION_LOGIN] (state, {token, isRemember}) {
            state.isAuth = true;
            http.defaults.headers['Authorization'] = `Bearer ${token}`;
            if (isRemember) {
                localStorage.jwt = token;
            }
        }
    },

    getters: {
        isAuth: state => state.isAuth,
        positions: state => state.positions,
    }
}

export {Auth, ACTION_LOGIN, ACTION_POSITIONS, ACTION_SIGNUP, ACTION_LOGOUT}