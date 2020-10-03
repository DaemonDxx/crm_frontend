import {http} from "../../HttpClient";
import {ALARM_SYSTEM_ACTIONS} from "@/store/alarmSystem";

const ACTION_CREATE_RESULT_CHECK = 'ACTION_CREATE_RESULT_CHECK';

export const ResultCheck = {
    state: () => {
        return {
            task: {}
        }
    },
    actions: {
        async [ACTION_CREATE_RESULT_CHECK] ({dispatch}, {point, result}) {
            try {
                const response = await http.post('/point/result', {
                    pointID: point._id,
                    result: result.type,
                    description: result.description
                });
                dispatch(ALARM_SYSTEM_ACTIONS.ACTION_REQUEST_DONE, 'Результат проверки сохранен');
                return response.data;
            } catch (e) {
                dispatch(ALARM_SYSTEM_ACTIONS.ACTION_REQUEST_ERROR, e.message);
            }
        }
    },
    mutations: {

    },
    getters: {
    }
}

export {ACTION_CREATE_RESULT_CHECK}