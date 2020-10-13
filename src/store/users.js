import {http} from "../../HttpClient";

const defaultEmptyUser = {
    department: {
        shortName: ''
    },
    position: {
        description: ''
    }
}

const UserActions = {
    REQUEST_GET_SELF_INFO: "REQUEST_GET_SELF_INFO",
    REQUEST_GET_ALL_USERS_IN_DEPARTMENT: "REQUEST_GET_ALL_USERS_IN_DEPARTMENT",
    CLEAR_USER_STATE: "CLEAR_USER_STATE"
}

const MUTATION_SET_SELF_INFO = "MUTATION_SET_SELF_INFO";
const MUTATIONS_SET_ALL_USERS_IN_DEPARTMENT = "MUTATIONS_SET_ALL_USERS_IN_DEPARTMENT";
const MUTATION_CLEAR_USER_STATE = "MUTATION_CLEAR_USER_STATE";

const Users = {

    state: () => {
        return {
            user: defaultEmptyUser,
            usersInDepartment: []
        }
    },

    actions: {
        async [UserActions.REQUEST_GET_SELF_INFO] ({commit}, user) {
            let userInfo;
            if (user) {
                userInfo = user;
            } else {
                const response = await http('/user');
                userInfo = response.data;
            }
            commit(MUTATION_SET_SELF_INFO, userInfo);

        },

        async [UserActions.REQUEST_GET_ALL_USERS_IN_DEPARTMENT] ({commit}) {
            const response = await http('/user/department');
            commit(MUTATIONS_SET_ALL_USERS_IN_DEPARTMENT, response.data);
        },

        [UserActions.CLEAR_USER_STATE] ({commit}) {
            commit(MUTATION_CLEAR_USER_STATE);
        }
    },

    mutations: {

        [MUTATION_SET_SELF_INFO] (state, user) {
            state.user = user;
        },

        [MUTATIONS_SET_ALL_USERS_IN_DEPARTMENT] (state, users) {
            state.usersInDepartment = users;
        },

        [MUTATION_CLEAR_USER_STATE] (state) {
            state.user = defaultEmptyUser;
            state.usersInDepartment = [];
        }

    },

    getters: {
        user: state => state.user,
        usersInDepartment: state => state.usersInDepartment
    }

}

export {Users, UserActions}