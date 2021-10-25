<template>
  <div>
    <div>
      <div class="text-h4 pb-5">Платные услуги</div>
      <!--      <div class="mb-4">-->
      <!--        <v-btn class="mr-2 mb-2" color="grey lighten-2" elevation="0">-->
      <!--          Обратить в тех. поддержку-->
      <!--        </v-btn>-->
      <!--        <v-btn class="mr-2 mb-2" color="grey lighten-2" elevation="0">-->
      <!--          Вернуться к просмотру-->
      <!--        </v-btn>-->
      <!--      </div>-->
      <div class="mb-4">
        <v-btn
          color="primary"
          elevation="0"
          large
          @click="
            $router.push({
              name: 'create-admin-service',
              params: { arenaId },
            })
          "
        >
          Добавить новую услугу
        </v-btn>
      </div>
      <v-tabs v-model="value_tab" class="d-flex flex-no-wrap rounded-lg">
        <v-tab class="px-6" v-for="item in service_nav" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="value_tab" style="background-color: unset">
        <v-tab-item v-for="i in 2" :key="i">
          <v-row dense v-show="value_tab == 0">
            <v-col
              cols="12"
              class="mb-4"
              v-for="item in rentedService"
              :key="item.id"
            >
              <ArenaPaymentCard :item="item" :arenaId="arenaId">
                <template #edit-delete>
                  <div style="position: absolute; top: 0px; right: 0px">
                    <v-icon class="mr-2" @click="goToEdit(item.id)">
                      mdi-pencil-outline
                    </v-icon>
                    <v-icon class="ml-2" @click="deleteService(item.id)">
                      mdi-delete-outline
                    </v-icon>
                  </div>
                </template>
                <template #pricelist>
                  <v-btn
                    color="primary"
                    elevation="0"
                    @click="goToModifyList(item)"
                  >
                    {{
                      item.price.length
                        ? "ИЗМЕНИТЬ ПРАЙС-ЛИСТ"
                        : "ДОБАВИТЬ ПРАЙС-ЛИСТ"
                    }}
                  </v-btn>
                </template>
              </ArenaPaymentCard>
            </v-col>
          </v-row>
          <div v-show="value_tab == 1">
            <div v-for="(item, i) in otherService" :key="i">
              <ArenaPaymentCard :item="item" :arenaId="arenaId">
                <template #edit-delete>
                  <div style="position: absolute; top: 0px; right: 0px">
                    <v-icon class="mr-2" @click="goToEdit(item.id)">
                      mdi-pencil-outline
                    </v-icon>
                    <v-icon class="ml-2" @click="deleteService(item.id)">
                      mdi-delete-outline
                    </v-icon>
                  </div>
                </template>
              </ArenaPaymentCard>
            </div>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ArenaPaymentCard from "@/components/Arena/ArenaPaymentCard";
export default {
  components: { ArenaPaymentCard },
  computed: {
    rentedService() {
      return this.services.filter((x) => x.serviceType === "RENT");
    },
    otherService() {
      return this.services.filter((x) => x.serviceType === "OTHER");
    },
  },
  mounted() {
    this.arenaId = this.$route.params.id;
    this.fetchArenaServices(this.arenaId).then((services) => {
      this.fetchServicePriceList(services);
    });
  },
  data() {
    return {
      value_tab: 0,
      service_nav: ["аренда", "прочее"],
      arenaId: "",
      breadcrumb_items: [
        {
          text: "Личный кабинет",
          disabled: false,
          href: "/",
        },
        {
          text: "Мои спортивные комплексы",
          disabled: false,
          href: "/admin/sport_complex",
        },
        {
          text: "Название комплекса",
          disabled: false,
          href: "/admin/sport_complex",
        },
        {
          text: "Платные услуги",
          disabled: true,
          href: "",
        },
      ],
      price_list: [
        { interval: "06:00–08:30", weekday: "8 000", weekend: "10 000" },
        { interval: "08:30–15:00", weekday: "8 000", weekend: "10 000" },
        { interval: "15:00–17:00", weekday: "8 000", weekend: "10 000" },
        { interval: "17:00–19:00", weekday: "10 000", weekend: "10 000" },
        { interval: "19:00–22:30", weekday: "12 000", weekend: "10 000" },
        { interval: "22:30–00:00", weekday: "10 000", weekend: "10 000" },
      ],
      services: [],
    };
  },
  methods: {
    goToModifyList(service) {
      this.$store.dispatch("arena/setCurrentPL", service.price); //TODO: understand whats going on
      this.$router.push({
        name: "edit-admin-pricelist",
        params: { arenaId: this.arenaId, serviceId: service.id },
      });
    },
    async fetchArenaServices(arenaId) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/arena/${arenaId}/services`) // TODO : transfer to vuex
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
      });
    },
    goToEdit(serviceId) {
      this.$router.push({
        name: "edit-admin-service",
        params: { arenaId: this.arenaId, serviceId },
      });
    },
    deleteService(serviceId) {
      axios
        .delete(`/service/${serviceId}`) //TODO: Vuex store
        .then((response) => {
          console.log(response.data);
          this.services = this.services.filter((x) => x.id !== serviceId);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style></style>
