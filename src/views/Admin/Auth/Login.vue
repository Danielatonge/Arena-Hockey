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
                flat
                hide-details="auto"
                class="rounded-lg"
                :rules="[rules.required]"
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
          <v-checkbox
            v-model="checkbox"
            label="Не выходить из системы"
          ></v-checkbox>
          <div>
            <div class="text-center">
              <v-btn
                tile
                class=""
                large
                color="grey lighten-0"
                elevation="0"
                @click="loginUser"
              >
                Продолжить
              </v-btn>
              <p class="mt-4">
                Нет аккаунта?
                <router-link
                  style="text-decoration: unset"
                  :to="{
                    name: 'registration',
                  }"
                  >Зарегистрироваться</router-link
                >
              </p>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      checkbox: false,
      showPass: false,
      rules: {
        required: (value) => !!value || "Обязательный поль.",
      },
      password: "",
      mail: "",
    };
  },
  methods: {
    loginUser() {
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
  },
};
</script>

<style scoped></style>
