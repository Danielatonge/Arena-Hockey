<template>
  <div>
    <p class="text-h4">Тренерский состав</p>
    <v-tabs v-model="premises_tab" class="d-flex flex-no-wrap rounded-lg">
      <v-tab v-for="item in premises_nav" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="premises_tab" style="background-color: unset">
      <v-tab-item v-for="x in 5" :key="x">
        <v-row dense class="mx-n4 mt-5" v-show="premises_tab == 0">
          <v-col cols="12" v-for="(item, i) in trainers" :key="i">
            <v-card color="transparent" elevation="0">
              <div class="d-flex flex-no-wrap">
                <v-avatar class="ma-3 rounded-lg" size="125" tile>
                  <v-img
                    :src="
                      item.profilePicture != null
                        ? item.profilePicture
                        : require('@/assets/player_2.jpg')
                    "
                  ></v-img>
                </v-avatar>
                <v-card-text>
                  <div class="text-h5 mb-2">
                    {{ full_name(item) }}
                  </div>
                  <div class="body-1 blue--text mb-2">
                    {{ isValidOutput(item.age) }}
                    {{ isValidCityOutput(item.city) }}
                  </div>
                  <div class="body-2 grey--text">
                    {{ isValidOutput(item.position) }}
                  </div>
                </v-card-text>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <v-row dense class="mx-n4 mt-5" v-show="premises_tab == 1">
          <v-col cols="12" v-for="(item, i) in kidTR" :key="i">
            <v-card color="transparent" elevation="0">
              <div class="d-flex flex-no-wrap">
                <v-avatar class="ma-3 rounded-lg" size="125" tile>
                  <v-img
                    :src="
                      item.profilePicture != null
                        ? item.profilePicture
                        : require('@/assets/player_2.jpg')
                    "
                  ></v-img>
                </v-avatar>
                <v-card-text>
                  <div class="text-h5 mb-2">
                    {{ full_name(item) }}
                  </div>
                  <div class="body-1 blue--text mb-2">
                    {{ isValidOutput(item.age) }}
                    {{ isValidCityOutput(item.city) }}
                  </div>
                  <div class="body-2 grey--text">
                    {{ isValidOutput(item.position) }}
                  </div>
                </v-card-text>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <v-row dense class="mx-n4 mt-5" v-show="premises_tab == 2">
          <v-col cols="12" v-for="(item, i) in youthTR" :key="i">
            <v-card color="transparent" elevation="0">
              <div class="d-flex flex-no-wrap">
                <v-avatar class="ma-3 rounded-lg" size="125" tile>
                  <v-img
                    :src="
                      item.profilePicture != null
                        ? item.profilePicture
                        : require('@/assets/player_2.jpg')
                    "
                  ></v-img>
                </v-avatar>
                <v-card-text>
                  <div class="text-h5 mb-2">
                    {{ full_name(item) }}
                  </div>
                  <div class="body-1 blue--text mb-2">
                    {{ isValidOutput(item.age) }}
                    {{ isValidCityOutput(item.city) }}
                  </div>
                  <div class="body-2 grey--text">
                    {{ isValidOutput(item.position) }}
                  </div>
                </v-card-text>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <v-row dense class="mx-n4 mt-5" v-show="premises_tab == 3">
          <v-col cols="12" v-for="(item, i) in adultTR" :key="i">
            <v-card color="transparent" elevation="0">
              <div class="d-flex flex-no-wrap">
                <v-avatar class="ma-3 rounded-lg" size="125" tile>
                  <v-img
                    :src="
                      item.profilePicture != null
                        ? item.profilePicture
                        : require('@/assets/player_2.jpg')
                    "
                  ></v-img>
                </v-avatar>
                <v-card-text>
                  <div class="text-h5 mb-2">
                    {{ full_name(item) }}
                  </div>
                  <div class="body-1 blue--text mb-2">
                    {{ isValidOutput(item.age) }}
                    {{ isValidCityOutput(item.city) }}
                  </div>
                  <div class="body-2 grey--text">
                    {{ isValidOutput(item.position) }}
                  </div>
                </v-card-text>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <v-row dense class="mx-n4 mt-5" v-show="premises_tab == 4">
          <v-col cols="12" v-for="(item, i) in femaleTR" :key="i">
            <v-card color="transparent" elevation="0">
              <div class="d-flex flex-no-wrap">
                <v-avatar class="ma-3 rounded-lg" size="125" tile>
                  <v-img
                    :src="
                      item.profilePicture != null
                        ? item.profilePicture
                        : require('@/assets/player_2.jpg')
                    "
                  ></v-img>
                </v-avatar>
                <v-card-text>
                  <div class="text-h5 mb-2">
                    {{ full_name(item) }}
                  </div>
                  <div class="body-1 blue--text mb-2">
                    {{ isValidOutput(item.age) }}
                    {{ isValidCityOutput(item.city) }}
                  </div>
                  <div class="body-2 grey--text">
                    {{ isValidOutput(item.position) }}
                  </div>
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
import { mapState } from "vuex";
import Axios from "axios";
import { GET_ARENA } from "@/api";


