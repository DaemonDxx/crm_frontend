import {http} from "../../HttpClient";
import {ALARM_SYSTEM_ACTIONS} from "@/store/alarmSystem";

const ACTION_UPDATE_POINTS = 'ACTION_UPDATE_POINTS';

const MUTATION_UPDATE = 'MUTATION_UPDATE';


const Points = {
    state: () => {
        return {
            points: []
        }
    },
    actions: {
        async [ACTION_UPDATE_POINTS] ({commit, dispatch}, date) {
            try {
                const res = await http(`/point/day?date=${date}`);
                if (res.status === 200) {
                    commit(MUTATION_UPDATE, res.data);
                }
                dispatch(ALARM_SYSTEM_ACTIONS.ACTION_REQUEST_ERROR, res.data.message);
            } catch ({message}) {
                dispatch(ALARM_SYSTEM_ACTIONS.ACTION_REQUEST_ERROR, message);
            }

        }
    },
    mutations: {
        [MUTATION_UPDATE] (state, points) {
            state.points = points;
        }
    },
    getters: {
        points: state => areas => state.points.filter(item => areas.includes(item.area)),
        areas: state => Array.from(new Set(state.points.map(item => item.area))),
        oneNamePointsInDay: state => pointName => state.points.filter(item => item.name === pointName)
    }
}

export {Points, ACTION_UPDATE_POINTS}