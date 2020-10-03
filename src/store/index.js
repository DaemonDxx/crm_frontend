import Vue from 'vue'
import Vuex from 'vuex'
import {Auth} from "@/store/auth";
import {File} from "@/store/file";
import {Points} from "@/store/points";
import {Notification} from "@/store/notification";
import {AlarmSystem} from "@/store/alarmSystem";
import {Task} from "@/store/Task";
import {ResultCheck} from "@/store/result-check";

Vue.use(Vuex)


export default  new Vuex.Store({

  modules: {
    Auth,
    File,
    Points,
    AlarmSystem,
    Notification,
    Task,
    ResultCheck
  }
})
