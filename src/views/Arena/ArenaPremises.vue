<template>
  <div class="grey lighten-4">
    <v-img
      color="grey"
      height="450px"
      width="100%"
      src="@/assets/banner-arena.jpg"
    >
      <v-container class="pt-8 pb-0">
        <v-row class="">
          <div>
            <v-breadcrumbs
              dark
              :items="breadcrumb_items"
              class="px-3"
            ></v-breadcrumbs>
          </div>
          <v-spacer></v-spacer>
          <div class="pr-3 my-auto">
            <v-btn
              elevation="0"
              x-small
              color="transparent"
              height="40px"
              class="mr-1"
            >
              <v-icon color="white">mdi-whatsapp</v-icon>
            </v-btn>
            <v-btn
              elevation="0"
              x-small
              color="transparent"
              height="40px"
              class="mx-1"
            >
              <v-icon color="white">mdi-instagram</v-icon>
            </v-btn>
            <v-btn
              elevation="0"
              x-small
              color="transparent"
              height="40px"
              class="mx-1"
            >
              <v-icon color="white">mdi-vk</v-icon>
            </v-btn>
            <v-btn
              elevation="0"
              x-small
              color="transparent"
              height="40px"
              class="ml-1"
            >
              <v-icon color="white">mdi-web</v-icon>
            </v-btn>
          </div>
        </v-row>
        <div class="margin-top-big">
          <v-row class="mb-3">
            <v-col cols="12" sm="6" md="7" lg="5">
              <p class="text-h4 white--text">Название помещения</p>
              <p class="white--text">Краткое описание помещения</p>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
          <v-btn color="primary" elevation="0">Забронировать</v-btn>
        </div>
      </v-container>
    </v-img>
    <v-container>
      <v-row>
        <v-col cols="12">
          <div>
            <p class="text-h4 mt-5">Забронировать помещение</p>
            <div class="rounded-lg white">
              <v-sheet tile height="54" class="d-flex" color="#EBF5FB">
                <div style="width: 200px">
                  <v-select
                    v-model="currentDay"
                    dense
                    single-line
                    outlined
                    prepend-inner-icon="mdi-calendar-blank"
                    hide-details
                    class="ma-2 white d-flex"
                    label="23.09.2021, пн"
                  ></v-select>
                </div>
                <v-spacer></v-spacer>

                <div style="width: 280px" class="d-flex">
                  <div class="my-auto">Повторять:</div>
                  <v-select
                    v-model="mode"
                    :items="mode_lesson"
                    dense
                    single-line
                    outlined
                    hide-details
                    label="Вторник, четверг"
                    class="ma-2 white"
                  ></v-select>
                </div>
                <div style="width: 160px">
                  <v-select
                    v-model="mode"
                    :items="mode_lesson"
                    dense
                    single-line
                    outlined
                    hide-details
                    label="Единоразово"
                    class="ma-2 white"
                  ></v-select>
                </div>
              </v-sheet>
              <v-sheet tile height="54" class="d-flex">
                <div></div>
                <v-spacer></v-spacer>

                <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn icon class="ma-2" @click="$refs.calendar.next()">
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </v-sheet>
              <v-sheet height="600" class="px-4">
                <v-calendar
                  ref="calendar"
                  v-model="value"
                  :weekdays="weekday"
                  :type="'week'"
                  :events="events"
                  :event-overlap-mode="mode"
                  :event-overlap-threshold="30"
                ></v-calendar>
              </v-sheet>
              <div class="pa-4">
                <v-btn class="mr-3" color="primary" elevation="0">
                  Забронировать за 16 000 РУБ
                </v-btn>
                <v-btn elevation="0">Расписание мероприятий</v-btn>
              </div>
            </div>

            <p class="text-h4 mt-10">Описание</p>
            <p class="">
              Следж-хоккей или хоккей на санях — командная спортивная игра на
              льду, паралимпийская версия классического хоккея. Игра заключается
              в противоборстве на специальных санях двух команд, которые,
              передавая шайбу клюшками, стремятся забросить её наибольшее
              количество раз в ворота соперника и не пропустить в свои.
              Побеждает команда, забросившая наибольшее количество шайб в ворота
              соперника. Следж-хоккей входит в программу зимних Паралимпийских
              игр.
            </p>
            <p>
              Следж-хоккей играют очень важную роль в социальной реабилитации
              детей и молодежи с различными нарушениями здоровья.
            </p>

            <v-row class="mt-10">
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
            <p class="text-h5 font-weight-bold mt-10">Галерея</p>
            <v-row>
              <v-col
                cols="6"
                md="4"
                lg="3"
                v-for="(item, i) in gallery_items"
                :key="i"
              >
                <v-img :src="require('@/assets' + item + '.jpg')"></v-img>
              </v-col>
            </v-row>

            <p class="text-h5 font-weight-bold mt-10">Другие помещений</p>
            <v-tabs
              v-model="premises_tab"
              class="d-flex flex-no-wrap rounded-lg"
            >
              <v-tab v-for="item in premises_nav" :key="item">
                {{ item }}
              </v-tab>
            </v-tabs>

            <v-tabs-items
              v-model="premises_tab"
              style="background-color: unset"
            >
              <v-tab-item v-for="item in premises_nav" :key="item">
                <v-row dense class="mx-n4 mt-5">
                  <v-col cols="12" v-for="i in 3" :key="i">
                    <v-card color="transparent" elevation="0">
                      <div class="d-flex flex-no-wrap">
                        <div class="ma-3" width="282px" height="186px">
                          <v-img src="@/assets/preview_arena_1.jpg"></v-img>
                        </div>
                        <div class="description">
                          <v-card-text>
                            <div class="text-h4 mb-4">Название катка 1</div>
                            <div class="body-1 grey--text mb-3">
                              Краткое описание катка
                            </div>
                            <div class="body-1 blue--text">
                              +7 (123) 234-15-23
                            </div>
                          </v-card-text>
                          <v-card-actions class="pl-4 bottom">
                            <v-btn
                              class="px-6"
                              color="primary"
                              x-large
                              elevation="0"
                            >
                              Забронировать
                            </v-btn>
                            <v-btn
                              class="px-6"
                              color="grey lighten-2"
                              x-large
                              elevation="0"
                            >
                              Подробнее
                            </v-btn>
                          </v-card-actions>
                        </div>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
              </v-tab-item>
            </v-tabs-items>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "ArenaTeamList",
      premises_tab: null,
      premises_nav: ["Катки", "Бросковые зоны", "Спортивные залы"],
      breadcrumb_items: [
        {
          text: "Москва",
          disabled: false,
          href: "breadcrumbs_link_1",
        },
        {
          text: "Название арены",
          disabled: false,
          href: "breadcrumbs_dashboard",
        },
        {
          text: "Название помещения",
          disabled: true,
          href: "",
        },
      ],
      gallery_items: [
        "/gallery_1",
        "/gallery_2",
        "/gallery_3",
        "/gallery_4",
        "/gallery_5",
        "/gallery_6",
        "/gallery_7",
        "/gallery_8",
      ],
      price_list: [
        { interval: "06:00–08:30", weekday: "8 000", weekend: "10 000" },
        { interval: "08:30–15:00", weekday: "8 000", weekend: "10 000" },
        { interval: "15:00–17:00", weekday: "8 000", weekend: "10 000" },
        { interval: "17:00–19:00", weekday: "10 000", weekend: "10 000" },
        { interval: "19:00–22:30", weekday: "12 000", weekend: "10 000" },
        { interval: "22:30–00:00", weekday: "10 000", weekend: "10 000" },
      ],
      currentDay: "23.09.2021, пн",
      mode: "column",
      mode_lesson: ["0", "1", "2"],
      weekday: [0, 1, 2, 3, 4, 5, 6],
      value: "",
      events: [],
      colors: [
        "blue",
        "indigo",
        "deep-purple",
        "cyan",
        "green",
        "orange",
        "grey lighten-1",
      ],
      names: [
        "Meeting",
        "Holiday",
        "PTO",
        "Travel",
        "Event",
        "Birthday",
        "Conference",
        "Party",
      ],
    };
  },
  methods: {},
};
</script>

<style>
</style>