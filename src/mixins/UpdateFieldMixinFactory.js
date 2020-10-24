import {mapActions} from "vuex";
import {NotificationModalActions} from "@/store/NotificationModal";
import {TransferDialogActions} from "@/store/TransferDialog";


export function GenerateMixin (module, keyFields) {
    const actions = getActionName(module);
    const computed = generateComputed(actions, keyFields, module);

    return {
        methods: {
            ...mapActions(module, [actions])
        },
        computed
    }
}

function getActionName(module) {
    switch (module) {
        case "NotificationModalStore": return NotificationModalActions.UPDATE_FIELD;
        case "TransferDialog": return TransferDialogActions.UPDATE_FIELD;
    }
}

function generateComputed(action, keyFields, module) {
    let computed = {};
    for (let key of keyFields) {
        const field = createComputedField(
            key,
            action,
            module
        );
        computed = Object.assign(computed, field);
    }
    return computed;
}


function createComputedField(keyField, action, module) {
    const setter = createSetter(keyField, action);
    const getter = createGetter(keyField, module);
    return {
        [keyField]: {
            set: setter,
            get: getter
        }
    }
}

function createSetter(keyField, action) {
    return function (value) {
        this[action]({key: keyField, value});
    }
}

function createGetter(keyField, module) {
    const entity = getEntityNameByModuleName(module);
    return function () {
        return this["$store"]["state"][module][entity][keyField];
    }
}

function getEntityNameByModuleName(module) {
    switch (module) {
        case "NotificationModalStore": return "notification";
        case "TransferDialog": return "transferOption";
    }
}

