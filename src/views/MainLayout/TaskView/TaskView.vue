<template>
  <v-container>
    <task-view-header>
    </task-view-header>

    <points-table></points-table>
    <NotificationModal :isShow="isShowDialog" @closeDialog="closedDialog">
    </NotificationModal>

  </v-container>
</template>

<script>

import {ACTION_USER_IN_DEPARTMENT} from "@/store/auth";
import {ACTION_SHOW_DIALOG, ACTION_GET_NOTIFICATION} from "@/store/notification";

import {mapActions, mapGetters} from "vuex";
import NotificationModal from "@/views/MainLayout/NotificationModal";
import TaskViewHeader from "@/views/MainLayout/TaskView/TaskViewHeader/TaskViewHeader";
import PointsTable from "@/views/MainLayout/TaskView/PointsTable/PointsTable";
import {TaskViewActions} from "@/store/taskView";

export default {
  name: "Job",

  components: {PointsTable, TaskViewHeader, NotificationModal},

  data: () => {
    return {}
  },

  methods: {
    ...mapActions([ACTION_USER_IN_DEPARTMENT, ACTION_SHOW_DIALOG, ACTION_GET_NOTIFICATION ]),
    ...mapActions("TaskViewStore", [
        TaskViewActions.REQUEST_GET_TASK_BY_DATE,
        TaskViewActions.REQUEST_DELETE_TASK,
        TaskViewActions.REQUEST_GET_POINTS_BY_DATE
    ]),

    async openDialog(point) {
      this.ACTION_SHOW_DIALOG(point);
      await this.ACTION_GET_NOTIFICATION();
    },
  },

  computed: {
    ...mapGetters([ 'usersInDepartment', 'isShowDialog']),
    btnTextSendTask: function () {
      return this.task.number?'Обновить задание':'Получить задание'
    }
  },

  async created() {
    await this[TaskViewActions.REQUEST_GET_POINTS_BY_DATE]();
    await this[TaskViewActions.REQUEST_GET_TASK_BY_DATE]();
    await this[ACTION_USER_IN_DEPARTMENT]();
  },

}
</script>

<style scoped>

</style>