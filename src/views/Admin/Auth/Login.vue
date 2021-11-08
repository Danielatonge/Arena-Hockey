<template>
  <div class="grey lighten-4">
    <v-container class="my-16">
      <v-row class="my-16">
        <v-col cols="5" md="7" class="my-auto">
          <div class="text-center">
            <div class="text-h2 font-weight-bold">
              Портал <br />
              любителей <br />
              хоккея
            </div>
          </div>
        </v-col>
        <v-col cols="7" md="5" class="grey lighten-2 pa-8 rounded-lg">
          <div class="font-weight-bold text-h5 mb-3">Войти в аккаунт</div>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Почта или номер телефона"
                outlined
                v-model="mail"
                :rules="[rules.required]"
                flat
                hide-details="auto"
                class="rounded-lg"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Пароль"
                outlined
                v-model="password"
                flat
                hide-details="auto"
                class="rounded-lg"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required]"
                :type="showPass ? 'text' : 'password'"
                @click:append="showPass = !showPass"
              ></v-text-field>
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
                class="mb-10"
                large
                color="primary"
                elevation="0"
                @click="loginUser"
              >
                Продолжить
              </v-btn>
              <p class="mt-0">
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
        </v-col>
      </v-row>
      <v-dialog v-model="changePassword" origin="" max-width="700">
        <v-card class="py-3">
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
  </div>
</template>

<script>
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
  methods: {
    loginUser() {
      const credential = {
        mail: this.mail,
        password: this.password,
      };
      if (this.mail && this.password) {
        this.$store
          .dispatch("auth/loginUser", credential)
          .then((userId) => {
            this.$router.push({ name: "user-profile", params: { userId } });
          })
          .catch(() => {});
      } else {
        const notification = {
          type: "error",
          message: "Вводите все необходимые поля",
        };
        this.$store.dispatch("notification/add", notification);
        return;
      }
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

<style scoped></style>
