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
              <ArenaChosen
                :arena="arena"
                :index="i"
                @arenaRemoved="reInitCalendar"
              />
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
            @click:event="showEvent"
            :categories="categories"
            :events="events"
            :event-overlap-mode="mode"
            :event-overlap-threshold="30"
            :event-color="getEventColor"
            :interval-format="intervalFormat"
          ></v-calendar>
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card color="grey lighten-4" min-width="350px" flat>
              <v-toolbar :color="selectedEvent.color" dark>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <span v-html="selectedEvent.description"></span>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="secondary" @click="selectedOpen = false">
                  Закрыть
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
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
    ...mapState(["selected_arena", "selected_arena_events"]),
  },
  data() {
    return {
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
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
      categories: [],
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
    generateEvents() {
      let _events = [];
      const arenaCount = this.selected_arena.length;
      for (let i = 0; i < arenaCount; i++) {
        const eventCount = this.selected_arena_events[i]
          ? this.selected_arena_events[i].length
          : 0;
        for (let j = 0; j < eventCount; j++) {
          const event = this.selected_arena_events[i][j];

          _events.push({
            name: event.title,
            start: new Date(
              `${event.date}T${event.startTime ? event.startTime : "00:00"}:00`
            ),
            end: new Date(
              `${event.date}T${event.endTime ? event.endTime : "23:59"}:59`
            ),
            color: this.colors[this.rnd(0, this.colors.length - 1)],
            timed: true,
            description: event.description,
            category: this.categories[i],
          });
        }
      }
      this.events = _events;
    },
    reInitCalendar() {
      this.categories = this.selected_arena.map((x) => x.title);
      this.generateEvents();
    },
    getEventColor(event) {
      return event.color;
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }
      nativeEvent.stopPropagation();
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
  mounted() {
    this.$store.dispatch("getEventsFromSelectedArena");
    this.categories = this.selected_arena.map((x) => x.title);
    this.generateEvents();
  },
};
</script>

<style></style>
