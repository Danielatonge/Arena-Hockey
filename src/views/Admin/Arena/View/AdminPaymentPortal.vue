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
            v-for="(item, i) in rentServices"
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
            v-for="(item, i) in otherServices"
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
import { mapState, mapGetters } from "vuex";

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
    userId: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState("arena", ["services"]),
    ...mapGetters("arena", ["rentServices", "otherServices"]),
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
    this.$store.dispatch("arena/getServices", this.arenaId);
  },
  data() {
    return {
      premises_tab: null,
      premises_nav: ["аренда", "прочее"],
    };
  },
  methods: {},
};
</script>

<style></style>
