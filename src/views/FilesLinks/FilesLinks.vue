<template>
  <v-list
  >
    <v-list-item-title>
      Ссылки на файлы
    </v-list-item-title>
    <v-list-item
      v-for="link in links"
      :key="link._id"
    >
      <v-list-item-content>
        <v-list-item-icon>

        </v-list-item-icon>

        <v-list-item-title>
          {{link.filename}}
        </v-list-item-title>

      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "FilesLinks",
  props: [
      'EntityID'
  ],
  data: () => {
    return {
      links: []
    }
  },

  watch: {
    EntityID: function (id) {
      if (id) {
        console.log(id);
      }
    }
  }
}
</script>

<style scoped>

</style>