<template>
  <v-container>
    <task-view-header
        class="mb-4"
    >
    </task-view-header>

    <points-table>

    </points-table>

    <NotificationModal>
    </NotificationModal>

  </v-container>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import NotificationModal from "@/views/NoticitationModal/NotificationModal";
import TaskViewHeader from "@/views/MainLayout/TaskView/TaskViewHeader/TaskViewHeader";
import PointsTable from "@/views/MainLayout/TaskView/PointsTable/PointsTable";
import {TaskViewActions} from "@/store/TaskView";

export default {
  name: "Job",

  components: {PointsTable, TaskViewHeader, NotificationModal},

  data: () => {
    return {}
  },

  methods: {
    ...mapActions("TaskViewStore", [
        TaskViewActions.REQUEST_GET_TASK_BY_DATE,
        TaskViewActions.REQUEST_DELETE_TASK,
        TaskViewActions.REQUEST_GET_POINTS_BY_DATE
    ]),
  },

  computed: {
    ...mapGetters([ 'usersInDepartment']),
  },

  async created() {
    await this[TaskViewActions.REQUEST_GET_POINTS_BY_DATE]();
    await this[TaskViewActions.REQUEST_GET_TASK_BY_DATE]();
  },

}
</script>

<style scoped>

</style>