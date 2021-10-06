<template>
  <div>
    <div class="text-h4 mb-6">Расписание мероприятий</div>
    <div class="mb-4">
      <v-btn class="mr-2 mb-2" color="grey lighten-2" elevation="0">
        Редактировать
      </v-btn>
      <v-btn class="mr-2 mb-2" color="grey lighten-2" elevation="0">
        Посмотреть страницу арены
      </v-btn>
    </div>

    <div class="rounded-lg white">
      <v-row class="mt-2 ml-0 mb-0">
        <v-tabs v-model="value" class="d-flex flex-no-wrap rounded-lg">
          <v-tab class="px-10" v-for="item in schedule_nav" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
      </v-row>
      <v-sheet tile height="74" class="d-flex align-center" color="#EBF5FB">
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
      <v-sheet height="600" class="px-4 pb-4 overflow-auto">
        <v-calendar
          v-show="value !== 3"
          ref="calendar"
          v-model="date"
          :weekdays="weekday"
          :type="type"
          :events="events"
          :event-overlap-mode="mode"
          :event-overlap-threshold="30"
          :event-color="getEventColor"
          locale="ru-RU"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
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
        <div
          v-show="value === 3 && arena_events.length === 0"
          class="text-center"
        >
          <h3 class="grey--text lighten-3--text text-h6 mb-2">
            Нет мероприятий
          </h3>
        </div>
        <div
          v-show="value === 3"
          v-for="(event, index) in arena_events"
          :key="index"
          class="mb-10 pl-5"
        >
          <div class="grey--text lighten-3--text text-h6 mb-2">
            {{ event.date }}
          </div>
          <div class="text-h6 mb-2 font-weight-bold">{{ event.title }}</div>
          <div class="body-1 blue--text mb-2">
            {{ event.type }}
          </div>
          <div class="grey--text">
            {{ event.startTime }}
          </div>
          <div class="body-1 blue--text mb-2 pt-4">
            {{ event.phone }}
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
    ...mapState(["arena_events"]),
    events() {
      return this.arena_events.map((event) => ({
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
      }));
    },
  },
  created() {
    const arenaId = this.$route.params.id;
    this.arenaId = arenaId;
    this.$store.dispatch("getArenaEvents", arenaId);
  },
  data() {
    return {
      type: "week",
      focus: "",
      schedule_nav: ["Дневное", "Недельное", "Месячное", "Список мероприятий"],
      mode: "column",
      mode_lesson: ["0", "1", "2"],
      weekday: [0, 1, 2, 3, 4, 5, 6],
      value: 1,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      date_picker: false,
      colors: [
        "blue",
        "indigo",
        "deep-purple",
        "cyan",
        "green",
        "orange",
        "grey lighten-1",
      ],
      arenaId: "",
    };
  },
  methods: {
    intervalFormat(interval) {
      return interval.time;
    },
    viewDay({ date }) {
      this.value = 0;
      this.date = date;
      this.type = "day";
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
};
</script>

<style>
.vertical-scroll {
  overflow: auto;
}
</style>
