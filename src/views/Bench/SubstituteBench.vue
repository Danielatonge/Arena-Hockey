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
          <v-btn
            @click="
              $router.push({ name: 'admin-advertisements', params: { userId } })
            "
            v-show="loggedIn"
            class="rounded-lg"
            large
            dark
            outlined
            depressed
            height="48px"
          >
            Добавить объявление
          </v-btn>
          <v-btn
          @click="$router.push({ name: 'login'})"
          v-show="!loggedIn"
          class="rounded-lg"
          large
          dark
          outlined
          depressed
          height="48px">
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
          v-for="(item, i) in _pteam"
          :key="i"
          @click="viewForum(item)"
        >
          <AdminForumCard :forum="item">  </AdminForumCard>
          <!-- <v-card elevation="0" class="pa-5 rounded-lg">
            <div class="d-flex flex-no-wrap">
              <v-card-text class="px-0 pt-0">
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
          </v-card> -->
        </v-col>
      </v-row>
      <ForumPagination
        :page="pteam.page"
        :length="pteam.paginationLength"
        :show="!!_pteam.length"
      />
    </v-container>
    <v-container class="pt-16 pb-0" v-show="value == 1">
      <div class="pb-10">
        <v-row dense>
          <v-col class="d-flex" cols="12" md="2">
            <v-select
              :items="location"
              v-model="tplayer.address"
              solo
              flat
              hide-details="auto"
              @change="fetchtplayer"
            ></v-select>
          </v-col>
          <v-col cols="9" md="4" lg="5">
            <v-text-field
              label="Поиск"
              single-line
              prepend-inner-icon="mdi-magnify"
              v-model="tplayer.search"
              solo
              flat
              hide-details="auto"
              class="rounded-lg"
              @change="fetchtplayer"
            ></v-text-field>
          </v-col>
          <v-col class="d-flex" cols="3" md="2" lg="2">
            <v-select
              :items="roles"
              v-model="tplayer.role"
              solo
              flat
              hide-details="auto"
              @change="fetchtplayer"
            ></v-select>
          </v-col>
          <v-col class="d-flex" cols="3" md="2" lg="2">
            <v-select
              :items="grips"
              v-model="tplayer.grip"
              solo
              flat
              hide-details="auto"
              @change="fetchtplayer"
            ></v-select>
          </v-col>
          <v-col cols="3" md="2" lg="1">
            <v-btn
              class="rounded-lg"
              large
              depressed
              height="48px"
              width="100%"
              color="primary"
              @click="fetchtplayer"
            >
              Найти
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex" cols="6" md="4" lg="3" xl="2">
            <v-select
              :items="sort_in"
              v-model="tplayer.sort_asc"
              solo
              flat
              item-text="value"
              item-value="key"
              return-object
              prepend-icon="mdi-sort"
              hide-details="auto"
              @change="fetchtplayer"
            ></v-select>
          </v-col>
          <v-col class="my-auto" cols="6" md="4">
            <div class="body-1 grey--text">
              Найдено: {{ tplayer.items.length }} результатов
            </div>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="6" md="4" lg="3" xl="2">
            <v-select
              :items="display_items"
              v-model="tplayer.numItems"
              @change="fetchtplayer"
              solo
              flat
              item-text="state"
              item-value="value"
              return-object
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
          v-for="(item, i) in _tplayer"
          :key="i"
          @click="viewForum(item)"
        >
          <AdminForumCard :forum="item"> </AdminForumCard>
        </v-col>
      </v-row>
      <ForumPagination
        :page="tplayer.page"
        :length="tplayer.paginationLength"
        :show="!!_tplayer.length"
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
          v-for="(item, i) in _ttrainer"
          :key="i"
          @click="viewForum(item)"
        >
          <AdminForumCard :forum="item"></AdminForumCard>
        </v-col>
      </v-row>
      <ForumPagination
        :page="ttrainer.page"
        :length="ttrainer.paginationLength"
        :show="!!_ttrainer.length"
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
          v-for="(item, i) in _tteam"
          :key="i"
          @click="viewForum(item)"
        >
          <AdminForumCard :forum="item"></AdminForumCard>
        </v-col>
      </v-row>
      <ForumPagination
        :page="tteam.page"
        :length="tteam.paginationLength"
        :show="!!_tteam.length"
      />
    </v-container>

    <v-dialog
      v-model="detailedForum"
      content-class="rounded-xl"
      max-width="600"
    >
      <v-card class="pa-5 rounded-xl" v-if="forum.title">
        <div class="d-flex flex-no-wrap">
          <v-card-text class="px-0 py-0">
            <div class="body-1 grey--text">
              {{ dateFormat(forum.date) }}
            </div>
            <div class="text-h6 mb-2">{{ forum.title }}</div>
            <!-- <div class="body-2 grey--text">Участников: 19</div> -->
          </v-card-text>
          <v-icon
            style="position: absolute; right: 30px; top: 35px"
            @click.stop="detailedForum = false"
            >mdi-close
          </v-icon>
        </div>
        <p class="bold">Навыки:</p>
        <div class="d-flex mb-2">
          <!-- <div class="body-2 blue--text">Возраст: {{ forum.age }}</div>
                  <div class="body-2 blue--text ml-16">
                    Амплуа: {{ forum.role }}
                  </div> -->
          <div
            v-if="isValid(forum.role)"
            class="body-2 blue--text"
            :class="{ 'mr-16': isValid(forum.role) }"
          >
            Амплуа: {{ forum.role }}
          </div>
          <div class="body-2 blue--text" v-if="isValid(forum.grip)">
            Хват: {{ forum.grip }}
          </div>
        </div>
        <div class="mt-6 mb-2 text-justify">
          {{ forum.description }}
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ForumFilter from "@/components/Forum/ForumFilter";
import ForumPagination from "@/components/Forum/ForumPagination";
import AdminForumCard from "@/components/Admin/Forum/AdminForumCard.vue";
import { mapState, mapGetters } from "vuex";

