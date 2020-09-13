import Vue from 'vue'
import Vuex from 'vuex'
import {Auth} from "@/store/auth";
import {File} from "@/store/file";
import {Points} from "@/store/points";

import {AlarmSystem} from "@/store/alarmSystem";

Vue.use(Vuex)


export default  new Vuex.Store({

  modules: {
    Auth,
    File,
    Points,
    AlarmSystem
  }
})
