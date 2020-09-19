<template>
    <v-dialog

        :value="isShow"
        persistent
        max-width="600px">
      <v-card>

        <v-list-item class="primary">
          <v-list-item-content>
            <v-list-item-title class="text-start">
              <span class="white--text"> Уведомление </span>
            </v-list-item-title>
            <v-list-item-subtitle class="white--text text-start">
              От {{new Date()|dateFilter}} &#160;
              <span
                  v-if="notification.time && notification.type === 'phone'">
                {{notification.time}}
              </span>
              <v-btn
                  v-if="!notification.time && notification.type === 'phone'"
                  class="white--text text-decoration-underline mb-1"
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

        <v-item-group
            v-model="type"
            class="ma-5"
            mandatory
        >
          <v-row dense>
            <v-col v-for="item in typesNotify" :key="item.value" cols="4">
              <v-item :value="item.value" v-slot:default="{active, toggle}">
                <v-card class="d-flex align-center justify-center" :class="{'white--text': active}" min-height="35px" :color="active?'primary':''" @click="toggle">
                  {{ item.text }}
                </v-card>
              </v-item>
            </v-col>
          </v-row>
        </v-item-group>

        <v-divider class="mt-2 mb-2"></v-divider>

          <v-list-item>
            <v-list-item-content two-line>
              <v-list-item-title class="text-start">
                Передал: &#160; {{user.position.description}}&#160; {{user.department.shortName}}&#160; {{user|userFIO}}
              </v-list-item-title>
              <v-list-item-subtitle class="text-start">
                Телефон: 256-56-26 &#160;Email: i79535999238@gmail.com
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

        <v-divider class="mt-2 mb-2"></v-divider>

        <v-row no-gutters v-if="notification.type === 'phone'">
          <v-col class="pl-4 pr-4" cols="8">
            <v-text-field :readonly="!isEditable" v-model="to" label="Принял"></v-text-field>
          </v-col>
          <v-col class="pr-4" cols="4">
            <v-combobox
                :readonly="!isEditable"
                label="Телефон"
                v-model="phone"
                :items="notification.points[0].phone"
            >
            </v-combobox>
          </v-col>
        </v-row>

        <v-row no-gutters v-if="notification.type === 'email'">
          <v-col cols="12" class="pl-4 pr-4">
            <v-combobox
                :readonly="!isEditable"
                label="Email потрбителя"
                multiple
                chips
                v-model="email"
                :items="notification.points[0].email"

            >

            </v-combobox>
          </v-col>
        </v-row>

            <v-card-subtitle style="font-size: 16px" class="text-start text--primary ">
                Руководителю: {{notification.points[0].name}}
            </v-card-subtitle>


        <v-divider class="mt-2 mb-2"></v-divider>

        <v-data-table
            class="mr-4 ml-4 mt-6 mb-6"
            hide-default-footer
            item-key="_id"
            :items="notification.points"
            :headers="headersForTable">

          <template v-slot:item.dateCheck="{item}">
            <td>
              {{new Date(item.dateCheck)|dateFilter}}
            </td>
          </template>
        </v-data-table>

        <v-item-group class="mb-3" v-model="typePlan" mandatory>
          <v-item v-for="item in typesPlaned" :key="item.value" :value="item.value" v-slot:default="{active, toggle}" class="mr-2 ml-2" >
            <v-chip :color="active?'primary':''" @click="toggle" :class="{'text--white': active}">
              {{item.text}}
            </v-chip>
          </v-item>
        </v-item-group >



        <v-textarea v-model="description" class="pl-4 pr-4" outlined label="Примечание" rows="2">
        </v-textarea>

        <v-btn @click="saveNotify">Сохранить</v-btn>
        <v-btn @click="closeDialog">Закрыть</v-btn>
      </v-card>
    </v-dialog>
</template>

<script>
import moment from 'moment'
import {ACTION_HIDE_DIALOG, ACTION_GET_NOTIFICATION, ACTION_GET_NEXT_NUMBER, ACTION_SEND_NOTIFICATION} from "@/store/notification";
import {mapActions, mapGetters} from "vuex";
import getMonthName from '../../MonthParser'

export default {
  data: () => {
    return {
      headersForTable: [
        {text: 'Дата проверки', value: 'dateCheck', sortable: true},
        {text: 'Адрес', value: 'address', sortable: true},
        {text: 'Номер прибора учета', value: 'numberDevice', sortable: false},
      ],
      typesNotify: [
        {value: 'phone' , text: 'Телефонограмма'},
        {value: 'email', text: 'Email'},
        {value: 'letter', text: 'Письмо'}],
      typesPlaned: [
        {value: 'planed', text: 'Плановая проверка'},
        {value: 'unPlaned', text: 'Внеплановая проверка'}
      ],

    }
  },
  methods: {
    ...mapActions([ACTION_HIDE_DIALOG, ACTION_GET_NOTIFICATION, ACTION_GET_NEXT_NUMBER, ACTION_SEND_NOTIFICATION]),
    closeDialog() {
      this.ACTION_HIDE_DIALOG();
    },
    getNumber() {
      this.ACTION_GET_NEXT_NUMBER();
    },
    saveTime() {
      const time = moment().format('HH:mm')
      this.$store.commit('MUTATION_UPDATE_FIELD', {newValue: time, field: 'time'});
    },
    async saveNotify() {
      await this.ACTION_SEND_NOTIFICATION();
      this.$emit('closeDialog', {needUpdate: true});
    }
  },
  computed: {
    ...mapGetters(['notification', 'user', "isEditable"]),
    to: {
      get: function () {
        return this.$store.state.Notification.notification.to;
      },
      set: function (newValue) {
        this.$store.commit('MUTATION_UPDATE_FIELD', {newValue, field: 'to'});
      }
    },
    type: {
      get: function () {
        return this.$store.state.Notification.notification.type;
      },
      set: function (newValue) {
        this.$store.commit('MUTATION_UPDATE_FIELD', {newValue, field: 'type'});
      }
    },
    typePlan: {
      get: function () {
        return this.$store.state.Notification.notification.typePlan;
      },
      set: function (newValue) {
        this.$store.commit('MUTATION_UPDATE_FIELD', {newValue, field: 'typePlan'});
      }
    },
    phone: {
      get: function () {
        return this.$store.state.Notification.notification.phone;
      },
      set: function (newValue) {
        this.$store.commit('MUTATION_UPDATE_FIELD', {newValue, field: 'phone'});
      }
    },
    description: {
      get: function () {
        return this.$store.state.Notification.notification.description;
      },
      set: function (newValue) {
        this.$store.commit('MUTATION_UPDATE_FIELD', {newValue, field: 'description'});
      }
    },
    email: {
      get: function () {
        return this.$store.state.Notification.notification.email;
      },
      set: function (newValue) {
        this.$store.commit('MUTATION_UPDATE_FIELD', {newValue, field: 'email'});
      }
    },
    prefix: function () {
      switch (this.type) {
        case "phone": return 'Т';
        case "email": return 'Е';
        case "letter": return 'П';
        default: return '';
       }
    }
  },
  filters: {
    userFIO: function (value) {
      if (value.lastName) {
        return `${value.lastName} ${value.firstName.split('')[0]}. ${value.thirdName.split('')[0]}.`
      }
    },
    dateFilter: function (date) {
      return `${date.getDate()} ${getMonthName(date.getMonth())} ${date.getFullYear()}`;
    },
  },
  props: ['isShow'],
  name: "NotificationModal",
}
</script>

<style scoped>

</style>