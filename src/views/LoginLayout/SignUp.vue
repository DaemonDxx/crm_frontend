<template>
  <v-card-text class="text-start mt-3 ">
    <v-form @submit.prevent="signup">
      <v-text-field v-model="username" outlined label="Новый логин" type="text"></v-text-field>
      <v-text-field v-model="password" class="" outlined label="Пароль" type="password"></v-text-field>
      <v-text-field v-model="repeatPassword" :error="isPasswordRepeatError"  outlined label="Повторите пароль" type="password"></v-text-field>
      <v-text-field v-model="lastName" outlined label="Фамилия" type="text"></v-text-field>
      <v-text-field v-model="firstName" outlined label="Имя" type="text"></v-text-field>
      <v-text-field v-model="thirdName" outlined label="Отчество" type="text"></v-text-field>
      <v-select v-model="position"
                :items="positions"
                outlined
                label="Должность"
                item-text="description"
                return-object
      ></v-select>
      <v-text-field v-model="invite" outlined label="Инвайт" type="text"></v-text-field>
      <v-btn :disabled="isPasswordRepeatError" type="submit" block class="mb-3">Зарегистрироваться</v-btn>
    </v-form>
  </v-card-text>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {ACTION_SIGNUP, ACTION_POSITIONS} from '../../store/auth'

export default {
  data: () => {
    return {
      username: '',
      password: '',
      repeatPassword: '',
      firstName: '',
      lastName: '',
      thirdName: '',
      position: '',
      invite: ''
    }
  },

  methods: {
    ...mapActions([
        ACTION_SIGNUP,
        ACTION_POSITIONS
    ]),

    signup: async  function () {
        const result = await this.ACTION_SIGNUP({
            firstName: this.firstName,
            lastName: this.lastName,
            thirdName: this.thirdName,
            username: this.username,
            password: this.password,
            position: this.position,
            invite: this.invite
        });
        if (result) {
          await this.$router.push('/login');
        }
    },


  },

  computed: {
    ...mapGetters([
        'positions',
        'isSendingRequest'
    ]),
    isPasswordRepeatError: function () {
      return this.password !== this.repeatPassword;
    }
  },

  created: async function() {
    await this.ACTION_POSITIONS();
  },

  name: "SignUp"
}
</script>

<style scoped>

</style>