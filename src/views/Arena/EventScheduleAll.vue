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
          <p class="grey--text" v-show="!selected_arena.length">
            Нет выбранных арен. Чтобы добавить арену, нажмите на значок добавить
            на карточке арены.
          </p>
          <v-row>
            <v-col cols="4" v-for="(arena, i) in selected_arena" :key="i">
              <ArenaChosen :arena="arena" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-btn @click="$router.push('/arena')" color="primary" elevation="0"
        >Добавить арену
      </v-btn>
    </v-container>
    <v-container class="mt-14">
      <p class="text-h4">Расписание мероприятий</p>
      <div class="rounded-lg white">
        <v-sheet tile height="54" class="d-flex align-center" color="#EBF5FB">
          <div style="width: 200px" class="ml-3">
            <v-menu
              v-model="date_picker"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  prepend-inner-icon="mdi-calendar"
                  readonly
                  single-line
                  outlined
                  dense
                  hide-details
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                @input="date_picker = false"
                locale="ru-RU"
              ></v-date-picker>
            </v-menu>
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
            v-model="date"
            :weekdays="weekday"
            locale="ru-RU"
            type="category"
            category-show-all
            :categories="categories"
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
import ArenaChosen from "@/components/Arena/ArenaChosen.vue";
import { mapState } from "vuex";

export default {
  components: { ArenaChosen },
  computed: {
    ...mapState(["selected_arena", "arena_events"]),
  },
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
      categories: [
        "Каток 1",
        "Каток 2",
        "Каток 3",
        "Каток 4",
        "Каток 5",
        "Каток 6",
        "Каток 10",
        "Каток 20",
        "Каток 30",
        "Каток 40",
        "Каток 50",
        "Каток 60",
      ],
      date_picker: false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
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
          category: this.categories[this.rnd(0, this.categories.length - 1)],
        });
      }

      this.events = events;
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

<style></style>
