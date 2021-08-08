<template>
  <div class="grey lighten-4">
    <v-container class="pt-8 pb-0">
      <v-row>
        <div>
          <v-breadcrumbs :items="breadcrumb_items" class="px-3"></v-breadcrumbs>
        </div>
      </v-row>
      <v-row class="mb-3">
        <v-col cols="12">
          <p class="text-h5">Выбранные арены</p>
          <p class="grey--text" v-show="false">
            Нет выбранных арен. Чтобы добавить арену, нажмите на значок добавить
            на карточке арены.
          </p>
          <v-row>
            <v-col cols="4" v-for="i in 3" :key="i">
              <ArenaChosen />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-btn color="primary" elevation="0">Добавить арену</v-btn>
    </v-container>
    <v-container class="mt-14">
      <p class="text-h4">Расписание мероприятий</p>
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

          <v-spacer></v-spacer>
          <v-btn class="ma-2" color="primary" elevation="0">
            Загрузить расписание
          </v-btn>
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
            :type="'4day'"
            :events="events"
            :event-overlap-mode="mode"
            :event-overlap-threshold="30"
            :event-color="getEventColor"
            @change="getEvents"
          ></v-calendar>
        </v-sheet>
      </div>
    </v-container>
  </div>
</template>

<script>
import ArenaChosen from "@/components/Arena/ArenaChosen.vue";
export default {
  components: { ArenaChosen },
  data() {
    return {
      breadcrumb_items: [
        {
          text: "Ледовые дворцы и арены",
          disabled: false,
          href: "/arena",
        },
        {
          text: "Расписание мероприятий",
          disabled: true,
          href: "/event_schedule",
        },
      ],
      dialog: false,
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
  methods: {
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
          return "Каток 1";
        case 1:
          return "Каток 1";
        case 2:
          return "Каток 1";
        case 3:
          return "Каток 2";
        case 4:
          return "Каток 3";
        case 5:
          return "Каток 4";
        case 6:
          return "Каток 5";
        case 7:
          return "Каток 6";
        default:
          return "Каток";
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