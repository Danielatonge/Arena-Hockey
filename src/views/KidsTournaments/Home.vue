<template>
  <div class="grey lighten-4">
    <v-container class="pt-16 pb-0">
      <div class="pb-16">
        <v-row dense>
          <v-col class="d-flex" cols="12" md="2">
            <v-select
              :items="team_tags"
              value="Москва"
              solo
              flat
              hide-details="auto"
            ></v-select>
          </v-col>
          <v-col cols="9" md="8" lg="9">
            <v-text-field
              label="Поиск по названию турнира, адресу"
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
        <v-row class="pt-8 pb-8 pl-4">
          <div class="text-h5 font-weight-bold">Детские турниры</div>
        </v-row>
        <div class="rounded-lg white align-center mb-10">
          <v-sheet
            tile
            class="
              d-flex
              align-center
              flex-wrap
              justify-md-center justify-sm-space-around
              pa-lg-5 pa-md-4
            "
            color="#EBF5FB"
          >
            <div class="d-flex align-center">
              <div class="d-flex align-center">
                <div style="width: 200px">
                  <v-select
                    v-model="currentDay"
                    dense
                    single-line
                    outlined
                    prepend-inner-icon="mdi-calendar-blank"
                    hide-details
                    class="ma-2 white d-flex"
                    label="Дата"
                  ></v-select>
                </div>
                <div style="width: 200px">
                  <v-select
                    v-model="currentDay"
                    dense
                    single-line
                    outlined
                    prepend-inner-icon="mdi-calendar-blank"
                    hide-details
                    class="ma-2 white d-flex"
                    label="Дата"
                  ></v-select>
                </div>
              </div>
            </div>
            <div class="d-flex align-center">
              <div class="ma-2">Год рождения:</div>
              <div style="width: 150px">
                <v-select
                  v-model="mode"
                  :items="birthday_from"
                  dense
                  single-line
                  outlined
                  hide-details
                  label="оT 2007"
                  class="white"
                ></v-select>
              </div>
              <div style="width: 150px">
                <v-select
                  v-model="mode"
                  :items="birthday_to"
                  dense
                  single-line
                  outlined
                  hide-details
                  label="до 2007"
                  class="ma-2 white"
                ></v-select>
              </div>
            </div>
          </v-sheet>
        </div>
        <v-row>
          <v-col class="d-flex" cols="6" md="4" lg="3" xl="2">
            <v-select
              :items="sort_by_team"
              value="по дате"
              solo
              flat
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
      <v-row dense class="mx-n4 pr-4">
        <v-col class="mb-3" cols="12" v-for="(item, i) in team_items" :key="i">
          <router-link to="/teamname" class="undo-link-default d-flex">
            <div>
              <v-avatar class="ma-3" size="180" tile>
                <v-img :src="require('@/assets' + item + '.jpg')"></v-img>
              </v-avatar>
            </div>
            <v-row class="pt-3">
              <v-col class="d-flex flex-wrap justify-space-between">
                <div>
                  <div class="grey--text lighten-3--text text-h6 mb-2">
                    21 мая 2021 — 24 мая 2021
                  </div>
                  <div class="text-h6 mb-2 font-weight-bold">
                    Название турнира
                  </div>
                  <div
                    class="body-1 blue--text mb-2"
                    style="text-decoration: none"
                  >
                    Россия, г.Смоленск, ул.25 Сентября, д.39 Ледовый Дворец
                  </div>
                  <div class="grey--text">
                    Организатор: Васильева Мария Владимировна
                  </div>
                  <div
                    class="body-1 blue--text mb-2 pt-4"
                    style="text-decoration: none"
                  >
                    Год рождения: 2003 — 2005
                  </div>
                </div>
                <div class="text-lg-right text-md-left">
                  <div class="text-h7 grey--text mb-2">Вступительный взнос</div>
                  <div
                    class="body-1 blue--text mb-2"
                    style="text-decoration: none"
                  >
                    25 000 РУБ
                  </div>
                  <div class="body-1 text-h7 mb-2">
                    + 2000 РУБ за каждого игрока
                  </div>
                </div>
              </v-col>
            </v-row>
          </router-link>
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
  </div>
</template>

<script>
export default {
  name: "KidsTournaments",
  computed: {},
  mounted() {},
  data() {
    return {
      player_room: false,
      team_room: true,
      page: 1,
      value: 0,
      room_tab: null,
      room_nav: ["Команды", "Игроки"],
      team_items: [
        "/team_room_1",
        "/team_room_2",
        "/team_room_3",
        "/team_room_4",
        "/team_room_1",
        "/team_room_2",
        "/team_room_3",
        "/team_room_4",
      ],
      player_items: [
        "/player_1",
        "/player_2",
        "/player_3",
        "/player_4",
        "/player_5",
        "/player_6",
      ],
      team_tags: ["Москва", "Казань"],
      player_tags: [""],
      sort_by_team: ["по дате", "По популярности", "По именни"],
      sort_by_player: ["По возрасту", "По город"],
      display_items: ["Показывать по 12", "Показывать по 25"],
      birthday_from: ["от 2003", "от 2004"],
      birthday_to: ["до 2007", "до 2008"],
      currentDay: "",
      mode: "",
    };
  },
  methods: {
    showRoom() {
      this.team_room = true;
      this.player_room = false;
    },
    showPlayer() {
      this.team_room = false;
      this.player_room = true;
    },
    teamClicked() {
      this.$router.push({ path: "teamname" });
    },
  },
};
</script>

<style>
.undo-link-default {
  text-decoration: none;
}
.banner-room {
  background: url("../../assets/banner-room.jpg") no-repeat center center;
  background-size: cover;
}
</style>
