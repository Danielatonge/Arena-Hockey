<template>
  <div class="grey lighten-4" id="school">
    <div class="banner-room">
      <v-container class="pt-16 pb-16 white--text">
        <div class="text-h4">Спортивные школы</div>
        <v-row class="mt-2">
          <v-col cols="12">
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
              :items="school_location"
              v-model="sort_by_city"
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
              v-model="searchSchoolOne"
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
              :items="sort_by_school"
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
              Найдено: {{ numFoundSchoolOne }} результатов
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
        <v-col cols="12" md="6" v-for="(item, i) in schoolOne" :key="i">
          <router-link :to="`/school/${item.id}`" class="undo-link-default">
            <v-card color="transparent" elevation="0">
              <div class="d-flex flex-no-wrap">
                <v-avatar class="ma-3 rounded-lg" size="180" tile>
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
                  <div class="body-1 grey--text">
                    {{ item.address }}
                  </div>
                  <!--                  <div class="">-->
                  <!--                    <v-btn-->
                  <!--                      large-->
                  <!--                      color="grey lighten-2"-->
                  <!--                      elevation="0"-->
                  <!--                      class="rounded-lg position-more"-->
                  <!--                    >-->
                  <!--                      Подробнее-->
                  <!--                    </v-btn>-->
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
              :items="school_location"
              v-model="sort_by_city"
              solo
              flat
              hide-details="auto"
            ></v-select>
          </v-col>
          <v-col cols="9" md="8" lg="9">
            <v-text-field
              label="Поиск"
              single-line
              v-model="searchSchoolTwo"
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
              :items="sort_by_school"
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
              Найдено: {{ numFoundSchoolTwo }} результатов
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
        <v-col cols="12" md="6" v-for="(item, i) in schoolTwo" :key="i">
          <router-link :to="`/school/${item.id}`" class="undo-link-default">
            <v-card color="transparent" elevation="0">
              <div class="d-flex flex-no-wrap">
                <v-avatar class="ma-3 rounded-lg" size="180" tile>
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
                  <div class="body-1 grey--text">
                    {{ item.address }}
                  </div>
                  <!--                  <div class="">-->
                  <!--                    <v-btn-->
                  <!--                      large-->
                  <!--                      color="grey lighten-2"-->
                  <!--                      elevation="0"-->
                  <!--                      class="rounded-lg position-more"-->
                  <!--                    >-->
                  <!--                      Подробнее-->
                  <!--                    </v-btn>-->
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
import axios from "axios";

export default {
  name: "SportSchools",
  computed: {
    ...mapState(["school_location"]),
  },
  filters: {
    descriptionLength(value) {
      if (value.length < 30) return value;
      return value.slice(0, 30) + "...";
    },
  },
  watch: {},
  mounted() {
    this.$store.dispatch("getAllSchools");
    this.$store.dispatch("getSchoolAddress");
  },
  data() {
    return {
      pageTeam: 1,
      pagePlayer: 1,
      searchSchoolOne: "",
      searchSchoolTwo: "",
      paginationTeamLength: 10,
      paginationPlayerLength: 10,

      player_room: false,
      team_room: true,
      page: 1,
      value: 0,
      room_tab: null,
      room_nav: [
        "Школы дополнительной подготовки",
        "Государственные спортивные школы",
      ],
      team_items: ["/team_room_1"],
      player_items: ["/player_1"],
      team_tags: ["Москва", "Казань"],
      sort_by_city: "Москва",
      player_tags: [""],
      numItemsTeam: { state: "Показывать по 10", value: 10 },
      numItemsPlayer: { state: "Показывать по 10", value: 10 },
      display_items: [
        { state: "Показывать по 10", value: 10 },
        { state: "Показывать по 30", value: 30 },
        { state: "Показывать по 50", value: 50 },
        { state: "Показывать по 100", value: 100 },
      ],
      sort_model: { key: 0, value: "По популярности" },
      sort_by_school: [
        { key: 0, value: "По популярности" },
        { key: 1, value: "По именни" },
      ],
      numFoundSchoolOne: 0,
      schoolOne: [],
      numFoundSchoolTwo: 0,
      schoolTwo: [],
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
    isValidCityOutput(input) {
      return input && input !== "string" ? ", " + input : null;
    },
    showPlayer() {
      this.team_room = false;
      this.player_room = true;
    },
    teamClicked() {
      this.$router.push({ path: "school" });
    },
    fetchCommercial() {
      const city = this.sort_by_city,
        currentPage = this.pageTeam,
        pageSize = this.numItemsTeam.value,
        queryString = this.searchTeam,
        sortBy = this.sort_model.key;
      const url =
        `/team/search?city=${city}&currentPage=${currentPage}&pageSize=${pageSize}` +
        `&queryString=${queryString}&sortBy=${sortBy}`;
      console.log(url);
      axios
        .get(url)
        .then((response) => {
          const res = response.data;
          this.teams = res.content;
          this.paginationTeamLength = res.totalPages;
          this.numFoundTeam = res.totalElements;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchGov() {
      const city = this.sort_by_city,
        currentPage = this.pagePlayer,
        pageSize = this.numItemsPlayer.value,
        queryString = this.searchPlayer,
        sortBy = this.sort_player;
      const url =
        `/user/search?city=${city}&currentPage=${currentPage}&pageSize=${pageSize}` +
        `&queryString=${queryString}&sortBy=${sortBy}`;
      console.log(url);
      axios
        .get(url)
        .then((response) => {
          const res = response.data;
          this.players = res.content;
          this.paginationPlayerLength = res.totalPages;
          this.numFoundPlayer = res.totalElements;
        })
        .catch((err) => {
          console.log(err);
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

#school .v-tabs:not(.v-tabs--vertical) .v-tab {
  white-space: unset;
}

#school .position-more {
  position: absolute;
  bottom: 14px;
}
</style>
