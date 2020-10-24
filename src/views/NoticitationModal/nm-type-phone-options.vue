<template>
  <v-row no-gutters>
    <v-col class="pl-4 pr-4" cols="8">
      <v-text-field
          :disabled="!isEditable"
          v-model="to"
          label="Принял"
          :rules="rules"
      ></v-text-field>
    </v-col>
    <v-col class="pr-4" cols="4">
      <v-combobox
          :disabled="!isEditable"
          label="Телефон"
          v-model="phone"
          :items="notification.points[0].phone"
          :rules="rules"
      >
      </v-combobox>
    </v-col>
  </v-row>
</template>

<script>
import {GenerateMixin} from "@/mixins/UpdateFieldMixinFactory";

export default {
  ctx: this,

  name: "nm-type-phone-options",

  props: [
      "notification",
      "isEditable"
  ],

  computed: {
    rules: function () {
      const rules = [];
      const rule = (v) => {
        if (this.notification.type === "phone") {
          return !!v || "Заполните поле"
        } else {
          return true
        }
      }
      rules.push(rule);
      return rules;
    }
  },

  mixins: [GenerateMixin("NotificationModalStore", ["to", "phone"])]

}
</script>

<style scoped>

</style>