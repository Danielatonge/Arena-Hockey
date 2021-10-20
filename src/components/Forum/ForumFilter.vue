<template>
  <div class="pb-10">
    <v-row dense>
      <v-col class="d-flex" cols="12" md="2">
        <v-select
          :items="location"
          v-model="forum.address"
          solo
          flat
          hide-details="auto"
          @change="fetchForum"
        ></v-select>
      </v-col>
      <v-col cols="9" md="8" lg="9">
        <v-text-field
          label="Поиск"
          single-line
          prepend-inner-icon="mdi-magnify"
          v-model="forum.search"
          solo
          flat
          hide-details="auto"
          class="rounded-lg"
          @change="fetchForum"
        ></v-text-field>
      </v-col>
      <v-col cols="3" md="2" lg="1">
        <v-btn
          class="rounded-lg"
          large
          depressed
          height="48px"
          width="100%"
          color="primary"
          @click="fetchForum"
        >
          Найти
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex" cols="6" md="4" lg="3" xl="2">
        <v-select
          :items="sort"
          v-model="forum.sort_asc"
          solo
          flat
          item-text="value"
          item-value="key"
          return-object
          prepend-icon="mdi-sort"
          hide-details="auto"
          @change="fetchForum"
        ></v-select>
      </v-col>
      <v-col class="my-auto" cols="6" md="4">
        <div class="body-1 grey--text">
          Найдено: {{ forum.items.length }} результатов
        </div>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="6" md="4" lg="3" xl="2">
        <v-select
          :items="displayAmount"
          v-model="forum.numItems"
          solo
          flat
          item-text="state"
          item-value="value"
          return-object
          hide-details="auto"
          @change="fetchForum"
        ></v-select>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "ForumFilter",
  props: {
    forum: {
      type: Object,
      required: true,
    },
    fetchForum: {
      type: Function,
      required: true,
    },
    location: {
      type: Array,
      required: true,
    },
    sort: {
      type: Array,
      required: true,
    },
    displayAmount: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped></style>
