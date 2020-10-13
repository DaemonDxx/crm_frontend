<template>
  <v-card class="primary">
    <v-row class="pl-4 pb-n4">
      <v-col cols="3">
       <date-picker>

       </date-picker>
      </v-col>
      <v-col cols="4">
        <areas-selection
        ></areas-selection>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import AreasSelection from "@/views/MainLayout/TaskView/PointsTable/AreasSelection";
import DatePicker from "@/views/MainLayout/TaskView/PointsTable/DatePicker";

export default {
name: "PointTableHeader",
  components: {DatePicker, AreasSelection},

}
</script>

<style scoped>

</style>