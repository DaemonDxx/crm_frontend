<template>
  <v-menu
      v-model="isOpenMenu"
      offset-y
      :nudge-right="40"
      transition="scale-transition"
      :close-on-content-click="false"
      :min-width="290"
  >

    <template v-slot:activator="{ on, attr}">
      <v-text-field
          background-color="white"
          solo
          :value="date"
          v-on="on"
          v-bind="attr"
          readonly
          :prepend-inner-icon="icons.mdiCalendar"
      >

      </v-text-field>
    </template>
    <v-date-picker
        first-day-of-week="1"
        no-title
        locale="ru-latn"
        landscape
        @change="setDate"
    >
      >

    </v-date-picker>
  </v-menu>
</template>

<script>
import {mdiCalendar} from '@mdi/js';
import * as moment from 'moment'
import {mapActions, mapState} from "vuex";
import {TaskViewActions} from "@/store/TaskView";

export default {
  name: "DatePicker",

  data: () => {
    return {
      isOpenMenu: false,
      icons: {mdiCalendar},
    }
  },

  methods: {
    ...mapActions('TaskViewStore', [TaskViewActions.UPDATE_PARAMS_REQUEST]),

    async setDate(newDate) {
      this.isOpenMenu = false;
      await this[TaskViewActions.UPDATE_PARAMS_REQUEST] ({key: 'date', value: newDate})
    }
  },

  computed: {
   ...mapState("TaskViewStore", {
     date: state => moment(state.date).format("DD-MM-YYYY")
   })
  }
}
</script>

<style scoped>

</style>