<template>
  <div class="grey lighten-4">
    <v-container class="pb-10">
      <v-row class="">
        <div>
          <v-breadcrumbs :items="breadcrumb_items" class="px-3"></v-breadcrumbs>
        </div>
      </v-row>
      <div>
        <div class="text-h5 py-5">Список команд</div>
        <div class="mb-4">
          <v-btn
            @click="add_team_dialog = true"
            class="mr-2 mb-2 primary"
            elevation="0"
          >
            Добавить команду
          </v-btn>
          <v-btn class="mr-2 mb-2" color="grey lighten-2" elevation="0">
            Обратить в тех. поддержку
          </v-btn>
          <v-btn class="mr-2 mb-2" color="grey lighten-2" elevation="0">
            Вернуться к просмотру
          </v-btn>
        </div>
        <div class="pb-16">
          <v-row dense>
            <v-col class="d-flex" cols="12" md="2">
              <v-select
                :items="team_tags"
                item-text="text"
                item-value="value"
                v-model="filter_city"
                solo
                flat
                hide-details="auto"
              ></v-select>
            </v-col>
            <v-col cols="9" md="8" lg="8">
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
            <v-col cols="3" md="2" lg="2">
              <v-select
                :items="type_teams"
                value="Тип команды"
                v-model="filter_type"
                item-text="text"
                item-value="value"
                solo
                flat
                hide-details="auto"
              ></v-select>
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
              <div class="body-1 grey--text">
                Найдено: {{ filteredTeams.length }} результатов
              </div>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="6" md="4" lg="3" xl="2">
              <v-select
                :items="display_items"
                value="Показывать по 5"
                v-model="display_item"
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
          <v-col
            cols="12"
            lg="6"
            md="6"
            v-for="(team, i) in displayTeams"
            :key="i"
          >
            <v-card color="transparent" elevation="0">
              <div class="d-flex flex-no-wrap">
                <router-link to="/teamname" class="undo-link-default">
                  <v-avatar class="ma-3" size="140" tile>
                    <v-img
                      :src="
                        require('@/assets' +
                          (team.profilePicture
                            ? team.profilePicture
                            : '/team_room_1.jpg'))
                      "
                    ></v-img>
                  </v-avatar>
                </router-link>
                <v-card-text>
                  <div
                    class="body-1 blue--text mb-2"
                    style="text-decoration: none"
                  >
                    {{ team.city }}
                  </div>
                  <div class="text-h5 mb-2">{{ team.title }}</div>
                  <div class="body-1 grey--text">{{ team.type }}</div>
                  <v-row no-gutters class="align-center">
                    <v-col cols="12" md="4" lg="7">
                      <v-btn
                        @click="
                          confirm_dialog = true;
                          current_team = i;
                        "
                        class="primary"
                        elevation="0"
                      >
                        Открепить команду
                      </v-btn>
                    </v-col>
                    <v-col>
                      <v-checkbox
                        @click="hideTeam(item)"
                        label="Скрыть команду"
                        class=""
                      />
                    </v-col>
                  </v-row>
                </v-card-text>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <div class="text-center py-10">
        <div class="text-center py-10">
          <v-pagination
            color="grey"
            v-model="page"
            :length="paginationLength"
            :total-visible="7"
          ></v-pagination>
        </div>
      </div>
    </v-container>
    <div class="mb-4">
      <v-dialog v-model="add_team_dialog" max-width="600">
        <v-card :loading="adding_team" class="grey lighten-5">
          <v-card-title class="py-3">
            <v-row>
              <v-col cols="11">
                <div class="text-h5 black--text">Добавить команду</div>
              </v-col>
              <v-col>
                <div class="mb-4">
                  <v-icon @click.stop="add_team_dialog = false"
                    >mdi-close</v-icon
                  >
                </div>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-autocomplete
              v-model="selected_team"
              :items="search_items"
              :loading="is_searching"
              :search-input.sync="search_text"
              color="white"
              solo
              flat
              single-line
              hide-selected
              hide-no-data
              item-text="title"
              item-value="id"
              label="Поиск команды"
              placeholder="Поиск команды"
              prepend-inner-icon="mdi-magnify"
              return-object
              hide-details="auto"
              class="rounded-lg"
            ></v-autocomplete>
            <v-checkbox v-model="hide_team" label="Скрыть команду" class="" />
          </v-card-text>
          <v-card-actions class="mt-3">
            <v-btn
              class="body-2"
              @click="add_team_dialog = false"
              elevation="0"
            >
              Назад
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              elevation="0"
              color="primary"
              class="body-2"
              @click="addTeam"
              :disabled="adding_team"
            >
              Добавить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="confirm_dialog" max-width="600">
        <v-card class="py-3">
          <v-card-title class="">
            <v-row>
              <v-col cols="11">
                <div class="text-h5 black--text">
                  Вы действительно хотите удалить команду из состава спортивного
                  комплекса?
                </div>
              </v-col>
              <v-col>
                <div class="mb-4">
                  <v-icon @click.stop="confirm_dialog = false"
                    >mdi-close</v-icon
                  >
                </div>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-actions class="mt-3">
            <v-btn class="body-2" @click="confirm_dialog = false" elevation="0">
              Отменить
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              elevation="0"
              color="primary"
              class="body-2"
              @click="deleteTeam"
            >
              Удалить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
  computed: {
    ...mapState({ arena: "current_arena" }),
    ...mapState({ teams: "teams" }),
    displayTeams() {
      console.log("XXXXX", this.teams);
      return this.paginate(this.filteredTeams);
    },
    filteredTeams() {
      let arenas = this.arena_teams.map((item) => item.team);
      if (this.filter_type) {
        arenas = arenas.filter((x) => {
          return x.type == this.filter_type;
        });
      }
      if (this.filter_city) {
        arenas = arenas.filter((x) => {
          return x.city == this.filter_city;
        });
      }

      console.log("FIlter", this.filter_type, this.filter_city);
      return arenas;
    },
  },
  watch: {
    display_item(val) {
      this.perPage = val;
      this.paginationLength = Math.ceil(
        this.filteredTeams.length / this.perPage
      );
    },
    filteredTeams() {
      this.paginationLength = Math.ceil(
        this.filteredTeams.length / this.perPage
      );
    },
    filter_type() {
      this.paginationLength = Math.ceil(
        this.filteredTeams.length / this.perPage
      );
    },
    search_text(val) {
      // Items have already been loaded
      if (!val) return [];
      if (this.search_items.length > 0) return;

      // Items have already been requested
      //if (this.is_searching) return;

      //this.is_searching = true;
      const value = val.toLowerCase();
      this.search_items = this.teams.filter((x) => {
        return x.title ? x.title.toLowerCase().includes(value) : false;
      });
    },
  },
  mounted() {
    //const arena = this.$store.getters.current_arena;
    const arena_id = this.$route.params.id;
    this.$store.dispatch("getAllTeams");
    this.$store.dispatch("getArenaTeams", arena_id).then((data) => {
      console.log("getArenaTeams", data);
      this.arena_teams = data;
      this.setPaginationLength();
    });
  },
  data() {
    return {
      search_text: "",
      page: 1,
      perPage: 5,
      arena_teams: [],
      current_team: -1,
      paginationLength: 1,
      confirm_dialog: false,
      add_team_dialog: false,
      breadcrumb_items: [
        {
          text: "Личный кабинет",
          disabled: false,
          href: "",
        },
        {
          text: "Мои спортивные комплексы",
          disabled: false,
          href: "/admin/sport_complex",
        },
        {
          text: "Редактирование спортивного комплекса",
          disabled: true,
          href: "/admin/sport_complex/edit",
        },
        {
          text: "Список команд",
          disabled: true,
          href: "",
        },
      ],
      team_tags: [
        { value: null, text: "Город" },
        { value: "Москва", text: "Москва" },
        { value: "Казань", text: "Казань" },
      ],
      sort_by_team: ["По популярности", "По именни"],
      type_teams: [
        { value: null, text: "Тип команды" },
        { value: "Детскaя", text: "Детскaя" },
        { value: "Взрослая", text: "Взрослая" },
        { value: "Юношеская", text: "Юношеская" },
        { value: "Женская", text: "Женская" },
      ],
      filter_type: null,
      filter_city: null,
      display_item: { state: "Показывать по 5", value: 5 },
      display_items: [
        { state: "Показывать по 5", value: 5 },
        { state: "Показывать по 9", value: 9 },
        { state: "Показывать по 12", value: 12 },
        { state: "Показывать по 24", value: 24 },
      ],
      search_items: [],
      hide_team: false,
      selected_team: null,
      is_searching: false,
      adding_team: false,
    };
  },
  methods: {
    deleteTeam() {
      this.confirm_dialog = false;
      if (this.current_team != -1) {
        const arena_id = this.$route.params.id;
        const user_id = this.arena_teams[this.current_team].id;
        axios
          .delete(`/arena/${arena_id}/team/${user_id}`)
          .then((response) => {
            console.log("RESPONSE_DELETE_TEAM", response);
            this.arena_teams.splice(this.current_team, 1);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    hideTeam(id) {
      console.log("Hidde team", id);
    },
    paginate(items) {
      const cpage = this.page;
      const perPage = this.perPage;
      const from = cpage * perPage - perPage;
      const to = cpage * perPage;
      return items.slice(from, to);
    },
    setPaginationLength() {
      this.paginationLength = Math.ceil(
        this.filteredTeams.length / this.perPage
      );
    },
    addTeam() {
      this.adding_team = true;
      console.log("SELECTED", this.selected_team);
      const arena_id = this.$route.params.id;
      const data = {
        arenaId: arena_id,
        teamId: this.selected_team.id,
        visible: this.hide_team,
      };
      this.$store
        .dispatch("addTeamToArena", data)
        .then((response) => {
          console.log("RESPONSE", response);
          this.arena_teams.push({ team: this.selected_team });
          this.add_team_dialog = false;
          this.selected_team = null;
          this.search_items = [];
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.adding_team = false));
    },
  },
};
</script>

<style>
</style>