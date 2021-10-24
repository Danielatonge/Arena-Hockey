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
        <v-row dense class="mt-5" v-show="premises_tab === 0">
          <v-col
            cols="12"
            class="mb-4"
            v-for="(item, i) in rentedService"
            :key="i"
          >
            <ArenaPaymentCard :item="item" :arenaId="arenaId">
              <template #price-list="{ prices }">
                <v-row v-if="prices.length">
                  <v-col
                    cols="2"
                    class="text-center border"
                    v-for="(itm, indx) in prices"
                    :key="indx"
                  >
                    <div class="mb-3 grey--text">
                      {{ itm.startTime + " - " + itm.endTime }}
                    </div>
                    <div class="right-border mr-n3">
                      <p class="mb-0">{{ itm.weekdayPrice }}</p>
                      <p class="primary--text">
                        {{ itm.holidayPrice }}
                      </p>
                    </div>
                  </v-col>
                </v-row>
                <div class="mt-n8" v-show="prices.length">
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
              </template>
            </ArenaPaymentCard>
          </v-col>
        </v-row>
        <v-row dense class="mt-5" v-show="premises_tab === 1">
          <v-col
            cols="12"
            class="mb-2"
            v-for="(item, i) in otherService"
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
import ArenaServiceCard from "@/components/Arena/ArenaServiceCard";
import ArenaPaymentCard from "@/components/Arena/ArenaPaymentCard";
import axios from "axios";

export default {
  components: {
    ArenaServiceCard,
    ArenaPaymentCard,
  },
  computed: {
    rentedService() {
      return this.services.filter((x) => x.serviceType === "RENT");
    },
    otherService() {
      return this.services.filter((x) => x.serviceType === "OTHER");
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
    const arenaId = this.$route.params.id;
    this.arenaId = arenaId;

    this.fetchArenaServices(this.arenaId).then((services) => {
      this.fetchServicePriceList(services);
    });
  },
  name: "PaymentPortal",
  data() {
    return {
      premises_tab: null,
      premises_nav: ["аренда", "прочее"],
      arenaId: "",
      services: [],
    };
  },
  methods: {
    async fetchArenaServices(arenaId) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/arena/${arenaId}/services`)
          .then((response) => {
            resolve(response.data);
          })
          .catch((err) => reject(err));
      });
    },
    async fetchServicePriceList(serviceList) {
      let priceList = [];
      let final = [];
      serviceList.forEach((x) => {
        priceList.push(
          axios
            .get(`/service/${x.id}/prices`)
            .then((response) => {
              let nItem = {
                ...x,
                price: response.data,
              };
              final.push(nItem);
            })
            .catch((err) => {
              console.log(err);
            })
        );
      });

      Promise.all(priceList).then(() => {
        this.services = final;
        console.log(this.services);
      });
    },
  },
};
</script>

<style></style>
