<template>
  <v-dialog
      v-if="isShowButton"
       v-model="dialog"
       width="320"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          class="ml-3"
          color="error"
          icon
          v-bind="attrs"
          v-on="on"
      >
          <v-icon>{{icon.mdiTrashCanOutline}}</v-icon>
      </v-btn>
    </template>

    <v-card>

      <v-card-title>
        Удалить телефонограмму?
      </v-card-title>

      <v-card-actions
        class="d-flex justify-space-around"
      >
        <v-btn
          color="error"
        >
          Удалить
        </v-btn>


        <v-btn
          @click="dialog=!dialog"
        >
          Отмена
        </v-btn>

      </v-card-actions>

    </v-card>


  </v-dialog>
</template>

<script>
import {mdiTrashCanOutline} from "@mdi/js";

export default {
  name: "nm-delete-action",
  props: [
      "isShowButton"
  ],
  data: () => {
    return {
      dialog: false,
      icon: {
        mdiTrashCanOutline
      }
    }
  }
}
</script>

<style scoped>

</style>