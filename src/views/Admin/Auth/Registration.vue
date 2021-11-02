<template>
  <div class="grey lighten-4">
    <v-container class="pb-10">
      <div class="d-flex justify-space-between my-10">
        <div class="text-h3 d-flex pb-3 pt-5 my-auto">Регистрация</div>
        <div class="d-flex my-auto">
          <!-- <v-btn tile class="" large color="grey lighten-2" elevation="0">
            Назад
          </v-btn> -->
        </div>
      </div>
      <v-row class="">
        <v-col cols="12" md="6" class="mb-2">
          <v-text-field
            label="Фамилия"
            v-model="user.surname"
            outlined
            flat
            hide-details="auto"
            class="rounded-lg"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="mb-2">
          <v-text-field
            label="Номер телефона"
            outlined
            v-model="user.phone"
            flat
            hide-details="auto"
            class="rounded-lg"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="mb-2">
          <v-text-field
            label="Имя"
            v-model="user.name"
            outlined
            flat
            hide-details="auto"
            class="rounded-lg"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="mb-2">
          <v-text-field
            label="Электронная почта"
            outlined
            v-model="user.mail"
            flat
            hide-details="auto"
            class="rounded-lg"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="mb-2">
          <v-text-field
            label="Отчество"
            outlined
            v-model="user.middleName"
            flat
            hide-details="auto"
            class="rounded-lg"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="mb-2">
          <v-text-field
            label="Пароль"
            outlined
            v-model="user.password"
            flat
            hide-details="auto"
            class="rounded-lg"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="showPass ? 'text' : 'password'"
            @click:append="showPass = !showPass"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="mb-2">
          <v-text-field
            label="Дата рождения"
            outlined
            v-model="user.birthDate"
            flat
            hide-details="auto"
            class="rounded-lg"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="mb-2">
          <v-text-field
            label="Повторите пароль"
            outlined
            v-model="repeatPassword"
            flat
            :rules="[rules.required, rules.match]"
            type="password"
            hide-details="auto"
            class="rounded-lg"
          ></v-text-field>
        </v-col>
      </v-row>
      <div>
        <v-radio-group v-model="user.gender" row>
          <v-radio label="Мужской" value="Мужской"></v-radio>
          <v-radio label="Женский" value="Женский"></v-radio>
        </v-radio-group>
      </div>
    </v-container>
    <div>
      <div class="text-center align-center">
        <v-btn
          tile
          class=""
          large
          color="grey lighten-2"
          elevation="0"
          @click="registerUser"
        >
          Зарегистрироваться
        </v-btn>
        <p class="mt-4">
          Уже есть аккаунт?
          <router-link
            style="text-decoration: unset"
            :to="{
              name: 'login',
            }"
            >Войти</router-link
          >
        </p>
      </div>
    </div>
    <v-dialog v-model="feedback_dialog" max-width="600">
      <v-card class="py-3">
        <v-card-title class="justify-space-between mb-5">
          <div class="body-1 black--text">
            Данный номер или/и электронная почта уже используются
          </div>
          <div class="mb-4">
            <v-icon @click.stop="feedback_dialog = false">mdi-close</v-icon>
          </div>
        </v-card-title>
        <v-card-actions class="mt-n6">
          <v-btn class="body-2 px-4" elevation="0"> Восстановить доступ</v-btn>
          <v-spacer></v-spacer>
          <v-btn elevation="0" color="primary" class="body-2 px-4">
            Обратиться в тех.поддержку
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "Registration",
  data() {
    return {
      showPass: false,
      repeatPassword: "",
      user: {
        gender: null,
        name: "",
        middleName: "",
        surname: "",
        phone: "",
        mail: "",
        password: "",
        birthDate: "",
      },
      feedback_dialog: false,
      rules: {
        required: (value) => !!value || "Обязательный поль.",
        match: (value) =>
          value === this.user.password || "Пароли не соответствуют",
      },
    };
  },
  methods: {
    registerUser() {
      this.$store.dispatch("auth/postUser", this.user).then(() => {
        this.$router.push({ name: "login" });
      });
    },
  },
};
</script>

<style scoped></style>
