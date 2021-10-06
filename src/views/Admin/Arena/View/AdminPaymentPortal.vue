<template>
  <div>
    <div class="text-h4 mb-6">Платные услуги</div>
    <v-tabs v-model="premises_tab" class="d-flex flex-no-wrap rounded-lg">
      <v-tab v-for="item in premises_nav" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="premises_tab" style="background-color: unset">
      <v-tab-item v-for="i in 2" :key="i">
        <v-row dense class="mt-5" v-show="premises_tab == 0">
          <v-col cols="12" class="mb-4" v-for="(item, i) in katokPL" :key="i">
            <v-card color="transparent" elevation="0" class="mb-5">
              <div class="d-flex flex-no-wrap">
                <div class="ma-3">
                  <v-avatar
                    class="rounded-lg"
                    tile
                    width="200px"
                    height="150px"
                    contain
                  >
                    <v-img
                      contain
                      :src="
                        item.profilePicture != null
                          ? item.profilePicture
                          : require('@/assets/preview_arena_1.jpg')
                      "
                    ></v-img>
                  </v-avatar>
                </div>
                <div class="description">
                  <v-card-text>
                    <div class="text-h5 mb-4">
                      {{ item.title }}
                      <span
                        class="body-1 ml-4"
                        v-show="item.length * item.width"
                      >
                        {{ item.length * item.width }}
                      </span>
                      <!--                      <span class="body-1 ml-4"> {{ item.type }} </span>-->
                    </div>
                    <div class="body-1 grey--text mb-3">
                      {{ item.description }}
                    </div>
                  </v-card-text>
                  <v-card-actions class="pl-4 bottom">
                    <v-btn
                      class="px-6"
                      color="primary"
                      x-large
                      elevation="0"
                      @click="
                        $router.push({
                          path: `/arena/${arenaId}/event_schedule`,
                        })
                      "
                    >
                      Забронировать
                    </v-btn>
                  </v-card-actions>
                </div>
              </div>
            </v-card>
            <v-row>
              <v-col
                cols="2"
                class="text-center border"
                v-for="(itm, indx) in item.price"
                :key="indx"
              >
                <div class="mb-3 grey--text">
                  {{ itm.price.startTime + " - " + itm.price.endTime }}
                </div>
                <div class="right-border mr-n3">
                  <p class="mb-0">{{ itm.price.weekdayPrice }}</p>
                  <p class="primary--text">
                    {{ itm.price.holidayPrice }}
                  </p>
                </div>
              </v-col>
            </v-row>
            <div class="mt-n8" v-show="item.price.length">
              <span class="mr-5 font-weight-bold">
                <v-icon style="font-size: 70px" color="#000" class="">
                  mdi-circle-small
                </v-icon>
                <span class="ml-n5">Будни</span>
              </span>
              <span class="font-weight-bold primary--text">
                <v-icon style="font-size: 70px" color="primary" class="">
                  mdi-circle-small
                </v-icon>
                <span class="ml-n5"> Выходные </span>
              </span>
            </div>
          </v-col>
        </v-row>
        <v-row dense class="mt-5" v-show="premises_tab != 0">
          <v-col
            cols="12"
            class="mb-2"
            v-for="(item, i) in others_services"
            :key="i"
          >
            <ArenaServiceCard
              :data="item"
              :arenaId="arenaId"
            ></ArenaServiceCard>
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import ArenaServiceCard from "@/components/Arena/ArenaServiceCard";

export default {
  components: {
    ArenaServiceCard,
  },
  computed: {
    ...mapState(["katokPL"]),
    ...mapGetters(["others_services"]),
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
    this.$store.dispatch("getPriceListKatok");
    const arenaId = this.$route.params.id;
    this.arenaId = arenaId;
  },
  name: "PaymentPortal",
  data() {
    return {
      premises_tab: null,
      premises_nav: ["аренда", "прочее"],
      arenaId: "",
    };
  },
};
</script>

<style></style>
