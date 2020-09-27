
import {http} from "../../HttpClient";

const ACTION_SEND_NOTIFICATION = 'ACTION_SEND_NOTIFICATION';
const ACTION_GET_NEXT_NUMBER ='ACTION_GET_NEXT_NUMBER';
const ACTION_SHOW_DIALOG = 'ACTION_SHOW_DIALOG';
const ACTION_HIDE_DIALOG = 'ACTION_HIDE_DIALOG';
const ACTION_GET_NOTIFICATION = 'ACTION_GET_NOTIFICATION';

const MUTATION_UPDATE_NOTIFICATION = 'MUTATION_UPDATE_NOTIFICATION';
const MUTATION_SHOW_DIALOG = 'MUTATION_SHOW_DIALOG';
const MUTATION_HIDE_DIALOG = 'MUTATION_HIDE_DIALOG';
const MUTATION_UPDATE_SET_POINTS = 'MUTATION_UPDATE_SET_POINTS';
const MUTATION_SET_NUMBER = 'MUTATION_SET_NUMBER';
const MUTATION_UPDATE_FIELD = 'MUTATION_UPDATE_FIELD';

const Notification = {
    state: () => {
        return {
            notification: {
                number: '',
                type: 'phone',
                phone: '',
                email: '',
                to: '',
                time: '',
                status: '',
                description: '',
                typePlan: 'planned',
                head: '',
                points: [{phone: ['']}],
            },
            isEditable: true,
            isShowDialog: false,
        }
    },
    actions: {
        async [ACTION_GET_NOTIFICATION] ({commit, state}) {
            let res = await http('/notification', {params: {pointID: state.points[0]._id}});
            if (res.data.notification) {
                commit(MUTATION_UPDATE_NOTIFICATION,res.data.notification);
            } else {
                res = await http('/point', {params: {name: state.points[0].name}});
                commit(MUTATION_UPDATE_SET_POINTS, res.data.points);
            }

        },
        async [ACTION_SEND_NOTIFICATION] ({commit, state}) {
            const result = await http.post('/notification', state.notification);
            if (result.status === 201) {
                commit(MUTATION_HIDE_DIALOG);
            }
        },
        [ACTION_SHOW_DIALOG] ({commit}, point) {
            commit(MUTATION_SHOW_DIALOG, point);
        },
        [ACTION_HIDE_DIALOG] ({commit}) {
            commit(MUTATION_HIDE_DIALOG);
        },
        async [ACTION_GET_NEXT_NUMBER] ({commit}) {
            const result = await http('/notification/number');
            if (result.status === 200) {
                commit(MUTATION_SET_NUMBER, result.data);
            }
        }
    },
    mutations: {
        [MUTATION_UPDATE_NOTIFICATION] (state, notification) {
            state.notification = notification;
            state.isEditable = false;
        },
        [MUTATION_UPDATE_FIELD] (state, {newValue, field}) {
            state.notification[field] = newValue;
        },
        [MUTATION_SET_NUMBER] (state, number) {
          state.notification.number = number;
        },
        [MUTATION_UPDATE_SET_POINTS] (state, points) {
            state.notification.points = points;
            state.isEditable = true;
        },
        [MUTATION_SHOW_DIALOG] (state, point) {
            state.isShowDialog = true;
            state.points = [point]
        },
        [MUTATION_HIDE_DIALOG] (state) {
            state.notification = {
                number: '',
                type: 'phone',
                phone: '',
                email: '',
                to: '',
                time: '',
                status: '',
                description: '',
                head: '',
                typePlan: 'planned',
                points: [{phone: ['']}],};
            state.isShowDialog = false;
        }
    },
    getters: {
        notification: state => state.notification,
        isShowDialog: state => state.isShowDialog,
        isEditable: state => state.isEditable,
    }
}

export {Notification, ACTION_GET_NEXT_NUMBER, ACTION_SHOW_DIALOG, ACTION_SEND_NOTIFICATION, ACTION_GET_NOTIFICATION, ACTION_HIDE_DIALOG}
