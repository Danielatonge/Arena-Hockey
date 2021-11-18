<template>
  <v-card color="transparent" elevation="0">
    <div class="d-flex flex-no-wrap">
      <v-avatar class="ma-3 rounded-lg" size="150" tile>
        <v-img
          :src="
            arenaUser.user.profilePicture
              ? arenaUser.user.profilePicture
              : require('@/assets/team_room_1.jpg')
          "
        ></v-img>
      </v-avatar>
      <v-card-text>
        <div class="text-h5 mb-2">
          {{
            arenaUser.user.name +
            " " +
            arenaUser.user.middleName +
            " " +
            arenaUser.user.surname
          }}
        </div>
        <div class="body-1 blue--text mb-1">
          {{ isValidOutput(arenaUser.user.age)
          }}{{
            isValidOutput(arenaUser.user.age) &&
            isValidOutput(arenaUser.user.city)
              ? ", "
              : ""
          }}
          {{ isValidOutput(arenaUser.user.city) }}
        </div>
        <div class="body-2 grey--text" v-show="arenaUser.user.qualification">
          Уровень: {{ arenaUser.user.qualification }}
        </div>
        <v-row no-gutters class="align-center">
          <v-col cols="12" md="4" lg="7">
            <v-btn
              @click="removeTeam(arenaUser.user.id)"
              class="primary"
              elevation="0"
            >
              Открепить Тренер
            </v-btn>
          </v-col>
          <v-col>
            <v-checkbox
              v-model="checked"
              @click="toggleVisibility"
              label="Скрыть Тренер"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "AdminTrainerCard",
  props: {
    arenaUser: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.checked = !this.arenaUser.visibility;
  },
  data() {
    return {
      checked: false,
    };
  },
  methods: {
    toggleVisibility() {
      console.log(this.arenaUser);
      this.$store
        .dispatch("arena/updateArenaUser", {
          arenaUser: this.arenaUser,
          checked: !this.checked,
        })
        .then(() => {
          this.checked = !this.checked;
        });
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
