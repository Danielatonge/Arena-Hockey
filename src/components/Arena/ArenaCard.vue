<template>
  <v-card
    class="rounded-lg"
    :elevation="elevation"
    @mouseover="elevation = '2'"
    @mouseout="elevation = '0'"
    @click="goToArena"
  >
    <v-img :src="require('@/assets' + item + '.jpg')" height="200px">
      <v-container>
        <v-row class="ma-2">
          <v-btn
            @click.stop="openCard"
            class="rounded-lg white"
            small
            elevation="0"
          >
            На карте
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
    <v-card-title class="pb-5"> Los Angeles Clippers </v-card-title>
    <v-card-subtitle> ул. Лермонтова, д. 14, пом. 3, г. Чита </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  name: "ArenaCard",
  props: {
    item: String,
  },
  data() {
    return {
      elevation: 0,
      selected: false,
    };
  },
  methods: {
    goToArena() {
      this.$router.push({ path: "/arenaname" });
    },
    openCard() {},
    selectToggle() {
      this.selected = !this.selected;
    },
  },
  computed: {
    checkPlus() {
      return this.selected ? "mdi-check" : "mdi-plus";
    },
  },
};
</script>

<style>
</style>