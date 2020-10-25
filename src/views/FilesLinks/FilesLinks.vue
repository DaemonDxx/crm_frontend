<template>
  <v-list
  >
    <v-list-item
      v-for="link in links"
      :key="link._id"
    >
      <v-list-item-content>
        <v-list-item-title
          class="text-start"
        >
          <v-btn
              color="blue"
              outlined
              link
              @click="download(link)"
          >
            <v-icon
              class="mr-3"
            >
              {{icons.mdiFileWord}}
            </v-icon>
            {{link.filename}}
          </v-btn>
        </v-list-item-title>

      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import {mdiFileWord } from "@mdi/js";
import {http} from "../../../HttpClient";
import fileDownload from "js-file-download"

export default {
  name: "FilesLinks",
  props: [
      'EntityID'
  ],
  data: () => {
    return {
      links: [],
       icons: {mdiFileWord}
    }
  },

  methods: {

    download: async function (link) {
      const response = await http('/file', {
        params: {id: link._id},
        responseType: "blob"
      });
      fileDownload(response.data, link.filename);
    }

  },

  watch: {
    EntityID: async function (id) {
      if (id) {
        const response = await http('/file/link', {
          params: {id}
        });
        this.links = response.data;
        return id;
      }
    }
  }
}
</script>

<style scoped>

</style>