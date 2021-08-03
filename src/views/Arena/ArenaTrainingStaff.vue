<template>
  <div>
    <p class="text-h4">Тренерский состав</p>
    <v-tabs v-model="premises_tab" class="d-flex flex-no-wrap rounded-lg">
      <v-tab v-for="item in premises_nav" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="premises_tab" style="background-color: unset">
      <v-tab-item v-for="nav in premises_nav" :key="nav">
        <v-row dense class="mx-n4 mt-5">
          <v-col cols="12" v-for="(item, i) in player_items" :key="i">
            <v-card color="transparent" elevation="0">
              <div class="d-flex flex-no-wrap">
                <v-avatar class="ma-3" size="125" tile>
                  <v-img :src="require('@/assets' + item + '.jpg')"></v-img>
                </v-avatar>
                <v-card-text>
                  <div class="text-h5 mb-2">Фамилия Имя Отчество</div>
                  <div class="body-1 blue--text mb-2">Возраст, город</div>
                  <div class="body-2 grey--text">Позиция</div>
                </v-card-text>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "ArenaTeamList",
      premises_tab: null,
      premises_nav: ["Все тренеры", "Детские тренеры", "Юношеские тренеры"],
      player_items: ["/player_1", "/player_2", "/player_3"],
    };
  },
  computed: {},
};
</script>

<style>
</style>