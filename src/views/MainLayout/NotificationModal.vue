<template>
  <v-row>
    <v-dialog
        persistent
        max-width="300px">
      <v-card>
        <v-card-title>
          {{ id }}
        </v-card-title>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ['points', 'isShow'],
  name: "NotificationModal"
}
</script>

<style scoped>

</style>