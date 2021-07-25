<template>
  <div class="grey lighten-4">
    <v-container class="pt-8 pb-0">
      <v-row>
        <div>
          <v-breadcrumbs :items="breadcrumb_items" class="px-3"></v-breadcrumbs>
        </div>
      </v-row>
      <v-row class="mb-0">
        <v-col cols="8" sm="6" md="7">
          <p class="text-h5">Заявка на вступление в команду</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" class="pr-10">
          <p class="body-text">Контактные данные</p>
          <div class="mb-4">
            <v-text-field
              label="ФИО"
              single-line
              prepend-inner-icon="mdi-account-outline"
              outlined
              dense
              hide-details="auto"
              background-color="white"
              class="rounded-lg"
            ></v-text-field>
          </div>
          <div class="mb-4">
            <v-text-field
              label="Дата рождения"
              single-line
              prepend-inner-icon="mdi-calendar-blank"
              outlined
              dense
              hide-details="auto"
              background-color="white"
              class="rounded-lg"
            ></v-text-field>
          </div>
          <v-row class="mb-0">
            <v-col cols="6">
              <v-text-field
                label="Телефон"
                single-line
                prepend-inner-icon="mdi-phone-outline"
                outlined
                dense
                hide-details="auto"
                background-color="white"
                class="rounded-lg"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Электронная почта"
                single-line
                prepend-inner-icon="mdi-email-outline"
                outlined
                dense
                hide-details="auto"
                background-color="white"
                class="rounded-lg"
              ></v-text-field>
            </v-col>
          </v-row>
          <div class="grey--text mb-10">
            Ваш адрес и телефон мы отправим администратору команды.
          </div>
          <p class="body-text">Сообщение для администратора</p>
          <div class="mb-6">
            <v-textarea
              label="Сообщение"
              single-line
              outlined
              dense
              hide-details="auto"
              background-color="white"
              class="rounded-lg"
            ></v-textarea>
          </div>
          <div class="mb-2">
            <v-checkbox v-model="checkbox">
              <template v-slot:label>
                <div>
                  Нажимая на кнопку «Отправить заявку», я даю согласие на
                  обработку персональных данных
                </div>
              </template>
            </v-checkbox>
          </div>
          <v-row class="mb-10">
            <v-col>
              <v-btn
                class="rounded-lg"
                height="40px"
                depressed
                color="grey lighten-2"
              >
                Вернуться на страницу команды
              </v-btn>
            </v-col>
            <v-col
              ><v-btn
                class="rounded-lg"
                height="40px"
                depressed
                color="primary"
              >
                Отправить заявку
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6">
          <v-card class="rounded-lg pa-2" elevation="0">
            <v-card-text>
              <div class="body-1 blue--text mb-2" style="text-decoration: none">
                Москва
              </div>
              <div class="text-h5 mb-2">Название команды</div>
              <div class="body-1 grey--text mb-2">
                Sapien, aliquet amet, libero enim, id amet in in habitasse amet
                augue et risus tincidunt dolor consequat urna, odio ridiculus
                nisl at
              </div>
              <div class="body-1">19 участников</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkbox: null,
      breadcrumb_items: [
        {
          text: "Название арены",
          disabled: false,
          href: "/arenaname",
        },
        {
          text: "Список команд",
          disabled: false,
          href: "/team",
        },
        {
          text: "Название команды",
          disabled: false,
          href: "/teamname",
        },
        {
          text: "Вступить в команду",
          disabled: true,
          href: "/",
        },
      ],
    };
  },
};
</script>

<style>
</style>