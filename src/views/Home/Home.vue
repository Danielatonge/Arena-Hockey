<template>
  <div class="">
    <v-img
      color="grey"
      height="550px"
      width="100%"
      src="@/assets/home_slide_1.png"
    >
      <v-container>
        <div class="mt-5">
          <v-text-field
            label="Поиск по названию арены, метро, адресу"
            single-line
            prepend-inner-icon="mdi-magnify"
            solo
            flat
            hide-details="auto"
            class="rounded-lg"
          ></v-text-field>
        </div>
      </v-container>
    </v-img>
    <v-container dense class="mt-5 mb-10">
      <v-row class="d-flex">
        <v-col>
          <div class="text-h5">Ледовые дворцы</div>
        </v-col>
        <v-col>
          <div class="grey--text lighten-1 text-right">
            Посмотреть все арены
            <v-icon size="28" color="grey lighten-1"> mdi-arrow-right </v-icon>
          </div>
        </v-col>
      </v-row>
      <v-row class="d-flex">
        <v-col v-for="(item, i) in arenas" :key="i" cols="12" md="4" lg="3">
          <v-card :loading="false" class="my-3">
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>

            <v-img height="250" :src="require('@/assets' + item.image)"></v-img>

            <v-card-title> {{ item.name }}</v-card-title>

            <v-card-text>
              <div>
                {{ item.address }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-row class="mb-10">
      <v-img
        color="grey"
        height="300"
        width="100%"
        src="@/assets/banner-arena.jpg"
      >
        <v-container class="pt-8 my-10">
          <v-row class="white--text justify-center">
            <v-col cols="12" md="3" lg="2" class="text-left mr-lg-10">
              <div class="text-h5">О проекте</div>
              <v-row class="mt-2">
                <v-col>
                  <v-icon color="white"> mdi-whatsapp </v-icon>
                </v-col>
                <v-col>
                  <v-icon color="white"> mdi-instagram </v-icon>
                </v-col>
                <v-col>
                  <v-icon color="white"> mdi-vk </v-icon>
                </v-col>
                <v-col>
                  <v-icon color="white"> mdi-web </v-icon>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="5" lg="7" class="text-left">
              Спортивно-информационный портал hockeyarena.com объединяет
              предложения по аренде всех ледовых дворцов и спортивных арен в
              одном общем информационном пространстве. Единое информационное
              пространство служит отправной точкой для тех кто собирается найти
              подходящую открытую спортивную площадку или спортивный зал для
              проведения тренировок, профессиональных и любительских
              соревнований, корпоративных мероприятий или спортивного досуга.
              Теперь не нужно искать необходимый спортивный зал или открытую
              спортивную площадку на множестве сайтов в сети, все предложения с
              подробным описанием и фотографиями есть на
              спортивно-информационном портале.
            </v-col>
          </v-row>
        </v-container>
      </v-img>
    </v-row>
    <v-container>
      <v-row class="d-flex">
        <v-col>
          <div class="text-h5">Популярные лиги</div>
        </v-col>
        <v-col>
          <div class="grey--text lighten-1 text-right">
            Посмотреть все лиги
            <v-icon size="28" color="grey lighten-1"> mdi-arrow-right </v-icon>
          </div>
        </v-col>
      </v-row>
      <v-row dense class="mx-n4">
        <v-col cols="12" md="6" v-for="(item, i) in pupular_leagues" :key="i">
          <v-card color="transparent" elevation="0">
            <div class="d-flex flex-no-wrap">
              <v-avatar class="ma-3" size="125">
                <v-img :src="require('@/assets' + item + '.jpg')"></v-img>
              </v-avatar>
              <v-card-text>
                <div
                  class="body-1 blue--text mb-2"
                  style="text-decoration: none"
                >
                  Москва
                </div>
                <div class="text-h5 mb-2">Название команды</div>
                <div class="body-2 grey--text">Количество турниров: 2</div>
                <div class="body-2 grey--text">Количество дивизионов: 8</div>
                <router-link to="/teamname" class="undo-link-default">
                  <v-btn class="mt-3 body-2" depressed> Подробнее </v-btn>
                </router-link>
              </v-card-text>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="d-flex flex-column">
      <v-row class="d-flex justify-space-between">
        <v-col>
          <div class="text-h5">Детские турниры</div>
        </v-col>
        <v-col>
          <div class="grey--text lighten-1 text-right">
            Посмотреть все турниры
            <v-icon size="28" color="grey lighten-1"> mdi-arrow-right </v-icon>
          </div>
        </v-col>
      </v-row>
      <v-row dense class="mx-n4">
        <v-col cols="12" md="6" v-for="(item, i) in pupular_leagues" :key="i">
          <v-card color="transparent" elevation="0">
            <div class="d-flex flex-no-wrap">
              <v-avatar class="ma-3" size="125">
                <v-img :src="require('@/assets' + item + '.jpg')"></v-img>
              </v-avatar>
              <v-card-text>
                <div class="grey--text lighten-3--text body-1 mb-2">
                  21 мая 2021 — 24 мая 2021
                </div>
                <div class="text-h6 mb-2 font-weight-bold">
                  Название турнира
                </div>
                <div
                  class="body-1 blue--text mb-2"
                  style="text-decoration: none"
                >
                  Россия, г.Смоленск
                </div>
                <router-link to="/teamname" class="undo-link-default">
                  <v-btn class="mt-3 body-2" depressed> Подробнее </v-btn>
                </router-link>
              </v-card-text>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-row class="mb-10">
      <v-img
        color="grey"
        height="500"
        width="100%"
        src="@/assets/banner-arena.jpg"
      ></v-img>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapState(["items"]),
  },
  mounted() {
    this.$store.dispatch("loadItems");
  },
  data() {
    return {
      pupular_leagues: [
        "/home_1",
        "/team_room_2",
        "/team_room_3",
        "/team_room_4",
      ],
      kid_tournements: [
        "/team_room_3",
        "/team_room_4",
        "/home_1",
        "/team_room_1",
        "/team_room_4",
      ],
      arenas: [
        {
          image: "/home_arena_1.png",
          name: "Los Angeles Clippers",
          address: "ул. Лермонтова, д. 14, пом. 3, г. Чита",
        },
        {
          image: "/home_arena_2.png",
          name: "Los Angeles Clippers",
          address: "ул. Лермонтова, д. 14, пом. 3, г. Чита",
        },
        {
          image: "/home_arena_3.png",
          name: "Los Angeles Clippers",
          address: "ул. Лермонтова, д. 14, пом. 3, г. Чита",
        },
        {
          image: "/home_arena_2.png",
          name: "Los Angeles Clippers",
          address: "ул. Лермонтова, д. 14, пом. 3, г. Чита",
        },
      ],
    };
  },
  methods: {},
};
</script>

<style>
.undo-link-default {
  text-decoration: none;
}
.banner-roomm {
  background: url("../../assets/home_slide_1.png") no-repeat center center;
  background-size: contain;
  height: 400px;
  width: 100%;
}
.banner-info {
  background: url("../../assets/home_slide_1.png") no-repeat center center;
  background-size: contain;
  width: 100%;
}
</style>