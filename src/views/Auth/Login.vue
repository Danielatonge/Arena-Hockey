<template>
  <div class="grey lighten-4">
    <v-container class="my-16">
      <v-row class="my-16">
        <v-col cols="7" class="my-auto">
          <div class="text-center">
            <div class="text-h2 font-weight-bold">
              Портал <br />
              любителей <br />
              хоккея
            </div>
          </div>
        </v-col>
        <v-col cols="3" class="grey lighten-2 pa-8 rounded-lg">
          <div class="font-weight-bold text-h5 mb-3">Войти в аккаунт</div>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Почта или номер телефона"
                outlined
                flat
                hide-details="auto"
                class="rounded-lg"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Пароль"
                outlined
                flat
                hide-details="auto"
                class="rounded-lg"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-checkbox
            v-model="checkbox"
            label="Не выходить из системы"
          ></v-checkbox>
          <div>
            <div class="text-center">
              <v-btn tile class="" large color="grey lighten-0" elevation="0">
                Продолжить
              </v-btn>
              <p class="mt-4">Нет аккаунта? Зарегистрироваться</p>
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
    };
  },
};
</script>

<style scoped></style>
