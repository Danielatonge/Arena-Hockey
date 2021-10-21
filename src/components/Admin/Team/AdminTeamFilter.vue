<template>
  <div class="pb-10">
    <v-row dense>
      <v-col class="d-flex" cols="12" md="2" lg="2">
        <v-select
          :items="location"
          v-model="team.address"
          solo
          flat
          hide-details="auto"
          @change="fetchTeam"
        ></v-select>
      </v-col>
      <v-col cols="9" md="5" lg="5">
        <v-text-field
          label="Поиск"
          single-line
          prepend-inner-icon="mdi-magnify"
          v-model="team.search"
          solo
          flat
          hide-details="auto"
          class="rounded-lg"
          @change="fetchTeam"
        ></v-text-field>
      </v-col>
      <v-col cols="3" md="3" lg="2">
        <v-select
          :items="types"
          v-model="team.type"
          placeholder="Тип команды"
          solo
          flat
          item-text="value"
          item-value="key"
          return-object
          hide-details="auto"
          @change="fetchTeam"
        ></v-select>
      </v-col>
      <v-col cols="3" md="3" lg="3">
        <v-btn
          class="rounded-lg"
          large
          depressed
          height="48px"
          width="100%"
          color="primary"
          @click="fetchTeam"
        >
          Добавить команду
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex" cols="6" md="4" lg="3" xl="2">
        <v-select
          :items="sort"
          v-model="team.sort_asc"
          solo
          flat
          item-text="value"
          item-value="key"
          return-object
          prepend-icon="mdi-sort"
          hide-details="auto"
          @change="fetchTeam"
        ></v-select>
      </v-col>
      <v-col class="my-auto" cols="6" md="4">
        <div class="body-1 grey--text">
          Найдено: {{ team.items.length }} результатов
        </div>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="6" md="4" lg="3" xl="2">
        <v-select
          :items="displayAmount"
          v-model="team.numItems"
          solo
          flat
          item-text="state"
          item-value="value"
          return-object
          hide-details="auto"
          @change="fetchTeam"
        ></v-select>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "AdminTeamFilter",
  props: {
    team: {
      type: Object,
      required: true,
    },
    fetchTeam: {
      type: Function,
      required: true,
    },
    location: {
      type: Array,
      required: true,
    },
    types: {
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
