<template>
  <v-container fluid>
      <v-row class="align-stretch">

        <v-col xs="12" sm="6" md="3">
          <v-card height="100%">
              <v-list-item-title class="pt-3 font-weight-bold">
                РЭС
              </v-list-item-title>
            <v-sheet  v-for="a in areas" :key="a">

                <v-checkbox
                    dense
                    class="text-start mb-n6 ml-6"
                    :label="a"
                    :value="a"
                    v-model="selectAreas">
                </v-checkbox>
            </v-sheet>

          </v-card>
        </v-col>

        <v-col xs="12" sm="6" md="3">
          <v-card class="d-flex align-center justify-center"   >
          <v-date-picker
              first-day-of-week="1"
              no-title
              v-model="task.date"
              locale="ru-latn"
              @change="update"
              landscape>
          </v-date-picker>
          </v-card>
        </v-col>

        <v-col xs="12" sm="6" md="3">
          <v-card height="100%">
              <v-select
                  v-model="task.head"
                  :items="usersInDepartment"
                  class="pl-4 pr-4 pt-4"
                  outlined
                  label="Выдающий задание"
                  :item-text="getFullname"
                  return-object
              >
              </v-select>
              <v-select
                  v-model="task.members"
                  :items="usersInDepartment"
                  class="pl-4 pr-4 mb-n4"
                  outlined
                  multiple
                  label="Члены бригады"
                  :item-text="getFullname"
                  return-object
              >
              </v-select>
          </v-card>
        </v-col>

        <v-col xs="12" sm="6" md="3">
          <v-card height="100%" class="d-flex flex-column justify-space-around">
            <v-card-title>
              Задание №{{task.number}}
            </v-card-title>
            <v-card-text class="ma-0 ">
              <v-checkbox
                  class="mb-n6"
                v-for="item in paramsJob"
                :key="item.name"
                :label="item.description"
                :value="item.name"
              ></v-checkbox>
            </v-card-text>
            <v-card-actions>
              <v-row>
                <v-col cols="12">
                  <v-btn
                      color="primary"
                      @click="sendTask"
                      small
                  >
                    {{btnTextSendTask}}
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>

    <v-card>
      <v-data-table
          hide-default-footer
          v-model="task.points"
          item-key="_id"
          show-select
          :items-per-page="itemsPerPage"
          :headers="headers"
          :items="points(selectAreas)"
          group-by="area"
          sort-by="name"
          >

        <template style="colspan: all" v-slot:group.header="props">
            <td bgcolor="#90CAF9" class="text-start" colspan="6">
              <v-btn class="mr-3" icon @click="props.toggle()">
                <v-icon>
                  {{icon.mdiMinus}}
                </v-icon>
              </v-btn>
              <span class="font-weight-bold">{{props.group}}</span>
            </td>
        </template>

        <template v-slot:item.notification="props">
          <td class="d-flex justify-center">
            <v-btn icon @click="openDialog(props.item)">
              <v-icon  color="success" v-if="props.value">{{getIcon(props.value)}}</v-icon>
              <v-icon v-else>{{getIcon(props.value)}}</v-icon>
            </v-btn>
          </td>
        </template>


      </v-data-table>
    </v-card>
    <NotificationModal :isShow="isShowDialog" @closeDialog="closedDialog">
    </NotificationModal>

  </v-container>
</template>

<script>

import {ACTION_USER_IN_DEPARTMENT} from "@/store/auth";
import {ACTION_SHOW_DIALOG, ACTION_GET_NOTIFICATION} from "@/store/notification";
import {ACTION_UPDATE_POINTS} from '../../store/points'
import {ACTION_GET_TASK, ACTION_SEND_TASK} from "@/store/Task";

import {mapActions, mapGetters} from "vuex";
import {mdiMinus, mdiPhone, mdiAt, mdiEmail, mdiBellOff} from '@mdi/js';
import NotificationModal from "@/views/MainLayout/NotificationModal";

export default {
  components: {NotificationModal},
  data: () => {
    return {
      icon: {
        mdiMinus,
        mdiAt,
        mdiPhone,
        mdiEmail,
        mdiBellOff
      },
      selectAreas: [],
      itemsPerPage: 40,
      headers: [
        {text: 'РЭС', value: 'area', sortable: false, align: 'center'},
        {text: 'Потребитель', value: 'name', sortable: true},
        {text: 'Объект', value: 'objectDescription', sortable: false},
        {text: 'Адрес', value: 'address', sortable: false},
        {text: 'Прибор', value: 'numberDevice', sortable: false},
        {text: 'Уведомление', value: 'notification', sortable: false, align: 'center'},

      ],
      paramsJob: [
        {name: 'map', description: 'Добавить карту'},
        {name: 'volumes', description: 'Добавить объемы'},
      ],
      task: {
        points: [],
        head: {},
        members: [],
        date:  new Date().toISOString().substr(0, 10),
      }
    }
  },
  methods: {
    ...mapActions([ACTION_UPDATE_POINTS, ACTION_USER_IN_DEPARTMENT, ACTION_SHOW_DIALOG, ACTION_GET_NOTIFICATION, ACTION_SEND_TASK, ACTION_GET_TASK]),

    getFullname(user) {
      return `${user.lastName} ${user.firstName} ${user.thirdName}`
    },
    update: async function (date) {
      await this[ACTION_UPDATE_POINTS](date);
      const task = await this[ACTION_GET_TASK](date);
      if (task) {
        this.task = Object.assign(task, {date: this.task.date});
      } else {
        this.task = {
          points: [],
          head: {},
          number: '',
          members: [],
          date:  date
        }
      }
      this.selectAreas = this.areas;
    },

    getIcon: function (notify) {
      if (notify) {
        switch (notify.type) {
          case 'email': return this.icon.mdiAt;
          case 'letter': return this.icon.mdiEmail;
          case 'phone': return this.icon.mdiPhone;
        }
      } else {
        return this.icon.mdiBellOff
      }
    },
    async openDialog(point) {
      this.ACTION_SHOW_DIALOG(point);
      await this.ACTION_GET_NOTIFICATION();
    },
    async closedDialog(e) {
      if (e.needUpdate) {
        await this[ACTION_UPDATE_POINTS](this.task.date);
      }
    },
    async sendTask() {
      const task = await this.ACTION_SEND_TASK(this.task);
      if (task) {
        this.task.number = task.number;
        this.task._id = task._id;
      }
    },
  },
  computed: {
    ...mapGetters(['points', 'areas', 'usersInDepartment', 'isShowDialog']),
    btnTextSendTask: function () {
      return this.task.number?'Обновить задание':'Получить задание'
    }
  },
  async created() {
    await this.update(this.task.date);
    await this[ACTION_USER_IN_DEPARTMENT]();
  },
  name: "Job"
}
</script>

<style scoped>

</style>