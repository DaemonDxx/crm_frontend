<template>
  <v-textarea
      v-model="description"
      class="pl-4 pr-4"
      outlined
      label="Примечание"
      rows="4"
      :disabled="!isEditable"
  >
  </v-textarea>
</template>

<script>
import {GenerateMixin} from "@/mixins/UpdateFieldMixinFactory";

export default {
  name: "nm-description-options",
  props: ['isEditable'],
  mixins: [GenerateMixin("NotificationModalStore", ["description"])]
}
</script>

<style scoped>

</style>