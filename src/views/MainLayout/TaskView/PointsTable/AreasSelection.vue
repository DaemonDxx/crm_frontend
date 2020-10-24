<template>
  <v-select
      background-color="white"
      solo
      multiple
      label="РЭС"
      v-model="selectedAreas"
      :items="areas"
      :item-text="area => area"
  >
    <template v-slot:selection="{ item, index }">
      <span v-if="index === 0">{{item}}</span>
      <span v-if="index === 1">{{`  + ${selectedAreas.length-1}`}}</span>
    </template>

  </v-select>
</template>

<script>
import {TaskViewActions} from "@/store/TaskView";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "areasSelection",
  data: () => {
    return {
    }
  },
  methods: {
    ...mapActions('TaskViewStore', [TaskViewActions.UPDATE_PARAMS_REQUEST])
  },
  computed: {
    ...mapGetters('TaskViewStore', ['areas']),
    selectedAreas: {
      set: async function (value) {
        await this[TaskViewActions.UPDATE_PARAMS_REQUEST]({
          key: 'selectedAreas',
          value
        });
      },
      get: function () {
        return this.$store.state.TaskViewStore.selectedAreas;
      }
    }
  }
}
</script>

<style scoped>

</style>