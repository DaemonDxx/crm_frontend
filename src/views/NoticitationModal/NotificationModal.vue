<template>
    <v-dialog

        :value="isVisibleDialog"
        persistent
        max-width="700px">

      <v-card>

      <v-form
        ref="form"
      >
        <nm-header
          :notification="notification"
        >
        </nm-header>

        <nm-type-selector
            :is-editable="isEditable"
        >
        </nm-type-selector>

        <v-divider class="mt-2 mb-2"></v-divider>

        <nm-from
          :notification="notification"
          :user="user"
        >
        </nm-from>


        <v-divider class="mt-2 mb-2"></v-divider>

        <nm-type-phone-options
            v-if="notification.type === 'phone'"
            :notification="notification"
            :is-editable="isEditable"
        >
        </nm-type-phone-options>

        <nm-type-email-options
            v-if="notification.type === 'email'"
            :notification="notification"
            :is-editable="isEditable"
        >
        </nm-type-email-options>


        <v-card-subtitle style="font-size: 16px" class="text-start text--primary ">
          Руководителю:
          <span
              class="font-weight-bold"
          >
            {{notification.points[0].name}}
          </span>
        </v-card-subtitle>


        <v-divider class="mt-2 mb-2"></v-divider>

        <nm-points
          :notification="notification"
        >

        </nm-points>

        <nm-type-plan-selector
          :is-editable="isEditable"
        >

        </nm-type-plan-selector>

        <nm-head-options
          :is-editable="isEditable"
          :users-in-department="usersInDepartment"
        >

        </nm-head-options>

        <nm-description-options
          :is-editable="isEditable"
        >

        </nm-description-options>

        <v-card-actions
          class="pl-4 pr-4 pb-5"
        >
         <nm-transfer-point>

         </nm-transfer-point>

          <nm-delete-action
            :is-show-button="isHaveNotification"
          >

          </nm-delete-action>

          <v-btn
            v-if="!isEditable"
              icon
            color="primary"
            title="Редактировать уведомление"
            @click="canEdit"
          >
            <v-icon>
              {{icon.mdiPen}}
            </v-icon>
          </v-btn>

          <v-spacer>


          </v-spacer>

          <v-btn
              color="success"
              @click="saveNotify"
          >
            Сохранить
          </v-btn>
        </v-card-actions>

       </v-form>
      </v-card>

    </v-dialog>
</template>

<script>
import {mdiTrashCanOutline, mdiPen} from "@mdi/js";
import {mapActions, mapGetters} from "vuex";
import {NotificationModalActions} from "@/store/NotificationModal";
import NmFrom from "@/views/NoticitationModal/nm-from";
import NmTypeSelector from "@/views/NoticitationModal/nm-type-selector";
import NmHeader from "@/views/NoticitationModal/nm-header";
import NmTypePhoneOptions from "@/views/NoticitationModal/nm-type-phone-options";
import NmTypeEmailOptions from "@/views/NoticitationModal/nm-type-email-options";
import NmPoints from "@/views/NoticitationModal/nm-points";
import NmTypePlanSelector from "@/views/NoticitationModal/nm-type-plan-selector";
import NmDescriptionOptions from "@/views/NoticitationModal/nm-description-options";
import NmHeadOptions from "@/views/NoticitationModal/nm-head-options";
import NmDeleteAction from "@/views/NoticitationModal/ActionsButtonDialog/nm-delete-action";
import {TaskViewActions} from "@/store/TaskView";
import NmTransferPoint from "@/views/NoticitationModal/ActionsButtonDialog/nm-transfer-point";

export default {
  name: "NotificationModal",
  components: {
    NmTransferPoint,
    NmDeleteAction,
    NmHeadOptions,
    NmDescriptionOptions,
    NmTypePlanSelector, NmPoints, NmTypeEmailOptions, NmTypePhoneOptions, NmHeader, NmTypeSelector, NmFrom},

  data: () => {
    return {
      icon: {
        mdiTrashCanOutline,
        mdiPen
      },
    }
  },

  methods: {

    ...mapActions("NotificationModalStore", [
       NotificationModalActions.EDIT_NOTIFICATION,
        NotificationModalActions.SAVE_NOTIFICATION,
    ]),

    ...mapActions("TaskViewStore", [
        TaskViewActions.UPDATE_NOTIFICATION_IN_POINTS
    ]),

    canEdit: function () {
      this[NotificationModalActions.EDIT_NOTIFICATION](true);
    },

    async saveNotify() {
      const haveNotError = this.$refs.form.validate();
      if (haveNotError) {
        await this[NotificationModalActions.SAVE_NOTIFICATION]()
        this[TaskViewActions.UPDATE_NOTIFICATION_IN_POINTS](this.notification);
      }
    }

  },

  computed: {
    ...mapGetters(['user', 'usersInDepartment']),

    ...mapGetters("NotificationModalStore", [
      'notification',
      "isEditable",
      "isVisibleDialog",
      "isHaveNotification"
    ]),

  },
}


</script>

<style scoped>

</style>