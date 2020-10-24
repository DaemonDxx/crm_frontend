<template>
  <v-row no-gutters>
    <v-col cols="12" class="pl-4 pr-4">
      <v-combobox
          :readonly="!isEditable"
          label="Email потребителя"
          multiple
          chips
          v-model="email"
          :items="notification.points[0].email"
      >

      </v-combobox>
    </v-col>
  </v-row>
</template>

<script>
import {GenerateMixin} from "@/mixins/UpdateFieldMixinFactory";

export default {
  name: "nm-type-email-options",
  props: [
      "notification",
      "isEditable"
  ],

  computed: {


  },

  mixins: [GenerateMixin("NotificationModalStore", ["email"])]
}
</script>

<style scoped>

</style>