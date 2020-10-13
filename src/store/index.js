import Vue from 'vue'
import Vuex from 'vuex'
import {Auth} from "@/store/auth";
import {File} from "@/store/file";
import {Notification} from "@/store/notification";
import {AlarmSystem} from "@/store/alarmSystem";
import {Task} from "@/store/Task";
import {ResultCheck} from "@/store/result-check";
import {TaskViewStore} from "@/store/taskView";
import {Users} from "@/store/users";

Vue.use(Vuex)


export default  new Vuex.Store({

  modules: {
    Auth,
    File,
    AlarmSystem,
    Notification,
    Task,
    ResultCheck,
    TaskViewStore,
    Users
  }
})
