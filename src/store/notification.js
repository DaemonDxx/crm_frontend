
import {http} from "../../HttpClient";


const ACTION_UPDATE_NOTIFICATION = 'ACTION_UPDATE_NOTIFICATION';
const ACTION_GET_NEXT_NUMBER ='ACTION_GET_NEXT_NUMBER';
const ACTION_SHOW_DIALOG = 'ACTION_SHOW_DIALOG';
const ACTION_SET_CURRENT_POINTS = 'ACTION_SET_CURRENT_POINTS';
const ACTION_SEND_NOTIFICATION = 'ACTION_SEND_NOTIFICATION';
const ACTION_HIDE_DIALOG = 'ACTION_HIDE_DIALOG';
const ACTION_GET_NOTIFICATION = 'ACTION_GET_NOTIFICATION';

const MUTATION_UPDATE_NOTIFICATION = 'MUTATION_UPDATE_NOTIFICATION';
const MUTATION_SHOW_DIALOG = 'MUTATION_SHOW_DIALOG';
const MUTATION_HIDE_DIALOG = 'MUTATION_HIDE_DIALOG';
const MUTATION_UPDATE_SET_POINTS = 'MUTATION_UPDATE_SET_POINTS';



const Notification = {
    state: () => {
        return {
            notification: {

            },
            points: [],
            isShowDialog: false,
        }
    },
    actions: {
        async [ACTION_GET_NOTIFICATION] ({commit, state}) {
            let res = await http('/notification', {params: {pointID: state.points[0]._id}});
            if (res.data.notification) {
                commit(MUTATION_UPDATE_NOTIFICATION,res.data.notification);
                commit(MUTATION_UPDATE_SET_POINTS, res.data.notification.points);
            } else {
                res = await http('/point', {params: {name: state.points[0].name}});
                commit(MUTATION_UPDATE_SET_POINTS, res.data.points);
            }

        },
        async [ACTION_UPDATE_NOTIFICATION] ({commit, state}) {
            const result = await http.post('/notification', state.currentNotification);
            if (result.status === 201) {
                commit(MUTATION_UPDATE_NOTIFICATION, result.data);
            }
        },
        [ACTION_SHOW_DIALOG] ({commit}, point) {
            commit(MUTATION_SHOW_DIALOG, point);
        },
        [ACTION_HIDE_DIALOG] ({commit}) {
            commit(MUTATION_HIDE_DIALOG);
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
            state.notification = notification;
        },
        [MUTATION_UPDATE_SET_POINTS] (state, points) {
            state.currentPoints = points;
        },
        [MUTATION_SHOW_DIALOG] (state, point) {
            state.isShowDialog = true;
            state.points = [point]
        },
        [MUTATION_HIDE_DIALOG] (state) {
            state.points = [];
            state.notification = {};
            state.isShowDialog = false;
        }
    },
    getters: {
        currentPointNotification: state => state.currentPoints,
        notification: state => state.notification,
        isShowDialog: state => state.isShowDialog,
    }
}

export {Notification, ACTION_GET_NEXT_NUMBER, ACTION_SET_CURRENT_POINTS, ACTION_SHOW_DIALOG, ACTION_UPDATE_NOTIFICATION, ACTION_SEND_NOTIFICATION, ACTION_GET_NOTIFICATION, ACTION_HIDE_DIALOG}
