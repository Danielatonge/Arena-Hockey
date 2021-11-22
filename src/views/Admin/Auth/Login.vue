<template>
  <v-img height="100%" width="100%" src="@/assets/background-login.jpg">
    <v-container class="my-16">
      <v-row class="justify-center my-16">
        <v-col
          cols="10"
          sm="8"
          md="7"
          lg="5"
          xl="3"
          class="white pa-8 rounded-lg my-opacity"
        >
          <div class="font-weight-bold text-h5 mb-7 text-center">
            Войти в аккаунт
          </div>
          <form @submit.prevent="loginUser">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  autocomplete="new-password"
                  label="Электронная почта"
                  outlined
                  v-model="mail"
                  flat
                  hide-details="auto"
                  class="rounded-lg"
                  :rules="[$v.mail.required, $v.mail.email]"
                  @blur="$v.mail.$touch()"
                ></v-text-field>
                <template v-if="$v.mail.$error">
                  <p v-if="!$v.mail.required" class="error--text mb-0">
                    Электронная почта - обязательное поле
                  </p>
                  <p v-if="!$v.mail.email" class="error--text mb-0">
                    Пример: abc@yourcompany.com
                  </p>
                </template>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Пароль"
                  outlined
                  v-model="password"
                  autocomplete="new-password"
                  flat
                  hide-details="auto"
                  class="rounded-lg"
                  :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPass ? 'text' : 'password'"
                  @click:append="showPass = !showPass"
                  :rules="[$v.password.required]"
                  @blur="$v.password.$touch()"
                ></v-text-field>
                <template v-if="$v.password.$error">
                  <div>
                    <span v-if="!$v.password.required" class="error--text mb-0">
                      Пароль - обязательное поле
                    </span>
                  </div>
                </template>
              </v-col>
            </v-row>
            <!-- <v-checkbox
            v-model="checkbox"
            label="Не выходить из системы"
          ></v-checkbox> -->
            <div class="mt-6">
              <div class="text-center">
                <v-btn
                  tile
                  class="mb-10 rounded-lg"
                  large
                  color="primary"
                  elevation="0"
                  type="submit"
                >
                  Продолжить
                </v-btn>
                <p class="mt-0 mb-1">
                  Нет аккаунта?
                  <router-link
                    style="text-decoration: unset"
                    :to="{
                      name: 'registration',
                    }"
                    >Зарегистрироваться</router-link
                  >
                </p>
                <p class="my-0">
                  Забыли пароль?
                  <a
                    @click.prevent="restorePassword"
                    style="text-decoration: unset"
                    >Восстановить доступ</a
                  >
                </p>
              </div>
            </div>
          </form>
        </v-col>
      </v-row>
      <v-dialog
        v-model="changePassword"
        origin=""
        max-width="700"
        content-class="my-opacity"
      >
        <v-card class="py-3 my-opacity">
          <v-card-title class="justify-center">
            <div class="text-h5 black--text font-weight-bold">
              Восстановить доступ
            </div>
          </v-card-title>
          <v-card-text v-if="enterMail">
            <p class="body-1 mb-1">Введите адрес электронной почты</p>
            <v-row>
              <v-col>
                <div class="mb-2">
                  <v-text-field
                    v-model="mail"
                    autocomplete="new-password"
                    :rules="[rules.required]"
                    outlined
                    solo
                    dense
                    persistent-hint
                    flat
                    hide-details="auto"
                    class="rounded-lg"
                  >
                  </v-text-field>
                </div>
              </v-col>
              <v-col class="my-0">
                <v-btn
                  elevation="0"
                  color="primary"
                  class="body-2"
                  height="40px"
                  @click="sendCode"
                >
                  Отправить код
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text v-else>
            <p class="body-1 mb-1">
              На вашу почту был отправлен код для изменения вашего пароля
            </p>
            <div>
              <div class="mb-2">
                <v-text-field
                  v-model="passCode"
                  :rules="[rules.required]"
                  outlined
                  placeholder="Введите код"
                  solo
                  dense
                  persistent-hint
                  flat
                  hide-details="auto"
                  class="rounded-lg"
                >
                </v-text-field>
              </div>

              <div>введите ваш новый пароль</div>
              <v-text-field
                outlined
                v-model="password"
                flat
                dense
                solo
                hide-details="auto"
                class="rounded-lg"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required]"
                :type="showPass ? 'text' : 'password'"
                @click:append="showPass = !showPass"
              ></v-text-field>
              <div class="my-4">
                <v-btn
                  elevation="0"
                  color="primary"
                  class="body-2"
                  height="40px"
                  @click="verifyCode"
                >
                  изменить пароль
                </v-btn>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
  </v-img>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "Login",
  data() {
    return {
      enterMail: false,
      changePassword: false,

      checkbox: false,
      showPass: false,
      rules: {
        required: (value) => !!value || "Обязательный поль.",
      },
      password: "",
      mail: "",
      passCode: "",
    };
  },
  validations: {
    password: { required },
    mail: { required, email },
  },
  methods: {
    loginUser() {
      this.$v.$touch();
      if (this.$v.$invalid) return;

      const credential = {
        mail: this.mail,
        password: this.password,
      };
      this.$store
        .dispatch("auth/loginUser", credential)
        .then((userId) => {
          this.$router.push({ name: "user-profile", params: { userId } });
        })
        .catch(() => {});
    },
    sendCode() {
      this.$store
        .dispatch("auth/sendConfirmationCode", this.mail)
        .then(() => {
          this.enterMail = false;
        })
        .catch(() => {});
    },
    verifyCode() {
      const credentials = {
        email: this.mail,
        code: this.passCode,
        password: this.password,
      };

      this.$store
        .dispatch("auth/changePassword", credentials)
        .then(() => {
          this.changePassword = false;
        })
        .catch(() => {});
    },
    restorePassword() {
      this.changePassword = true;
      this.enterMail = true;
    },
  },
};
</script>

<style>
.my-opacity {
  opacity: 0.9 !important;
}
</style>
