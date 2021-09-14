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
              :items="team_cities"
              v-model="sort_by_city"
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
              v-model="searchTeam"
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
              v-model="sort_model"
              value="0"
              solo
              flat
              item-text="value"
              item-value="key"
              prepend-icon="mdi-sort"
              hide-details="auto"
            ></v-select>
          </v-col>
          <v-col class="my-auto" cols="6" md="4">
            <div class="body-1 grey--text">
              Найдено: {{ searchListTeam.length }} результатов
            </div>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="6" md="4" lg="3" xl="2">
            <v-select
              :items="display_items"
              v-model="numItemsTeam"
              item-text="state"
              item-value="value"
              solo
              flat
              hide-details="auto"
            ></v-select>
          </v-col>
        </v-row>
      </div>
      <v-row dense class="mx-n4">
        <v-col cols="12" md="6" v-for="(item, i) in displayedTeams" :key="i">
          <router-link :to="`/teamname/${item.id}`" class="undo-link-default">
            <v-card color="transparent" elevation="0">
              <div class="d-flex flex-no-wrap">
                <v-avatar class="ma-3 rounded-lg" size="125" tile>
                  <v-img
                    :src="
                      item.profilePicture != null
                        ? item.profilePicture
                        : require('@/assets/team_room_1.jpg')
                    "
                  ></v-img>
                </v-avatar>
                <v-card-text>
                  <div
                    class="body-1 blue--text mb-2"
                    style="text-decoration: none"
                  >
                    {{ item.city }}
                  </div>
                  <div class="text-h5 mb-2">{{ item.title }}</div>
                  <!--                  <div class="body-1 grey&#45;&#45;text">-->
                  <!--                    {{ item.miniDescription }}-->
                  <!--                  </div>-->
                </v-card-text>
              </div>
            </v-card>
          </router-link>
        </v-col>
      </v-row>
      <div class="text-center py-10">
        <v-pagination
          color="grey"
          v-model="pageTeam"
          :length="paginationTeamLength"
          :total-visible="7"
        ></v-pagination>
      </div>
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
              v-model="searchPlayer"
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
            <div class="body-1 grey--text">
              Найдено: {{ searchListPlayer.length }} результатов
            </div>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="6" md="4" lg="3" xl="2">
            <v-select
              :items="display_items"
              v-model="numItemsPlayer"
              item-text="state"
              item-value="value"
              solo
              flat
              hide-details="auto"
            ></v-select>
          </v-col>
        </v-row>
      </div>
      <v-row dense class="mx-n4">
        <v-col cols="12" md="6" v-for="(item, i) in displayedPlayers" :key="i">
          <v-card color="transparent" elevation="0">
            <div class="d-flex flex-no-wrap">
              <v-avatar class="ma-3 rounded-lg" size="125" tile>
                <v-img
                  :src="
                    item.profilePicture != null
                      ? item.profilePicture
                      : require('@/assets/team_room_1.jpg')
                  "
                ></v-img>
              </v-avatar>
              <v-card-text>
                <div class="text-h5 mb-2">
                  {{ item.name + " " + item.middleName + " " + item.surname }}
                </div>
                <div class="body-1 blue--text mb-2">
                  {{ item.age }}{{ isValidCityOutput(item.city) }}
                </div>
                <div class="d-flex">
                  <div
                    class="body-2 grey--text mr-12"
                    v-if="isValidOutput(item.grip)"
                  >
                    Хват: {{ item.grip }}
                  </div>
                  <div class="body-2 grey--text">
                    Амплуа: {{ item.position }}
                  </div>
                </div>

                <div class="body-2 grey--text">Уровень: {{ item.level }}</div>
              </v-card-text>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <div class="text-center py-10">
        <v-pagination
          color="grey"
          v-model="pagePlayer"
          :length="paginationPlayerLength"
          :total-visible="7"
        ></v-pagination>
      </div>
    </v-container>
    <v-container>
      <!--      <v-row>-->
      <!--        <v-col cols="12" v-for="(item, i) in items" :key="i">-->
      <!--          {{ item.title }}-->
      <!--        </v-col>-->
      <!--      </v-row>-->
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Room",
  computed: {
    ...mapState(["teams", "players", "team_cities"]),
    displayedTeams() {
      return this.paginate(
        this.searchListTeam,
        this.pageTeam,
        this.perPageTeam
      );
    },
    displayedPlayers() {
      return this.paginate(
        this.searchListPlayer,
        this.pagePlayer,
        this.perPagePlayer
      );
    },
    searchListTeam() {
      return this.teams.filter((x) => {
        const term = this.searchTeam.toLowerCase();
        return x.title ? x.title.toLowerCase().includes(term) : false;
      });
    },
    searchListPlayer() {
      return this.players.filter((x) => {
        const term = this.searchPlayer.toLowerCase();
        return (
          (x.surname ? x.surname.toLowerCase().includes(term) : false) ||
          (x.name ? x.name.toLowerCase().includes(term) : false)
        );
      });
    },
  },
  filters: {
    descriptionLength(value) {
      if (value.length < 30) return value;
      return value.slice(0, 30) + "...";
    },
  },
  watch: {
    numItemsTeam(val) {
      this.perPageTeam = val;
      this.paginationTeamLength = Math.ceil(
        this.searchListTeam.length / this.perPageTeam
      );
    },
    numItemsPlayer(val) {
      this.perPagePlayer = val;
      this.paginationPlayerLength = Math.ceil(
        this.searchListPlayer.length / this.perPagePlayer
      );
    },
    searchTeam() {
      this.paginationTeamLength = Math.ceil(
        this.searchListTeam.length / this.perPageTeam
      );
    },
    searchPlayer() {
      this.paginationPlayerLength = Math.ceil(
        this.searchListPlayer.length / this.perPagePlayer
      );
    },
    sort_model() {
      if (this.sort_model.key === 0) {
        this.displayedTeam.sort((item1, item2) => {
          if (item1.title < item2.title) {
            return -1;
          }
          if (item1.title > item2.title) {
            return 1;
          }
          return 0;
        });
      } else {
        this.displayedTeam.sort(function (item1, item2) {
          if (item1.title < item2.title) {
            return 1;
          }
          if (item1.title > item2.title) {
            return -1;
          }
          return 0;
        });
      }
    },
  },
  mounted() {
    this.$store.dispatch("getTeamCities");

    this.$store.dispatch("getAllTeams");
    this.$store.dispatch("getAllPlayers");
    this.setPaginationLength("player");
    this.setPaginationLength("team");
  },
  data() {
    return {
      pageTeam: 1,
      pagePlayer: 1,
      perPagePlayer: 10,
      perPageTeam: 10,
      searchTeam: "",
      searchPlayer: "",
      paginationTeamLength: 10,
      paginationPlayerLength: 10,

      player_room: false,
      team_room: true,
      page: 1,
      value: 0,
      room_tab: null,
      room_nav: ["Команды", "Игроки"],
      team_items: ["/team_room_1"],
      player_items: ["/player_1"],
      team_tags: ["Москва", "Казань"],
      sort_by_city: "г. Москва",
      player_tags: [""],
      numItemsTeam: { state: "Показывать по 10", value: 10 },
      numItemsPlayer: { state: "Показывать по 10", value: 10 },

      sort_by_player: ["По возрасту", "По город"],
      display_items: [
        { state: "Показывать по 10", value: 10 },
        { state: "Показывать по 30", value: 30 },
        { state: "Показывать по 50", value: 50 },
        { state: "Показывать по 100", value: 100 },
      ],
      sort_model: { key: 0, value: "По именни (от Я до А)" },
      sort_by_team: [
        { key: 0, value: "По именни (от А до Я)" },
        { key: 1, value: "По именни (от Я до А)" },
      ],
    };
  },
  methods: {
    setPaginationLength(category) {
      if (category === "team") {
        this.paginationTeamLength = Math.ceil(
          this.searchListTeam.length / this.perPageTeam
        );
      } else {
        this.paginationPlayerLength = Math.ceil(
          this.searchListPlayer.length / this.perPagePlayer
        );
      }
    },
    paginate(items, currentPage, perPage) {
      const from = currentPage * perPage - perPage;
      const to = currentPage * perPage;
      return items.slice(from, to);
    },
    showRoom() {
      this.team_room = true;
      this.player_room = false;
    },
    isValidOutput(input) {
      return input && input !== "string" ? input : null;
    },
    isValidCityOutput(input) {
      return input && input !== "string" ? ", " + input : null;
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
