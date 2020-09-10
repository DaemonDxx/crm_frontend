import Vue from 'vue'
import Vuex from 'vuex'
import {Auth} from "@/store/auth";
import {File} from "@/store/file";
import {Points} from "@/store/points";

Vue.use(Vuex)

const TYPE_MESSAGE = {
  DONE: 'success',
  ERROR: 'error',
  WARM: 'info'
}

const ACTION_SHOW_MESSAGE = 'ACTION_SHOW_MESSAGE';
const ACTION_HIDE_MESSAGE = 'ACTION_HIDE_MESSAGE';
const ACTION_SEND_REQUEST = 'ACTION_SEND_REQUEST';
const ACTION_REQUEST_DONE = 'ACTION_REQUEST_DONE';
const ACTION_REQUEST_ERROR = 'ACTION_REQUEST_ERROR';

const MUTATION_UPDATE_MESSAGE = 'MUTATION_UPDATE_MESSAGE';
const MUTATION_SET_STATE_MESSAGE = 'MUTATION_SET_STATE_MESSAGE';
const MUTATION_UPDATE_STATE_REQUEST = 'MUTATION_UPDATE_STATE_REQUEST';

const RequestNotificationSystem = {
  ACTION_SEND_REQUEST,
  ACTION_REQUEST_DONE,
  ACTION_REQUEST_ERROR
}

const Store =  new Vuex.Store({
  state: () => {
    return {
      isShowMessage: false,
      textMessage: '',
      typeMessage: '',
      isSendingRequest: false
    }
  },
  mutations: {
    [MUTATION_SET_STATE_MESSAGE] (state, isShowMessage) {
      state.isShowMessage = isShowMessage;
    },
    [MUTATION_UPDATE_MESSAGE] (state, {textMessage, typeMessage}) {
      state.textMessage = textMessage;
      state.typeMessage = typeMessage;
    },
    [MUTATION_UPDATE_STATE_REQUEST] (state, isSendingRequest) {
      state.isSendingRequest = isSendingRequest;
    }

  },
  actions: {
    [ACTION_SHOW_MESSAGE] ({commit, dispatch}, message) {
      commit(MUTATION_UPDATE_MESSAGE, message);
      commit(MUTATION_SET_STATE_MESSAGE, true);
      setTimeout(() => dispatch(ACTION_HIDE_MESSAGE), 3000);
    },

    [ACTION_HIDE_MESSAGE] ({commit}) {
      commit(MUTATION_SET_STATE_MESSAGE, false);
      commit(MUTATION_UPDATE_MESSAGE, '');
    },

    [ACTION_SEND_REQUEST] ({commit}) {
      commit(MUTATION_UPDATE_STATE_REQUEST, true);
    },

    [ACTION_REQUEST_DONE] ({commit, dispatch}, textMessage) {
      commit(MUTATION_UPDATE_STATE_REQUEST, false);
      dispatch(ACTION_SHOW_MESSAGE, {textMessage, typeMessage: TYPE_MESSAGE.DONE});
    },

    [ACTION_REQUEST_ERROR] ({commit, dispatch}, textMessage) {
      commit(MUTATION_UPDATE_STATE_REQUEST, false);
      dispatch(ACTION_SHOW_MESSAGE, {textMessage, typeMessage: TYPE_MESSAGE.ERROR});
    }

  },
  getters: {
    isShowMessage: state => state.isShowMessage,
    textMessage: state => state.textMessage,
    typeMessage: state => state.typeMessage,
    isSendingRequest: state => state.isSendingRequest,
  },
  modules: {
    Auth,
    File,
    Points
  }
})

export {Store, RequestNotificationSystem}
