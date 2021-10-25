<template>
  <v-card
    class="rounded-lg"
    :elevation="elevation"
    @mouseover="elevation = '2'"
    @mouseout="elevation = '0'"
    @click="goToArena"
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
            @click.stop="openCardMap"
            class="rounded-lg white"
            small
            elevation="0"
          >
            На карте
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            @click.stop="selectArena(arena)"
            :class="[selected ? 'primary' : '']"
            x-small
            class="rounded-lg white"
            height="30px"
            elevation="0"
          >
            <v-icon>{{ checkPlus }}</v-icon>
          </v-btn>
        </v-row>
      </v-container>
    </v-img>
    <v-card-title class="pb-5">
      {{ arena.title || "Los Angeles Clippers" | arenaTitle }}
    </v-card-title>
    <v-card-subtitle>
      {{
        (arena.address || "ул. Лермонтова, д. 14, пом. 3, г. Чита")
          | addressDescription
      }}
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ArenaCard",
  props: {
    arena: Object,
  },
  mounted() {
    this.selected_arena.forEach((x) => {
      if (x.id === this.arena.id) {
        this.selected = true;
      }
    });
  },
  data() {
    return {
      elevation: 0,
      selected: false,
    };
  },
  methods: {
    goToArena() {
      const arenaId = this.arena.id;
      this.$router.push({ path: `/arena/${arenaId}/information` });
    },
    openCardMap() {
      console.log(this.arena);
      this.$store
        .dispatch("arena/displayArena", this.arena)
        .then(() => this.$router.push({ path: "/arena/arena_maps" }));
    },
    selectArena(arena) {
      this.selected = !this.selected;
      if (this.selected) {
        // TODO add arena to list of selected arenas
        this.$store.dispatch("addToSelectedArena", arena);
      } else {
        // TODO remove arena from list of selected arenas
        this.$store.dispatch("removeFromSelectedArena", arena);
      }
    },
  },
  filters: {
    addressDescription: (value) => {
      if (!value) return "";
      return value.slice(0, 45);
    },
    arenaTitle: (value) => {
      if (!value) return "";
      if (value.length <= 28) return value;
      return value.slice(0, 28) + "..";
    },
  },
  computed: {
    ...mapState(["arenasMapIdentifier", "selected_arena"]),
    checkPlus() {
      return this.selected ? "mdi-check" : "mdi-plus";
    },
  },
};
</script>

<style></style>