export default {
  props: {
    arenaId: {
      type: String,
      required: true,
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
  computed: {
    ...mapState({
      trainers: (state) => state.arena.trainers.map((user) => user.user),
    }),
    kid_trainers() {
      return this.trainers.filter((x) => x.level === "KID");
    },
    youth_trainers() {
      return this.trainers.filter((x) => x.level === "YOUTH");
    },
    adult_trainers() {
      return this.trainers.filter((x) => x.level === "ADULT");
    },
    female_trainer() {
      return this.trainers.filter((x) => x.level === "FEMALE");
    },
  },
  created() {
    this.$store.dispatch("arena/getTrainersVisible", this.arenaId);
    this.getKidTR()
    this.getYouthTR()
    this.getAdultTR()
    this.getFemaleTR()
  },
  data() {
    return {
      premises_tab: 0,
      premises_nav: [
        "Все тренеры",
        "Детские тренеры",
        "Юношеские тренеры",
        "Взрослые тренеры",
        "Женские тренеры",
      ],
      kidTR: [],
      youthTR: [],
      adultTR: [],
      femaleTR: [],
    };
  },
  methods: {
    isValidCityOutput(input) {
      return input && input !== "string" ? input : null;
    },
    isValidOutput(input) {
      return input && input !== "string" ? input : null;
    },
    full_name(item) {
      return `${item.name} ${item.middleName} ${item.surname}`;
    },

    async getKidTR() {
      let id = this.arenaId
      await Axios.get(`${GET_ARENA}${id}/trainers?category=KID`).then( (res) => {
        res.data.forEach(element => {
          this.kidTR.push(element.user)
        });
      })
      .catch((error) => {
        console.error(error);
      })
    },
    async getYouthTR() {
      let id = this.arenaId
      await Axios.get(`${GET_ARENA}${id}/trainers?category=YOUTH`).then( (res) => {
        res.data.forEach(element => {
          this.youthTR.push(element.user)
        });
      })
      .catch((error) => {
        console.error(error);
      })
    },
    async getAdultTR() {
      let id = this.arenaId
      await Axios.get(`${GET_ARENA}${id}/trainers?category=ADULT`).then( (res) => {
        res.data.forEach(element => {
          this.adultTR.push(element.user)
        });
      })
      .catch((error) => {
        console.error(error);
      })
    },
    async getFemaleTR() {
      let id = this.arenaId
      await Axios.get(`${GET_ARENA}${id}/trainers?category=FEMALE`).then( (res) => {
        res.data.forEach(element => {
          this.femaleTR.push(element.user)
        });
      })
      .catch((error) => {
        console.error(error);
      })
    },
  },
};
</script>

<style></style>
