import {http} from '../../HttpClient'

const ACTION_LOGIN = 'ACTION_LOGIN';
const ACTION_RESET_STATUS = 'ACTION_RESET_STATUS';
const ACTION_SIGNUP = 'ACTION_SIGNUP';
const ACTION_POSITIONS = 'ACTION_POSITIONS';
const ACTION_LOGOUT = 'ACTION_LOGOUT';
const ACTION_USER = 'ACTION_USER';
const ACTION_USER_IN_DEPARTMENT = 'ACTION_USER_IN_DEPARTMENT'

const MUTATION_REQUEST_START = 'MUTATION_REQUEST_START';
const MUTATION_REQUEST_ERROR = 'MUTATION_REQUEST_ERROR';
const MUTATION_REQUEST_DONE = 'MUTATION_REQUEST_DONE';
const MUTATION_RESET = 'MUTATION_RESET';
const MUTATION_SET_POSITIONS = 'MUTATION_SET_POSITIONS';
const MUTATION_LOGOUT = 'MUTATION_LOGOUT';
const MUTATION_IS_AUTH_TRUE = 'MUTATION_IS_AUTH_TRUE';
const MUTATION_SET_USER = 'MUTATION_SET_USER';
const MUTATION_USER_IN_DEPARTMENT = 'MUTATION_USER_IN_DEPARTMENT';

function ErrorHandler(commit, message) {
    commit(MUTATION_REQUEST_ERROR, message);
    setTimeout(function () {commit(MUTATION_RESET)}, 3000);
    return false;
}

const Auth = {
    state: () => {
        return  {
            isAuth: !!localStorage.jwt,
            errorMessage: '',
            status: '',
            positions: [],
            user: {},
            usersInDepartment: []
        }
    },
    actions: {
        async [ACTION_LOGIN]({commit}, {username, password, isRememberMe}) {
            try {
                commit(MUTATION_REQUEST_START);
                const response = await http.post('/auth/login', {username, password});
                if (response.status == 201) {
                    if (isRememberMe) {
                        localStorage.jwt = response.data.access_token;
                    }
                    http.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`
                    commit(MUTATION_REQUEST_DONE);
                    commit(MUTATION_IS_AUTH_TRUE);
                    commit(MUTATION_SET_USER, response.data.user);
                    return true;
                } else {
                    throw new Error('Неверный логин или пароль');
                }
            } catch ({message}) {
                ErrorHandler(commit, message);
            }

        },
        async [ACTION_SIGNUP] ({commit}, payload) {
            try {
                commit(MUTATION_REQUEST_START);
                const response = await http.post('/auth/signup', payload);
                if (response.status === 200) {
                    commit(MUTATION_REQUEST_DONE);
                    return true;
                }
                commit(MUTATION_REQUEST_ERROR, response.data.message);
                return false;
            } catch ({message}) {
                ErrorHandler(commit, message);
            }
        },
        async [ACTION_POSITIONS] ({commit}) {
            try {
                const response = await http.get('/user/positions');
                const positions = await response.data;
                commit(MUTATION_SET_POSITIONS, positions);
                return true;
            } catch ({message}) {
                ErrorHandler(commit, message);
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
        [MUTATION_REQUEST_START] (state) {
            state.errorMessage = '';
            state.status = 'send';
        },
        [MUTATION_REQUEST_ERROR] (state, message) {
            state.status = 'error';
            state.errorMessage = message;
        },
        [MUTATION_REQUEST_DONE] (state) {
            state.status = 'done';
        },
        [MUTATION_RESET] (state) {
            state.status = '';
            state.errorMessage = '';
        },
        [MUTATION_SET_POSITIONS] (state, positions) {state.positions = positions},
        [MUTATION_LOGOUT] (state) {
            state.isAuth = false;
        },
        [MUTATION_IS_AUTH_TRUE] (state) {
            state.isAuth = true;
        },
        [MUTATION_SET_USER] (state, user) {
            state.user = user;
        },
        [MUTATION_USER_IN_DEPARTMENT] (state, users) {
            state.usersInDepartment = users;
        }
    },
    getters: {
        isAuth: state => state.isAuth,
        authStatus: state => state.status,
        authErrorMessage: state => state.errorMessage,
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
        usersInDepartment: state => state.usersInDepartment.map((item => String(item.lastName+' '+item.firstName+' '+item.thirdName)))
    }
}

export {Auth, ACTION_LOGIN, ACTION_POSITIONS, ACTION_RESET_STATUS, ACTION_SIGNUP, ACTION_LOGOUT, ACTION_USER, ACTION_USER_IN_DEPARTMENT}