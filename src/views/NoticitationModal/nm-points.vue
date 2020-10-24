<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-data-table
          class="mr-4 ml-4 mt-6 mb-6"
          hide-default-footer
          item-key="_id"
          :items="notification.points"
          :headers="headers">

        <template v-slot:item.dateCheck="{item}">
          <td>
            {{new Date(item.dateCheck)|dateFilter}}
          </td>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import getMonthName from "@/MonthParser";

export default {
  name: "nm-points",
  props: [
      'notification'
  ],
  data: () => {
    return {
      headers: [
        {text: 'Дата проверки', value: 'dateCheck', sortable: true},
        {text: 'Адрес', value: 'address', sortable: true},
        {text: 'Номер прибора учета', value: 'numberDevice', sortable: false},
      ],
    }
  },
  filters: {
    dateFilter: function (date) {
      return `${date.getDate()} ${getMonthName(date.getMonth())} ${date.getFullYear()}`;
    },
  },
}
</script>

<style scoped>

</style>