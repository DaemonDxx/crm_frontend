import Vue from 'vue'
import Vuex from 'vuex'
import {Auth} from "@/store/auth";
import {File} from "@/store/file";
import {AlarmSystem} from "@/store/alarmSystem";
import {ResultCheck} from "@/store/result-check";
import {TaskViewStore} from "@/store/TaskView";
import {Users} from "@/store/users";
import {NotificationModalStore} from "@/store/NotificationModal";

Vue.use(Vuex)


export default  new Vuex.Store({

  modules: {
    Auth,
    File,
    AlarmSystem,
    ResultCheck,
    TaskViewStore,
    NotificationModalStore,
    Users
  }
})
