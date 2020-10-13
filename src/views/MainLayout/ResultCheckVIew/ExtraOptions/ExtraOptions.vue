<template>
  <v-row>
    <v-col cols="12"
           v-if="typeResult === 'steals'"
    >
      <stealOptions>
      </stealOptions>
    </v-col>
    <v-col cols="12"
           v-if="typeResult === 'dont'"
    >
      <dont-options>

      </dont-options>
    </v-col>
    <v-col cols="12"
           v-if="typeResult === 'notFull'"
    >
      <not-full-options>

      </not-full-options>
    </v-col>
    <v-col cols="12">
      <default-options>

      </default-options>
    </v-col>
  </v-row>
</template>

<script>
import StealOptions from "@/views/MainLayout/ResultCheckVIew/ExtraOptions/StealOptions";
import DefaultOptions from "@/views/MainLayout/ResultCheckVIew/ExtraOptions/DefaultOptions";
import DontOptions from "@/views/MainLayout/ResultCheckVIew/ExtraOptions/DontOptions";
import NotFullOptions from "@/views/MainLayout/ResultCheckVIew/ExtraOptions/notFullOptions";
export default {
  components: {NotFullOptions, DontOptions, DefaultOptions, StealOptions},
  props: ['point', 'typeResult'],
  name: "ExtraOptions"
}
</script>

<style scoped>

</style>