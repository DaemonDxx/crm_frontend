<template>
    <v-container fluid class="grey lighten-5 fill-height" >
      <v-row justify="center" align="center" class="">
        <v-col cols="12" sm="7" md="5" lg="3">
          <v-card class="elevation-4">

            <v-app-bar color="primary">
              <v-btn  v-if='this.$router.currentRoute.name === "signup"' icon @click="goBack">
                <v-icon>{{iconPath}}</v-icon>
              </v-btn>

              <div class="white--text">
                ОИК CRM-Systems
              </div>

            </v-app-bar>

            <router-view>

            </router-view>

          </v-card>
        </v-col>
      </v-row>
    </v-container>

</template>

<script>
import {mdiArrowLeftCircle} from '@mdi/js'

export default {
  data: function () {
    return {
      iconPath: mdiArrowLeftCircle,
      positions: ['Инженер 1 категории', 'Инженер 2 категории']
    }
  },
  methods: {
    goBack: function () {
      this.$router.push('login');
    }
  },
  name: "LoginLayout"
}
</script>

<style scoped>

</style>