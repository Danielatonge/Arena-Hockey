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
              v-model="searchCom"
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
              :items="sort_by"
              v-model="sort_com"
              value="0"
              solo
              flat
              item-text="value"
              item-value="key"
              prepend-icon="mdi-sort"
              hide-details="auto"
              return-object
            ></v-select>
          </v-col>
          <v-col class="my-auto" cols="6" md="4">
            <div class="body-1 grey--text">
              Найдено: {{ numFoundCom }} результатов
            </div>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="6" md="4" lg="3" xl="2">
            <v-select
              :items="display_items"
              v-model="numItemsCom"
              item-text="state"
              item-value="value"
              solo
              flat
              return-object
              hide-details="auto"
            ></v-select>
          </v-col>
        </v-row>
      </div>
      <v-row dense class="mx-n4">
        <v-col cols="12" md="6" v-for="(item, i) in com" :key="i">
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
      <div class="text-center py-10" v-if="com.length">
        <v-pagination
          color="grey"
          v-model="pageCom"
          :length="paginationComLength"
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
              @change="fetchState"
            ></v-select>
          </v-col>
          <v-col cols="9" md="8" lg="9">
            <v-text-field
              label="Поиск"
              single-line
              v-model="searchState"
              prepend-inner-icon="mdi-magnify"
              solo
              flat
              hide-details="auto"
              class="rounded-lg"
              @change="fetchState"
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
              @click="fetchState"
            >
              Найти
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex" cols="6" md="4" lg="3" xl="2">
            <v-select
              :items="sort_by"
              v-model="sort_state"
              solo
              flat
              item-text="value"
              item-value="key"
              prepend-icon="mdi-sort"
              hide-details="auto"
              return-object
              @change="fetchState"
            ></v-select>
          </v-col>
          <v-col class="my-auto" cols="6" md="4">
            <div class="body-1 grey--text">
              Найдено: {{ numFoundState }} результатов
            </div>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="6" md="4" lg="3" xl="2">
            <v-select
              :items="display_items"
              v-model="numItemsState"
              item-text="state"
              item-value="value"
              solo
              flat
              return-object
              hide-details="auto"
              @change="fetchState"
            ></v-select>
          </v-col>
        </v-row>
      </div>
      <v-row dense class="mx-n4">
        <v-col cols="12" md="6" v-for="(item, i) in state" :key="i">
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
      <div class="text-center py-10" v-if="state.length">
        <v-pagination
          color="grey"
          v-model="pageState"
          :length="paginationStateLength"
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
  watch: {
    pageState() {
      this.fetchState();
    },
    pageCom() {
      this.fetchCom();
    },
  },
  mounted() {
    this.$store.dispatch("getAllSchools");
    this.$store.dispatch("getSchoolAddress");
    this.fetchCom();
    this.fetchState();
  },
  data() {
    return {
      pageCom: 1,
      pageState: 1,
      searchCom: "",
      searchState: "",
      paginationComLength: 10,
      paginationStateLength: 10,

      state_room: false,
      com_room: true,
      page: 1,
      value: 0,
      room_tab: null,
      room_nav: [
        "Школы дополнительной подготовки",
        "Государственные спортивные школы",
      ],
      com_tags: ["Москва", "Казань"],
      sort_by_city: "Москва",
      state_tags: [""],
      numItemsCom: { state: "Показывать по 10", value: 10 },
      numItemsState: { state: "Показывать по 10", value: 10 },
      display_items: [
        { state: "Показывать по 10", value: 10 },
        { state: "Показывать по 30", value: 30 },
        { state: "Показывать по 50", value: 50 },
        { state: "Показывать по 100", value: 100 },
      ],
      sort_com: { key: 0, value: "По именни (от А до Я)" },
      sort_state: { key: 0, value: "По именни (от А до Я)" },
      sort_by: [
        { key: 0, value: "По именни (от А до Я)" },
        { key: 1, value: "По именни (от Я до А)" },
      ],
      numFoundCom: 0,
      com: [],
      numFoundState: 0,
      state: [],
    };
  },
  methods: {
    showRoom() {
      this.com_room = true;
      this.state_room = false;
    },
    isValidOutput(input) {
      return input && input !== "string" ? input : null;
    },
    isValidCityOutput(input) {
      return input && input !== "string" ? ", " + input : null;
    },
    showState() {
      this.com_room = false;
      this.state_room = true;
    },
    comClicked() {
      this.$router.push({ path: "school" });
    },
    fetchCom() {
      const city = this.sort_by_city,
        currentPage = this.pageCom,
        pageSize = this.numItemsCom.value,
        queryString = this.searchCom,
        sortBy = this.sort_com.key;
      const url =
        `/school/search?city=${city}&currentPage=${currentPage}&pageSize=${pageSize}` +
        `&queryString=${queryString}&sortBy=${sortBy}&type=COMMERCIAL`;
      console.log(url);
      axios
        .get(url)
        .then((response) => {
          const res = response.data;
          this.com = res.content;
          this.paginationComLength = res.totalPages;
          this.numFoundCom = res.totalElements;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchState() {
      const city = this.sort_by_city,
        currentPage = this.pageState,
        pageSize = this.numItemsState.value,
        queryString = this.searchState,
        sortBy = this.sort_state.key;
      const url =
        `/school/search?city=${city}&currentPage=${currentPage}&pageSize=${pageSize}` +
        `&queryString=${queryString}&sortBy=${sortBy}&type=STATE`;
      console.log(url);
      axios
        .get(url)
        .then((response) => {
          const res = response.data;
          this.state = res.content;
          this.paginationStateLength = res.totalPages;
          this.numFoundState = res.totalElements;
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
