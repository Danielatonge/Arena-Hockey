<template>
  <div>
    <p class="text-h4">Тренерский состав</p>
    <v-tabs v-model="premises_tab" class="d-flex flex-no-wrap rounded-lg">
      <v-tab v-for="item in premises_nav" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="premises_tab" style="background-color: unset">
      <v-tab-item v-for="x in 3" :key="x">
        <v-row dense class="mx-n4 mt-5" v-show="premises_tab == 0">
          <v-col cols="12" v-for="(item, i) in trainers" :key="i">
            <v-card color="transparent" elevation="0">
              <div class="d-flex flex-no-wrap">
                <v-avatar class="ma-3 rounded-lg" size="125" tile>
                  <v-img
                    :src="
                      require('@/assets' +
                        (item.level ? item.level : '/player_2.jpg'))
                    "
                  ></v-img>
                </v-avatar>
                <v-card-text>
                  <div class="text-h5 mb-2">
                    {{ item.name + " " + item.middleName + " " + item.surname }}
                  </div>
                  <div class="body-1 blue--text mb-2">
                    {{ item.age }}, {{ item.city }}
                  </div>
                  <div class="body-2 grey--text">{{ item.position }}</div>
                </v-card-text>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <v-row dense class="mx-n4 mt-5" v-show="premises_tab == 1">
          <v-col cols="12" v-for="(item, i) in kid_trainers" :key="i">
            <v-card color="transparent" elevation="0">
              <div class="d-flex flex-no-wrap">
                <v-avatar class="ma-3 rounded-lg" size="125" tile>
                  <v-img
                    :src="
                      require('@/assets' +
                        (item.level ? item.level : '/player_2.jpg'))
                    "
                  ></v-img>
                </v-avatar>
                <v-card-text>
                  <div class="text-h5 mb-2">
                    {{ item.name + " " + item.middleName + " " + item.surname }}
                  </div>
                  <div class="body-1 blue--text mb-2">
                    {{ item.age }}, {{ item.city }}
                  </div>
                  <div class="body-2 grey--text">{{ item.position }}</div>
                </v-card-text>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <v-row dense class="mx-n4 mt-5" v-show="premises_tab == 2">
          <v-col cols="12" v-for="(item, i) in youth_trainers" :key="i">
            <v-card color="transparent" elevation="0">
              <div class="d-flex flex-no-wrap">
                <v-avatar class="ma-3 rounded-lg" size="125" tile>
                  <v-img
                    :src="
                      require('@/assets' +
                        (item.level ? item.level : '/player_2.jpg'))
                    "
                  ></v-img>
                </v-avatar>
                <v-card-text>
                  <div class="text-h5 mb-2">
                    {{ item.name + " " + item.middleName + " " + item.surname }}
                  </div>
                  <div class="body-1 blue--text mb-2">
                    {{ item.age }}, {{ item.city }}
                  </div>
                  <div class="body-2 grey--text">{{ item.position }}</div>
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
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    ...mapState(["trainers"]),
    ...mapGetters(["kid_trainers", "youth_trainers"]),
  },
  data() {
    return {
      name: "ArenaTeamList",
      premises_tab: null,
      premises_nav: ["Все тренеры", "Детские тренеры", "Юношеские тренеры"],
      player_items: ["/player_1", "/player_2", "/player_3"],
    };
  },
};
</script>

<style>
</style>