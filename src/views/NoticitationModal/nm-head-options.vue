<template>
  <v-row no-gutters>
    <v-col>
      <v-select
          v-model="head"
          :items="usersInDepartment"
          :item-text="getFullName"
          label="Ответсвенный"
          class="mr-5 ml-5"
          return-object
          :disabled="!isEditable"
          :rules="rules"
      >

      </v-select>
    </v-col>
  </v-row>
</template>

<script>
import {GenerateMixin} from "@/mixins/UpdateFieldMixinFactory";
import {RequiredRule} from "@/validators";

export default {
  name: "nm-head-options",
  props: [
      "isEditable",
      "usersInDepartment"
  ],

  data: () => {
    return {
    }
  },

  methods: {
    getFullName(user) {
      return `${user.lastName} ${user.firstName} ${user.thirdName}`
    },
  },

  computed: {
    rules: function () {
        const rules = [];
        rules.push(RequiredRule);
        return rules;
    }
  },

  mixins: [GenerateMixin("NotificationModalStore", ["head"])]
}
</script>

<style scoped>

</style>