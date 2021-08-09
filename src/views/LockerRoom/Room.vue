<template>
  <div class="grey lighten-4">
    <div class="banner-room">
      <v-container class="pt-16 pb-16 white--text">
        <div class="text-h4">Раздевалка</div>
        <v-row class="mt-2">
          <v-col cols="6" sm="4" lg="3">
            <v-tabs v-model="value" class="d-flex flex-no-wrap rounded-lg">
              <v-tab class="px-6" v-for="item in room_nav" :key="item">
                {{ item }}
              </v-tab>
            </v-tabs>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-container class="pt-16 pb-0" v-show="value == 0">
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
              label="Поиск по названию команды"
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
              value="По популярности"
              solo
              flat
              prepend-icon="mdi-sort"
              hide-details="auto"
            ></v-select>
          </v-col>
          <v-col class="my-auto" cols="6" md="4">
            <div class="body-1 grey--text">Найдено: {{teams.length}} результатов</div>
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
        <v-col cols="12" md="6" v-for="(item, i) in teams" :key="i">
          <router-link :to="`/arena/d5132ff1-674e-4a1f-948e-8833937b0fa4/teamname/${item.id}`" class="undo-link-default">
            <v-card color="transparent" elevation="0">
              <div class="d-flex flex-no-wrap">
                <v-avatar class="ma-3" size="125" tile>
                    <v-img :src="require('@/assets' + (item.profilePicture ? item.profilePicture : '/team_room_1.jpg'))"></v-img>
                </v-avatar>
                <v-card-text>
                  <div
                    class="body-1 blue--text mb-2"
                    style="text-decoration: none"
                  >
                    Москва
                  </div>
                  <div class="text-h5 mb-2"> {{item.title}} </div>
                  <div class="body-1 grey--text"> {{item.miniDescription | descriptionLength}} </div>
                </v-card-text>
              </div>
            </v-card>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="pt-16 pb-0" v-show="value == 1">
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
              label="Поиск по ФИО игрока"
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
              :items="sort_by_player"
              value="По возрасту"
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
        <v-col cols="12" md="6" v-for="(item, i) in player_items" :key="i">
          <v-card color="transparent" elevation="0">
            <div class="d-flex flex-no-wrap">
              <v-avatar class="ma-3" size="125" tile>
                <v-img :src="require('@/assets' + item + '.jpg')"></v-img>
              </v-avatar>
              <v-card-text>
                <div class="text-h5 mb-2">Фамилия Имя Отчество</div>
                <div class="body-1 blue--text mb-2">Возраст, город</div>
                <div class="d-flex">
                  <div class="body-2 grey--text">Хват: правый</div>
                  <div class="body-2 grey--text ml-12">Амплуа: защитник</div>
                </div>

                <div class="body-2 grey--text">Уровень: профессионал</div>
              </v-card-text>
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
  name: "Room",
  computed: {
    ...mapState(["teams", "players"]),
  },
  filters: {
    descriptionLength(value) {
      if (value.length < 30) return value;
      return value.slice(0, 30) + "...";
    },
  },
  mounted() {
    this.$store.dispatch("getAllTeams");
    this.$store.dispatch("getAllPlayers");
  },
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
      sort_by_team: ["По популярности", "По именни"],
      sort_by_player: ["По возрасту", "По город"],
      display_items: ["Показывать по 12", "Показывать по 25"],
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