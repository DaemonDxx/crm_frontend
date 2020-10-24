<template>
  <v-dialog
    v-model="dialog"
  >

    <template v-slot:activator="{ on, attrs }">
      <v-btn
          color="warning"
          v-on="on"
          v-bind="attrs"
      >
        Перенос
      </v-btn>
    </template>

    <v-card>

      <v-card-title>
        Выберете дату переноса
      </v-card-title>

      <v-card-text>
        <v-date-picker>

        </v-date-picker>
      </v-card-text>
    </v-card>

  </v-dialog>
</template>

<script>
export default {
  name: "nm-transfer-point",
  data: () => {
    return {
      dialog: false
    }
  }
}
</script>

<style scoped>

</style>