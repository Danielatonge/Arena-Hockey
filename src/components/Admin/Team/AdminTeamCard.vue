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

      <v-card-text @click="goToTeam">
        <div class="body-1 blue--text mb-2" style="text-decoration: none">
          {{ arenaTeam.team.city }}
        </div>
        <div class="text-h5 mb-2">{{ arenaTeam.team.title }}</div>
        <div class="body-1 grey--text">
          {{ processType(arenaTeam.team.type) }}
        </div>
        <v-row no-gutters class="align-center">
          <slot
            name="button"
            :deleteTeam="deleteTeam"
            :editTeam="editTeam"
          ></slot>
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
      console.log(this.arenaTeam);
      this.$store.dispatch("arena/updateArenaTeam", {
        arenaTeam: this.arenaTeam,
        checked: this.checked,
      });
    },
    deleteTeam() {
      console.log(this.arenaTeam);
      const payload = {
        userId: this.arenaTeam.userId,
        teamId: this.arenaTeam.team.id,
      };
      this.$store.dispatch("user/deleteTeam", payload);
    },
    editTeam() {
      this.$router.push({
        name: "admin-team-edit",
        params: { teamId: this.arenaTeam.team.id },
      });
    },
    goToTeam() {
      this.$router.push({
        name: "admin-team-view",
        params: { teamId: this.arenaTeam.team.id },
      });
    },
  },
};
</script>

<style scoped></style>
