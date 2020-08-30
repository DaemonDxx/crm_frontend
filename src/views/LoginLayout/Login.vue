<template>
  <v-card-text class="text-start mt-3">
    <v-form @submit.prevent="login">
      <v-text-field
          v-model.trim="username"
          outlined
          label="Логин"
          type="text"
          :error=!!authErrorMessage
          :success="success"
      ></v-text-field>

      <v-text-field
          v-model="password"
          class="mb-n4"
          outlined
          label="Пароль"
          :error=!!authErrorMessage
          :error-messages=authErrorMessage
          :success="success"
          type="password"
      ></v-text-field>

      <v-checkbox
          v-model="rememberMe"
          label="Оставаться в системе"
      ></v-checkbox>

      <v-card-actions >
        <router-link to="/auth/signup">
          <v-btn text
                 small
                 color="primary"
                 class="mb-1">
            Зарегистрироваться</v-btn>
        </router-link>
        <v-spacer></v-spacer>
        <v-btn
            color="accent"
            class="mb-1"
            type="submit"
            :loading="authStatus==='send'"
        >Войти</v-btn>

      </v-card-actions>
    </v-form>
  </v-card-text>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {ACTION_LOGIN} from '../../store/auth'

export default {
  data: () => {
    return {
      rememberMe: true,
      username: '',
      password: '',
      success: false
    }
  },
  methods: {
    login: async function () {
      let result = await this.ACTION_LOGIN({username: this.username, password: this.password, isRememberMe: this.rememberMe});
      if (result) {
        this.success = true;
        setTimeout(function () {
          this.$router.push('/');
          }.bind(this), 1500);
      }
    },
    ...mapActions([
        ACTION_LOGIN
    ]),
  },
  computed: {
    ...mapGetters([
        'authStatus',
        'authErrorMessage'
    ])
  },
  name: "LoginView"
}
</script>

<style scoped>

</style>