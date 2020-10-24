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
        <td bgcolor="#FFF673" class="text-start" colspan="7">
          <v-btn class="mr-3" icon @click="props.toggle()">
            <v-icon>
              {{icons.mdiMinus}}
            </v-icon>
          </v-btn>
          <span class="font-weight-bold">{{props.group}}</span>

          <v-btn
              class="ml-3"
              small
              outlined
              color="primary"
              @click="selectPointsHaveNotification(props.group)"
          >
            Отменить уведомленные точки
          </v-btn>
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

      <template v-slot:item._id="props">
        <td>
          <v-btn
              v-if="props.item.notification"
              color="warning"
              x-small
              @click="openTransferDialog(props.item)"
          >
            Перенос
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
import {TaskViewActions} from "@/store/TaskView";
import {NotificationModalActions} from "@/store/NotificationModal";
import {TransferDialogActions} from "@/store/TransferDialog";
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
        {text: 'Перенос', value: '_id', align: 'center'}
      ]
    }
  },
  methods: {
    ...mapActions("TaskViewStore", [
        TaskViewActions.UPDATE_PARAMS_REQUEST,
        TaskViewActions.SELECT_POINTS_HAVE_NOTIFICATION_IN_GROUP
    ]),
    ...mapActions("NotificationModalStore", [NotificationModalActions.SHOW]),

    ...mapActions("TransferDialog", [TransferDialogActions.SHOW]),

    selectPointsHaveNotification(area) {
      this[TaskViewActions.SELECT_POINTS_HAVE_NOTIFICATION_IN_GROUP](area);
    },

    openNotificationDialog(point) {
      this[NotificationModalActions.SHOW]({...point});
    },

    openTransferDialog(point) {
      const oneNamePoints = this.points.filter(item => item.name === point.name);
      this[TransferDialogActions.SHOW]({...oneNamePoints});
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
        selectedPointsStore: state => state.selectedPoints,
        pointOfDay: state => state.points
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