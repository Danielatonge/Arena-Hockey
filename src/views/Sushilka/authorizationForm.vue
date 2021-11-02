<template>
  <div class="authorization_content" >
      <div style="margin-top: 30px; min-width: 300px;">
          <v-row>
              <p style="margin: 0">Логин</p>
          </v-row>
          <v-row>
                <v-text-field
                v-model="userLogin"
                elevation="0"
                label="Login"
                placeholder="Login"
                solo></v-text-field>
          </v-row>
          <v-row>
              <p style="margin: 0">Пароль</p>
          </v-row>
          <v-row>
                <v-text-field
                v-model="userPassword"
                label="Password"
                placeholder="Password"
                solo></v-text-field>
          </v-row>
          <v-row>
              <v-btn
              @click="authorization()"
              elevation="0"
              color="#0681C8"
              style="color: #fff">
                Войти
              </v-btn>
              <v-btn
              @click="setLogined(text)"
              elevation="0"
              color="grey"
              plain>
                Выйти
              </v-btn>
          </v-row>
      </div>
    <v-snackbar
    v-model="UNAUTHTORISE"
    :timeout="timeout"
    absolute
    top
    color="primary">
      <p class="authError">Произошла ошибка авторизации</p>
      <p class="authError">Пожалуйста, войдите в свой аккаунт</p>
    </v-snackbar>
    <v-snackbar
    v-model="invalidData"
    :timeout="timeout"
    absolute
    top
    color="primary">
      <p class="authError">Произошла ошибка авторизации</p>
      <p class="authError">Введен не верный логин или пароль</p>
    </v-snackbar>
  </div>
</template>

<script>

import { mapActions, mapGetters } from "vuex";
import Axios from "axios";
import { GET_CLIENT_CART_COUNT } from "@/api";
import {AUTHORIZE} from "@/api";

export default {
  components: {},
  name: "authorizationForm",
  props: {},
  data(){
    return{
      timeout: 3000,
      userLogin: "",
      userPassword: "",
      auth: false,
      text: "",
      invalidData: false,
    }
  },
  methods:{
    ...mapActions(["CHANGE_USER_ROLE"]),
    async authorization() {
        await Axios.post(`${AUTHORIZE}`, { 'login': this.userLogin, 'password': this.userPassword })
        .then( (res) => {
          this.setLogined(res.data.result.access_token, res.data.result.expires, res.data.result.user_role, res.data.result.user_name)
          this.CHANGE_USER_ROLE(res.data.result.user_role)
        })
        // .then(this.getCartCount)
        .catch((error) => {
          console.log(error.response.status)
          if(error.response.data.status == '422 Unprocessable Entity'){
            this.invalidData = true
          }
          console.error(error);
        })
    },

    setLogined(token, expires, role){
      if (token != "") {
        this.auth = true
        localStorage.setItem('auth', true)
        localStorage.setItem('access_token', token)
        localStorage.setItem('expires', expires)
        localStorage.setItem('user_role', role)
        this.$router.push({name: 'categoriesPage'})
      } else {
        localStorage.removeItem('auth')
        localStorage.removeItem('access_token')
        localStorage.removeItem('user_role')
        this.CHANGE_USER_ROLE("Покупатель")
      }
    },
    ...mapActions(["CHANGE_CART_COUNT"]),
    async getCartCount() {
      const token = localStorage.getItem("access_token");
      await Axios.get(`${GET_CLIENT_CART_COUNT}?clientNumber=1`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          this.CHANGE_CART_COUNT(res.data.result);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  created(){
  },
  computed: {
    ...mapGetters(["UNAUTHTORISE"]),
  },

};
</script>


<style lang="scss" scoped>
.authorization_content{
    display: flex;
    justify-content: center;
}

.authError{
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 24px;
    text-align: center;
}

</style>
