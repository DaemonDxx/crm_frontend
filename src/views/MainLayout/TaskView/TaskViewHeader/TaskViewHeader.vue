<template>
  <v-card>
    <v-card-title>
      <span>{{titleComponent}}</span>
      <v-spacer></v-spacer>
      <v-btn
          icon
      >
        <v-icon color="primary">{{ icons.mdiCogOutline }}</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <members>
      </members>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
          v-if="task._id"
          small
          color="error"
          outlined
          @click="deleteTask"
      >
        <v-icon>
          {{icons.mdiTrashCanOutline}}
        </v-icon>
        Удалить
      </v-btn>

      <v-btn
          small
          color="primary"
          @click="updateTask"
      >
        {{ btnTextSendTask }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Members from "@/views/MainLayout/TaskView/TaskViewHeader/Members";
import {mdiCogOutline, mdiTrashCanOutline} from "@mdi/js";
import {mapActions, mapGetters} from "vuex";
import {TaskViewActions} from "@/store/taskView";
export default {

name: "TaskViewHeader",
  components: {Members},
  data: () => {
    return {
      icons: {mdiCogOutline, mdiTrashCanOutline},
    }
  },

  methods: {
    ...mapActions("TaskViewStore", [
        TaskViewActions.REQUEST_DELETE_TASK,
        TaskViewActions.REQUEST_UPDATE_TASK
    ]),

    deleteTask: async function() {
      await this[TaskViewActions.REQUEST_DELETE_TASK]();
    },

    updateTask: async function() {
      await this[TaskViewActions.REQUEST_UPDATE_TASK]();
    }

  },

  computed: {
    ...mapGetters("TaskViewStore", ['task']),

    titleComponent: function () {
      return this.task.number ? `Задание ${this.task.number}` : `Задание не выдано`
    },
    btnTextSendTask: function () {
      return this.task.number ? 'Обновить задание' : 'Получить задание'
    },
  }
}
</script>

<style scoped>

</style>