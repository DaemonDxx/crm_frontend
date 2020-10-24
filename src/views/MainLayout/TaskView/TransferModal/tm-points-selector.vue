<template>
  <v-list>
    <v-list-item-title
      class="mb-3"
    >
      Выберете точки для переноса
    </v-list-item-title>
    <v-list-item-group
      v-model="selectedPoints"
      multiple
      mandatory
    >
      <v-list-item
        v-for="point in points"
        :key="`${point._id}td`"
        :value="point"
        three-line
        color="primary"
      >
        <v-list-item-content>
        <v-list-item-title
          class="text-start"
        >
          {{point.numberDevice}}
        </v-list-item-title>
        <v-list-item-subtitle
        class="text-start"
        >
          {{point.address}}
        </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

    </v-list-item-group>
  </v-list>
</template>

<script>
import {GenerateMixin} from "@/mixins/UpdateFieldMixinFactory";

export default {
  name: "tm-points-selector",
  props: [
      "points"
  ],
  mixins: [GenerateMixin("TransferDialog", ["selectedPoints"])]
}
</script>

<style scoped>

</style>