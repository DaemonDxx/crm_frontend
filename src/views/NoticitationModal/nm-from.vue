<template>
  <v-list-item>
    <v-list-item-content two-line>
      <v-list-item-title class="text-start">
        {{from}}
      </v-list-item-title>
      <v-list-item-subtitle class="text-start">
        Телефон: 256-56-26 &#160;Email: i79535999238@gmail.com
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import {UserFIOFilter} from "@/views/NoticitationModal/helperFunction";

export default {
  name: "nm-from",
  props: [
      "notification",
      "user"
  ],
  computed: {
    from: function() {
      if (this.notification.from) {
        return `Передал: ${this.notification.from.position.description} ${this.notification.from.department.shortName} ${UserFIOFilter(this.notification.from)}`;
      } else {
        return `Передал:  ${this.user.position.description} ${this.user.department.shortName} ${UserFIOFilter(this.user)}`;
      }
    }
  }
}
</script>

<style scoped>

</style>