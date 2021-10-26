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
        <v-row dense class="mt-5" v-show="premises_tab === 0">
          <v-col
            cols="12"
            class="mb-4"
            v-for="(item, i) in rentedService"
            :key="i"
          >
            <ArenaPaymentCard :item="item" :arenaId="arenaId">
            </ArenaPaymentCard>
          </v-col>
        </v-row>
        <v-row dense class="mt-5" v-show="premises_tab !== 0">
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
  props: {
    arenaId: {
      type: String,
      required: true,
    },
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
    this.fetchArenaServices(this.arenaId).then((services) => {
      this.fetchServicePriceList(services);
    });
  },
  name: "PaymentPortal",
  data() {
    return {
      premises_tab: null,
      premises_nav: ["аренда", "прочее"],
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
