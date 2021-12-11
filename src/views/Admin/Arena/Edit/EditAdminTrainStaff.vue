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
        <!-- <v-btn large class="mr-2 mb-2" color="grey lighten-2" elevation="0">
          Обратить в тех. поддержку
        </v-btn> -->
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
              :items="cities"
              item-text="text"
              item-value="value"
              v-model="filter_city"
              solo
              flat
              hide-details="auto"
              @change="fetchTrainer"
            ></v-select>
          </v-col>
          <v-col cols="9" md="6" lg="8">
            <v-text-field
              label="Поиск по названию тренера"
              single-line
              prepend-inner-icon="mdi-magnify"
              solo
              flat
              hide-details="auto"
              class="rounded-lg"
              v-model="search"
              @keyup.enter="fetchTrainer"
            ></v-text-field>
          </v-col>
          <v-col cols="6" md="4" lg="2">
            <v-btn
              class="rounded-lg"
              large
              depressed
              height="48px"
              width="100%"
              color="primary"
              @click="fetchTrainer"
            >
              Найти
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex" cols="6" md="4" lg="3" xl="2">
            <v-select
              :items="sort_order"
              v-model="sort_model"
              item-text="value"
              item-value="key"
              return-object
              solo
              flat
              prepend-icon="mdi-sort"
              hide-details="auto"
              @change="fetchTrainer"
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
              value="Показывать по 5"
              v-model="display_item"
              item-text="state"
              item-value="value"
              return-object
              solo
              flat
              hide-details="auto"
              @change="fetchTrainer"
            ></v-select>
          </v-col>
        </v-row>
      </div>
      <v-row dense class="mx-n4">
        <v-col cols="12" v-for="(item, i) in atrainers" :key="i">
          <AdminTrainerCard :arenaUser="item" @trainer-remove="removeTeam">
            <template #hide="{ checked, toggle }">
              <v-checkbox
                :value="checked"
                @click.stop="toggle"
                label="Скрыть Тренера"
              />
            </template>
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
    // this.$store.dispatch("arena/getTrainers", this.arenaId);
    this.$store.dispatch("teamplayer/getTrainers");
    this.fetchTrainer();
  },
  computed: {
    ...mapState("teamplayer", {
      tptrainers: "trainers",
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
  methods: {
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
    fetchTrainer() {
      const filters = {
        arenaId: this.arenaId,
        city: this.filter_city,
        currentPage: this.page,
        pageSize: this.display_item.value,
        queryString: this.search,
        sortBy: this.sort_model.key,
      };
      this.$store.dispatch("arena/filterTrainers", filters).then(() => {
        // this.paginationLength = paginationLength;
        // this.numFound = numFound;
      });
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
      filter_city: "Москва",
      search: "",
      display_item: { state: "Показывать по 5", value: 5 },
      cities: ["Москва", "Казань"],
      sort_model: { key: 1, value: "По именни (от А до Я)" },
      sort_order: [
        { key: 1, value: "По именни (от А до Я)" },
        { key: 0, value: "По именни (от Я до А)" },
      ],
      display_items: [
        { state: "Показывать по 5", value: 5 },
        { state: "Показывать по 9", value: 9 },
        { state: "Показывать по 12", value: 12 },
        { state: "Показывать по 24", value: 24 },
      ],
      type_team: ["возрасту", "город"],
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
