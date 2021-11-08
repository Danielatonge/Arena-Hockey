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
        <v-btn
          large
          class="mr-2 mb-2"
          color="grey lighten-2"
          elevation="0"
          @click="
            $router.push({ name: 'complex-information', params: { arenaId } })
          "
        >
          Вернуться к просмотру
        </v-btn>
      </div>
      <div class="pb-8">
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
              Найдено: {{ atrainersList.length }} результатов
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
        <v-col cols="12" v-for="(item, i) in atrainers" :key="i">
          <AdminTrainerCard :arenaUser="item" @trainer-remove="removeTeam">
            Открепить Тренер
          </AdminTrainerCard>
        </v-col>
      </v-row>
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
              :items="tptrainersList"
              :loading="is_searching"
              :search-input.sync="search_text"
              color="white"
              solo
              flat
              single-line
              hide-selected
              hide-no-data
              item-text="fullName"
              item-value="id"
              label="Поиск тренера"
              placeholder="Поиск тренера"
              prepend-inner-icon="mdi-magnify"
              return-object
              hide-details="auto"
              class="rounded-lg"
            ></v-autocomplete>
            <v-checkbox
              v-model="hide_trainer"
              label="Скрыть тренера"
              class=""
            />
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
import AdminTrainerCard from "@/components/Admin/Trainer/AdminTrainerCard";

export default {
  components: { AdminTrainerCard },
  props: {
    arena: {
      type: Object,
      required: true,
    },
    arenaId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  created() {
    this.$store.dispatch("arena/getTrainers", this.arenaId);
    this.$store.dispatch("teamplayer/getPlayers");
  },
  computed: {
    ...mapState("teamplayer", {
      tptrainers: "players",
    }),
    ...mapState("arena", {
      atrainers: "trainers",
    }),
    atrainersList() {
      return this.atrainers.map((x) => {
        const user = x.user;
        return {
          ...user,
          fullName: `${user.name} ${user.middleName} ${user.surname}`,
        };
      });
    },
    tptrainersList() {
      return this.tptrainers.map((x) => {
        const user = x;
        return {
          ...user,
          fullName: `${user.name} ${user.middleName} ${user.surname}`,
        };
      });
    },
  },
  watch: {},
  methods: {
    filteredTrainers(trainers) {
      return trainers.map((item) => item.user);
    },
    filteredUsers(trainers) {
      return trainers.map((x) => ({
        ...x.user,
        fullName: `${x.user.name} ${x.user.middleName} ${x.user.surname}`,
      }));
    },
    deleteTrainer() {
      const arenaId = this.arenaId;
      this.$store
        .dispatch("arena/deleteTrainer", {
          arenaId,
          trainerId: this.userId,
        })
        .then(() => {
          this.confirm_dialog = false;
        });
    },
    removeTeam(id) {
      this.confirm_dialog = true;
      this.userId = id;
    },
    addTrainer() {
      this.adding = true;
      console.log("SELECTED", this.selected_user);
      const data = {
        arenaId: this.arenaId,
        userId: this.selected_user.id,
        visibility: this.hide_trainer ? 0 : 1,
      };
      console.log(data);
      this.$store
        .dispatch("arena/createArenaUser", {
          data,
          user: this.selected_user,
        })
        .then(() => {
          this.add_trainer_dialog = false;
          this.selected_user = null;
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
      team_tags: ["Москва", "Казань"],
      sort_by_team: ["По популярности", "По именни"],
      type_team: ["возрасту", "город"],
      display_items: ["Показывать по 12", "Показывать по 25"],
      hide_trainer: false,
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
