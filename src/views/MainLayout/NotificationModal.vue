<template>
  <v-row>
    <v-dialog
        :value="isShow"
        persistent
        max-width="600px">
      <v-form>
      <v-card>

        <v-list-item class="primary">
          <v-list-item-content>
            <v-list-item-title class="text-start">
              <span class="white--text"> Уведомление </span>
            </v-list-item-title>
            <v-list-item-subtitle class="white--text text-start">
              От {{new Date()|dateFilter}}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action @click="getNumber" v-if="!number">
            <a class="white--text text-decoration-underline">Получить номер</a>
          </v-list-item-action>
          <v-list-item-action class="white--text" v-else>
            <span class="white--text text-h4">{{prefix}}-{{number}}</span>
          </v-list-item-action>
        </v-list-item>

        <v-item-group v-model="type" class="ma-5">
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

        <v-list-item v-if="type === 'phone'">
          <v-list-item-content two-line>
            <v-list-item-title class="text-start">
              <v-text-field label="Принял"></v-text-field>
            </v-list-item-title>
            <v-list-item-subtitle class="text-start">
              <v-combobox
                  v-model="phone"
                  :items="notifyPoints[0].phone"
              >

              </v-combobox>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-sheet>
          <span class="text-start">Руководителю: {{notifyPoints[0].name}}</span>
        </v-sheet>




        <v-data-table
            class="mr-4 ml-4"
            hide-default-footer
            item-key="_id"
            :items="notifyPoints"
            :headers="[
            {text: 'Адрес', value: 'address',sortable: false, },
            {text: 'Номер прибора учета', value: 'numberDevice', sortable: false},
            {text: 'Дата проверки', value: 'dateCheck', sortable: true}]">
        </v-data-table>

        <v-item-group class="mb-3" v-model="typePlan">
          <v-item class="mr-3" value="planned" v-slot:default="{active, toggle}">
            <v-chip :color="active?'primary':''" @click="toggle" :class="{'text--white': active}">
              Плановая проверка
            </v-chip>
          </v-item>
          <v-item value="unPlanned" v-slot:default="{active, toggle}">
            <v-chip :color="active?'primary':''" @click="toggle" :class="{'text--white': active}">
              Внеплановая проверка
            </v-chip>
          </v-item>
        </v-item-group>

        <v-textarea class="pl-4 pr-4" outlined label="Примечание" rows="2">
        </v-textarea>

        <v-btn @click="closeDialog">Закрыть</v-btn>
      </v-card>
      </v-form>
    </v-dialog>
  </v-row>
</template>

<script>
import {ACTION_HIDE_DIALOG, ACTION_GET_NOTIFICATION, ACTION_GET_NEXT_NUMBER} from "@/store/notification";
import {mapActions, mapGetters} from "vuex";
import getMonthName from '../../MonthParser'

export default {
  data: () => {
    return {
      type: 'phone',
      phone: '',
      email: '',
      to: '',
      time: '',
      status: '',
      description: '',
      typePlan: 'planned',
      typesNotify: [
        {value: 'phone' , text: 'Телефонограмма'},
        {value: 'email', text: 'Email'},
        {value: 'letter', text: 'Письмо'}]
    }
  },
  methods: {
    ...mapActions([ACTION_HIDE_DIALOG, ACTION_GET_NOTIFICATION, ACTION_GET_NEXT_NUMBER]),
    closeDialog() {
      this.ACTION_HIDE_DIALOG();
    },
    getNumber() {
      this.ACTION_GET_NEXT_NUMBER();
    }
  },
  computed: {
    ...mapGetters(['number','user', 'notifyPoints']),
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