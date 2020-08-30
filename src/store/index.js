import Vue from 'vue'
import Vuex from 'vuex'
import {Auth} from "@/store/auth";
import {File} from "@/store/file";
import {Points} from "@/store/points";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Auth,
    File,
    Points
  }
})
