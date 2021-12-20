<template>
  <div>
    <div class="text-h6">Игроки</div>
    <v-row>
      <v-col cols="6" class="" v-show="players.length">
        <div class="mt-4 my-auto" v-for="(item, i) in players" :key="i">
          <span class="mr-4 ">{{ item.user.surname }} {{ item.user.name }} {{ item.user.middleName }}</span>
          <v-icon class="" @click="removePlayer(item.user.id)">
            mdi-close
          </v-icon>
        </div>
      </v-col>
    </v-row>
    <v-dialog v-model="players_dialog" max-width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mr-2 mt-6"
          color="primary"
          large
          elevation="0"
          v-bind="attrs"
          v-on="on"
        >
          Добавить игрока
        </v-btn>
      </template>

      <v-card :loading="adding" class="py-3">
        <v-card-title class="justify-space-between">
          <div class="text-h5 black--text">Добавить игрока</div>
          <div class="mb-4">
            <v-icon @click.stop="players_dialog = false">mdi-close </v-icon>
          </div>
        </v-card-title>
        <v-card-text class="mb-4">
            <v-col cols="12" class="text-h6 mb-n4">Игроки</v-col>
            <v-autocomplete
              v-model="selected_user"
              :items="teamplayersList"
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
              label="Поиск игрока"
              placeholder="Поиск игрока"
              prepend-inner-icon="mdi-magnify"
              return-object
              clearable
              hide-details="auto"
              class="rounded-lg"
            ></v-autocomplete>
        </v-card-text>
        <v-card-actions class="mt-3">
            <v-btn
              class="body-2"
              @click="players_dialog = false"
              elevation="0"
            >
              Назад
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              elevation="0"
              color="primary"
              class="body-2"
              @click="addPlayer"
            >
              Добавить
            </v-btn>
          </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Axios from "axios";
import { CREATE_TEAM_USER, GET_TEAM } from "@/api";

export default {
  props: {
    teamId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selected_user: null,
      search_text: "",
      is_searching: false,
      players_dialog: false,
      adding: false,
      players: [],      
    };
  },
  created(){
    this.$store.dispatch("teamplayer/getTeamPlayers");
    this.getAllTeamPlayers()
  },
  computed: {
    ...mapState("teamplayer", { teamplayers: "players", }),
    teamplayersList() {
      return this.teamplayers.map((x) => {
        const user = x;
        return {
          ...user,
          fullName: `${user.name} ${user.middleName} ${user.surname}`,
        };
      });
    },
  },
  methods: {
    async getAllTeamPlayers() {
      await Axios.get(`${GET_TEAM}${this.teamId}/users?role=PLAYER`)
      .then( (res) => {
        this.players = res.data
      })
      .catch((error) => {
        console.error(error);
      })
    },
    async addPlayer() {
        this.adding = true
        const data = {
          teamId: this.teamId,
          userId: this.selected_user.id,
          visibility: 1,
        };
        await Axios.post(`${CREATE_TEAM_USER}`, data)
        .then( () => {
          this.players_dialog = false;
          this.selected_user = null;
          this.getAllTeamPlayers()
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
            this.adding = false
        })
    },
    async removePlayer(id) {
      console.log(id)
        await Axios.delete(`${GET_TEAM}${this.teamId}/user/${id}`)
        .then( () => {
          this.getAllTeamPlayers()
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
            this.adding = false
        })
    },
  },
};
</script>

<style lang="scss" scoped></style>