export default {
  name: "SubstituteBench",
  components: { ForumPagination, ForumFilter, AdminForumCard },
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
  computed: {
    ...mapState("forum", ["_pteam", "_tplayer", "_ttrainer", "_tteam"]),
    ...mapState("auth", ["userId"]),
    ...mapGetters("auth", ["loggedIn"]),
  },
  mounted() {
    // this.$store.dispatch("forum/getForums");
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
        numFound: 0,
        sort_asc: { key: 0, value: "По именни (от А до Я)" },
        address: "Москва",
        items: [],
      },
      tplayer: {
        page: 1,
        search: "",
        paginationLength: 10,
        numItems: { state: "Показывать по 10", value: 10 },
        numFound: 0,
        sort_asc: { key: 0, value: "По именни (от А до Я)" },
        address: "Москва",
        items: [],
        role: "Защитник",
        grip: "правый",
      },
      ttrainer: {
        page: 1,
        search: "",
        paginationLength: 10,
        numItems: { state: "Показывать по 10", value: 10 },
        numFound: 0,
        sort_asc: { key: 0, value: "По именни (от А до Я)" },
        address: "Москва",
        items: [],
      },
      tteam: {
        page: 1,
        search: "",
        paginationLength: 10,
        numItems: { state: "Показывать по 10", value: 10 },
        numFound: 0,
        sort_asc: { key: 0, value: "По именни (от А до Я)" },
        address: "Москва",
        items: [],
      },
      roles: ["Защитник", "Нападающий", "Вратарь"],
      grips: ["левый", "правый"],
      sort_in: [
        { key: 0, value: "По именни (от А до Я)" },
        { key: 1, value: "По именни (от Я до А)" },
      ],
      location: ["Москва"],

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
      detailedForum: false,
      forum: {},
    };
  },
  methods: {
    isValid(input) {
      if (input) return true;
      return false;
    },
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
    viewForum(forum) {
      this.forum = forum;
      this.detailedForum = true;
    },
    fetchpteam() {
      this.$store
        .dispatch("forum/filterForums", {
          filter: this.pteam,
          type: "PLAYERTEAM",
        })
        .then(({ pagination, numFound }) => {
          this.pteam.paginationLength = pagination;
          this.pteam.numFound = numFound;
          this.pteam.items = this._pteam;
        });
    },
    fetchtplayer() {
      this.$store
        .dispatch("forum/filterForums", {
          filter: this.tplayer,
          type: "TEAMPLAYER",
        })
        .then(({ pagination, numFound }) => {
          this.tplayer.paginationLength = pagination;
          this.tplayer.numFound = numFound;
          this.tplayer.items = this._tplayer;
        });
    },
    fetchttrainer() {
      this.$store
        .dispatch("forum/filterForums", {
          filter: this.ttrainer,
          type: "TEAMTRAINER",
        })
        .then(({ pagination, numFound }) => {
          this.ttrainer.paginationLength = pagination;
          this.ttrainer.numFound = numFound;
          this.ttrainer.items = this._ttrainer;
        });
    },
    fetchtteam() {
      this.$store
        .dispatch("forum/filterForums", {
          filter: this.tteam,
          type: "TRAINERTEAM",
        })
        .then(({ pagination, numFound }) => {
          this.tteam.paginationLength = pagination;
          this.tteam.numFound = numFound;
          this.tteam.items = this._tteam;
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
