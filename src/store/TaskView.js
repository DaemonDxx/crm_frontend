import {http} from "../../HttpClient";
import {ALARM_SYSTEM_ACTIONS} from "@/store/alarmSystem";

const TaskViewActions = {
    REQUEST_GET_POINTS_BY_DATE: "UPDATE_POINTS_BY_DATE",
    REQUEST_GET_TASK_BY_DATE: "GET_TASK_BY_DATE",
    UPDATE_PARAMS_REQUEST: "UPDATE_PARAMS_REQUEST",
    UPDATE_TASK_FIELDS: "UPDATE_TASK",
    REQUEST_DELETE_TASK: "REQUEST_DELETE_TASK",
    REQUEST_UPDATE_TASK: "REQUEST_UPDATE_TASK",
    UPDATE_NOTIFICATION_IN_POINTS: "UPDATE_NOTIFICATION_IN_POINTS",
    SELECT_POINTS_HAVE_NOTIFICATION_IN_GROUP: "SELECT_POINTS_HAVE_NOTIFICATION_IN_GROUP"
}

const MUTATION_UPDATE_POINTS = "MUTATION_UPDATE_POINTS";
const MUTATION_UPDATE_PARAM_REQUEST = "MUTATION_UPDATE_PARAM_REQUEST";
const MUTATION_UPDATE_TASK_FIELD = "MUTATION_UPDATE_TASK_FIELD";
const MUTATION_SET_TASK = "MUTATION_SET_TASK";
const MUTATION_DELETE_TASK = "MUTATION_DELETE_TASK";
const MUTATION_UPDATE_NOTIFICATION_IN_POINTS = "MUTATION_UPDATE_NOTIFICATION_IN_POINTS";
const MUTATION_ADD_SELECTED_POINTS = "MUTATION_ADD_SELECTED_POINTS";

const defaultTask = {
    head: undefined,
    members: []
}



const TaskViewStore = {
    namespaced: true,
    state: () => {
        return {
            points: [],
            selectedPoints: [],
            selectedAreas: [],
            date: new Date().toISOString(),
            task: {...defaultTask}
        }
    },
    actions: {
        async [TaskViewActions.REQUEST_GET_POINTS_BY_DATE] ({commit, dispatch, state}) {
            try {
                const res = await http("/points/day", {params: {date: state.date}});
                if (res.status === 200) {
                    commit(MUTATION_UPDATE_POINTS, res.data);
                }
            } catch ({message}) {
                dispatch(ALARM_SYSTEM_ACTIONS.ACTION_REQUEST_ERROR, message);
            }
        },

        async [TaskViewActions.REQUEST_GET_TASK_BY_DATE] ({commit, dispatch, state}) {
            try {
                const response = await http('/task', {params: {date: state.date}});
                if (response.data._id) {
                    // eslint-disable-next-line no-unused-vars
                    const {data, ...task} = response.data;
                    commit(MUTATION_SET_TASK, task);
                } else {
                    commit(MUTATION_DELETE_TASK);
                }
            } catch ({message}) {
                dispatch(ALARM_SYSTEM_ACTIONS.ACTION_REQUEST_ERROR, message, {root: true});
            }
        },

        async [TaskViewActions.REQUEST_DELETE_TASK] ({commit, dispatch, state}) {
            dispatch(ALARM_SYSTEM_ACTIONS.ACTION_SEND_REQUEST, null, {root: true});
            try {
                await http.delete('/task', {
                    params: {_id: state.task._id}
                });
                commit(MUTATION_DELETE_TASK);
                dispatch(ALARM_SYSTEM_ACTIONS.ACTION_REQUEST_DONE, 'Задание удалено', {root: true});
            }
             catch (e) {
                dispatch(ALARM_SYSTEM_ACTIONS.ACTION_REQUEST_ERROR, e.message);
            }
        },

        async [TaskViewActions.REQUEST_UPDATE_TASK] ({dispatch, state}) {
            dispatch(ALARM_SYSTEM_ACTIONS.ACTION_SEND_REQUEST, null, {root: true});
            try {
                const taskRequest = {
                    ...state.task,
                    points: state.selectedPoints,
                    date: state.date
                };
                if (!state.task._id) {
                    await http.post('/task', taskRequest);
                } else {
                    await http.put('/task', taskRequest);
                }
                dispatch(TaskViewActions.REQUEST_GET_TASK_BY_DATE);
                dispatch(ALARM_SYSTEM_ACTIONS.ACTION_REQUEST_DONE, 'Задание сохранено', {root: true});
            } catch ({message}) {
                dispatch(ALARM_SYSTEM_ACTIONS.ACTION_REQUEST_ERROR, message, {root: true});
            }
        },

        async [TaskViewActions.UPDATE_NOTIFICATION_IN_POINTS] ({commit}, notification) {
                commit(MUTATION_UPDATE_NOTIFICATION_IN_POINTS, notification);
        },

        [TaskViewActions.UPDATE_PARAMS_REQUEST] ({commit, dispatch}, param) {
            commit(MUTATION_UPDATE_PARAM_REQUEST, param);
            if (param.key === 'date') {
                dispatch(TaskViewActions.REQUEST_GET_POINTS_BY_DATE);
                dispatch(TaskViewActions.REQUEST_GET_TASK_BY_DATE);
            }
        },

        [TaskViewActions.UPDATE_TASK_FIELDS] ({commit}, param) {
            commit(MUTATION_UPDATE_TASK_FIELD, param);
        },

        [TaskViewActions.SELECT_POINTS_HAVE_NOTIFICATION_IN_GROUP] ({commit, state}, area) {
            const haveNotifyPoints = state.points.filter((point) => {
               if (point.area === area && point.notification) {
                   return true
               }
            });
            commit(MUTATION_ADD_SELECTED_POINTS, haveNotifyPoints);
        }

    },
    mutations: {

        [MUTATION_UPDATE_NOTIFICATION_IN_POINTS] (state, notification) {
            const idPoints = notification.points.map(point => point._id);
            state.points = state.points.map((point) => {
               if (idPoints.includes(point._id)) {
                   point.notification = notification;
               }
               return point;
            });
        },

        [MUTATION_UPDATE_POINTS] (state, points) {
            state.points = points;
            state.selectedAreas = Array.from(new Set(state.points.map(item => item.area)))
        },

        [MUTATION_UPDATE_PARAM_REQUEST] (state, {key, value}) {
            state[key] = value;
        },

        [MUTATION_UPDATE_TASK_FIELD] (state, {key, value}) {
            state.task[key] = value;
        },

        [MUTATION_SET_TASK] (state, task) {
            state.task = task;
            state.selectedPoints = task.points;
        },

        [MUTATION_DELETE_TASK] (state) {
            state.task = {...defaultTask};
        },

        [MUTATION_ADD_SELECTED_POINTS] (state, points) {
            state.selectedPoints = state.selectedPoints.concat(points);
        }
    },
    getters: {
        points : state => state.points.filter(item => state.selectedAreas.includes(item.area)),
        areas : state => Array.from(new Set(state.points.map(item => item.area))),
        selectedAreas : state => state.selectedAreas,
        task : state => state.task,
    }
}

export {TaskViewStore, TaskViewActions}