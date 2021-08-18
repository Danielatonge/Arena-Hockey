<template>
<div class="grey lighten-4">
    <v-img
      color="grey"
      height="350px"
      width="100%"
      src="@/assets/banner-arena.jpg"
    >
      <v-container class="pt-8 pb-0">
        <v-row class="">
          <div>
            <v-breadcrumbs
              dark
              :items="breadcrumb_items"
              class="px-3"
            ></v-breadcrumbs>
          </div>
          <v-spacer></v-spacer>
          <div class="pr-3 my-auto">
            <v-btn
              elevation="0"
              x-small
              color="transparent"
              height="40px"
              class="mx-1"
              v-for="(item, index) in contact_list"
              :key="index"
              @click="$router.push({ path: `${item.link}` })"
            >
              <v-icon color="white"> {{ item.icon }}</v-icon>
            </v-btn>
          </div>
        </v-row>

        <div class="d-flex mt-5 mb-2">
          <div class="pr-4">
            <v-img
              :src="
                require('@/assets' + '/team_room_1.jpg')
              "
              height="180px"
              width="180px"
              class="rounded-xl"
              contain
            ></v-img>
          </div>
          <div class="my-auto">
            <p class="text-h4 white--text">{{ current_arena.title }}</p>
            <p class="white--text">
              <v-icon color="white">mdi-map-marker-outline</v-icon>
              {{ current_arena.address }}
            </p>
          </div>
        </div>
        <v-btn color="primary mr-4 mt-4" elevation="0">Забронировать</v-btn>
        <v-btn
          class="mt-4"
          @click="$router.push({ path: `/arena/${current_arena.id}/information#map` })"
          dark
          outlined
          elevation="0"
        >
          Как проехать?
        </v-btn>
      </v-container>
    </v-img>
    <v-container>
      <v-row class="mt-5">
        <v-col cols="5" md="3">
          <v-tabs vertical class="pl-4 rounded-lg" v-model="sidebar_tab">
            <v-tab
              v-for="(item, i) in sidebar_items"
              :key="i"
              router
              :to="item.link"
            >
              {{ item.text }}
            </v-tab>
          </v-tabs>
        </v-col>
        <v-col cols="7" md="9">
          
  <div>
    <p class="text-h4"> Состав руководства </p>
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
                        '/player_2.jpg')
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
                        '/player_2.jpg')
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
                      '/player_2.jpg')
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
        <v-row dense class="mx-n4 mt-5" v-show="premises_tab == 3">
          <v-col cols="12" v-for="(item, i) in female_trainer" :key="i">
            <v-card color="transparent" elevation="0">
              <div class="d-flex flex-no-wrap">
                <v-avatar class="ma-3 rounded-lg" size="125" tile>
                  <v-img
                    :src="
                      require('@/assets' +
                      '/player_2.jpg')
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
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
//import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    //...mapState(["trainers"]),
    kid_trainers() {
      return this.trainers.filter((x) => x.qualification === "Детскaя");
    },
    youth_trainers() {
      return this.trainers.filter((x) => x.qualification === "Юношеская");
    },
    female_trainer() {
      return this.trainers.filter((x) => x.qualification === "Женская");
    },
  },
  mounted() {
    const arenaId = this.$route.params.id;
    this.arenaId = arenaId;
    this.$store.dispatch("getArenaTrainer", arenaId).then((data) => {
      console.log("Trainers", data);
      this.trainers = data.map((x) => x.user);
    });
    this.teams = this.current_arena.teams || [];
  },
  data() {
    return {
      arenaId: null,
      trainers: [],
      name: "ArenaTeamList",
      premises_tab: null,
      premises_nav: [
        "Все тренеры",
        "Детские тренеры",
        "Юношеские тренеры",
        "Женские тренеры",
      ],
      player_items: ["/player_1", "/player_2", "/player_3"],
    };
  },
};
</script>

<style>
</style>