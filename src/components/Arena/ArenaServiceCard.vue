<template>
  <v-card color="" :elevation="elevation" class="rounded-lg">
    <div
      class="d-flex flex-no-wrap"
      @mouseenter="elevation = 1"
      @mouseleave="elevation = 0"
      @click="goToService"
    >
      <div class="ml-0" width="282px" height="186px">
        <v-img src="@/assets/preview_arena_1.jpg"></v-img>
      </div>
      <div class="description">
        <v-card-text>
          <div class="text-h5 mb-2">{{ data.title }}</div>
          <div class="body-1 grey--text mb-2">
            {{ data.miniDescription | descriptionLength }}
          </div>
          <div class="body-1 blue--text">{{ data.phone }}</div>
        </v-card-text>
        <v-card-actions class="pl-4 bottom">
          <v-btn
            class="px-6"
            color="primary"
            x-large
            elevation="0"
            @click.stop="goToBookService"
          >
            Забронировать
          </v-btn>
        </v-card-actions>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "ArenaServiceCard",
  props: ["data", "arenaId"],
  data() {
    return {
      elevation: 0,
    };
  },
  filters: {
    descriptionLength(value) {
      if (value.length < 30) return value;
      return value.slice(0, 30) + "...";
    },
  },
  methods: {
    goToService() {
      this.$router.push({
        path: `/arena/${this.data.arenaId}/service/${this.data.id}`,
      });
    },
    goToBookService() {
      this.$router.push({
        path: `/arena/${this.data.arenaId}/service/${this.data.id}`,
      });
    },
  },
};
</script>

<style>
</style>