<template>
  <div class="grey lighten-4">
    <v-container class="pb-0">
      <div class="mb-4 text-h5" v-show="showPersonalData">
        Персональные данные
      </div>
      <v-row class="mb-4">
        <v-col cols="6" class="mb-2" v-show="user.birthDate">
          <div class="body-1 mb-2 grey--text">День рождения</div>
          <div class="">
            {{ user.birthDate ? user.birthDate : "21 сентября 1999" }}
          </div>
        </v-col>
        <v-col cols="6" class="mb-2" v-show="user.gender">
          <div class="body-1 mb-2 grey--text">Пол</div>
          <div class="">{{ user.gender ? user.gender : "Мужской" }}</div>
        </v-col>
        <v-col cols="6" class="mb-2" v-show="user.phone">
          <div class="body-1 mb-2 grey--text">Номер телефона</div>
          <div class="">
            {{ user.phone ? user.phone : "+7 (999) 999 99-99" }}
          </div>
        </v-col>
        <v-col cols="6" class="mb-2" v-show="user.mail">
          <div class="body-1 mb-2 grey--text">Электронная почта</div>
          <div class="blue--text">
            {{ user.mail ? user.mail : "jackson.graham@example.com" }}
          </div>
        </v-col>
        <v-col cols="6" class="mb-2" v-show="user.address">
          <div class="body-1 mb-2 grey--text">Адрес</div>
          <div class="">
            {{
              user.address
                ? user.address
                : " Промышленная ул., 32, Ульяновск, Ульяновская обл., 432006"
            }}
          </div>
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
    ...mapState("user", ["user"]),
    showPersonalData() {
      const { birthDate, gender, phone, address, mail } = this.user;
      return birthDate || gender || phone || address || mail;
    },
  },
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.$store.dispatch("user/getUser", this.userId);
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
