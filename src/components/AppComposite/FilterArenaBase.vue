<template>
  <FilterBase>
    <template #address>
      <v-col class="d-flex" cols="12" md="2">
        <v-select
          :items="arena_cities"
          v-model="sort_by_city"
          solo
          flat
          @change="fetchArena"
          hide-details="auto"
        ></v-select>
      </v-col>
    </template>
    <template #search>
      <v-col cols="12" md="10" lg="7" xl="8">
        <v-text-field
          label="Поиск по названию арены, метро, адресу"
          single-line
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          solo
          @change="fetchArena"
          flat
          hide-details="auto"
          class="rounded-lg"
        ></v-text-field>
      </v-col>
    </template>
    <template #btn-schedule>
      <v-col cols="8" md="4" lg="3" xl="2">
        <v-btn
          class="rounded-lg grey lighten-2"
          large
          depressed
          height="48px"
          width="100%"
          @click="$router.push({ path: '/event_schedule_all' })"
        >
          Расписание мероприятий
        </v-btn>
      </v-col>
    </template>
    <template #secondrow>
      <slot name="heading"></slot>
      <v-row>
        <slot name="map"></slot>
        <slot name="sort"></slot>
        <v-col class="my-auto" cols="6" md="4">
          <div class="body-1 grey--text">
            Найдено: {{ numItems }} результатов
          </div>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="6" md="4" lg="3" xl="2">
          <slot name="display-size"></slot>
        </v-col>
      </v-row>
    </template>
  </FilterBase>
</template>

<script>
import FilterBase from "./FilterBase";

export default {
  name: "FilterArena",
  components: { FilterBase },
  props: {
    numItems: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped></style>
