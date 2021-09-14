<template>
  <div class="grey lighten-4">
    <v-container class="pb-10">
      <div class="d-flex justify-space-between my-10">
        <div class="text-h3 d-flex pb-3 pt-5 my-auto">Регистрация</div>
        <div class="d-flex my-auto">
          <v-btn tile class="" large color="grey lighten-2" elevation="0">
            Назад
          </v-btn>
        </div>
      </div>
      <v-row class="">
        <v-col cols="12" md="6" class="mb-2">
          <v-text-field
            label="Фамилия"
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
            flat
            hide-details="auto"
            class="rounded-lg"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="mb-2">
          <v-text-field
            label="Имя"
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
            flat
            hide-details="auto"
            class="rounded-lg"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="mb-2">
          <v-text-field
            label="Отчество"
            outlined
            flat
            hide-details="auto"
            class="rounded-lg"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="mb-2">
          <v-text-field
            label="Пароль"
            outlined
            flat
            hide-details="auto"
            class="rounded-lg"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="mb-2">
          <v-text-field
            label="Дата рождения"
            outlined
            flat
            hide-details="auto"
            class="rounded-lg"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="mb-2">
          <v-text-field
            label="Повторите пароль"
            outlined
            flat
            hide-details="auto"
            class="rounded-lg"
          ></v-text-field>
        </v-col>
      </v-row>
      <div>
        <v-radio-group v-model="row" row>
          <v-radio label="Мужской" value="radio-1"></v-radio>
          <v-radio label="Женский" value="radio-2"></v-radio>
        </v-radio-group>
      </div>
    </v-container>
    <div>
      <div class="text-center align-center">
        <v-btn tile class="" large color="grey lighten-2" elevation="0">
          Зарегистрироваться
        </v-btn>
        <p class="mt-4">Уже есть аккаунт? Войти</p>
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
      feedback_dialog: false,
    };
  },
};
</script>

<style scoped></style>
