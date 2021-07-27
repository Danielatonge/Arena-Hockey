<template>
  <div class="grey lighten-4">
    <v-img
      color="grey"
      height="450px"
      width="100%"
      src="@/assets/banner-arena.jpg"
    >
      <v-container class="pt-8 pb-0">
        <v-row class="">
          <div>
            <v-breadcrumbs
              dark
              :items="breadcrumb_items"
              class="px-3"
            ></v-breadcrumbs>
          </div>
          <v-spacer></v-spacer>
          <div class="pr-3 my-auto">
            <v-btn
              elevation="0"
              x-small
              color="transparent"
              height="40px"
              class="mr-1"
            >
              <v-icon color="white">mdi-whatsapp</v-icon>
            </v-btn>
            <v-btn
              elevation="0"
              x-small
              color="transparent"
              height="40px"
              class="mx-1"
            >
              <v-icon color="white">mdi-instagram</v-icon>
            </v-btn>
            <v-btn
              elevation="0"
              x-small
              color="transparent"
              height="40px"
              class="mx-1"
            >
              <v-icon color="white">mdi-vk</v-icon>
            </v-btn>
            <v-btn
              elevation="0"
              x-small
              color="transparent"
              height="40px"
              class="ml-1"
            >
              <v-icon color="white">mdi-web</v-icon>
            </v-btn>
          </div>
        </v-row>
        <div class="margin-top-big">
          <v-row class="mb-3">
            <v-col cols="12" sm="6" md="7" lg="5">
              <p class="text-h4 white--text">Название арены</p>
              <p class="white--text">
                <v-icon color="white">mdi-map-marker-outline</v-icon> ул.
                Лермонтова, д. 14, пом. 3, г. Чита
              </p>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
          <v-btn color="primary mr-4 mt-4" elevation="0">Забронировать</v-btn>
          <v-btn class="mt-4" dark outlined elevation="0">Как проехать?</v-btn>
        </div>
      </v-container>
    </v-img>
    <v-container class="pb-10">
      <v-row class="mt-5">
        <v-col cols="5" md="3">
          <v-tabs vertical class="pl-4 rounded-lg" v-model="sidebar_tab">
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
          <div>
            <p class="text-h4">Тренерский состав</p>
            <v-tabs
              v-model="premises_tab"
              class="d-flex flex-no-wrap rounded-lg"
            >
              <v-tab v-for="item in premises_nav" :key="item">
                {{ item }}
              </v-tab>
            </v-tabs>

            <v-tabs-items
              v-model="premises_tab"
              style="background-color: unset"
            >
              <v-tab-item v-for="nav in premises_nav" :key="nav">
                <div class="mt-5 mb-n5 text-h5">Тренеры детской школы</div>
                <v-row dense class="mx-n4 mt-5">
                  <v-col cols="12" v-for="(item, i) in player_items" :key="i">
                    <v-card color="transparent" elevation="0">
                      <div class="d-flex flex-no-wrap">
                        <v-avatar class="ma-3" size="125" tile>
                          <v-img
                            :src="require('@/assets' + item + '.jpg')"
                          ></v-img>
                        </v-avatar>
                        <v-card-text>
                          <div class="text-h5 mb-2">Фамилия Имя Отчество</div>
                          <div class="body-1 blue--text mb-2">
                            Возраст, город
                          </div>
                          <div class="body-2 grey--text">
                            Позиция
                          </div>
                        </v-card-text>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
                <div class="mt-5 mb-n5 text-h5">Тренеры юношеской сборной</div>
                <v-row dense class="mx-n4 mt-5">
                  <v-col cols="12" v-for="(item, i) in player_items" :key="i">
                    <v-card color="transparent" elevation="0">
                      <div class="d-flex flex-no-wrap">
                        <v-avatar class="ma-3" size="125" tile>
                          <v-img
                            :src="require('@/assets' + item + '.jpg')"
                          ></v-img>
                        </v-avatar>
                        <v-card-text>
                          <div class="text-h5 mb-2">Фамилия Имя Отчество</div>
                          <div class="body-1 blue--text mb-2">
                            Возраст, город
                          </div>
                          <div class="body-2 grey--text">
                            Позиция
                          </div>
                        </v-card-text>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
              </v-tab-item>
            </v-tabs-items>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "ArenaTeamList",
      sidebar_tab: 0,
      premises_tab: null,
      premises_nav: ["Все тренеры", "Детские тренеры", "Юношеские тренеры"],
      breadcrumb_items: [
        {
          text: "Москва",
          disabled: false,
          href: "breadcrumbs_link_1",
        },
        {
          text: "Название арены",
          disabled: true,
          href: "breadcrumbs_dashboard",
        },
      ],
      sidebar_items: [
        { text: "Информация", link: "/arenaname" },
        { text: "Платные услуги", link: "/payment_portal" },
        { text: "Расписание мероприятий", link: "/event_schedule" },
        { text: "Список команд", link: "/list_teams" },
        { text: "Тренерский состав", link: "/training_staff" },
      ],
      player_items: ["/player_1", "/player_2", "/player_3"],
      price_list: [
        { interval: "06:00–08:30", weekday: "8 000", weekend: "10 000" },
        { interval: "08:30–15:00", weekday: "8 000", weekend: "10 000" },
        { interval: "15:00–17:00", weekday: "8 000", weekend: "10 000" },
        { interval: "17:00–19:00", weekday: "10 000", weekend: "10 000" },
        { interval: "19:00–22:30", weekday: "12 000", weekend: "10 000" },
        { interval: "22:30–00:00", weekday: "10 000", weekend: "10 000" },
      ],
    };
  },
  computed: {},
};
</script>

<style>
</style>