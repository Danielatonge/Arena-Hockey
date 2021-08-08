<template>
  <nav class="primary">
    <v-container class="d-lg-none d-xl-none">
      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        color="primary"
        dark
      >
        <v-list-item>
          <div class="py-3">
            <div class="my-logo"></div>
          </div>

          <v-list-item-content class="ml-3">
            <v-list-item-title>Xоккея</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item
            v-for="item in items"
            :key="item.text"
            router
            :to="item.route"
          >
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-row>
        <v-col cols="6" sm="4" class="d-flex d-md-none">
          <v-text-field
            label="Поиск"
            single-line
            prepend-inner-icon="mdi-magnify"
            dense
            dark
            hide-details="auto"
            class="rounded-lg"
          ></v-text-field>
        </v-col>

        <v-spacer></v-spacer>

        <v-col cols="3" sm="2" md="1" class="d-flex d-md-none">
          <v-btn plain color="transparent">
            <v-icon large color="white">mdi-account-outline</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="3" sm="2" md="1">
          <v-btn plain color="transparent">
            <v-icon large color="white" @click.stop="drawer = !drawer"
              >mdi-menu</v-icon
            >
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-tabs
      v-model="tab"
      background-color="transparent"
      class="hidden-md-and-down"
      grow
    >
      <v-tabs-slider color="white"></v-tabs-slider>
      <v-tab
        class="white--text"
        v-for="item in items"
        :key="item.text"
        router
        :to="item.route"
      >
        {{ item.text }}
      </v-tab>
    </v-tabs>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      drawer: null,
      tab: "/room",
      items: [
        { text: "Ледовые дворцы и арены", route: "/arena" },
        { text: "Лиги и турниры", route: "/league" },
        { text: "Детские турниры", route: "/kids_tournement" },
        { text: "Раздевалка", route: "/room" },
        { text: "Скамейка запасных", route: "/subs_bench" },
        { text: "Школы", route: "/school" },
        { text: "Лагеря и сборы", route: "/team" },
        { text: "Сушилка", route: "/dryer" },
      ],
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
};
</script>

<style>
</style>