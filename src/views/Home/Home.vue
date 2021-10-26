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
          <router-link to="/arena" class="reset-link">
            <div class="grey--text lighten-1 text-right">
              Посмотреть все арены
              <v-icon size="28" color="grey lighten-1">
                mdi-arrow-right
              </v-icon>
            </div>
          </router-link>
        </v-col>
      </v-row>
      <v-row class="d-flex mx-n4">
        <v-col
          class="pa-4"
          cols="12"
          md="4"
          xl="3"
          v-for="(arena, i) in displayedArena"
          :key="i"
        >
          <ArenaCard :arena="arena" />
        </v-col>
      </v-row>
    </v-container>
    <v-row class="mb-10">
      <v-img color="grey" class="about-us" src="@/assets/banner-arena.jpg">
        <v-container class="pt-3 px-5 my-10">
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
            <v-col cols="12" md="9" lg="7" class="text-left">
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

    <v-row>
      <v-img
        color="grey"
        class="px-20 px-sm-10"
        width="100%"
        src="@/assets/banner-arena.jpg"
      >
        <v-container>
          <v-row>
            <v-col class="text-h5 white--text mt-5">
              Разделы информационного портала
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" lg="8" md="8">
              <v-img
                color="grey"
                width="100%"
                height="250"
                style="border-radius: 12px"
                src="@/assets/home_arena_3.png"
              >
                <v-row
                  no-gutters
                  align="end"
                  class="pl-5 white--text pb-5 gradient-over"
                  style="height: 100%"
                >
                  <v-col>
                    <div class="font-weight-bold text-h5">Раздевалка</div>
                    <div class="">
                      Полный список всех команд и игроков, зарегистрировавшихся
                      на портале
                    </div>
                  </v-col>
                </v-row>
              </v-img>
            </v-col>
            <v-col cols="12" lg="4" md="4">
              <v-img
                color="grey"
                width="100%"
                height="250"
                style="border-radius: 12px"
                src="@/assets/home_arena_2.png"
              >
                <v-row
                  no-gutters
                  align="end"
                  class="pl-5 white--text pb-5 gradient-over"
                  style="height: 100%"
                >
                  <v-col>
                    <div class="font-weight-bold text-h5">Раздевалка</div>
                    <div class="">
                      Полный список всех команд и игроков, зарегистрировавшихся
                      на портале
                    </div>
                  </v-col>
                </v-row>
              </v-img>
            </v-col>
          </v-row>
          <v-row>
            <v-col v-for="(item, i) in information" :key="i">
              <v-img
                color="grey"
                width="100%"
                height="250"
                style="border-radius: 12px"
                :src="require('@/assets' + item + '.png')"
              >
                <v-row
                  no-gutters
                  align="end"
                  class="pl-5 white--text pb-5 gradient-over"
                  style="height: 100%"
                >
                  <v-col>
                    <div class="font-weight-bold text-h5">Раздевалка</div>
                    <div class="">
                      Полный список всех команд и игроков, зарегистрировавшихся
                      на портале
                    </div>
                  </v-col>
                </v-row>
              </v-img>
            </v-col>
          </v-row>
        </v-container>
      </v-img>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ArenaCard from "@/components/Arena/ArenaCard.vue";

export default {
  name: "Home",
  components: { ArenaCard },
  computed: {
    ...mapState("arena",["arenas"]),
    displayedArena() {
      return this.arenas.slice(0, 4);
    },
  },
  mounted() {
    this.$store.dispatch("arena/getArenas");
  },
  data() {
    return {
      information: ["/home_arena_1", "/home_arena_2", "/home_arena_3"],
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
  methods: {
    goToArena(arenaId) {
      this.$router.push({ name: "arena-information", params: { arenaId } });
    },
  },
  filters: {
    addressDescription: (value) => {
      if (!value) return "";
      return value.slice(0, 34);
    },
  },
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
.gradient-over {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 48.9%, #000000 95.78%);
}
.about-us {
  height: 300px;
  width: "100%";
}
@media screen and (max-width: 950px) {
  .about-us {
    height: 39%;
  }
}
</style>
