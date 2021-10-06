<template>
  <div>
    <div>
      <div class="text-h4 pb-5">Тренерский состав</div>
      <div class="mb-4">
        <v-btn
          large
          @click="add_trainer_dialog = true"
          class="mr-2 mb-2 primary"
          elevation="0"
        >
          ДОБАВИТЬ ТРЕНЕРА
        </v-btn>
        <v-btn large class="mr-2 mb-2" color="grey lighten-2" elevation="0">
          Обратить в тех. поддержку
        </v-btn>
        <v-btn large class="mr-2 mb-2" color="grey lighten-2" elevation="0">
          Вернуться к просмотру
        </v-btn>
      </div>
      <div class="pb-16">
        <v-row dense>
          <v-col class="d-flex" cols="3" md="2">
            <v-select
              :items="team_tags"
              value="Москва"
              solo
              flat
              hide-details="auto"
            ></v-select>
          </v-col>
          <v-col cols="9" md="6" lg="8">
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
            <v-text-field
              label="от"
              single-line
              solo
              flat
              hide-details="auto"
              class="rounded-lg"
            ></v-text-field>
          </v-col>
          <v-col cols="3" md="2" lg="1">
            <v-text-field
              label="до"
              single-line
              solo
              flat
              hide-details="auto"
              class="rounded-lg"
            ></v-text-field>
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
              Найдено: {{ displayTrainers.length }} результатов
            </div>
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
        <v-col cols="12" lg="6" v-for="(item, i) in displayTrainers" :key="i">
          <v-card color="transparent" elevation="0">
            <div class="d-flex flex-no-wrap">
              <v-avatar class="ma-3" size="128" tile>
                <v-img
                  :src="
                    require('@/assets' +
                      (item.level ? item.level : '/player_2.jpg'))
                  "
                ></v-img>
              </v-avatar>
              <v-card-text>
                <div class="text-h5 mb-2">
                  {{ item.name + " " + item.middleName + " " + item.surname }}
                </div>
                <div class="body-1 blue--text mb-1">
                  {{ item.age }}, {{ item.city }}
                </div>
                <div class="body-2 grey--text">Уровень: профессионал</div>
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
      <v-pagination
        color="grey"
        v-model="page"
        :length="paginationLength"
        :total-visible="7"
      ></v-pagination>
    </div>

    <div class="mb-4">
      <v-dialog v-model="add_trainer_dialog" max-width="600">
        <v-card :loading="adding" class="grey lighten-5">
          <v-card-title class="py-3">
            <v-row>
              <v-col cols="11">
                <div class="text-h5 black--text">Добавить тренера</div>
              </v-col>
              <v-col>
                <div class="mb-4">
                  <v-icon @click.stop="add_trainer_dialog = false"
                    >mdi-close</v-icon
                  >
                </div>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-autocomplete
              v-model="selected_user"
              :items="search_items"
              :loading="is_searching"
              :search-input.sync="search_text"
              color="white"
              solo
              flat
              single-line
              hide-selected
              hide-no-data
              item-text="fullname"
              item-value="id"
              label="Поиск тренера"
              placeholder="Поиск тренера"
              prepend-inner-icon="mdi-magnify"
              return-object
              hide-details="auto"
              class="rounded-lg"
            ></v-autocomplete>
            <v-checkbox label="Скрыть тренера" class="" />
          </v-card-text>
          <v-card-actions class="mt-3">
            <v-btn
              class="body-2"
              @click="add_trainer_dialog = false"
              elevation="0"
            >
              Назад
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              elevation="0"
              color="primary"
              class="body-2"
              @click="addTrainer"
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
                  Вы действительно хотите удалить тренера из состава спортивного
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
              @click="deleteTrainer"
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
  mounted() {
    const arena_id = this.$route.params.id;

    this.$store.dispatch("getArenaTrainer", arena_id).then((data) => {
      console.log("getArenaTrainer", data);
      this.arena_trainers = data;
    });
    this.$store.dispatch("getAllTrainers");
    this.breadcrumb_items = [
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
        text: this.arena.title,
        disabled: false,
        href: "/admin/sport_complex/edit",
      },
      {
        text: "Список команд",
        disabled: true,
        href: "",
      },
    ];
  },
  computed: {
    ...mapState({ trainers: "trainers" }),
    displayTrainers() {
      console.log("XXXX", this.trainers);
      return this.paginate(this.filteredTrainers);
    },
    filteredTrainers() {
      return this.arena_trainers.map((item) => item.user);
    },
    filteredUsers() {
      return this.trainers.map((x) => ({
        ...x,
        fullname: x.name + " " + x.middleName + " " + x.surname,
      }));
    },
  },
  watch: {
    display_x(val) {
      this.perPage = val;
      this.paginationLength = Math.ceil(
        this.filteredTrainers.length / this.perPage
      );
    },
    filteredTrainers() {
      this.paginationLength = Math.ceil(
        this.filteredTrainers.length / this.perPage
      );
    },
    filter_type() {
      this.paginationLength = Math.ceil(
        this.filteredTrainers.length / this.perPage
      );
    },
    search_text(val) {
      // Items have already been loaded
      //if (this.search_items.length > 0) return;
      if (!val) return this.filteredUsers;

      // Items have already been requested
      //if (this.is_searching) return;

      //this.is_searching = true;
      const value = val.toLowerCase();
      console.log(this.filteredUsers);
      this.search_items = this.filteredUsers.filter((x) => {
        return x.fullname ? x.fullname.toLowerCase().includes(value) : false;
      });
    },
  },
  methods: {
    deleteTrainer() {
      this.confirm_dialog = false;
      if (this.current_team != -1) {
        const arena_id = this.$route.params.id;
        const user_id = this.arena_trainers[this.current_team].id;
        axios
          .delete(`/arena/${arena_id}/user/${user_id}`)
          .then((response) => {
            console.log("RESPONSE_DELETE_TEAM", response);
            this.arena_trainers.splice(this.current_team, 1);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    setPaginationLength() {
      this.paginationLength = Math.ceil(
        this.filteredTrainers.length / this.perPage
      );
    },
    hideStaff(id) {
      console.log("Hidde team", id);
    },
    paginate(items) {
      const cpage = this.page;
      const perPage = this.perPage;
      const from = cpage * perPage - perPage;
      const to = cpage * perPage;
      return items.slice(from, to);
    },
    addTrainer() {
      this.adding = true;
      console.log("SELECTED", this.selected_user);
      const arena_id = this.$route.params.id;
      const data = {
        arenaId: arena_id,
        userId: this.selected_user.id,
        visible: this.hide_team,
      };
      axios
        .post("/arena/user", data)
        .then((response) => {
          console.log("RESPONSE", response);
          this.arena_trainers.push({ user: this.selected_user });
          this.add_trainer_dialog = false;
          this.selected_user = null;
          this.search_items = [];
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.adding = false));
    },
  },
  data() {
    return {
      page: 1,
      perPage: 5,
      paginationLength: 0,
      current_team: -1,
      arena_trainers: [],
      confirm_dialog: false,
      add_trainer_dialog: false,
      breadcrumb_items: [],
      player_items: [
        "/player_1",
        "/player_2",
        "/player_3",
        "/player_4",
        "/player_5",
        "/player_6",
      ],
      team_tags: ["Москва", "Казань"],
      sort_by_team: ["По популярности", "По именни"],
      type_team: ["возрасту", "город"],
      display_items: ["Показывать по 12", "Показывать по 25"],
      search_items: [],
      hide_team: false,
      selected_user: null,
      is_searching: false,
      adding_player: false,
      search_text: "",
      adding: false,
    };
  },
};
</script>

<style></style>
