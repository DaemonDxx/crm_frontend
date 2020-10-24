<template>
  <v-item-group class="mb-3" v-model="typePlan" mandatory>
    <v-item
        v-for="item in typesPlaned"
        :key="item.value"
        :value="item.value"
        v-slot:default="{active, toggle}"
        class="mr-2 ml-2" >

      <v-chip
          :color="active?'primary':''"
          :class="{'text--white': active}"
          :disabled="!isEditable"
          @click="toggle"
          >
        {{item.text}}
      </v-chip>

    </v-item>
  </v-item-group >
</template>

<script>
import {GenerateMixin} from "@/mixins/UpdateFieldMixinFactory";

export default {
  name: "nm-type-plan-selector",

  props: [
    'isEditable'
  ],

  data: () => {
    return {
      typesPlaned: [
        {value: 'planned', text: 'Плановая проверка'},
        {value: 'unplanned', text: 'Внеплановая проверка'}
      ],
    }
  },

  mixins: [GenerateMixin("NotificationModalStore", ["typePlan"])]
}
</script>

<style scoped>

</style>