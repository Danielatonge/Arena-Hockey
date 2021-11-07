<template>
  <div>
    <div>
      <div class="text-h4 pb-5">Изменить прайс-лист</div>
      <div class="mb-4">
        <v-row>
          <v-col cols="3" md="2" class="my-auto"></v-col>
          <v-col cols="4" md="3">
            <div class="body-2 grey--text">Цена в будние дни (за час)</div>
          </v-col>
          <v-col cols="5" md="3">
            <div class="body-2 grey--text">Цена в выходные дни (за час)</div>
          </v-col>
        </v-row>
        <v-row class="mt-n4" v-for="(item, i) in prices" :key="i">
          <admin-arena-price
            @deleteTimeframe="deleteTimeframe"
            :position="i"
            :data="item"
          ></admin-arena-price>
        </v-row>
        <v-row>
          <v-col cols="3" md="2" class="my-auto"></v-col>
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
                  <div class="mb-4 d-flex">
                    <v-spacer></v-spacer>
                    <div class="my-auto mr-2">Применить с числа:</div>
                    <div style="width: 200px">
                      <AppSelectDatePicker :date.sync="showDate" />
                    </div>
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
        <v-btn
          @click="
            $router.push({
              name: 'edit-admin-payment-portal',
              params: { arenaId },
            })
          "
          class="mr-4 mb-2 my-auto"
          color="grey lighten-2"
          elevation="0"
        >
          Назад
        </v-btn>
        <v-btn
          class="mr-8 mb-2 primary my-auto"
          elevation="0"
          @click="
            $router.push({
              name: 'edit-admin-payment-portal',
              params: { arenaId },
            })
          "
        >
          Сохранить
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import AdminArenaPrice from "@/components/Admin/AdminArenaPrice.vue";
import { mapState } from "vuex";
import axios from "axios";
import moment from "moment";

export default {
  components: { AdminArenaPrice },
  props: {
    arenaId: {
      type: String,
      required: true,
    },
    serviceId: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState(["currentPL"]), // Figure out what is happening here
  },
  created() {
    this.fetchPriceList();
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
      service_nav: ["Катки", "Другие помещения"],

      prices: [],
      showDate: moment().format("YYYY-MM-DD"),
    };
  },
  methods: {
    deleteTimeframe(position) {
      const price = this.prices[position];
      axios
        .delete(`https://api-hockey-io.herokuapp.com/price/${price.id}`, price)
        .then(() => {
          console.log("DELETED");
          this.prices.splice(position, 1);
        })
        .catch((err) => console.log(err));
    },
    addTimeInterval() {
      const data = this.timeframe;
      const price = {
        startTime: data.begin,
        endTime: data.end,
        weekdayPrice: Number(data.weekday),
        HolidayPrice: Number(data.weekend),
        serviceId: this.serviceId,
        showDate: this.showDate,
      };
      console.log(price);
      axios
        .post(`https://api-hockey-io.herokuapp.com/price`, price)
        .then((response) => {
          console.log("SET_PRICE", response.data);
          this.prices.push(response.data);
          this.dialog = false;
        })
        .catch((err) => console.log(err));
      this.timeframe = {
        begin: "",
        end: "",
        weekday: "",
        weekend: "",
      };
    },
    fetchPriceList() {
      axios
        .get(`https://api-hockey-io.herokuapp.com/service/${this.serviceId}/prices`) //TODO refactore
        .then((response) => {
          console.log("SET_PRICE", response.data);
          this.prices = response.data;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style></style>
