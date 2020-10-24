<template>
  <v-dialog
      persistent
      :value="isVisible"
      width="400"
  >

    <v-card>
      <v-card-title
        class="primary white--text"
      >
        <v-btn
            class="ml-n4 mr-4"
          icon
          @click="closeDialog"
          color="white"
        >
          <v-icon>{{icon.mdiBackspace}}</v-icon>
        </v-btn>
        Перенос даты проверки
      </v-card-title>

      <v-card-text
        class="mt-4"
      >

        <span
          class="text-h6"
        >
          {{points[0].name}}
        </span>

        <v-date-picker
            class="mt-4"
            first-day-of-week="1"
            no-title
            locale="ru-latn"
            v-model="newDate"
            show-current="false"
        >

        </v-date-picker>

        <tm-points-selector
          :points="points"
        >

        </tm-points-selector>
      </v-card-text>
      <v-card-actions>
        <v-btn
          outlined
          color="primary"
          block
          @click="transfer"
        >
          Перенести
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>

</template>

<script>
import {mapActions, mapState} from "vuex";
import {mdiBackspace} from "@mdi/js";
import {GenerateMixin} from "@/mixins/UpdateFieldMixinFactory";
import TmPointsSelector from "@/views/MainLayout/TaskView/TransferModal/tm-points-selector";
import {TransferDialogActions} from "@/store/TransferDialog";


export default {
  name: "TransferDialog",
  components: {TmPointsSelector},
  data: () => {
    return {
      icon: {mdiBackspace}
    }
  },

  methods: {
    ...mapActions("TransferDialog", [
        TransferDialogActions.REQUEST_TRANSFER_POINTS,
        TransferDialogActions.HIDE
    ]),

    transfer: async function () {
        await this[TransferDialogActions.REQUEST_TRANSFER_POINTS]();
    },

    closeDialog: function () {
      this[TransferDialogActions.HIDE]();
    }
  },

  computed: {
    ...mapState("TransferDialog", {
      isVisible: state => state.isVisible,
      points: state => state.points,
    })
  },

  mixins: [GenerateMixin("TransferDialog", ["newDate"])]
}
</script>

<style scoped>

</style>