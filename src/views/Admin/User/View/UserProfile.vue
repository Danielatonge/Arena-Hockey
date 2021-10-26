<template>
  <div class="grey lighten-4">
    <v-container class="pb-0">
      <div class="mb-4 text-h5">Персональные данные</div>
      <v-row class="mb-4">
        <v-col cols="6" class="mb-2">
          <div class="body-1 mb-2 grey--text">День рождения</div>
          <div class="">21 сентября 1999 {{ user.birthDate }}</div>
        </v-col>
        <v-col cols="6" class="mb-2">
          <div class="body-1 mb-2 grey--text">Пол</div>
          <div class="">Мужской</div>
        </v-col>
        <v-col cols="6" class="mb-2">
          <div class="body-1 mb-2 grey--text">Номер телефона</div>
          <div class="">+7 (999) 999 99-99</div>
        </v-col>
        <v-col cols="6" class="mb-2">
          <div class="body-1 mb-2 grey--text">Электронная почта</div>
          <div class="blue--text">
            jackson.graham@example.com {{ user.mail }}
          </div>
        </v-col>
        <v-col cols="6" class="mb-2">
          <div class="body-1 mb-2 grey--text">Адрес</div>
          <div class="">
            Промышленная ул., 32, Ульяновск, Ульяновская обл., 432006
          </div>
        </v-col>
        <v-col cols="6" class="mb-2">
          <div class="body-1 mb-2 grey--text">Рабочий номер продавца</div>
          <div class="">+7 (999) 999 99-99</div>
        </v-col>
      </v-row>
      <div class="mb-4 text-h5">Ведение ролей</div>
      <v-row class="mx-n4 pb-10">
        <v-col
          class="pa-2"
          cols="4"
          md="4"
          v-for="(section, i) in sections"
          :key="i"
        >
          <v-sheet
            elevation="0"
            height="70"
            width="100%"
            class="
              font-weight-light
              d-flex
              justify-center
              align-center
              rounded-lg
            "
          >
            <div class="pa-2">
              {{ section.text }}
            </div>
          </v-sheet>
        </v-col>
      </v-row>
      <div>
        <v-btn class="mr-2 mb-2" large color="grey lighten-2" elevation="0">
          Добавить роли
        </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("user",["userId"]),
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    const id = this.userId;
    this.sections = [
      {
        text: "Игрок",
        link: `/admin/sport_complex/${id}/information`,
      },
      {
        text: "Представитель команды",
        link: `/admin/sport_complex/${id}/payment_portal`,
      },
      {
        text: "Тренер",
        link: `/admin/sport_complex/${id}/schedule_event`,
      },
      {
        text: "Представитель организации",
        link: `/admin/sport_complex/${id}/team_list`,
      },
      {
        text: "Представитель катка",
        link: `/admin/sport_complex/${id}/training_staff`,
      },
      {
        text: "Продавец",
        link: `/admin/sport_complex/${id}/management_staff`,
      },
      {
        text: "Покупатель",
        link: `/admin/sport_complex/${id}/management_staff`,
      },
    ];
  },
  data() {
    return {
      checkbox: null,
      breadcrumb_items: [
        {
          text: "Личный кабинет",
          disabled: false,
          href: "/",
        },
        {
          text: "Мои спортивные комплексы",
          disabled: false,
          href: "/admin/sport_complex",
        },
        {
          text: "Название комплекса",
          disabled: true,
          href: "",
        },
      ],
      sections: null,
    };
  },
};
</script>

<style></style>
