<template>
  <div>
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

        <!--        <v-btn icon class="ma-2" @click="$refs.calendar.prev()">-->
        <!--          <v-icon>mdi-chevron-left</v-icon>-->
        <!--        </v-btn>-->
        <!--        <v-btn icon class="ma-2" @click="$refs.calendar.next()">-->
        <!--          <v-icon>mdi-chevron-right</v-icon>-->
        <!--        </v-btn>-->
      </v-sheet>
      <v-sheet  height="600" class="px-4 pb-4 overflow-auto">
        <v-calendar
          v-show="value !== 3"
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
        <div v-show="value === 3 && arena_events.length === 0" class="text-center">
          <h3 class="grey--text lighten-3--text text-h6 mb-2">Нет мероприятий</h3>
        </div>
        <div v-show="value === 3" v-for="(event,index) in arena_events" :key="index"
          class="mb-10 pl-5">
          <div class="grey--text lighten-3--text text-h6 mb-2">
            {{event.date}}
          </div>
          <div class="text-h6 mb-2 font-weight-bold">{{event.title}} </div>
          <div class="body-1 blue--text mb-2">
            {{event.type}}
          </div>
          <div class="grey--text">
            {{event.startTime}}
          </div>
          <div class="body-1 blue--text mb-2 pt-4">
            {{event.phone}}
          </div>
        </div>
      </v-sheet>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  watch: {
    value(x) {
      if (x === 0) this.type = "day";
      if (x === 1) this.type = "week";
      if (x === 2) this.type = "month";
    },
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
  computed: {
    ...mapState(["current_arena", "arena_events"]),
  },
  created() {
    const arenaId = this.$route.params.id;
    this.arenaId = arenaId;
    this.$store.dispatch("getArenaEvents", arenaId);
  },
  data() {
    return {
      type: "week",
      schedule_nav: ["Дневное", "Недельное", "Месячное", "Список мероприятий"],
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
      arenaId: ''
    };
  },
  methods: {
    intervalFormat(interval) {
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
.vertical-scroll {
  overflow: auto;
}
</style>
