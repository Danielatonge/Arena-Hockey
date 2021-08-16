<template>
  <fragment>
    <v-col cols="3" md="2" class="my-auto">
      <div>{{ data.startTime + " - " + data.endTime }}</div>
    </v-col>
    <v-col cols="4" md="3" lg="3">
      <v-text-field
        placeholder="5000 p"
        v-model="data.weekdayPrice"
        outlined
        dense
        flat
        hide-details="auto"
        class="rounded-lg"
      ></v-text-field>
    </v-col>
    <v-col cols="5" md="3" class="d-flex">
      <v-text-field
        placeholder="5000 p"
        v-model="data.holidayPrice"
        outlined
        dense
        flat
        hide-details="auto"
        class="rounded-lg"
      ></v-text-field>
      <v-icon class="ml-4 my-auto" @click="$emit('deleteTimeframe', position)"> mdi-close </v-icon>
    </v-col>
  </fragment>
</template>

<script>
export default {
  props: ["data", "position"],
  data() {
    return {};
  },
  methods: {
  },
};
</script>

<style>
</style>