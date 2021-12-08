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
              v-model="team_city"
              solo
              flat
              hide-details="auto"
              @change="fetchTeams"
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
              @change="fetchTeams"
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
              solo
              flat
              item-text="value"
              item-value="key"
              return-object
              prepend-icon="mdi-sort"
              hide-details="auto"
              @change="fetchTeams"
            ></v-select>
          </v-col>
          <v-col class="my-auto" cols="6" md="4">
            <div class="body-1 grey--text">
              Найдено: {{ numFoundTeam }} результатов
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
              return-object
              hide-details="auto"
              @change="fetchTeams"
            ></v-select>
          </v-col>
        </v-row>
      </div>
      <v-row dense class="mx-n4">
        <v-col cols="12" md="6" v-for="(item, i) in teams" :key="i">
          <router-link
            :to="{ name: 'team-name', params: { teamId: item.id } }"
            class="undo-link-default"
          >
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
      <div class="text-center py-10" v-if="teams.length">
        <v-pagination
          color="grey"
          v-model="pageTeam"
          :length="paginationTeamLength"
          :total-visible="7"
        ></v-pagination>
      </div>
    </v-container>
    <v-container class="pt-16 pb-0" v-show="value === 1">
      <div class="pb-16">
        <v-row dense>
          <v-col class="d-flex" cols="12" md="2">
            <v-select
              :items="team_tags"
              v-model="player_city"
              solo
              flat
              hide-details="auto"
              @change="fetchPlayers"
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
              @keyup.enter="fetchPlayers"
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
              @click="fetchPlayers"
            >
              Найти
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex" cols="6" md="4" lg="3" xl="2">
            <v-select
              :items="sort_by_player"
              v-model="sort_player"
              solo
              flat
              item-text="value"
              item-value="key"
              return-object
              prepend-icon="mdi-sort"
              hide-details="auto"
              @change="fetchPlayers"
            ></v-select>
          </v-col>
          <v-col class="my-auto" cols="6" md="4">
            <div class="body-1 grey--text">
              Найдено: {{ numFoundPlayer }} результатов
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
              return-object
              hide-details="auto"
              @change="fetchPlayers"
            ></v-select>
          </v-col>
        </v-row>
      </div>
      <v-row dense class="mx-n4">
        <v-col cols="12" md="6" v-for="(item, i) in players" :key="i">
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
                  {{ item.age }}{{ item.city && item.age ? ", " : "" }}
                  {{ isValidOutput(item.city) }}
                </div>
                <div class="d-flex">
                  <div
                    class="body-2 grey--text mr-12"
                    v-if="isValidOutput(item.grip)"
                  >
                    Хват: {{ item.grip }}
                  </div>
                  <div
                    class="body-2 grey--text"
                    v-if="isValidOutput(item.position)"
                  >
                    Амплуа: {{ item.position }}
                  </div>
                </div>

                <div class="body-2 grey--text" v-if="isValidOutput(item.level)">
                  Уровень: {{ item.level }}
                </div>
              </v-card-text>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <div class="text-center py-10" v-if="players.length">
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
    ...mapState("teamplayer", ["teamCities", "teams", "players"]),
  },
  filters: {
    descriptionLength(value) {
      if (value.length < 30) return value;
      return value.slice(0, 30) + "...";
    },
  },
  watch: {
    pageTeam() {
      this.fetchTeams();
    },
    pagePlayer() {
      this.fetchPlayers();
    },
  },
  created() {
    this.$store.dispatch("teamplayer/getTeamCities");
    this.fetchTeams();
    this.fetchPlayers();
  },
  data() {
    return {
      pageTeam: 1,
      pagePlayer: 1,
      searchTeam: "",
      searchPlayer: "",
      paginationTeamLength: 10,
      paginationPlayerLength: 10,

      player_room: false,
      team_room: true,
      value: 0,
      room_tab: null,
      room_nav: ["Команды", "Игроки"],
      team_tags: ["Москва"],
      team_city: "Москва",
      player_city: "Москва",
      numItemsTeam: { state: "Показывать по 10", value: 10 },
      numItemsPlayer: { state: "Показывать по 10", value: 10 },

      sort_by_player: [
        { key: 1, value: "По именни (от А до Я)" },
        { key: 0, value: "По именни (от Я до А)" },
      ],
      sort_player: { key: 1, value: "По именни (от А до Я)" },
      display_items: [
        { state: "Показывать по 10", value: 10 },
        { state: "Показывать по 30", value: 30 },
        { state: "Показывать по 50", value: 50 },
        { state: "Показывать по 100", value: 100 },
      ],
      sort_model: { key: 1, value: "По именни (от А до Я)" },
      sort_by_team: [
        { key: 1, value: "По именни (от А до Я)" },
        { key: 0, value: "По именни (от Я до А)" },
      ],
      numFoundTeam: 0,
      numFoundPlayer: 0,
    };
  },
  methods: {
    showRoom() {
      this.team_room = true;
      this.player_room = false;
    },
    isValidOutput(input) {
      return input && input !== "string" ? input : null;
    },
    showPlayer() {
      this.team_room = false;
      this.player_room = true;
    },
    teamClicked() {
      this.$router.push({ name: "team-name" }); //TODO : should take params teamId
    },
    fetchTeams() {
      const filters = {
        city: this.team_city,
        currentPage: this.pageTeam,
        pageSize: this.numItemsTeam.value,
        queryString: this.searchTeam,
        sortBy: this.sort_model.key,
      };
      this.$store
        .dispatch("teamplayer/filterTeams", filters)
        .then(({ paginationLength, numFound }) => {
          this.paginationTeamLength = paginationLength;
          this.numFoundTeam = numFound;
        });
    },
    fetchPlayers() {
      const filters = {
        city: this.player_city,
        currentPage: this.pagePlayer,
        pageSize: this.numItemsPlayer.value,
        queryString: this.searchPlayer,
        sortBy: this.sort_player.key,
      };
      this.$store
        .dispatch("teamplayer/filterPlayers", filters)
        .then(({ paginationLength, numFound }) => {
          this.paginationPlayerLength = paginationLength;
          this.numFoundPlayer = numFound;
        });
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
