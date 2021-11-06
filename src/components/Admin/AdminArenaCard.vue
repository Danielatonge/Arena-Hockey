<template>
  <v-card
    class="rounded-lg"
    :elevation="elevation"
    @mouseover="elevation = '2'"
    @mouseout="elevation = '0'"
    @click="goToAdminArena"
  >
    <v-img
      :src="
        arena.profilePicture.length
          ? arena.profilePicture
          : require('@/assets/team_room_1.jpg')
      "
      height="200px"
    >
      <v-container>
        <v-row class="ma-2">
          <v-btn
            @click.stop="goToAdminArenaEdit"
            class="rounded-lg white"
            small
            elevation="0"
          >
            редактировать
          </v-btn>
          <v-spacer></v-spacer>
          <slot>
            <v-btn
              @click.stop="selectToggle"
              :class="[selected ? 'primary' : '']"
              x-small
              class="rounded-lg white"
              height="30px"
              elevation="0"
            >
              <v-icon>{{ checkPlus }}</v-icon>
            </v-btn>
          </slot>
        </v-row>
      </v-container>
    </v-img>
    <v-card-title class="pb-5">
      {{ arena.title || "Los Angeles Clippers" }}
    </v-card-title>
    <v-card-subtitle>
      <div class="mb-2">
        {{
          arena.address ||
          "ул. Лермонтова, д. 14, пом. 3, г. Чита" | addressDescription
        }}
      </div>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AdminArenaCard",
  props: {
    arena: {
      type: Object,
      required: true,
    },
  },

  mounted() {},
  data() {
    return {
      elevation: 0,
      selected: false,
    };
  },
  methods: {
    goToAdminArena() {
      this.$store.dispatch("arena/setArena", this.arena);
      const arenaId = this.arena.id;

      this.$router.push({
        name: "complex-information",
        params: { arenaId },
      });
    },
    goToAdminArenaEdit() {
      this.$store.dispatch("arena/setArena", this.arena);
      const arenaId = this.arena.id;
      console.log(
        "🚀 ~ file: AdminArenaCard.vue ~ line 90 ~ goToAdminArenaEdit ~ arenaId",
        arenaId
      );

      this.$router.push({
        name: "edit-complex-information",
        params: { arenaId },
      });
    },
    selectToggle() {
      const arenaId = this.arena.id;
      this.selected = !this.selected;
      if (this.selected) {
        this.$emit("add-selected", arenaId);
      } else {
        this.$emit("remove-selected", arenaId);
      }
    },
  },
  filters: {
    addressDescription: (value) => {
      if (!value) return "";
      return value.slice(0, 45);
    },
  },
  computed: {
    ...mapState("arena", ["maps"]),
    checkPlus() {
      return this.selected ? "mdi-check" : "mdi-delete-outline";
    },
  },
};
</script>

<style></style>
