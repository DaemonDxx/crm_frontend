<template>
  <v-sheet>
    <point-table-header>

    </point-table-header>
    <v-data-table
        hide-default-footer
        v-model="selectedPoints"
        item-key="_id"
        show-select
        :items-per-page="itemsPerPage"
        :headers="headers"
        :items="points"
        group-by="area"
        sort-by="name"
    >

      <template style="colspan: all" v-slot:group.header="props">
        <td bgcolor="#90CAF9" class="text-start" colspan="6">
          <v-btn class="mr-3" icon @click="props.toggle()">
            <v-icon>
              {{icons.mdiMinus}}
            </v-icon>
          </v-btn>
          <span class="font-weight-bold">{{props.group}}</span>
        </td>
      </template>

      <template v-slot:item.notification="props">
        <td class="d-flex justify-center">
          <v-btn icon @click="openNotificationDialog(props.item)">
            <v-icon  color="success" v-if="props.value">{{getIcon(props.value)}}</v-icon>
            <v-icon v-else>{{getIcon(props.value)}}</v-icon>
          </v-btn>
        </td>
      </template>


    </v-data-table>
  </v-sheet>

</template>

<script>
import PointTableHeader from "@/views/MainLayout/TaskView/PointsTable/PointTableHeader";
import {mdiAt, mdiBellOff, mdiEmail, mdiMinus, mdiPhone} from "@mdi/js";
import {mapActions, mapGetters, mapState} from "vuex";
import {ACTION_GET_TASK} from "@/store/Task";
import {ACTION_SHOW_DIALOG} from "@/store/notification";
import {TaskViewActions} from "@/store/taskView";
export default {
name: "PointsTable",
  components: {PointTableHeader},
  data: () => {
    return {
      icons: {
          mdiMinus,
          mdiAt,
          mdiPhone,
          mdiEmail,
          mdiBellOff
      },
      itemsPerPage: 40,
      headers: [
        {text: 'РЭС', value: 'area', sortable: false, align: 'center'},
        {text: 'Потребитель', value: 'name', sortable: true},
        {text: 'Объект', value: 'objectDescription', sortable: false},
        {text: 'Адрес', value: 'address', sortable: false},
        {text: 'Прибор', value: 'numberDevice', sortable: false},
        {text: 'Уведомление', value: 'notification', sortable: false, align: 'center'},
      ]
    }
  },
  methods: {
    ...mapActions([ACTION_GET_TASK, ACTION_SHOW_DIALOG]),
    ...mapActions("TaskViewStore", [TaskViewActions.UPDATE_PARAMS_REQUEST]),

    openNotificationDialog(point) {
      this[ACTION_SHOW_DIALOG](point);
    },

    getIcon: function (notify) {
      if (notify) {
        switch (notify.type) {
          case 'email': return this.icons.mdiAt;
          case 'letter': return this.icons.mdiEmail;
          case 'phone': return this.icons.mdiPhone;
        }
      } else {
        return this.icons.mdiBellOff
      }
    },
  },

  computed: {
      ...mapGetters("TaskViewStore",["points"]),
      ...mapState("TaskViewStore", {
        selectedPointsStore: state => state.selectedPoints
      }),

    selectedPoints: {
        set: function (selectedPoints) {
          this[TaskViewActions.UPDATE_PARAMS_REQUEST]({key: 'selectedPoints', value: selectedPoints});
        },

        get: function () {
          return this.selectedPointsStore;
        }
    }
  }
}
</script>

<style scoped>

</style>