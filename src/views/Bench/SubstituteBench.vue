<template>
  <div class="grey lighten-4">
    <div class="banner-room">
      <v-container class="pt-16 pb-16 white--text">
        <div class="text-h4">Скамейка запасных</div>
        <div class="mt-4 d-lg-flex">
          <v-tabs v-model="value" class="d-flex flex-no-wrap rounded-lg mb-2">
            <v-tab class="px-3" v-for="item in bench_nav" :key="item">
              {{ item }}
            </v-tab>
          </v-tabs>
          <v-spacer></v-spacer>
          <v-btn class="rounded-lg" large dark outlined depressed height="48px">
            Добавить объявление
          </v-btn>
        </div>
      </v-container>
    </div>
    <v-container class="pt-16 pb-0" v-show="value == 0">
      <div class="pb-10">
        <v-row dense>
          <v-col class="d-flex" cols="12" md="2">
            <v-select
              :items="country_tags"
              value="Россия"
              solo
              flat
              hide-details="auto"
            ></v-select>
          </v-col>
          <v-col cols="9" md="8" lg="9">
            <v-text-field
              label="Поиск"
              single-line
              prepend-inner-icon="mdi-magnify"
              solo
              flat
              hide-details="auto"
              class="rounded-lg"
            ></v-text-field>
          </v-col>
          <v-col cols="3" md="2" lg="1">
            <v-btn
              class="rounded-lg"
              large
              depressed
              height="48px"
              width="100%"
              color="primary"
            >
              Найти
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex" cols="6" md="4" lg="3" xl="2">
            <v-select
              :items="sort_by_team"
              value="Сначала новые"
              solo
              flat
              prepend-icon="mdi-sort"
              hide-details="auto"
            ></v-select>
          </v-col>
          <v-col class="my-auto" cols="6" md="4">
            <div class="body-1 grey--text">Найдено: 160 результатов</div>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="6" md="4" lg="3" xl="2">
            <v-select
              :items="display_items"
              value="Показывать по 12"
              solo
              flat
              hide-details="auto"
            ></v-select>
          </v-col>
        </v-row>
      </div>
      <v-row dense class="mx-n4">
        <v-col
          class="pa-4"
          cols="12"
          md="6"
          v-for="(item, i) in teamFindPlayer"
          :key="i"
        >
          <v-card elevation="0" class="pa-5 rounded-lg">
            <div class="d-flex flex-no-wrap">
              <v-card-text class="px-0">
                <div class="body-1 grey--text">
                  {{ dateFormat(item.date) }}
                </div>
                <div class="text-h5 mb-2">{{ item.name }}</div>
                <div class="body-2 grey--text">{{ item.age }} год</div>
              </v-card-text>
            </div>
            <div class="mb-4">
              {{ item.description.slice(0, 290) }}
            </div>
            <p class="bold">Навыки:</p>
            <div class="d-flex mb-2">
              <div class="body-2 blue--text">Хват: {{ item.grip }}</div>
              <div class="body-2 blue--text ml-16">Амплуа: {{ item.role }}</div>
            </div>
            <div class="d-flex">
              <div class="body-2 blue--text">Уровень: {{ item.level }}</div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="pt-16 pb-0" v-show="value == 1">
      <div class="pb-10">
        <v-row dense>
          <v-col class="d-flex" cols="12" md="2">
            <v-select
              :items="country_tags"
              value="Россия"
              solo
              flat
              hide-details="auto"
            ></v-select>
          </v-col>
          <v-col cols="9" md="8" lg="9">
            <v-text-field
              label="Поиск"
              single-line
              prepend-inner-icon="mdi-magnify"
              solo
              flat
              hide-details="auto"
              class="rounded-lg"
            ></v-text-field>
          </v-col>
          <v-col cols="3" md="2" lg="1">
            <v-btn
              class="rounded-lg"
              large
              depressed
              height="48px"
              width="100%"
              color="primary"
            >
              Найти
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex" cols="6" md="4" lg="3" xl="2">
            <v-select
              :items="sort_by_team"
              value="Сначала новые"
              solo
              flat
              prepend-icon="mdi-sort"
              hide-details="auto"
            ></v-select>
          </v-col>
          <v-col class="my-auto" cols="6" md="4">
            <div class="body-1 grey--text">Найдено: 160 результатов</div>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="6" md="4" lg="3" xl="2">
            <v-select
              :items="display_items"
              value="Показывать по 12"
              solo
              flat
              hide-details="auto"
            ></v-select>
          </v-col>
        </v-row>
      </div>
      <v-row dense class="mx-n4">
        <v-col
          class="pa-4"
          cols="12"
          md="6"
          v-for="(item, i) in teamFindPlayer"
          :key="i"
        >
          <v-card elevation="0" class="pa-5">
            <div class="d-flex flex-no-wrap">
              <v-card-text class="px-0">
                <div class="body-1 grey--text">
                  {{ dateFormat(item.date) }}
                </div>
                <div class="text-h6 mb-2">{{ item.name }}</div>
                <!-- <div class="body-2 grey--text">Участников: 19</div> -->
              </v-card-text>
            </div>
            <div class="mb-4 text-justify">
              {{ item.description.slice(0, 290) }}
            </div>
            <p class="bold">Необходимые требования:</p>
            <div class="d-flex mb-2">
              <div class="body-2 blue--text">Возраст: {{ item.age }}</div>
              <div class="body-2 blue--text ml-16">Амплуа: {{ item.role }}</div>
            </div>
            <div class="d-flex">
              <div class="body-2 blue--text">Хват: {{ item.grip }}</div>
              <div class="body-2 blue--text ml-16">
                Уровень: {{ item.level }}
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="pt-16 pb-0" v-show="value == 2">
      <div class="pb-10">
        <v-row dense>
          <v-col class="d-flex" cols="12" md="2">
            <v-select
              :items="country_tags"
              value="Россия"
              solo
              flat
              hide-details="auto"
            ></v-select>
          </v-col>
          <v-col cols="9" md="8" lg="9">
            <v-text-field
              label="Поиск"
              single-line
              prepend-inner-icon="mdi-magnify"
              solo
              flat
              hide-details="auto"
              class="rounded-lg"
            ></v-text-field>
          </v-col>
          <v-col cols="3" md="2" lg="1">
            <v-btn
              class="rounded-lg"
              large
              depressed
              height="48px"
              width="100%"
              color="primary"
            >
              Найти
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex" cols="6" md="4" lg="3" xl="2">
            <v-select
              :items="sort_by_team"
              value="Сначала новые"
              solo
              flat
              prepend-icon="mdi-sort"
              hide-details="auto"
            ></v-select>
          </v-col>
          <v-col class="my-auto" cols="6" md="4">
            <div class="body-1 grey--text">Найдено: 160 результатов</div>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="6" md="4" lg="3" xl="2">
            <v-select
              :items="display_items"
              value="Показывать по 12"
              solo
              flat
              hide-details="auto"
            ></v-select>
          </v-col>
        </v-row>
      </div>
      <v-row dense class="mx-n4">
        <v-col
          class="pa-4"
          cols="12"
          md="6"
          v-for="(item, i) in teamFindPlayer"
          :key="i"
        >
          <v-card elevation="0" class="pa-5">
            <div class="d-flex flex-no-wrap">
              <v-card-text class="px-0">
                <div class="body-1 grey--text">
                  {{ dateFormat(item.date) }}
                </div>
                <div class="text-h6 mb-2">{{ item.name }}</div>
                <!-- <div class="body-2 grey--text">Участников: 19</div> -->
              </v-card-text>
            </div>
            <div class="mb-4 text-justify">
              {{ item.description.slice(0, 290) }}
            </div>
            <p class="bold">Необходимые требования:</p>
            <div class="d-flex mb-2">
              <div class="body-2 blue--text">Возраст: {{ item.age }}</div>
              <div class="body-2 blue--text ml-16">Амплуа: {{ item.role }}</div>
            </div>
            <div class="d-flex">
              <div class="body-2 blue--text">Хват: {{ item.grip }}</div>
              <div class="body-2 blue--text ml-16">
                Уровень: {{ item.level }}
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="pt-16 pb-0" v-show="value == 3">
      <div class="pb-10">
        <v-row dense>
          <v-col class="d-flex" cols="12" md="2">
            <v-select
              :items="country_tags"
              value="Россия"
              solo
              flat
              hide-details="auto"
            ></v-select>
          </v-col>
          <v-col cols="9" md="8" lg="9">
            <v-text-field
              label="Поиск"
              single-line
              prepend-inner-icon="mdi-magnify"
              solo
              flat
              hide-details="auto"
              class="rounded-lg"
            ></v-text-field>
          </v-col>
          <v-col cols="3" md="2" lg="1">
            <v-btn
              class="rounded-lg"
              large
              depressed
              height="48px"
              width="100%"
              color="primary"
            >
              Найти
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex" cols="6" md="4" lg="3" xl="2">
            <v-select
              :items="sort_by_team"
              value="Сначала новые"
              solo
              flat
              prepend-icon="mdi-sort"
              hide-details="auto"
            ></v-select>
          </v-col>
          <v-col class="my-auto" cols="6" md="4">
            <div class="body-1 grey--text">Найдено: 160 результатов</div>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="6" md="4" lg="3" xl="2">
            <v-select
              :items="display_items"
              value="Показывать по 12"
              solo
              flat
              hide-details="auto"
            ></v-select>
          </v-col>
        </v-row>
      </div>
      <v-row dense class="mx-n4">
        <v-col
          class="pa-4"
          cols="12"
          md="6"
          v-for="(item, i) in teamFindPlayer"
          :key="i"
        >
          <v-card elevation="0" class="pa-5 rounded-lg">
            <div class="d-flex flex-no-wrap">
              <v-card-text class="px-0">
                <div class="body-1 grey--text">
                  {{ dateFormat(item.date) }}
                </div>
                <div class="text-h5 mb-2">{{ item.name }}</div>
                <div class="body-2 grey--text">{{ item.age }} год</div>
              </v-card-text>
            </div>
            <div class="mb-4">
              {{ item.description.slice(0, 290) }}
            </div>
            <p class="bold">Навыки:</p>
            <div class="d-flex mb-2">
              <div class="body-2 blue--text">Хват: {{ item.grip }}</div>
              <div class="body-2 blue--text ml-16">Амплуа: {{ item.role }}</div>
            </div>
            <div class="d-flex">
              <div class="body-2 blue--text">Уровень: {{ item.level }}</div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <div class="text-center py-10">
      <v-pagination
        color="grey"
        v-model="page"
        :length="15"
        :total-visible="7"
      ></v-pagination>
    </div>
    <v-container>
      <v-row>
        <v-col cols="12" v-for="(item, i) in items" :key="i">
          {{ item.title }}
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "SubstituteBench",
  computed: {
    ...mapState(["forums"]),
    teamFindPlayer() {
      return this.forums.filter((x) => x.type === "PLAYERTEAM");
    },
    teamFindTrainer() {
      return this.forums.filter((x) => x.type === "TEAMTRAINER");
    },
    playerFindTeam() {
      return this.forums.filter((x) => x.type === "TEAMTRAINER");
    },
    trainerFindTeam() {
      return this.forums.filter((x) => x.type === "TEAMTRAINER");
    },
  },
  created() {
    this.$store.dispatch("getForums");
  },
  data() {
    return {
      player_room: false,
      team_room: true,
      page: 1,
      value: 0,
      bench_tab: null,
      bench_nav: [
        "Игроки ищут команду",
        "Команда ищет игроков",
        "Команда ищет тренера",
        "Тренер ищет команду",
      ],
      country_tags: ["Россия"],
      sort_by_team: ["По популярности", "По именни", "Сначала новые"],
      sort_by_player: ["По возрасту", "По город"],
      display_items: ["Показывать по 12", "Показывать по 25"],
    };
  },
  methods: {
    dateFormat(date) {
      let newDate = new Date(date);
      let formatter = new Intl.DateTimeFormat("ru", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return formatter.format(newDate);
    },
  },
};
</script>

<style>
.banner-room {
  background: url("../../assets/subs_bench.jpg") no-repeat center center;
  background-size: cover;
}
</style>