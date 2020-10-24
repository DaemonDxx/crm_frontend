import {ALARM_SYSTEM_ACTIONS} from "@/store/alarmSystem";
import {http} from "../../HttpClient";

const defaultNotification = {
    number: '',
    type: 'phone',
    phone: '',
    email: '',
    to: '',
    time: '',
    status: 'none',
    description: '',
    typePlan: 'planned',
    head: '',
    points: [{phone: ['']}],
}

const NotificationModalActions = {

    REQUEST_CREATE_NOTIFICATION: "REQUEST_CREATE_NOTIFICATION",
    REQUEST_GET_ONE_NAME_POINTS: "REQUEST_GET_ONE_NAME_POINTS",
    REQUEST_GET_NOTIFICATION: "REQUEST_GET_NOTIFICATION",
    SAVE_NOTIFICATION: "SAVE_NOTIFICATION",
    REQUEST_UPDATE_NOTIFICATION: "REQUEST_UPDATE_NOTIFICATION",
    REQUEST_GET_NUMBER: "REQUEST_GET_NUMBER",
    UPDATE_FIELD: "UPDATE_FIELD",
    EDIT_NOTIFICATION: "EDIT_NOTIFICATION",
    SHOW: "SHOW",
    HIDE: "HIDE",

}

const MUTATION_VISIBLE_DIALOG = "MUTATION_VISIBLE_DIALOG";
const MUTATION_EDITABLE_NOTIFICATION = "MUTATION_EDITABLE_NOTIFICATION";
const MUTATION_SET_NOTIFICATION = "MUTATION_SET_NOTIFICATION";
const MUTATION_SET_ONE_NAME_POINTS = "MUTATION_SET_ONE_NAME_POINTS";
const MUTATION_RESET_NOTIFICATION = "MUTATION_RESET_NOTIFICATION";
const MUTATION_UPDATE_FIELD = "MUTATION_UPDATE_FIELD";

const NotificationModalStore = {

    namespaced: true,

    state: () => {
        return {
            notification: {...defaultNotification},
            isEditable: true,
            isVisibleDialog: false,
        }
    },

    actions: {

        async [NotificationModalActions.REQUEST_GET_NOTIFICATION] ({commit, dispatch}, point) {
            dispatch(ALARM_SYSTEM_ACTIONS.ACTION_SEND_REQUEST, null, {root: true});
            try {
                const res = await http('/notification', {
                    params: {
                        pointID: point._id
                    }
                });
                if (res.data.notification) {
                    commit(MUTATION_SET_NOTIFICATION, res.data.notification);
                    commit(MUTATION_EDITABLE_NOTIFICATION, false);
                } else {
                    dispatch(NotificationModalActions.REQUEST_GET_ONE_NAME_POINTS, point);

                }
            } catch ({message}) {
                dispatch(ALARM_SYSTEM_ACTIONS.ACTION_REQUEST_ERROR, message, {root: true});
            }
        },

        async [NotificationModalActions.REQUEST_GET_ONE_NAME_POINTS] ({commit, dispatch}, point) {
            dispatch(ALARM_SYSTEM_ACTIONS.ACTION_SEND_REQUEST, null, {root: true});
            try {
                const res = await http('/point', {
                    params: {
                        name: point.name
                    }
                });
                const haveNotNotifyPoints = res.data.points.filter(item => !item.notification);
                commit(MUTATION_SET_ONE_NAME_POINTS, haveNotNotifyPoints);
                commit(MUTATION_EDITABLE_NOTIFICATION, true);
            } catch ({message}) {
                dispatch(ALARM_SYSTEM_ACTIONS.ACTION_REQUEST_ERROR, message, {root: true});
            }

        },

        async [NotificationModalActions.SAVE_NOTIFICATION] ({dispatch, state}) {
            if (!state.notification._id) {
                dispatch(NotificationModalActions.REQUEST_CREATE_NOTIFICATION);
            } else {
                dispatch(NotificationModalActions.REQUEST_UPDATE_NOTIFICATION);
            }
            dispatch(NotificationModalActions.EDIT_NOTIFICATION, false);
        },

        async [NotificationModalActions.REQUEST_CREATE_NOTIFICATION] ({commit, dispatch, state}) {
            try {
                const response = await http.post('/notification', state.notification);
                commit(MUTATION_SET_NOTIFICATION, response.data);
                return response.data;
            } catch ({message}) {
                dispatch(ALARM_SYSTEM_ACTIONS.ACTION_REQUEST_ERROR, message, {root: true});
            }
        },

        async [NotificationModalActions.REQUEST_UPDATE_NOTIFICATION] ({commit, dispatch, state}) {
            dispatch(ALARM_SYSTEM_ACTIONS.ACTION_SEND_REQUEST, null, {root: true});
            try {
                const response = await http.put('/notification', state.notification);
                commit(MUTATION_SET_NOTIFICATION, response.data);
                dispatch(NotificationModalActions.EDIT_NOTIFICATION, false);
            } catch ({message}) {
                dispatch(ALARM_SYSTEM_ACTIONS.ACTION_REQUEST_ERROR, message, {root: true});
            }
        },

        async [NotificationModalActions.REQUEST_GET_NUMBER] ({dispatch}) {
            dispatch(ALARM_SYSTEM_ACTIONS.ACTION_SEND_REQUEST, null, {root: true});
            try {
                const response = await http('/notification/number');
                dispatch(ALARM_SYSTEM_ACTIONS.ACTION_REQUEST_DONE, response.data, {root: true});
                dispatch(NotificationModalActions.UPDATE_FIELD, {key: "number", value: response.data});
            } catch ({message}) {
                dispatch(ALARM_SYSTEM_ACTIONS, message, {root: true});
            }
        },

        [NotificationModalActions.EDIT_NOTIFICATION] ({commit}, isEditable) {
            commit(MUTATION_EDITABLE_NOTIFICATION, isEditable);
        },

        [NotificationModalActions.UPDATE_FIELD] ({commit}, field) {
           commit(MUTATION_UPDATE_FIELD, field);
        },

        async [NotificationModalActions.SHOW] ({commit, dispatch}, point) {
            dispatch(NotificationModalActions.REQUEST_GET_NOTIFICATION, point);
            commit(MUTATION_VISIBLE_DIALOG, true);
        },

        [NotificationModalActions.HIDE] ({commit}) {
            commit(MUTATION_VISIBLE_DIALOG, false);
            commit(MUTATION_RESET_NOTIFICATION);
        }
    },

    mutations: {

        [MUTATION_SET_NOTIFICATION] (state, notification) {
            state.notification = notification;
        },

        [MUTATION_SET_ONE_NAME_POINTS] (state, points) {
            state.notification.points = points;
        },

        [MUTATION_VISIBLE_DIALOG] (state, isShow) {
            state.isVisibleDialog = isShow;
        },

        [MUTATION_EDITABLE_NOTIFICATION] (state, isEditable) {
            state.isEditable = isEditable;
        },

        [MUTATION_RESET_NOTIFICATION] (state) {
            state.notification = {...defaultNotification};
        },

        [MUTATION_UPDATE_FIELD] (state, {key, value}) {
            state.notification[key] = value;
        }
    },

    getters: {
        notification: state => state.notification,
        isEditable: state => state.isEditable,
        isVisibleDialog: state => state.isVisibleDialog,
        isHaveNotification: state => !!state.notification._id
    }

}

export {NotificationModalStore, NotificationModalActions}