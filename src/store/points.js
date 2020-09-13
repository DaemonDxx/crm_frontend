import {http} from "../../HttpClient";

const ACTION_UPDATE = 'ACTION_UPDATE';

const MUTATION_UPDATE = 'MUTATION_UPDATE';


const Points = {
    state: () => {
        return {
            points: []
        }
    },
    actions: {
        async [ACTION_UPDATE] ({commit}, date) {
            try {
                const res = await http(`/point/day?date=${date}`);
                if (res.status === 200) {
                    commit(MUTATION_UPDATE, res.data);
                }
            } catch (e) {
                console.log(e.message);
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

export {Points, ACTION_UPDATE}