<template>
  <v-card color="transparent" elevation="0">
    <div class="d-flex flex-no-wrap">
      <v-avatar class="ma-3 rounded-lg" size="150" tile>
        <v-img
          :src="
            user.profilePicture
              ? user.profilePicture
              : require('@/assets/team_room_1.jpg')
          "
        ></v-img>
      </v-avatar>
      <v-card-text>
        <div class="text-h5 mb-2">
          {{ user.name + " " + user.middleName + " " + user.surname }}
        </div>
        <div class="body-1 blue--text mb-1">
          {{ isValidOutput(user.age) }}
          {{ isValidCityOutput(user.city) }}
        </div>
        <div class="body-2 grey--text" v-show="user.qualification">
          Уровень: {{ user.qualification }}
        </div>
        <v-row no-gutters class="align-center">
          <v-col cols="12" md="4" lg="7">
            <v-btn @click="removeTeam(user.id)" class="primary" elevation="0">
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
  name: "AdminTrainerCard",
  props: {
    user: {
      type: Object,
      required: true,
    },
    arenaId: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.checked = this.user.isVisible;
  },
  data() {
    return {
      checked: false,
    };
  },
  methods: {
    toggleVisibility() {
      const payload = {
        arenaId: this.arenaId,
        userId: this.user.id,
        isVisible: !this.checked,
      };
      axios
        .put(`/arena/user`, payload)
        .then((response) => {
          console.log("RESPONSE_UPDATE_ARENAUSER", response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    isValidCityOutput(input) {
      return input && input !== "string" ? ", " + input : null;
    },
    isValidOutput(input) {
      return input && input !== "string" ? input : null;
    },
    removeTeam(id) {
      this.$emit("trainer-remove", id);
    },
  },
};
</script>

<style scoped></style>
