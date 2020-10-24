<template>
  <v-list-item class="primary">

    <v-btn
        class="ml-n2 mr-2"
        icon
        @click="closeDialog"
    >
      <v-icon
        color="white"
      >
        {{icon.mdiBackspace}}
      </v-icon>
    </v-btn>

    <v-list-item-content>

      <v-list-item-title class="text-start">
        <span class="white--text"> Уведомление </span>
      </v-list-item-title>

      <v-list-item-subtitle class="white--text text-start">
        От {{new Date()|DateFilter}} &#160;

        <span
            v-if="notification.time && notification.type === 'phone'">
                {{notification.time}}
        </span>

        <v-btn
            v-if="!notification.time && notification.type === 'phone'"
            class="white--text text-decoration-underline"
            text
            small
            @click="saveTime">
          Зафиксировать время
        </v-btn>

      </v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action @click="getNumber" v-if="!notification.number">
      <a class="white--text text-decoration-underline">Получить номер</a>
    </v-list-item-action>

    <v-list-item-action class="white--text" v-else>
      <span class="white--text text-h4">{{prefix}}-{{notification.number}}</span>
    </v-list-item-action>

  </v-list-item>
</template>

<script>
import {mdiBackspace} from "@mdi/js";
import getMonthName from "@/MonthParser";
import moment from "moment";
import {NotificationModalActions} from "@/store/NotificationModal";
import {mapActions} from "vuex";

export default {
  name: "nm-header",

  props: [
      "notification"
  ],

  data: () => {
    return {
      icon: {mdiBackspace}
    }
  },

  methods: {
    ...mapActions("NotificationModalStore", [
        NotificationModalActions.UPDATE_FIELD,
        NotificationModalActions.REQUEST_GET_NUMBER,
        NotificationModalActions.HIDE
    ]),

    closeDialog() {
      this.error = [];
      this[NotificationModalActions.HIDE]();
    },

    getNumber: async function () {
        await this[NotificationModalActions.REQUEST_GET_NUMBER]();
    },

    saveTime: function () {
      const time = moment().format('HH:mm')
      this[NotificationModalActions.UPDATE_FIELD]({key: "time", value: time});
    }
  },

  computed: {
    prefix: function () {
      switch (this.notification.type) {
        case "phone": return 'Т';
        case "email": return 'Е';
        case "letter": return 'П';
        default: return '';
      }
    }
  },

  filters: {

    DateFilter: function (date) {
      return `${date.getDate()} ${getMonthName(date.getMonth())} ${date.getFullYear()}`;
    },

  },

}
</script>

<style scoped>

</style>