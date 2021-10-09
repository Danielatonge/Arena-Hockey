<template>
  <v-card color="transparent" elevation="0">
    <div class="d-flex flex-no-wrap">
      <v-avatar class="ma-3" size="150" tile>
        <v-img
          :src="
            team.profilePicture
              ? team.profilePicture
              : require('@/assets/team_room_1.jpg')
          "
          contain
        ></v-img>
      </v-avatar>

      <v-card-text>
        <div class="body-1 blue--text mb-2" style="text-decoration: none">
          {{ team.city }}
        </div>
        <div class="text-h5 mb-2">{{ team.title }}</div>
        <div class="body-1 grey--text">{{ team.type }}</div>
        <v-row no-gutters class="align-center">
          <v-col cols="12" md="4" lg="7">
            <v-btn @click="removeTeam(team.id)" class="primary" elevation="0">
              Открепить команду
            </v-btn>
          </v-col>
          <v-col>
            <v-checkbox
              v-model="checked"
              @click="toggleVisibility"
              label="Скрыть команду"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </div>
  </v-card>
</template>

<script>
// import axios from "axios";

export default {
  name: "AdminTeamCard",
  props: {
    team: {
      type: Object,
      required: true,
    },
    arenaId: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.checked = this.team.isVisible;
  },
  data() {
    return {
      checked: false,
    };
  },
  methods: {
    toggleVisibility() {},
    removeTeam(id) {
      this.$emit("team-remove", id);
    },
  },
};
</script>

<style scoped></style>
