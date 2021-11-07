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
            {{ user.birthDate }}
          </div>
        </v-col>
        <v-col cols="6" class="mb-2" v-show="user.gender">
          <div class="body-1 mb-2 grey--text">Пол</div>
          <div class="">{{ user.gender }}</div>
        </v-col>
        <v-col cols="6" class="mb-2" v-show="user.phone">
          <div class="body-1 mb-2 grey--text">Номер телефона</div>
          <div class="">
            {{ user.phone }}
          </div>
        </v-col>
        <v-col cols="6" class="mb-2" v-show="user.mail">
          <div class="body-1 mb-2 grey--text">Электронная почта</div>
          <div class="blue--text">
            {{ user.mail }}
          </div>
        </v-col>
        <v-col cols="6" class="mb-2" v-show="user.address">
          <div class="body-1 mb-2 grey--text">Адрес</div>
          <div class="">
            {{ user.address }}
          </div>
        </v-col>
      </v-row>
      <div class="mb-4 text-h5">Ведение ролей</div>
      <v-row class="mx-n4 pb-10">
        <v-col
          class="pa-2"
          cols="4"
          md="4"
          v-for="(role, i) in displayRoles"
          :key="i"
        >
          <v-sheet
            elevation="0"
            height="70"
            width="100%"
            v-ripple
            class="
              font-weight-light
              d-flex
              justify-center
              align-center
              rounded-lg
            "
            @click="
              $router.push({
                name: 'admin-user-role',
                params: { userId: userId, roleId: role.id },
              })
            "
          >
            <div class="pa-2">
              {{ role.name }}
            </div>
          </v-sheet>
        </v-col>
      </v-row>
      <!-- <div>
        <v-btn class="mr-2 mb-2" large color="grey lighten-2" elevation="0">
          Добавить роли
        </v-btn>
      </div> -->
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("user", ["user", "roles"]),
    showPersonalData() {
      const { birthDate, gender, phone, address, mail } = this.user;
      return birthDate || gender || phone || address || mail;
    },
    displayRoles() {
      const parseRoles = this.roles.map(({ role }) => role);
      return parseRoles.map(({ id, name }) => {
        if (name === "PLAYER") return { id, name: "Игрок" };
        if (name === "TRAINER") return { id, name: "Тренер" };
        if (name === "SELLER") return { id, name: "Продавец" };
        if (name === "string") return { id, name: "недопустимая роль" };
      });
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
    this.$store.dispatch("user/getUserRoles", this.userId);
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
      sections: null,
    };
  },
};
</script>

<style></style>
