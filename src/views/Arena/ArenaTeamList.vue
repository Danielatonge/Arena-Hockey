<template>
  <div>
    <p class="text-h4">Список команд</p>
    <v-tabs v-model="premises_tab" class="d-flex flex-no-wrap rounded-lg">
      <v-tab v-for="item in premises_nav" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="premises_tab" style="background-color: unset">
      <v-tab-item v-for="i in 4" :key="i">
        <v-row dense class="mx-n4 mt-5" v-show="premises_tab == 0">
          <v-col cols="12" v-for="(item, i) in teams" :key="i">
            <router-link
            :to="{ name: 'team-name', params: { teamId: item.team.id } }"
            class="undo-link-default"
            >
              <v-card color="transparent" elevation="0" >
                <div class="d-flex flex-no-wrap">
                  <v-avatar class="ma-3 rounded-lg" size="125" tile>
                    <v-img
                      :src="
                        item.team.profilePicture != null
                          ? item.team.profilePicture
                          : require('@/assets/team_room_1.jpg')
                      "
                    ></v-img>
                  </v-avatar>
                  <v-card-text>
                    <div
                      class="body-1 blue--text mb-2"
                      style="text-decoration: none"
                    >
                      {{ item.team.city }}
                    </div>
                    <div class="text-h5 mb-2">
                      {{ item.team.title }}
                    </div>
                    <!-- <div class="body-1 grey--text">
                              {{ item.team.miniDescription | descriptionLength }}
                            </div> -->
                  </v-card-text>
                </div>
              </v-card>
            </router-link>
          </v-col>
        </v-row>
        <v-row dense class="mx-n4 mt-5" v-show="premises_tab == 1">
          <v-col cols="12" v-for="(item, i) in children_team" :key="i">
            <router-link
              :to="{ name: 'team-name', params: { teamId: item.id } }"
              class="undo-link-default"
            >
              <v-card color="transparent" elevation="0">
                <div class="d-flex flex-no-wrap">
                  <v-avatar class="ma-3 rounded-lg" size="125" tile>
                    <v-img
                      :src="
                        item.team.profilePicture != null
                          ? item.team.profilePicture
                          : require('@/assets/team_room_1.jpg')
                      "
                    ></v-img>
                  </v-avatar>
                  <v-card-text>
                    <div
                      class="body-1 blue--text mb-2"
                      style="text-decoration: none"
                    >
                      {{ item.team.city }}
                    </div>
                    <div class="text-h5 mb-2">
                      {{ item.team.title }}
                    </div>
                    <!-- <div class="body-1 grey--text">
                              {{ item.team.miniDescription | descriptionLength }}
                            </div> -->
                  </v-card-text>
                </div>
              </v-card>
            </router-link>
          </v-col>
        </v-row>
        <v-row dense class="mx-n4 mt-5" v-show="premises_tab == 2">
          <v-col cols="12" v-for="(item, i) in youth_team" :key="i">
            <router-link
              :to="{ name: 'team-name', params: { teamId: item.id } }"
              class="undo-link-default"
            >
              <v-card color="transparent" elevation="0">
                <div class="d-flex flex-no-wrap">
                  <v-avatar class="ma-3 rounded-lg" size="125" tile>
                    <v-img
                      :src="
                        item.team.profilePicture != null
                          ? item.team.profilePicture
                          : require('@/assets/team_room_1.jpg')
                      "
                    ></v-img>
                  </v-avatar>
                  <v-card-text>
                    <div
                      class="body-1 blue--text mb-2"
                      style="text-decoration: none"
                    >
                      {{ item.team.city }}
                    </div>
                    <div class="text-h5 mb-2">
                      {{ item.team.title }}
                    </div>
                    <!-- <div class="body-1 grey--text">
                              {{ item.team.miniDescription | descriptionLength }}
                            </div> -->
                  </v-card-text>
                </div>
              </v-card>
            </router-link>
          </v-col>
        </v-row>
        <v-row dense class="mx-n4 mt-5" v-show="premises_tab == 3">
          <v-col cols="12" v-for="(item, i) in adult_team" :key="i">
            <router-link
              :to="{ name: 'team-name', params: { teamId: item.id } }"
              class="undo-link-default"
            >
              <v-card color="transparent" elevation="0">
                <div class="d-flex flex-no-wrap">
                  <v-avatar class="ma-3 rounded-lg" size="125" tile>
                    <v-img
                      :src="
                        item.team.profilePicture != null
                          ? item.team.profilePicture
                          : require('@/assets/team_room_1.jpg')
                      "
                    ></v-img>
                  </v-avatar>
                  <v-card-text>
                    <div
                      class="body-1 blue--text mb-2"
                      style="text-decoration: none"
                    >
                      {{ item.team.city }}
                    </div>
                    <div class="text-h5 mb-2">
                      {{ item.team.title }}
                    </div>
                    <!-- <div class="body-1 grey--text">
                              {{ item.team.miniDescription | descriptionLength }}
                            </div> -->
                  </v-card-text>
                </div>
              </v-card>
            </router-link>
          </v-col>
        </v-row>
        <v-row dense class="mx-n4 mt-5" v-show="premises_tab == 4">
          <v-col cols="12" v-for="(item, i) in female_team" :key="i">
            <router-link
              :to="{ name: 'team-name', params: { teamId: item.id } }"
              class="undo-link-default"
            >
              <v-card color="transparent" elevation="0">
                <div class="d-flex flex-no-wrap">
                  <v-avatar class="ma-3 rounded-lg" size="125" tile>
                    <v-img
                      :src="
                        item.team.profilePicture != null
                          ? item.team.profilePicture
                          : require('@/assets/team_room_1.jpg')
                      "
                    ></v-img>
                  </v-avatar>
                  <v-card-text>
                    <div
                      class="body-1 blue--text mb-2"
                      style="text-decoration: none"
                    >
                      {{ item.team.city }}
                    </div>
                    <div class="text-h5 mb-2">
                      {{ item.team.title }}
                    </div>
                    <!-- <div class="body-1 grey--text">
                              {{ item.team.miniDescription | descriptionLength }}
                            </div> -->
                  </v-card-text>
                </div>
              </v-card>
            </router-link>
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    arenaId: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState("arena", ["teams"]),
    children_team() {
      return this.teams.filter((x) => x.team.type == "KID");
    },
    youth_team() {
      return this.teams.filter((x) => x.team.type == "YOUTH");
    },
    adult_team() {
      return this.teams.filter((x) => x.team.type === "ADULT");
    },
    female_team() {
      return this.teams.filter((x) => x.team.type === "FEMALE");
    },
  },
  filters: {
    descriptionLength(value) {
      if (!value) return "";
      if (value.length < 30) {
        return value;
      }
      return value.slice(0, 30) + "...";
    },
  },
  created() {
    this.$store.dispatch("arena/getTeamsVisible", this.arenaId);
  },
  methods: {
    funk(id){
      console.log(id)
    }
  },
  data() {
    return {
      premises_tab: null,
      premises_nav: [
        "Все команды",
        "Детские команды",
        "Юношеские команды",
        "Взрослые команды",
        "Женские команда",
      ],
    };
  },
};
</script>

<style></style>
