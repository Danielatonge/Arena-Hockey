<template>
  <div class="grey lighten-4">
    <v-container>
      <v-row class="mt-5">
        <v-col cols="5" md="3">
          <v-tabs
            vertical
            class="pl-4 rounded-lg my-sidetabs"
            v-model="sidebar_tab"
          >
            <v-tab
              v-for="(item, i) in sidebar_items"
              :key="i"
              router
              :to="item.link"
            >
              {{ item.text }}
            </v-tab>
          </v-tabs>
        </v-col>
        <v-col cols="7" md="9">
          <router-view></router-view>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "AdminLayoutSection",
  data() {
    return {
      sidebar_items: [
        { text: "Мои арены", link: `/admin/sport_complex/add` },
        {
          text: "Мои команды",
          link: ``,
        },
        {
          text: "Мои школы",
          link: ``,
        },
        { text: "Мои турниры", link: `` },
      ],
      sidebar_tab: 0,
    };
  },
};
</script>

<style scoped></style>
