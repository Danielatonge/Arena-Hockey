<template>
  <v-container>
    <v-toolbar flat class="my-2">
      <div class="mr-4 fix-margin-left">
        <router-link to="/" class="reset-link">
          <div class="my-logo"></div>
        </router-link>
      </div>
      <v-toolbar-title class="">
        <div class="text-h5">Портал любителей хоккея</div>
        <div class="text-body-2">Вся информация в одном месте</div>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <div class="d-none d-md-flex">
        <v-text-field
          label="Поиск"
          single-line
          prepend-inner-icon="mdi-magnify"
          outlined
          dense
          hide-details="auto"
          class="rounded-lg"
        ></v-text-field>

        <v-btn
          class="ml-4 rounded-lg fix-margin-right"
          height="40px"
          depressed
          color="primary"
          @click="$router.push({ name: 'user-profile', params: { userId } })"
        >
          Личный кабинет
        </v-btn>

        <v-btn
          class="ml-7 rounded-lg fix-margin-right"
          height="40px"
          depressed
          color="primary"
          v-show="loggedIn"
          @click="logout"
        >
          Выйти
        </v-btn>
      </div>
    </v-toolbar>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Header",
  computed: {
    ...mapGetters("auth", ["loggedIn"]),
    ...mapState("auth", ["userId"]),
  },
  methods: {
    logout() {
      const userId = this.userId;
      this.$store.dispatch("auth/logoutUser");
      this.$router.push({ name: "login", params: { userId } });
    },
  },
};
</script>

<style>
.fix-margin-left {
  margin-left: -16px;
}

.fix-margin-right {
  margin-right: -16px;
}

.my-logo {
  width: 40px;
  height: 40px;
  background-color: #eaeaea;
  border-radius: 8px;
}
</style>
