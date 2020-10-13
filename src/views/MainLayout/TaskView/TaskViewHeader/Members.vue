<template>
  <v-row
    class="mb-n5"
  >
    <v-col
        class="d-flex align-start"
        sm="12"
        md="4"
    >
      <v-select
          v-model="head"
          :items="usersInDepartment"
          outlined
          label="Выдающий задание"
          :item-text="getFullName"
          return-object
      >
      </v-select>
    </v-col>


    <v-col
        sm="12"
        md="8"
    >
      <v-select
          v-model="members"
          :items="usersInDepartment"
          outlined
          multiple
          label="Члены бригады"
          :item-text="getFullName"
          return-object
      >
      </v-select>
    </v-col>
  </v-row>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {TaskViewActions} from "@/store/taskView";

export default {
name: "Members",


  methods: {
    ...mapActions("TaskViewStore", [TaskViewActions.UPDATE_TASK_FIELDS]),
    getFullName(user) {
      return `${user.lastName} ${user.firstName} ${user.thirdName}`
    },
  },

  computed: {
    ...mapGetters("TaskViewStore", ['task']),
    ...mapGetters(['usersInDepartment', 'user']),

    btnTextSendTask: function () {
      return this.task.number ? 'Обновить задание' : 'Получить задание'
    },

    head: {
      get: function () {
        return this.task.head;
      },

      set: function (value) {
        this[TaskViewActions.UPDATE_TASK_FIELDS] ({
          key: 'head',
          value
        })
      }
    },

    members: {
      get: function () {
        return this.task.members;
      },

      set: function (value) {
        this[TaskViewActions.UPDATE_TASK_FIELDS] ({
          key: 'members',
          value
        })
      }
    }

  }
}
</script>

<style scoped>

</style>