<template>
  <div>
    <div class="text-h6">Администраторы команд</div>
    <v-row>
      <v-col cols="6" class="" v-show="admins.length">
        <div class="mt-4 my-auto" v-for="(item, i) in admins" :key="i">
          <span class="mr-4 ">{{ item.user.surname }} {{ item.user.name }} {{ item.user.middleName }}</span>
          <v-icon class="" @click="removeTrainer(item.user.id)">
            mdi-close
          </v-icon>
        </div>
      </v-col>
    </v-row>
    <v-dialog v-model="admins_dialog" max-width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mr-2 mt-4"
          color="primary"
          large
          elevation="0"
          v-bind="attrs"
          v-on="on"
        >
          Добавить администратора
        </v-btn>
      </template>

      <v-card :loading="adding" class="py-3">
        <v-card-title class="justify-space-between">
          <div class="text-h5 black--text">Добавить администратора</div>
          <div class="mb-4">
            <v-icon @click.stop="admins_dialog = false">mdi-close </v-icon>
          </div>
        </v-card-title>
        <v-card-text class="mb-4">
            <v-col cols="12" class="text-h6 mb-n4">Администраторы команд</v-col>
            <v-autocomplete
              v-model="selected_user"
              :items="teamadminsList"
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
              @click="admins_dialog = false"
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
      admins_dialog: false,
      adding: false,
      admins: [],      
    };
  },
  created(){
    this.$store.dispatch("teamplayer/getTeamAdmins");
    this.getAllTeamAdministrator()
  },
  computed: {
    ...mapState("teamplayer", { teamadmins: "admins", }),
    teamadminsList() {
      return this.teamadmins.map((x) => {
        const user = x;
        return {
          ...user,
          fullName: `${user.name} ${user.middleName} ${user.surname}`,
        };
      });
    },
  },
  methods: {
    async getAllTeamAdministrator() {
      await Axios.get(`${GET_TEAM}${this.teamId}/users?role=TEAM_ADMIN`)
      .then( (res) => {
        this.admins = res.data
      })
      .catch((error) => {
        console.error(error);
      })
    },
    async addTrainer() {
      this.adding = true
      const data = {
        teamId: this.teamId,
        userId: this.selected_user.id,
        visibility: 1,
      };
      await Axios.post(`${CREATE_TEAM_USER}`, data)
      .then( (res) => {
        console.log(res.data)
        this.admins_dialog = false;
        this.selected_user = null;
        this.getAllTeamAdministrator()
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.adding = false
      })
    },
    async removeTrainer(id) {
      await Axios.delete(`${GET_TEAM}${this.teamId}/user/${id}`)
      .then( () => {
        this.getAllTeamTrainer()
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
