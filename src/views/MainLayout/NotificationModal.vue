<template>
  <v-row>
    <v-dialog
        :value="isShow"
        persistent
        max-width="300px">
      <v-card>
        <v-card-title>
            <v-btn @click="closeDialog">Закрыть</v-btn>
        </v-card-title>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import {ACTION_HIDE_DIALOG, ACTION_GET_NOTIFICATION} from "@/store/notification";
import {mapActions} from "vuex";

export default {
  methods: {
    ...mapActions([ACTION_HIDE_DIALOG, ACTION_GET_NOTIFICATION]),
    closeDialog() {
      this.ACTION_HIDE_DIALOG();
    }
  },
  props: ['isShow'],
  name: "NotificationModal",
  beforeUpdate() {
    if (this.isShow) {
      this.ACTION_GET_NOTIFICATION();
    }

  }
}
</script>

<style scoped>

</style>