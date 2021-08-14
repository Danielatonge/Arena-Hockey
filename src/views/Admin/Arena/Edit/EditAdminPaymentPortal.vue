<template>
  <div class="grey lighten-4">
    <v-container class="pb-10">
      <v-row class="">
        <div>
          <v-breadcrumbs :items="breadcrumb_items" class="px-3"></v-breadcrumbs>
        </div>
      </v-row>
      <div>
        <div class="text-h5 py-5">Платные услуги</div>
        <div class="mb-4">
          <v-btn class="mr-2 mb-2" color="grey lighten-2" elevation="0">
            Обратить в тех. поддержку
          </v-btn>
          <v-btn class="mr-2 mb-2" color="grey lighten-2" elevation="0">
            Вернуться к просмотру
          </v-btn>
        </div>
        <v-tabs v-model="value_tab" class="mt-6 d-flex flex-no-wrap rounded-lg">
          <v-tab class="px-6" v-for="item in service_nav" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="value_tab" style="background-color: unset">
          <v-tab-item v-for="i in 2" :key="i">
            <div v-show="value_tab == 0">
              <div v-for="x in 2" :key="x">
                <p class="text-h4 mt-10 mb-0">Название катка {{ x }}</p>
                <p class="grey--text">Краткое описание катка</p>
                <v-row>
                  <v-col
                    cols="2"
                    lg="2"
                    xl="1"
                    class="text-center border"
                    v-for="(item, indx) in price_list"
                    :key="indx"
                  >
                    <div class="mb-3 grey--text">{{ item.interval }}</div>
                    <div class="right-border mr-n3">
                      <p class="mb-0">{{ item.weekday }}</p>
                      <p class="primary--text">{{ item.weekend }}</p>
                    </div>
                  </v-col>
                </v-row>
                <div class="mt-n8">
                  <span class="mr-5 font-weight-bold">
                    <v-icon style="font-size: 70px" color="#000" class="">
                      mdi-circle-small
                    </v-icon>
                    <span class="ml-n5">Будни</span>
                  </span>
                  <span class="font-weight-bold primary--text">
                    <v-icon style="font-size: 70px" color="primary" class="">
                      mdi-circle-small
                    </v-icon>
                    <span class="ml-n5"> Выходные </span>
                  </span>
                </div>
                <div class="">
                  <v-btn color="primary" elevation="0">
                    ИЗМЕНИТЬ ПРАЙС-ЛИСТ
                  </v-btn>
                </div>
              </div>
              <div v-for="i in 2" :key="i">
                <p class="text-h4 mt-10 mb-0">Название катка {{ i }}</p>
                <p class="grey--text">Краткое описание катка</p>

                <div class="">
                  <v-btn color="primary" elevation="0">
                    ДОБАВИТЬ ПРАЙС-ЛИСТ
                  </v-btn>
                </div>
              </div>
            </div>
            <div v-show="value_tab == 1">
              <div v-for="x in 2" :key="x">
                <p class="text-h4 mt-10 mb-0">Название помещения {{ x }}</p>
                <p class="grey--text">Краткое описание помещения</p>
                <v-row>
                  <v-col
                    cols="2"
                    lg="2"
                    xl="1"
                    class="text-center border"
                    v-for="(item, indx) in price_list"
                    :key="indx"
                  >
                    <div class="mb-3 grey--text">{{ item.interval }}</div>
                    <div class="right-border mr-n3">
                      <p class="mb-0">{{ item.weekday }}</p>
                      <p class="primary--text">{{ item.weekend }}</p>
                    </div>
                  </v-col>
                </v-row>
                <div class="mt-n8">
                  <span class="mr-5 font-weight-bold">
                    <v-icon style="font-size: 70px" color="#000" class="">
                      mdi-circle-small
                    </v-icon>
                    <span class="ml-n5">Будни</span>
                  </span>
                  <span class="font-weight-bold primary--text">
                    <v-icon style="font-size: 70px" color="primary" class="">
                      mdi-circle-small
                    </v-icon>
                    <span class="ml-n5"> Выходные </span>
                  </span>
                </div>
                <div class="">
                  <v-btn color="primary" elevation="0">
                    ИЗМЕНИТЬ ПРАЙС-ЛИСТ
                  </v-btn>
                </div>
              </div>
              <div v-for="i in 2" :key="i">
                <p class="text-h4 mt-10 mb-0">Название помещения {{ i }}</p>
                <p class="grey--text">Краткое описание помещения</p>

                <div class="">
                  <v-btn color="primary" elevation="0">
                    ДОБАВИТЬ ПРАЙС-ЛИСТ
                  </v-btn>
                </div>
              </div>
            </div>
          </v-tab-item>
        </v-tabs-items>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value_tab: 0,
      service_nav: ["Катки", "Другие помещения"],
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
          disabled: false,
          href: "/admin/sport_complex",
        },
        {
          text: "Платные услуги",
          disabled: true,
          href: "",
        },
      ],
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
};
</script>

<style>
</style>