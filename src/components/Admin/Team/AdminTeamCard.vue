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
        <div class="body-1 grey--text">
          {{ processType(arenaTeam.team.type) }}
        </div>
        <v-row no-gutters class="align-center">
          <slot name="button"></slot>
          <slot
            name="hide"
            :checked="checked"
            :toggle="toggleVisibility"
          ></slot>
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
    processType(type) {
      if (type === "ADULT") return "Взрослая";
      if (type === "CHILDREN") return "Детская";
      if (type === "YOUTH") return "Юношеская";
      if (type === "FEMALE") return "Женская";
    },
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
  },
};
</script>

<style scoped></style>
