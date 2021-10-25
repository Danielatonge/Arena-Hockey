<template>
  <v-card
    class="rounded-lg"
    :elevation="elevation"
    @mouseover="elevation = '2'"
    @mouseout="elevation = '0'"
    @click="goToAdminArena"
  >
    <v-img :src="require('@/assets/arena_1.jpg')" height="200px">
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
      <div class="success--text">Подтверждена</div>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AdminArenaCard",
  props: {
    arena: Object,
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
      this.$router.push({ name: "complex-information", params: { arenaId } });
    },
    goToAdminArenaEdit() {
      this.$store.dispatch("arena/setArena", this.arena);
      const arenaId = this.arena.id;
      this.$router.push({
        name: "edit-complex-information",
        params: { arenaId },
      });
    },
    selectToggle() {
      this.selected = !this.selected;
    },
  },
  filters: {
    addressDescription: (value) => {
      if (!value) return "";
      return value.slice(0, 45);
    },
  },
  computed: {
    ...mapState(["maps"]),
    checkPlus() {
      return this.selected ? "mdi-check" : "mdi-delete-outline";
    },
  },
};
</script>

<style></style>
