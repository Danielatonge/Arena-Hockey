<template>
  <fragment>
    <v-card color="transparent" :elevation="elevation" class="rounded-lg mb-4">
      <div class="d-flex flex-no-wrap">
        <!-- <div class="d-flex flex-no-wrap" @click="goToService"> -->
        <div class="ml-0" width="282px" height="186px">
          <v-avatar class="rounded-lg" tile width="200px" height="150px">
            <v-img
              contain
              :src="
                data.profilePicture != null
                  ? data.profilePicture
                  : require('@/assets/preview_arena_1.jpg')
              "
            ></v-img>
          </v-avatar>
        </div>
        <div class="description">
          <v-card-text>
            <div class="text-h5 mb-2">{{ data.title }}</div>
            <div class="body-1 grey--text mb-2"></div>
            <div class="body-1 blue--text"></div>
          </v-card-text>
          <v-card-actions class="pl-4 bottom">
            <v-btn
              class="px-6"
              color="grey lighten-2"
              x-large
              v-show="data.description ? data.description.length : false"
              elevation="0"
              @click.stop="readMoreInfo = !readMoreInfo"
            >
              {{ readMoreInfo ? "Скрыть" : "Развернуть" }}
            </v-btn>
          </v-card-actions>
        </div>
      </div>
    </v-card>
    <v-row v-show="readMoreInfo">
      <v-col cols="8" class="text-justify border">
        <div class="right-border mr-n3">
          <p class="mb-0">{{ data.description }}</p>
        </div>
      </v-col>
    </v-row>
  </fragment>
</template>

<script>
export default {
  name: "ArenaServiceCard",
  props: ["data", "arenaId"],
  data() {
    return {
      elevation: 0,
      readMoreInfo: null,
    };
  },
  filters: {
    descriptionLength(value) {
      if (!value) return "";
      if (value.length < 300) {
        return value;
      }
      return value.slice(0, 300) + "...";
    },
  },
  methods: {
    goToService() {
      this.$router.push({
        name: "arena-premises",
        params: { arenaId: this.data.arenaId, serviceId: this.data.id },
      });
    },
    goToBookService() {
      this.$router.push({
        name: "arena-premises",
        params: { arenaId: this.data.arenaId, serviceId: this.data.id },
      });
    },
  },
};
</script>

<style></style>
