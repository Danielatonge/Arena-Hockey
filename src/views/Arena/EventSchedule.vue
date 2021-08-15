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
              <p class="text-h4 white--text">Название арены</p>
              <p class="white--text">
                <v-icon color="white">mdi-map-marker-outline</v-icon> ул.
                Лермонтова, д. 14, пом. 3, г. Чита
              </p>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
          <v-btn color="primary mr-4 mt-4" elevation="0">Забронировать</v-btn>
          <v-btn class="mt-4" dark outlined elevation="0">Как проехать?</v-btn>
        </div>
      </v-container>
    </v-img>
    <v-container class="">
      <div>
        <v-breadcrumbs
          :items="breadcrumb_event_page"
          class="px-0"
        ></v-breadcrumbs>
      </div>
      <p class="text-h4">Расписание мероприятий</p>
      <div class="rounded-lg white">
        <v-row class="mt-2 ml-0 mb-0">
          <v-tabs v-model="value" class="d-flex flex-no-wrap rounded-lg">
            <v-tab class="px-10" v-for="item in schedule_nav" :key="item">
              {{ item }}
            </v-tab>
          </v-tabs>
        </v-row>
        <v-sheet tile height="74" class="d-flex align-center" color="#EBF5FB">
          <div style="width: 200px">
            <v-select
              v-model="currentDay"
              dense
              single-line
              outlined
              prepend-inner-icon="mdi-calendar-blank"
              hide-details
              class="ma-2 white d-flex"
              label="Дата"
            ></v-select>
          </div>
          <div style="width: 200px">
            <v-select
              v-model="mode"
              :items="mode_lesson"
              dense
              single-line
              outlined
              hide-details
              label="Все виды занятий"
              class="ma-2 white"
            ></v-select>
          </div>
          <div style="width: 200px">
            <v-select
              v-model="mode"
              :items="mode_lesson"
              dense
              single-line
              outlined
              hide-details
              label="Каток 1"
              class="ma-2 white"
            ></v-select>
          </div>

          <v-spacer></v-spacer>
          <!-- <v-btn class="ma-2" color="primary" elevation="0">
            Загрузить расписание
          </v-btn> -->
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
        <v-sheet height="600" class="px-4 pb-4">
          <v-calendar
            ref="calendar"
            v-model="value"
            :weekdays="weekday"
            :weekday-format="myDayFormat"
            :type="type"
            :events="events"
            :event-overlap-mode="mode"
            :event-overlap-threshold="30"
            :event-color="getEventColor"
            :interval-format="intervalFormat"
            @change="getEvents"
          ></v-calendar>
        </v-sheet>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  watch: {
    value(x) {
      this.type = x == 1 ? "week" : "day";
    },
  },
  mounted() {
    let UrlString = this.$route.path;
    let returnUrl = UrlString.split("/");
    this.breadcrumb_event_page = [
      {
        text: "Ледовая арена",
        disabled: false,
        to: { path: `/${returnUrl[1]}/${returnUrl[2]}/information` },
        exact: true,
      },
      {
        text: "Расписание мероприятий",
        disabled: true,
        href: "/event_schedule",
      },
    ];
  },
  data() {
    return {
      type: "week",
      schedule_nav: ["Дневное", "Недельное"],
      breadcrumb_event_page: null,
      currentDay: "23.09.2021, пн",
      mode: "column",
      mode_lesson: ["0", "1", "2"],
      weekday: [0, 1, 2, 3, 4, 5, 6],
      value: 1,
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
  methods: {
    intervalFormat(interval){
      return interval.time;
    },
    getEvents({ start, end }) {
      const events = [];

      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 20);

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay,
        });
      }

      this.events = events;
    },
    myDayFormat(day) {
      switch (day.weekday) {
        case 0:
          return "ПН";
        case 1:
          return "ВТ";
        case 2:
          return "СР";
        case 3:
          return "ЧТ";
        case 4:
          return "ПТ";
        case 5:
          return "СБ";
        case 6:
          return "ВС";
      }
    },
    getEventColor(event) {
      return event.color;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
};
</script>

<style>
</style>