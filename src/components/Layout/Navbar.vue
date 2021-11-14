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
            v-for="(item, index) in items"
            :key="index"
            router
            exact-path
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
      optional
    >
      <v-tabs-slider color="white"></v-tabs-slider>
      <v-tab
        class="white--text"
        v-for="(item, index) in items"
        :key="index"
        exact
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
    console.log("CURRENT component name", this.$route.name);
    return {
      drawer: null,
      tab: null,
      items: [
        { text: "Ледовые дворцы и арены", route: { name: "arena" } },
        { text: "Лиги и турниры", route: { name: "league-tournaments" } },
        { text: "Детские турниры", route: { name: "kidsTournaments" } },
        { text: "Раздевалка", route: { name: "room" } },
        { text: "Скамейка запасных", route: { name: "substitute-bench" } },
        { text: "Школы", route: { name: "sport-schools" } },
        { text: "Лагеря и сборы", route: { name: "camps-fees" } },
        { text: "Сушилка", route: { name: "categoriesPage" } },
      ],
    };
  },
};
</script>

<style></style>
