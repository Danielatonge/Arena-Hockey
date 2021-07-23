<template>
  <div class="grey lighten-4">
    <v-img
      color="grey"
      height="450px"
      width="100%"
      src="../assets/banner-arena.jpg"
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
    <v-container>
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
            <p class="text-h4">Платные услуги</p>
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
              <v-tab-item v-for="item in premises_nav" :key="item">
                <v-row dense class="mx-n4 mt-5">
                  <v-col cols="12" v-for="i in 3" :key="i">
                    <v-card color="transparent" elevation="0">
                      <div class="d-flex flex-no-wrap">
                        <div class="ma-3" width="282px" height="186px">
                          <v-img src="../assets/preview_arena_1.jpg"></v-img>
                        </div>
                        <div class="description">
                          <v-card-text>
                            <div class="text-h4 mb-4">Название катка 1</div>
                            <div class="body-1 grey--text mb-3">
                              Краткое описание катка
                            </div>
                            <div class="body-1 blue--text">
                              +7 (123) 234-15-23
                            </div>
                          </v-card-text>
                          <v-card-actions class="pl-4 bottom">
                            <v-btn
                              class="px-6"
                              color="primary"
                              x-large
                              elevation="0"
                            >
                              Забронировать
                            </v-btn>
                            <v-btn
                              class="px-6"
                              color="grey lighten-2"
                              x-large
                              elevation="0"
                            >
                              Подробнее
                            </v-btn>
                          </v-card-actions>
                        </div>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
              </v-tab-item>
            </v-tabs-items>
            <p class="text-h6 mt-10">Прайс-лист</p>
            <p class="grey--text">Цены указаны за 1 час аренды</p>

            <p class="text-h4 mt-10">Название катка 1</p>
            <p class="grey--text">Краткое описание катка</p>
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
      name: "PaymentPortal",
      sidebar_tab: 0,
      premises_tab: null,
      premises_nav: ["Катки", "Бросковые зоны", "Спортивные залы"],
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
    };
  },
};
</script>

<style>
.margin-top-big {
  margin-top: 178px;
}

@media (max-width: 600px) {
  .margin-top-big {
    margin-top: 100px;
  }
}
</style>