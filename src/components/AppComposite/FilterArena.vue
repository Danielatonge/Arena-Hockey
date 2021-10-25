<template>
  <FilterArenaBase :numItems="numItems">
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
          @click="$router.push({ name: 'event_schedule_all' })"
        >
          Расписание мероприятий
        </v-btn>
      </v-col>
    </template>
    <template #heading>
      <slot name="heading"></slot>
    </template>
    <template #map>
      <slot name="map"></slot>
    </template>
    <template #sort>
      <v-col class="d-flex" cols="6" md="4" lg="3" xl="2">
        <v-select
          :items="sort_order"
          v-model="sort_model"
          solo
          flat
          @change="fetchArena"
          item-text="value"
          item-value="key"
          return-object
          prepend-icon="mdi-sort"
          hide-details="auto"
        ></v-select>
      </v-col>
    </template>
    <template #display-size>
      <v-select
        v-model="display_item"
        :items="display_items"
        item-text="state"
        item-value="value"
        solo
        flat
        return-object
        hide-details="auto"
        @change="fetchArena"
      ></v-select>
    </template>
  </FilterArenaBase>
</template>

<script>
import FilterArenaBase from "./FilterArenaBase";

export default {
  name: "FilterArena",
  components: { FilterArenaBase },
  props: {
    numItems: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped></style>
