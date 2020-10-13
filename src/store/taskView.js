import {http} from "../../HttpClient";
import {ALARM_SYSTEM_ACTIONS} from "@/store/alarmSystem";

const TaskViewActions = {
    REQUEST_GET_POINTS_BY_DATE: "UPDATE_POINTS_BY_DATE",
    REQUEST_GET_TASK_BY_DATE: "GET_TASK_BY_DATE",
    UPDATE_PARAMS_REQUEST: "UPDATE_PARAMS_REQUEST",
    UPDATE_TASK_FIELDS: "UPDATE_TASK",
    REQUEST_DELETE_TASK: "REQUEST_DELETE_TASK",
    REQUEST_UPDATE_TASK: "REQUEST_UPDATE_TASK"
}

const MUTATION_UPDATE_POINTS = "MUTATION_UPDATE_POINTS";
const MUTATION_UPDATE_PARAM_REQUEST = "MUTATION_UPDATE_PARAM_REQUEST";
const MUTATION_UPDATE_TASK_FIELD = "MUTATION_UPDATE_TASK_FIELD";
const MUTATION_SET_TASK = "MUTATION_SET_TASK";
const MUTATION_DELETE_TASK = "MUTATION_DELETE_TASK";

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
            task: defaultTask
        }
    },
    actions: {
        async [TaskViewActions.REQUEST_GET_POINTS_BY_DATE] ({commit, dispatch, state}) {
            try {
                const res = await http("/point/day", {params: {date: state.date}});
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
                if (response.data) {
                    // eslint-disable-next-line no-unused-vars
                    const {data, ...task} = response.data;
                    commit(MUTATION_SET_TASK, task);
                }
            } catch ({message}) {
                dispatch(ALARM_SYSTEM_ACTIONS.ACTION_REQUEST_ERROR, message);
            }
        },

        async [TaskViewActions.REQUEST_DELETE_TASK] ({commit, dispatch, state}) {
            try {
                await http.delete('/task', {
                    params: {_id: state.task._id}
                });
                commit(MUTATION_DELETE_TASK);
            }
             catch (e) {
                dispatch(ALARM_SYSTEM_ACTIONS.ACTION_REQUEST_ERROR, e.message);
            }
        },

        async [TaskViewActions.REQUEST_UPDATE_TASK] ({commit, dispatch, state}) {
            dispatch(ALARM_SYSTEM_ACTIONS.ACTION_SEND_REQUEST);
            try {
                let response;
                const taskRequest = {
                    ...state.task,
                    points: state.selectedPoints,
                    date: state.date
                };
                if (!state.task._id) {
                    response = await http.post('/task', taskRequest);
                } else {
                    response = await http.put('/task', taskRequest);
                }
                commit(MUTATION_SET_TASK, response.data);
                dispatch(ALARM_SYSTEM_ACTIONS.ACTION_REQUEST_DONE, 'Задание сохранено');
            } catch ({message}) {
                dispatch(ALARM_SYSTEM_ACTIONS.ACTION_REQUEST_ERROR, message);
            }
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
        }

    },
    mutations: {
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
            state.task = defaultTask;
        },
    },
    getters: {
        points : state => state.points.filter(item => state.selectedAreas.includes(item.area)),
        areas : state => Array.from(new Set(state.points.map(item => item.area))),
        selectedAreas : state => state.selectedAreas,
        task : state => state.task,
    }
}

export {TaskViewStore, TaskViewActions}