<template>
<v-container>
  <v-card>
    <v-row>
      <v-col cols="3">
        <v-menu
          v-model="menuDatePicker"
          :close-on-content-click="false"
          transition="scale-transition"
        >
          <template v-slot:activator="{on, attrs}">
            <v-text-field
                outlined
              readonly
              v-model="formatData"
              label="Месяц"
              v-bind="attrs"
              v-on="on"
            >
            </v-text-field>
          </template>
          <v-date-picker
              v-model="month"
              type="month"
              locale="ru-latn"
              @input="menuDatePicker=false"
          >

          </v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
  </v-card>
  <v-data-table
  hide-default-footer>

  </v-data-table>
</v-container>

</template>

<script>
import moment from 'moment';
moment.locale('ru');

export default {
name: "NotifyJornal",
  data: () => {
    return {
      sd: '',
      menuDatePicker: false,
      month: '',
    }
  },
  computed: {
    formatData: function () {
      moment.locale('ru');
      let date = moment(this.month);
      return `${date.format('MMMM YYYY')}`
    }
  }
}
</script>

<style scoped>

</style>