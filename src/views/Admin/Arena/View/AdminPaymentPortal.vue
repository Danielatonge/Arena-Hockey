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
          <v-btn class="mr-2 mb-2" @click="goToEdit" color="grey lighten-2" elevation="0">
            Редактировать
          </v-btn>
          <v-btn class="mr-2 mb-2" color="grey lighten-2" elevation="0">
            Посмотреть страницу арены
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
              <div v-for="(item, i) in katokPL" :key="i">
                <p class="text-h4 mt-8 mb-0">{{ item.title }}</p>
                <p class="grey--text">{{ item.miniDescription }}</p>
                <v-row>
                  <v-col
                    cols="2"
                    class="text-center border"
                    v-for="(itm, indx) in item.price"
                    :key="indx"
                  >
                    <div class="mb-3 grey--text">
                      {{ itm.price.startTime + " - " + itm.price.endTime }}
                    </div>
                    <div class="right-border mr-n3">
                      <p class="mb-0">{{ itm.price.weekdayPrice }}</p>
                      <p class="primary--text">{{ itm.price.holidayPrice }}</p>
                    </div>
                  </v-col>
                </v-row>
                <div class="mt-n8">
                  <span class="mr-5 font-weight-bold">
                    <v-icon style="font-size: 70px" color="#000" class="">
                      mdi-circle-small
                    </v-icon>
                    <span class="ml-n5"> Будни </span>
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
                    Перейти к Бронированию
                  </v-btn>
                </div>
              </div>
            </div>
            <div v-show="value_tab == 1">
              <div v-for="(item, i) in othersPL" :key="i">
                <p class="text-h4 mt-8 mb-0">{{ item.title }}</p>
                <p class="grey--text">{{ item.miniDescription }}</p>
                <v-row>
                  <v-col
                    cols="2"
                    class="text-center border"
                    v-for="(itm, indx) in item.price"
                    :key="indx"
                  >
                    <div class="mb-3 grey--text">
                      {{ itm.price.startTime + " - " + itm.price.endTime }}
                    </div>
                    <div class="right-border mr-n3">
                      <p class="mb-0">{{ itm.price.weekdayPrice }}</p>
                      <p class="primary--text">{{ itm.price.holidayPrice }}</p>
                    </div>
                  </v-col>
                </v-row>
                <div class="mt-n8">
                  <span class="mr-5 font-weight-bold">
                    <v-icon style="font-size: 70px" color="#000" class="">
                      mdi-circle-small
                    </v-icon>
                    <span class="ml-n5"> Будни </span>
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
                    Перейти к Бронированию
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
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["katokPL", "othersPL"]),
  },
  mounted() {
    this.$store.dispatch("getPriceListKatok");
    this.$store.dispatch("getPriceListOthers");
    this.arenaId = this.$route.params.id;
  },
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
          href: "/admin/sport_complex/id",
        },
        {
          text: "Платные услуги",
          disabled: true,
          href: "/admin/sport_complex/id/payment_portal",
        },
      ],
      arenaId: '',
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
  methods: {
    goToEdit() {
      const path = this.$route.path + "/edit";
      console.log(path)
      this.$router.push({path})
    }
  }
};
</script>

<style>
</style>