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
      <ForumFilter
        :forum="pteam"
        :location="location"
        :sort="sort_in"
        :display-amount="display_items"
        :fetch-forum="fetchpteam"
      />
      <v-row dense class="mx-n4">
        <v-col
          class="pa-4"
          cols="12"
          md="6"
          v-for="(item, i) in pteam.items"
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
      <ForumPagination
        :page="pteam.page"
        :length="pteam.paginationLength"
        :show="!!pteam.items.length"
      />
    </v-container>
    <v-container class="pt-16 pb-0" v-show="value == 1">
      <ForumFilter
        :forum="tplayer"
        :location="location"
        :sort="sort_in"
        :display-amount="display_items"
        :fetch-forum="fetchtplayer"
      />
      <v-row dense class="mx-n4">
        <v-col
          class="pa-4"
          cols="12"
          md="6"
          v-for="(item, i) in tplayer.items"
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
      <ForumPagination
        :page="tplayer.page"
        :length="tplayer.paginationLength"
        :show="!!tplayer.items.length"
      />
    </v-container>
    <v-container class="pt-16 pb-0" v-show="value == 2">
      <ForumFilter
        :forum="ttrainer"
        :location="location"
        :sort="sort_in"
        :display-amount="display_items"
        :fetch-forum="fetchttrainer"
      />
      <v-row dense class="mx-n4">
        <v-col
          class="pa-4"
          cols="12"
          md="6"
          v-for="(item, i) in ttrainer.items"
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
      <ForumPagination
        :page="ttrainer.page"
        :length="ttrainer.paginationLength"
        :show="!!ttrainer.items.length"
      />
    </v-container>
    <v-container class="pt-16 pb-0" v-show="value == 3">
      <ForumFilter
        :forum="tteam"
        :location="location"
        :sort="sort_in"
        :display-amount="display_items"
        :fetch-forum="fetchtteam"
      />
      <v-row dense class="mx-n4">
        <v-col
          class="pa-4"
          cols="12"
          md="6"
          v-for="(item, i) in ttrainer.items"
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
      <ForumPagination
        :page="tteam.page"
        :length="tteam.paginationLength"
        :show="!!tteam.items.length"
      />
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import ForumFilter from "@/components/Forum/ForumFilter";
import ForumPagination from "../../components/Forum/ForumPagination";

export default {
  name: "SubstituteBench",
  components: { ForumPagination, ForumFilter },
  watch: {
    "pteam.page": () => {
      this.fetchpteam();
    },
    "tplayer.page": () => {
      this.fetchtplayer();
    },
    "ttrainer.page": () => {
      this.fetchttrainer();
    },
    "tteam.page": () => {
      this.fetchtteam();
    },
  },
  created() {
    this.$store.dispatch("getForums");
    this.fetchpteam();
    this.fetchtplayer();
    this.fetchttrainer();
    this.fetchtteam();
  },
  data() {
    return {
      value: 0,
      bench_tab: null,
      pteam: {
        page: 1,
        search: "",
        paginationLength: 10,
        numItems: { state: "Показывать по 10", value: 10 },
        sort_asc: { key: 0, value: "По именни (от А до Я)" },
        address: "Россия",
        items: [],
      },
      tplayer: {
        page: 1,
        search: "",
        paginationLength: 10,
        numItems: { state: "Показывать по 10", value: 10 },
        sort_asc: { key: 0, value: "По именни (от А до Я)" },
        address: "Россия",
        items: [],
      },
      ttrainer: {
        page: 1,
        search: "",
        paginationLength: 10,
        numItems: { state: "Показывать по 10", value: 10 },
        sort_asc: { key: 0, value: "По именни (от А до Я)" },
        address: "Россия",
        items: [],
      },
      tteam: {
        page: 1,
        search: "",
        paginationLength: 10,
        numItems: { state: "Показывать по 10", value: 10 },
        sort_asc: { key: 0, value: "По именни (от А до Я)" },
        address: "Россия",
        items: [],
      },
      sort_in: [
        { key: 0, value: "По именни (от А до Я)" },
        { key: 1, value: "По именни (от Я до А)" },
      ],
      location: ["Россия"],

      bench_nav: [
        "Игроки ищут команду",
        "Команда ищет игроков",
        "Команда ищет тренера",
        "Тренер ищет команду",
      ],
      display_items: [
        { state: "Показывать по 10", value: 10 },
        { state: "Показывать по 30", value: 30 },
        { state: "Показывать по 50", value: 50 },
        { state: "Показывать по 100", value: 100 },
      ],
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
    fetchpteam() {
      const { page, search, numItems, sort_asc, address } = this.pteam;
      const url =
        `/forum/search?city=${address}&currentPage=${page}&pageSize=${numItems.value}` +
        `&queryString=${search}&sortBy=${sort_asc.key}&type=PLAYERTEAM`;
      console.log(url);
      axios
        .get(url)
        .then((response) => {
          console.log(response.data);
          const res = response.data;
          this.pteam.items = res.content;
          this.pteam.paginationLength = res.totalPages;
          this.pteam.numItems = res.totalElements;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchtplayer() {
      const { page, search, numItems, sort_asc, address } = this.tplayer;
      const url =
        `/forum/search?city=${address}&currentPage=${page}&pageSize=${numItems.value}` +
        `&queryString=${search}&sortBy=${sort_asc.key}&type=TEAMPLAYER`;
      console.log(url);
      axios
        .get(url)
        .then((response) => {
          console.log(response.data);
          const res = response.data;
          this.tplayer.items = res.content;
          this.tplayer.paginationLength = res.totalPages;
          this.tplayer.numItems = res.totalElements;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchttrainer() {
      const { page, search, numItems, sort_asc, address } = this.ttrainer;
      const url =
        `/forum/search?city=${address}&currentPage=${page}&pageSize=${numItems.value}` +
        `&queryString=${search}&sortBy=${sort_asc.key}&type=TEAMTRAINER`;
      console.log(url);
      axios
        .get(url)
        .then((response) => {
          console.log(response.data);
          const res = response.data;
          this.ttrainer.items = res.content;
          this.ttrainer.paginationLength = res.totalPages;
          this.ttrainer.numItems = res.totalElements;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchtteam() {
      const { page, search, numItems, sort_asc, address } = this.tteam;
      const url =
        `/forum/search?city=${address}&currentPage=${page}&pageSize=${numItems.value}` +
        `&queryString=${search}&sortBy=${sort_asc.key}&type=TRAINERTEAM`;
      console.log(url);
      axios
        .get(url)
        .then((response) => {
          console.log(response.data);
          const res = response.data;
          this.tteam.items = res.content;
          this.tteam.paginationLength = res.totalPages;
          this.tteam.numItems = res.totalElements;
        })
        .catch((err) => {
          console.log(err);
        });
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
