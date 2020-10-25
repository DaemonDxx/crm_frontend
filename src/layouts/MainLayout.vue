<template>
  <v-container fluid class="fill-height pa-0" >
    <v-navigation-drawer
        v-model="drawer"
        app>
      <v-list-item
      color="primary">
        <v-list-item-avatar>
          <v-icon>
            {{mdiAccountCircle}}
          </v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-start">{{ user | userFIO }}</v-list-item-title>
          <v-list-item-subtitle class="text-start">{{user.position.description}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <v-list-item-group>
        <v-list-item
            color="primary"
            v-for="(item) in navigationList"
            :key="item.title"
            @click="to(item.path)"
        >
            <v-list-item-icon><v-icon color="primary">{{item.icon}}</v-icon></v-list-item-icon>
            <v-list-item-content>{{item.title}}</v-list-item-content>

        </v-list-item>
      </v-list-item-group>
    </v-navigation-drawer>

    <v-app-bar
        color="primary"
        app
        dense
    >
    <v-btn
        @click="drawer=!drawer" icon>
      <v-icon>{{mdiMenuOpen}}</v-icon>
    </v-btn>
      <v-spacer></v-spacer>
      <v-btn
          outlined
          color="white"
          @click="logout">
        Выйти
      </v-btn>
    </v-app-bar>

    <v-main
        class="fill-height"
        style="background-color: #EEEEEE">
      <router-view></router-view>
    </v-main>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {mdiAccountCircle, mdiFormatListChecks, mdiMenuOpen, mdiPhone, mdiViewDashboardOutline, mdiCloudUploadOutline,} from '@mdi/js';
import {ACTION_LOGOUT} from '../store/auth';
import {UserActions} from "@/store/users";


export default {

  name: "MainLayout",

  data: () => {
    return {
      mdiAccountCircle,
      mdiMenuOpen,
      drawer: false,
      navigationList: [
        {
          title: 'Главная',
          path: '/dashboard',
          icon: mdiViewDashboardOutline,
          needPermissions: []
        },
        {
          title: 'Задание',
          path: '/job',
          icon: mdiFormatListChecks,
          needPermissions: []
        },
        {
          title: 'Уведомления',
          path: '/notification',
          icon: mdiPhone,
          needPermissions: []
        },
        {
          title: 'Загрузка точек',
          path: '/upload',
          icon: mdiCloudUploadOutline,
          needPermissions: []
        },
        {
          title: 'Отчет по проверкам',
          path: '/results-check',
          icon: '',
          needPermissions: []
        }

      ]
    }
  },

  methods: {
    ...mapActions([ACTION_LOGOUT]),
    ...mapActions([
        UserActions.REQUEST_GET_ALL_USERS_IN_DEPARTMENT,
        UserActions.REQUEST_GET_SELF_INFO
    ]),

    to(path) {
      this.drawer = !this.drawer;
      this.$router.push(path);
    },

    logout() {
      this.ACTION_LOGOUT();
      this.$router.push('/auth/login');
    }
  },

  computed: {
    ...mapGetters([
        'user'
    ])
  },

  filters: {
    userFIO: function (value) {
      if (value.lastName) {
        return `${value.lastName} ${value.firstName.split('')[0]}. ${value.thirdName.split('')[0]}.`
      }
    }
  },

  async created() {
    await this[UserActions.REQUEST_GET_SELF_INFO]();
    await this[UserActions.REQUEST_GET_ALL_USERS_IN_DEPARTMENT]();
  },

}

</script>

<style scoped>

</style>