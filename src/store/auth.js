import {http} from '../../HttpClient'
import {ALARM_SYSTEM_ACTIONS} from "@/store/alarmSystem";

const ACTION_LOGIN = 'ACTION_LOGIN';
const ACTION_RESET_STATUS = 'ACTION_RESET_STATUS';
const ACTION_SIGNUP = 'ACTION_SIGNUP';
const ACTION_POSITIONS = 'ACTION_POSITIONS';
const ACTION_LOGOUT = 'ACTION_LOGOUT';
const ACTION_USER = 'ACTION_USER';
const ACTION_USER_IN_DEPARTMENT = 'ACTION_USER_IN_DEPARTMENT'

const MUTATION_SET_POSITIONS = 'MUTATION_SET_POSITIONS';
const MUTATION_LOGOUT = 'MUTATION_LOGOUT';
const MUTATION_SET_USER = 'MUTATION_SET_USER';
const MUTATION_USER_IN_DEPARTMENT = 'MUTATION_USER_IN_DEPARTMENT';
const MUTATION_LOGIN = 'MUTATION_LOGIN';


const Auth = {
    state: () => {
        return  {
            isAuth: !!localStorage.jwt,
            errorMessage: '',
            status: '',
            positions: [],
            user: {department: {shortName: ''},position: {description: ''}},
            usersInDepartment: []
        }
    },
    actions: {
        async [ACTION_LOGIN]({commit, dispatch}, {username, password, isRememberMe}) {
            try {
                dispatch(ALARM_SYSTEM_ACTIONS.ACTION_SEND_REQUEST, null, {root: true});
                const response = await http.post('/auth/login', {username, password});
                if (response.status == 201) {
                    commit(MUTATION_LOGIN, {token: response.data.access_token, isRemember: isRememberMe});
                    commit(MUTATION_SET_USER, response.data.user);
                    dispatch(ALARM_SYSTEM_ACTIONS.ACTION_REQUEST_DONE, 'Вход выполнен успешно');
                    return true;
                } else {
                    let textMessage = '';
                    switch (response.status) {
                        case 401: textMessage = 'Неверный логин или пароль'; break;
                    }
                    dispatch(ALARM_SYSTEM_ACTIONS.ACTION_REQUEST_ERROR, textMessage, {root: true});
                }
            } catch ({message}) {
                dispatch(ALARM_SYSTEM_ACTIONS.ACTION_REQUEST_ERROR, message);
            }

        },
        async [ACTION_SIGNUP] ({dispatch}, payload) {
            try {
                dispatch(ALARM_SYSTEM_ACTIONS.ACTION_SEND_REQUEST);
                const response = await http.post('/auth/signup', payload);
                if (response.status === 200) {
                    dispatch(ALARM_SYSTEM_ACTIONS.ACTION_REQUEST_DONE, 'Вы успешно зарегистрированы');
                    return true;
                }
                dispatch(ALARM_SYSTEM_ACTIONS.ACTION_REQUEST_ERROR, response.data.message);
                return false;
            } catch ({message}) {
                dispatch(ALARM_SYSTEM_ACTIONS.ACTION_REQUEST_ERROR, message);
            }
        },
        async [ACTION_POSITIONS] ({commit, dispatch}) {
            try {
                const response = await http.get('/user/positions');
                if (response.status == 200) {
                    const positions = await response.data;
                    commit(MUTATION_SET_POSITIONS, positions);
                    return true;
                }
                dispatch(ALARM_SYSTEM_ACTIONS.ACTION_REQUEST_ERROR, response.data.message);
                return false;
            } catch ({message}) {
                dispatch(ALARM_SYSTEM_ACTIONS.ACTION_REQUEST_ERROR, message);
            }
        },
        async [ACTION_USER] ({commit}) {
            const response = await http('/user');
            commit(MUTATION_SET_USER, response.data);
            return true;
        },
        async [ACTION_USER_IN_DEPARTMENT] ({commit}) {
            const users = await http('/user/department');
            commit(MUTATION_USER_IN_DEPARTMENT, users.data);
        },
        [ACTION_RESET_STATUS] ({commit}) {
            commit('resetStatus');
        },
        [ACTION_LOGOUT] ({commit}) {
            delete localStorage.jwt;
            commit(MUTATION_LOGOUT);
        }

    },
    mutations: {
        [MUTATION_SET_POSITIONS] (state, positions) {state.positions = positions},
        [MUTATION_LOGOUT] (state) {
            state.isAuth = false;
            state.user = {department: {shortName: ''},position: {description: ''}};
        },
        [MUTATION_SET_USER] (state, user) {
            state.user = Object.assign(user, {});
        },
        [MUTATION_USER_IN_DEPARTMENT] (state, users) {
            state.usersInDepartment = users;
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
        positions: state => state.positions.map(item => item.description),
        positionID: state => description => {
            let id;
            state.positions.forEach((item) => {
                if (item.description === description) {
                    id = item._id;
                }
            });
            return id;
        },
        user: state => state.user,
        usersInDepartment: state => state.usersInDepartment
    }
}

export {Auth, ACTION_LOGIN, ACTION_POSITIONS, ACTION_RESET_STATUS, ACTION_SIGNUP, ACTION_LOGOUT, ACTION_USER, ACTION_USER_IN_DEPARTMENT}