<template>
  <v-card color="transparent" elevation="0">
    <div class="d-flex flex-no-wrap">
      <v-avatar class="ma-3" size="150" tile>
        <v-img
          :src="
            arenaTeam.team.profilePicture
              ? arenaTeam.team.profilePicture
              : require('@/assets/team_room_1.jpg')
          "
          contain
        ></v-img>
      </v-avatar>

      <v-card-text>
        <div class="body-1 blue--text mb-2" style="text-decoration: none">
          {{ arenaTeam.team.city }}
        </div>
        <div class="text-h5 mb-2">{{ arenaTeam.team.title }}</div>
        <div class="body-1 grey--text">{{ arenaTeam.team.type }}</div>
        <v-row no-gutters class="align-center">
          <v-col cols="12" md="4" lg="7">
            <v-btn
              @click="removeTeam(arenaTeam.team.id)"
              class="primary"
              elevation="0"
            >
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
import axios from "axios";

export default {
  name: "AdminTeamCard",
  props: {
    arenaTeam: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.checked = !this.arenaTeam.visibility;
  },
  data() {
    return {
      checked: false,
    };
  },
  methods: {
    toggleVisibility() {
      const payload = {
        arenaId: this.arenaTeam.arenaId,
        teamId: this.arenaTeam.team.id,
        visibility: this.checked ? 0 : 1,
      };
      const id = this.arenaTeam.id;
      axios
        .put(`/arena/team?id=${id}`, payload)
        .then((response) => {
          console.log("RESPONSE_UPDATE_ARENATEAM", response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    removeTeam(id) {
      this.$emit("team-remove", id);
    },
  },
};
</script>

<style scoped></style>
