<template>
  <v-item-group
      v-model="type"
      class="ma-5"
      mandatory
  >
    <v-row dense>
      <v-col v-for="item in typesNotify" :key="item.value" cols="4">
        <v-item
            :value="item.value"
            v-slot:default="{active, toggle}"
        >
          <v-card
              class="d-flex align-center justify-center"
              :class="{'white--text': active}"
              min-height="35px"
              :disabled="!isEditable"
              :color="active?'primary':''"
              @click="toggle">
            {{ item.text }}

          </v-card>
        </v-item>
      </v-col>
    </v-row>
  </v-item-group>
</template>

<script>
import {GenerateMixin} from "@/mixins/UpdateFieldMixinFactory";

export default {
  name: "nm-type-selector",
  props: [
      "isEditable"
  ],
  data: () => {
    return {
      typesNotify: [
        {value: 'phone' , text: 'Телефонограмма'},
        {value: 'email', text: 'Email'},
        {value: 'letter', text: 'Письмо'}],
    }
  },

  mixins: [GenerateMixin("NotificationModalStore", ["type"])]
}
</script>

<style scoped>

</style>