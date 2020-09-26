import {http} from "../../HttpClient";
import {ALARM_SYSTEM_ACTIONS} from "@/store/alarmSystem";

const ACTION_SEND_TASK = 'ACTION_SEND_TASK';
const ACTION_GET_TASK = 'ACTION_GET_TASK';

const MUTATION_SET_CURRENT_TASK = 'MUTATION_SET_CURRENT_TASK';

const Task = {
    state: () => {
        return {
            currentTask: {

            }
        }
    },
    actions: {
        async [ACTION_SEND_TASK]({commit, dispatch}, task) {
            dispatch(ALARM_SYSTEM_ACTIONS.ACTION_SEND_REQUEST);
            try {
                let newTask;
                let res;
                if (!task._id) {
                    res = await http.post('/task', task);
                } else {
                    res = await http.put('/task', task);
                }
                newTask = res.data;
                commit(MUTATION_SET_CURRENT_TASK, newTask);
                dispatch(ALARM_SYSTEM_ACTIONS.ACTION_REQUEST_DONE, 'Задание сохранено');
                // eslint-disable-next-line no-unused-vars
                const {date, ...t} = newTask;
                return t;
            } catch ({message}) {
                dispatch(ALARM_SYSTEM_ACTIONS.ACTION_REQUEST_ERROR, message);
            }
        },
        async [ACTION_GET_TASK] ({commit, dispatch}, date) {
            try {
                const task = await http('/task', {params: {date}});
                if (task.data) {
                    commit(MUTATION_SET_CURRENT_TASK, task.data);
                    // eslint-disable-next-line no-unused-vars
                    const {date, ...t} = task.data;
                    return t;
                }
            } catch ({message}) {
                dispatch(ALARM_SYSTEM_ACTIONS.ACTION_REQUEST_ERROR, message);
            }
        },
    },
    mutations: {
        [MUTATION_SET_CURRENT_TASK] (state, newTask) {
            state.currentTask = newTask;
        }
    },
    getters: {

    }

}

export {Task, ACTION_SEND_TASK, ACTION_GET_TASK}