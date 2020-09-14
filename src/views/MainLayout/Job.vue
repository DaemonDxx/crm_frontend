<template>
  <v-container fluid>
      <v-row>
        <v-col>
          <v-card min-height="300px" max-width="300px">
            <v-list dense>
              <v-list-item-title>
                РЭС
              </v-list-item-title>
              <v-list-item
                  v-for="a in areas"
                  :key="a"
              >
                <v-list-item-action>
                  <v-checkbox dense class="text-start"
                      :label="a"
                      :value="a"
                      v-model="selectAreas">
                  </v-checkbox>
                </v-list-item-action>

              </v-list-item>
            </v-list>
          </v-card>
        </v-col>

        <v-col>
          <v-card  max-width="300px" min-height="300px">
          <v-date-picker
              first-day-of-week="1"
              no-title
              v-model="date"
              locale="ru-latn"
              @change="update"
              landscape>
          </v-date-picker>
          </v-card>
        </v-col>

        <v-col cols="4">
          <v-card min-height="300px">
              <v-select :items="usersInDepartment" class="pl-4 pr-4 pt-4"  outlined label="Выдающий задание"></v-select>
              <v-select :items="usersInDepartment" class="pl-4 pr-4 pt-4 mb-n4" outlined label="Член бригады"></v-select>
              <v-select :items="usersInDepartment" class="pl-4 pr-4 pt-4" outlined label="Член бригады"></v-select>
          </v-card>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>

    <v-card>
      <v-data-table
          hide-default-footer
          v-model="selectPoint"
          item-key="_id"
          show-select
          :items-per-page="itemsPerPage"
          :headers="headers"
          :items="points(selectAreas)"
          group-by="area"
          sort-by="name"
          >

        <template style="colspan: all" v-slot:group.header="props">
            <td style="background-color: #F9FBE7" class="text-start" colspan="6">
              <v-btn class="mr-3" icon @click="props.toggle()">
                <v-icon>
                  {{icon.mdiMinus}}
                </v-icon>
              </v-btn>
              <span class="font-weight-bold">{{props.group}}</span>
            </td>
        </template>

        <template v-slot:item.notification="props">
          <td class="align-center">
            <v-btn icon @click="test(props.item)">
              <v-icon  color="success" v-if="props.value">{{getIcon(props.value)}}</v-icon>
              <v-icon color="error" v-else>{{getIcon(props.value)}}</v-icon>
            </v-btn>
          </td>
        </template>


      </v-data-table>
    </v-card>

  </v-container>
</template>

<script>

import {ACTION_USER_IN_DEPARTMENT} from "@/store/auth";

import {ACTION_UPDATE_POINTS} from '../../store/points'

import {mapActions, mapGetters} from "vuex";
import {mdiMinus, mdiPhone, mdiAt, mdiEmail, mdiBellOff} from '@mdi/js';

export default {
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
      selectPoint: [],
      date: new Date().toISOString().substr(0, 10),
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
    ...mapActions([ACTION_UPDATE_POINTS, ACTION_USER_IN_DEPARTMENT]),

    update: async function (date) {
      await this[ACTION_UPDATE_POINTS](date);
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
    test: function (i,a) {
      console.log(i);
      console.log(this.oneNamePointsInDay(i.name))
      console.log(a);
    }
  },
  computed: {
    ...mapGetters(['points', 'areas', 'usersInDepartment', "oneNamePointsInDay"]),
  },
  async created() {
    await this[ACTION_UPDATE_POINTS](this.date);
    await this[ACTION_USER_IN_DEPARTMENT]();
  },
  name: "Job"
}
</script>

<style scoped>

</style>