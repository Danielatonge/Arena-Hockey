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
              v-for="item in rentServices"
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
            <div v-for="(item, i) in otherServices" :key="i">
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
import ArenaPaymentCard from "@/components/Arena/ArenaPaymentCard";
import { mapState, mapGetters } from "vuex";

export default {
  components: { ArenaPaymentCard },
  props: {
    arenaId: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState("arena", ["services"]),
    ...mapGetters("arena", ["rentServices", "otherServices"]),
  },
  mounted() {
    this.$store.dispatch("arena/getServices", this.arenaId);
  },
  data() {
    return {
      value_tab: 0,
      service_nav: ["аренда", "прочее"],
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
    goToEdit(serviceId) {
      this.$router.push({
        name: "edit-admin-service",
        params: { arenaId: this.arenaId, serviceId },
      });
    },
    deleteService(serviceId) {
      this.$store.dispatch("arena/deleteService", serviceId);
    },
  },
};
</script>

<style></style>
