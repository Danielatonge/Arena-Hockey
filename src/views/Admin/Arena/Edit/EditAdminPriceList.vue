<template>
  <div class="grey lighten-4">
    <v-container class="pb-10">
      <v-row class="">
        <div>
          <v-breadcrumbs :items="breadcrumb_items" class="px-3"></v-breadcrumbs>
        </div>
      </v-row>
      <div>
        <div class="text-h5 py-5">Изменить прайс-лист</div>
        <div class="mb-4">
          <v-row>
            <v-col cols="3" md="2" class="my-auto"> </v-col>
            <v-col cols="4" md="3">
              <div class="body-2 grey--text">Цена в будние дни (за час)</div>
            </v-col>
            <v-col cols="5" md="3">
              <div class="body-2 grey--text">Цена в выходные дни (за час)</div>
            </v-col>
          </v-row>
          <v-row class="mt-n4" v-for="(item, i) in currentPL" :key="i">
            <admin-arena-price
              @deleteTimeframe="deleteTimeframe"
              :position="i"
              :data="item"
            ></admin-arena-price>
          </v-row>
          <v-row>
            <v-col cols="3" md="2" class="my-auto"> </v-col>
            <v-col cols="4" md="3">
              <v-dialog v-model="dialog" max-width="600">
                <template v-slot:activator="{ on, attrs }">
                  <div
                    class="body-2 font-weight-bold primary--text"
                    v-bind="attrs"
                    v-on="on"
                  >
                    + Добавить промежуток
                  </div>
                </template>

                <v-card class="py-3">
                  <v-card-title class="justify-space-between">
                    <div class="text-h5 black--text">Добавить промежуток</div>
                    <div class="mb-4">
                      <v-icon @click.stop="dialog = false">mdi-close</v-icon>
                    </div>
                  </v-card-title>
                  <v-card-text>
                    <div class="mb-4 d-flex">
                      <v-select
                        v-model="timeframe.begin"
                        :items="beginTime"
                        solo
                        dense
                        class="mr-3"
                        outlined
                        flat
                        hide-details="auto"
                      ></v-select>
                      <v-select
                        v-model="timeframe.end"
                        :items="endTime"
                        class="ml-3"
                        solo
                        dense
                        outlined
                        flat
                        hide-details="auto"
                      ></v-select>
                    </div>
                    <div class="mb-4">
                      <v-text-field
                        label="Цена в будние дни (за час)"
                        outlined
                        flat
                        dense
                        hide-details="auto"
                        class="rounded-lg"
                        v-model="timeframe.weekday"
                      ></v-text-field>
                    </div>
                    <div class="mb-4">
                      <v-text-field
                        label="Цена в выходные дни (за час)"
                        outlined
                        flat
                        dense
                        hide-details="auto"
                        class="rounded-lg"
                        v-model="timeframe.weekend"
                      ></v-text-field>
                    </div>
                  </v-card-text>
                  <v-card-actions class="mt-n6 mx-2">
                    <v-btn
                      class="body-2 px-4"
                      @click="dialog = false"
                      elevation="0"
                    >
                      Назад
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                      elevation="0"
                      color="primary"
                      class="body-2 px-4"
                      @click="addTimeInterval"
                    >
                      Добавить
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
            <v-col cols="5" md="3">
              <div class="body-2"></div>
            </v-col>
          </v-row>
        </div>

        <div class="mb-4 d-flex flex-wrap">
          <v-btn class="mr-4 mb-2 my-auto" color="grey lighten-2" elevation="0">
            Обратить в тех. поддержку
          </v-btn>
          <v-btn
            class="mr-8 mb-2 primary my-auto"
            elevation="0"
            @click="savePriceList"
          >
            Сохранить
          </v-btn>
          <div class="my-auto mr-2">Применить с числа:</div>
          <div style="width: 200px">
            <v-select
              dense
              single-line
              outlined
              prepend-inner-icon="mdi-calendar-blank"
              hide-details
              class="ma-2 white d-flex"
              label="Дата"
            ></v-select>
          </div>
        </div>
        {{currentPL}}
      </div>
    </v-container>
  </div>
</template>

<script>
import AdminArenaPrice from "@/components/Admin/AdminArenaPrice.vue";
import { mapState } from "vuex";
export default {
  components: { AdminArenaPrice },
  computed: {
    ...mapState(["currentPL"]),
  },
  mounted() {
    const arenaId = this.$route.params.arenaId;
    const serviceId = this.$route.params.serviceId;
    this.arenaId = arenaId;
    this.serviceId = serviceId;
  },
  data() {
    return {
      value_tab: 0,
      dialog: false,
      beginTime: ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"],
      endTime: ["11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
      timeframe: {
        begin: "",
        end: "",
        weekday: "",
        weekend: "",
      },
      arenaId: "",
      serviceId: "",
      service_nav: ["Катки", "Другие помещения"],
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
          text: "Редактирование спортивного комплекса",
          disabled: false,
          href: "/admin/sport_complex",
        },
        {
          text: "Информация",
          disabled: false,
          href: "/admin/sport_complex",
        },
        {
          text: "Изменить прайс-лист",
          disabled: true,
          href: "",
        },
      ],
    };
  },
  methods: {
    deleteTimeframe(position) {
      this.currentPL.splice(position, 1);
    },
    addTimeInterval() {
      const data = this.timeframe;
      const price = {
        startTime: data.begin,
        endTime: data.end,
        weekdayPrice: Number(data.weekday),
        HolidayPrice: Number(data.weekend),
        serviceId: this.serviceId,
      };
      this.currentPL.push(price);
      this.dialog = false;
      console.log(price);
      // this.$store.dispatch("adminAddPrice", price).then((res) => {
      //   console.log("adminAddPrice", res.data)
      //   this.currentPL.push(price);
      //   this.dialog = false;
      // });
    },
    savePriceList() {
      const currentPL = this.currentPL;
      this.$store
        .dispatch("savePriceList", {price: currentPL, serviceId: this.serviceId })
        .then(() => {
          this.$router.push({path: `/admin/sport_complex/${this.arenaId}/payment_portal/edit`});
        });
    },
  },
};
</script>

<style>
</style>