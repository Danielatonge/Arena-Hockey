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
              path: `/admin/sport_complex/${arenaId}/edit/payment_portal/create_service`,
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
                  <v-row>
                    <v-col cols="6">
                      <div style="position: absolute; top: 0px; right: 0px">
                        <v-icon
                          class="mr-2"
                          @click="
                            $router.push({
                              path: `/admin/sport_complex/${arenaId}/edit/payment_portal/${item.id}`,
                            })
                          "
                        >
                          mdi-pencil-outline
                        </v-icon>
                        <v-icon class="ml-2" @click="deleteService(item.id)">
                          mdi-delete-outline
                        </v-icon>
                      </div>
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
                          color="grey"
                          large
                          elevation="0"
                          @click="
                            $router.push({
                              path: `/admin/sport_complex/${arenaId}/edit/schedule_event`,
                            })
                          "
                        >
                          Забронировать
                        </v-btn>
                      </v-card-actions>
                    </v-col>
                  </v-row>
                </div>
              </v-card>
              <v-row v-if="item.price.length">
                <v-col
                  cols="2"
                  class="text-center border"
                  v-for="(itm, indx) in item.price"
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
              <div class="mt-4">
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
              </div>
            </v-col>
          </v-row>
          <div v-show="value_tab == 1">
            <div v-for="(item, i) in otherService" :key="i">
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
                  <v-row>
                    <v-col cols="6">
                      <div style="position: absolute; top: 0px; right: 0px">
                        <v-icon
                          class="mr-2"
                          @click="
                            $router.push({
                              path: `/admin/sport_complex/${arenaId}/edit/payment_portal/${item.id}`,
                            })
                          "
                          >mdi-pencil-outline
                        </v-icon>
                        <v-icon class="ml-2" @click="deleteService(item.id)"
                          >mdi-delete-outline
                        </v-icon>
                      </div>
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
                          color="grey"
                          large
                          elevation="0"
                          @click="
                            $router.push({
                              path: `/admin/sport_complex/${arenaId}/edit/schedule_event`,
                            })
                          "
                        >
                          Забронировать
                        </v-btn>
                      </v-card-actions>
                    </v-col>
                  </v-row>
                </div>
              </v-card>
            </div>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
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
      this.$store.dispatch("setCurrentPL", service.price);
      this.$router.push({
        path: `/admin/sport_complex/${this.arenaId}/edit/payment_portal/price_list/${service.id}`,
      });
    },
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
      });
    },
    deleteService(serviceId) {
      axios
        .delete(`/service/${serviceId}`)
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
