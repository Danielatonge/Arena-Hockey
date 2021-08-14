<template>
  <div class="grey lighten-4">
    <v-container class="pb-10">
      <v-row class="">
        <div>
          <v-breadcrumbs :items="breadcrumb_items" class="px-3"></v-breadcrumbs>
        </div>
      </v-row>
      <div>
        <div class="text-h5 py-5">Тренерский состав</div>
        <div class="mb-4">
          <v-btn
            @click="add_trainer_dialog = true"
            class="mr-2 mb-2 primary"
            elevation="0"
          >
            ДОБАВИТЬ ТРЕНЕРА
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
          <v-col cols="12" lg="6" v-for="(item, i) in player_items" :key="i">
            <v-card color="transparent" elevation="0">
              <div class="d-flex flex-no-wrap">
                <v-avatar class="ma-3" size="128" tile>
                  <v-img :src="require('@/assets' + item + '.jpg')"></v-img>
                </v-avatar>
                <v-card-text>
                  <div class="text-h5 mb-2">Фамилия Имя Отчество</div>
                  <div class="body-1 blue--text mb-1">Возраст, город</div>
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
    </v-container>
    <div class="mb-4">
      <v-dialog v-model="add_trainer_dialog" max-width="600">
        <v-card class="py-3 grey lighten-5">
          <v-card-title class="">
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
            <v-text-field
              label="Поиск тренера"
              single-line
              prepend-inner-icon="mdi-magnify"
              solo
              flat
              hide-details="auto"
              class="rounded-lg"
            ></v-text-field>
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
              @click="deleteTrainer"
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
export default {
  mounted() {
    const arena_id = this.$route.params.id;
    const arena = this.$store.getters.current_arena;
    this.arena = arena;
    this.arena_trainers = arena.trianers || [];
    this.$store.dispatch("getArenaTrainer", arena_id).then((data) => {
      console.log("getArenaTrainer", data);
      this.arena_trainers = data;
      this.setPaginationLength();
    });
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
        text: arena.title,
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
    displayTrainers() {
      return this.paginate(this.filteredTrainers);
    },
    filteredTrainers() {
      return this.arena_trainers;
    },
  },
  watch: {
    display_item(val) {
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
  },
  methods: {
    deleteTrainer() {
      this.confirm_dialog = false;
      if (this.current_team != -1) {
        this.arena_trainers.splice(this.current_team, 1);
        console.log("DELETE TEAM");
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
    };
  },
};
</script>

<style>
</style>