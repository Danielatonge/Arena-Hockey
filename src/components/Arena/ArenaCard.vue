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
    this.selected_arenas.forEach((x) => {
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
      this.$router.push({
        name: "arena-information",
        params: { arenaId },
      });
    },
    openCardMap() {
      this.$router.push({
        name: "arena-map-all",
        query: { arenaTitle: `${this.arena.title}` },
      });
    },
    selectArena(arena) {
      this.selected = !this.selected;
      if (this.selected) {
        this.$store.dispatch("arena/addToSelectedArenas", arena);
      } else {
        this.$store.dispatch("arena/removeFromSelectedArenas", arena);
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
    ...mapState("arena", ["selected_arenas"]),
    checkPlus() {
      return this.selected ? "mdi-check" : "mdi-plus";
    },
  },
};
</script>

<style></style>
