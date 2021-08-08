<template>
  <div>
    <p class="text-h4">Платные услуги</p>
    <v-tabs v-model="premises_tab" class="d-flex flex-no-wrap rounded-lg">
      <v-tab v-for="item in premises_nav" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="premises_tab" style="background-color: unset">
      <v-tab-item v-for="i in 2" :key="i">
        <v-row dense class="mt-5" v-show="premises_tab == 0">
          <v-col
            cols="12"
            class="mb-4"
            v-for="(item, i) in katok_services"
            :key="i"
          >
            <v-card color="transparent" elevation="0">
              <div class="d-flex flex-no-wrap">
                <div class="ma-3" width="282px" height="186px">
                  <v-img src="@/assets/preview_arena_1.jpg"></v-img>
                </div>
                <div class="description">
                  <v-card-text>
                    <div class="text-h5 mb-4">{{ item.title }}</div>
                    <div class="body-1 grey--text mb-3">
                      {{ item.miniDescription | descriptionLength }}
                    </div>
                    <div class="body-1 blue--text">{{ item.phone }}</div>
                  </v-card-text>
                  <v-card-actions class="pl-4 bottom">
                    <v-btn class="px-6" color="primary" x-large elevation="0">
                      <router-link
                        :to="`/arena/${arenaId}/event_schedule/${item.id}`"
                        class="reset-link"
                      >
                        Забронировать
                      </router-link>
                    </v-btn>
                  </v-card-actions>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <v-row dense class="mt-5" v-show="premises_tab != 0">
          <v-col cols="12" class="mb-2" v-for="(item, i) in others_services" :key="i">
            <ArenaServiceCard
              :data="item"
              :arenaId="arenaId"
            ></ArenaServiceCard>
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs-items>
    <p class="text-h6 mt-10">Прайс-лист</p>
    <p class="grey--text">Цены указаны за 1 час аренды</p>

    <div v-for="(item, i) in katok_services"
            :key="i">
      <p class="text-h4 mt-8 mb-0"> {{item.title}} </p>
      <p class="grey--text"> {{item.miniDescription}} </p>
      <v-row>
        <v-col
          cols="2"
          class="text-center border"
          v-for="(item, indx) in price_list"
          :key="indx"
        >
          <div class="mb-3 grey--text">{{ item.interval }}</div>
          <div class="right-border mr-n3">
            <p class="mb-0">{{ item.weekday }}</p>
            <p class="primary--text">{{ item.weekend }}</p>
          </div>
        </v-col>
      </v-row>
      <div class="mt-n8">
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
    </div>

    <div class="mt-5">
      <v-btn color="primary" elevation="0" class="mr-3"> Забронировать </v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ArenaServiceCard from "@/components/Arena/ArenaServiceCard";
export default {
  components: {
    ArenaServiceCard,
  },
  computed: {
    ...mapGetters(["katok_services", "others_services"]),
  },
  mounted() {
    this.arenaId = this.$route.params.id;
  },
  name: "PaymentPortal",
  data() {
    return {
      premises_tab: null,
      premises_nav: ["Катки", "Другие"],
      elevation: 0,
      arenaId: "",
      price_list: [
        { interval: "06:00–08:30", weekday: "8 000", weekend: "10 000" },
        { interval: "08:30–15:00", weekday: "8 000", weekend: "10 000" },
        { interval: "15:00–17:00", weekday: "8 000", weekend: "10 000" },
        { interval: "17:00–19:00", weekday: "10 000", weekend: "10 000" },
        { interval: "19:00–22:30", weekday: "12 000", weekend: "10 000" },
        { interval: "22:30–00:00", weekday: "10 000", weekend: "10 000" },
      ],
    };
  },
};
</script>

<style>

</style>