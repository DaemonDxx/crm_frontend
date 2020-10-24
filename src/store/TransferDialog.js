import {http} from "../../HttpClient";
import {ALARM_SYSTEM_ACTIONS} from "@/store/alarmSystem";

const defaultState = {
    isVisible: false,
    points: [{name:''}],
    transferOption: {
        selectedPoints: [],
        newDate: new Date().toISOString().substr(0,10)
    }
}

const TransferDialogActions = {
    REQUEST_TRANSFER_POINTS: "REQUEST_TRANSFER_POINTS",
    REQUEST_UPDATE_DESCRIPTION_NOTIFICATION: "REQUEST_UPDATE_STATUS_NOTIFICATION",

    UPDATE_FIELD: "UPDATE_FIELD",
    HIDE: "HIDE",
    SHOW: "SHOW_TRANSFER_DIALOG",

}

const MUTATION = {
    SET_VISIBLE: "SET_VISIBLE",
    RESET_STATE: "RESET_STATE",
    SET_POINTS: "SET_POINTS",
    UPDATE_FIELD: "UPDATE_FIELD"
}

const TransferDialog = {

    namespaced: true,

    state: () => {
        return {
            ...defaultState
        }
    },

    actions: {
        async [TransferDialogActions.REQUEST_TRANSFER_POINTS] ({dispatch, state}) {
            dispatch(ALARM_SYSTEM_ACTIONS.ACTION_SEND_REQUEST, null, {root: true});
            try {
                const notifyUnique = new Set();
                for (let point of state.transferOption.selectedPoints) {
                    notifyUnique.add(point.notification);
                    if (point.notification) {
                        delete point.notification;
                    }
                    console.log(point);
                    point.dateCheck = state.transferOption.newDate;
                    await createPoint(point);
                }
                dispatch(TransferDialogActions.REQUEST_UPDATE_DESCRIPTION_NOTIFICATION, notifyUnique);
                dispatch(ALARM_SYSTEM_ACTIONS.ACTION_REQUEST_DONE, "Все точки перенесены", {root: true});
                return true;
            } catch({message}) {
                dispatch(ALARM_SYSTEM_ACTIONS.ACTION_REQUEST_ERROR, message, {root: true});
                return false;
            }
        },

        async [TransferDialogActions.REQUEST_UPDATE_DESCRIPTION_NOTIFICATION] ({commit, dispatch, state}, notifications) {
            commit(ALARM_SYSTEM_ACTIONS.ACTION_SEND_REQUEST, null, {root: true});
            const description = createDescription(state.transferOption.selectedPoints, state.transferOption.newDate);
            try {
                for (let notify of notifications) {
                    notify.description += description;
                    await updateNotification(notify);
                }
                commit(ALARM_SYSTEM_ACTIONS.ACTION_REQUEST_DONE);
            } catch ({message}) {
                dispatch(ALARM_SYSTEM_ACTIONS.ACTION_REQUEST_ERROR, message, {root: true});
            }

        },

        [TransferDialogActions.HIDE] ({commit}) {
            commit(MUTATION.SET_VISIBLE, false);
            commit(MUTATION.RESET_STATE);
        },

        [TransferDialogActions.SHOW] ({commit}, points) {
            commit(MUTATION.SET_POINTS, points);
            commit(MUTATION.SET_VISIBLE, true);
        },

        [TransferDialogActions.UPDATE_FIELD] ({commit}, field) {
            commit(MUTATION.UPDATE_FIELD, field);
        },

    },

    mutations: {

        [MUTATION.UPDATE_FIELD] (state, {key, value}) {
            state.transferOption[key] = value;
        },

        [MUTATION.SET_POINTS] (state, points) {
            state.points = points
        },

        [MUTATION.SET_VISIBLE] (state, isVisible) {
            state.isVisible = isVisible;
        },

        // eslint-disable-next-line no-unused-vars
        [MUTATION.RESET_STATE] (state) {
            state.points = [{name:""}];
            state.transferOption.selectedPoints = [];
            state.transferOption.newDate = new Date().toISOString().substr(0,10);
        }
    },

    getters: {

    }

}

function createDescription(points, newDate) {
    const arrayString = [];
    for (let point of points) {
        arrayString.push(generateString(point.numberDevice, newDate));
    }
    return arrayString.join(" /n ");
}

function generateString(numberDevice, newDate) {
    return `  Прибор учета ${numberDevice} перенесен на ${newDate}`;
}

async function createPoint(point) {
    try {
        await http.post('/point', point);
    } catch ({message}) {
        console.log(message);
    }
}

async function updateNotification(notification) {
    try {
        notification.status = "transfer";
        const response = await http.put("/notification", notification);
        return response.data;
    } catch ({message}) {
        console.log(message);
    }
}

export {TransferDialog, TransferDialogActions}