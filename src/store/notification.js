
import {http} from "../../HttpClient";


const ACTION_UPDATE_NOTIFICATION = 'ACTION_UPDATE_NOTIFICATION';
const ACTION_GET_NEXT_NUMBER ='ACTION_GET_NEXT_NUMBER';
const ACTION_SHOW_DIALOG = 'ACTION_SHOW_DIALOG';
const ACTION_SET_CURRENT_POINTS = 'ACTION_SET_CURRENT_POINTS';
const ACTION_SEND_NOTIFICATION = 'ACTION_SEND_NOTIFICATION';

const MUTATION_UPDATE_NOTIFICATION = 'MUTATION_UPDATE_NOTIFICATION';
const MUTATION_UPDATE_SHOW_DIALOG = 'MUTATION_UPDATE_SHOW_DIALOG';
const MUTATION_UPDATE_SET_POINTS = 'MUTATION_UPDATE_SET_POINTS';



const Notification = {
    state: () => {
        return {
            currentPoints: [],
            currentNotification: {},
            isShowDialog: false,
        }
    },
    actions: {
        async [ACTION_UPDATE_NOTIFICATION] ({commit, state}) {
            const result = await http.post('/notification', state.currentNotification);
            if (result.status === 201) {
                commit(MUTATION_UPDATE_NOTIFICATION, result.data);
            }
        },
        [ACTION_SHOW_DIALOG] ({commit}, isShowDialog) {
            commit(MUTATION_UPDATE_SHOW_DIALOG, isShowDialog);
        },
        async [ACTION_GET_NEXT_NUMBER] ({commit, state}) {
            const result = await http('/notification/number');
            if (result.status === 200) {
                const newNotify = Object.assign(state.currentNotification, {number: result.data});
                commit(MUTATION_UPDATE_NOTIFICATION, newNotify);
            }
        },
        [ACTION_SET_CURRENT_POINTS] ({commit}, points) {
            commit(MUTATION_UPDATE_SET_POINTS, points);
        }
    },
    mutations: {
        [MUTATION_UPDATE_NOTIFICATION] (state, notification) {
            state.currentNotification = notification;
        },
        [MUTATION_UPDATE_SET_POINTS] (state, points) {
            state.currentPoints = points;
        },
        [MUTATION_UPDATE_SHOW_DIALOG] (state, isShow) {
            state.isShowDialog = isShow
        }
    },
    getters: {
        currentPointNotification: state => state.currentPoints,
        notification: state => state.notification,
        isShowDialog: state => state.isShowDialog,
    }
}

export {Notification, ACTION_GET_NEXT_NUMBER, ACTION_SET_CURRENT_POINTS, ACTION_SHOW_DIALOG, ACTION_UPDATE_NOTIFICATION, ACTION_SEND_NOTIFICATION}
