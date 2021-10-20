<template>
  <div>
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
            <slot name="edit-delete"></slot>

            <v-card-text>
              <div class="text-h5 mb-4">
                {{ item.title }}
                <span class="body-1 ml-4" v-show="item.length * item.width">
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
      <slot name="pricelist"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArenaPaymentCard",
  props: {
    item: {
      type: Object,
      required: true,
    },
    arenaId: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>
