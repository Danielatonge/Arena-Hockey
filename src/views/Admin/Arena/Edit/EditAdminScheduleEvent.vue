<template>
  <div>
    <div>
      <div class="text-h4 pb-5">Расписание мероприятий</div>
      <div class="mb-4">
        <v-btn
          large
          @click="goToAddEvent"
          class="mr-2 mb-2 primary"
          elevation="0"
        >
          Создать мероприятие
        </v-btn>
        <v-btn large class="mr-2 mb-2" color="grey lighten-2" elevation="0">
          Обратить в тех. поддержку
        </v-btn>
        <v-btn large class="mr-2 mb-2" color="grey lighten-2" elevation="0">
          Вернуться к просмотру
        </v-btn>
      </div>
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
        <v-spacer></v-spacer>
        <div style="width: 200px" class="mx-3">
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
          :events="getEvents"
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
          <ArenaEventCard :event="event">
            <template #edit-delete>
              <div style="position: absolute; top: 0px; right: 24px">
                <!--                    <v-icon class="mr-2" @click="goToEdit(item.id)">-->
                <!--                      mdi-pencil-outline-->
                <!--                    </v-icon>-->
                <v-icon @click="deleteEvent(event.id)">
                  mdi-delete-outline
                </v-icon>
              </div>
            </template>
          </ArenaEventCard>
        </div>
      </v-sheet>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import ArenaEventCard from "@/components/Arena/ArenaEventCard";

export default {
  components: { ArenaEventCard },
  props: {
    arena: {
      type: Object,
      required: true,
    },
  },
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
  created() {
    const arenaId = this.$route.params.id;
    this.arenaId = arenaId;
    this.$store.dispatch("arena/getEvents", arenaId);
    this.fetchArenaEvent(arenaId);
  },
  computed: {
    getEvents() {
      const events = [];
      this.arena_events.forEach((event) => {
        const nEvents = this.generateEvents(event);
        events.push(...nEvents);
      });
      return events;
    },
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
      date: moment().format("YYYY-MM-DD"),
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
      arena_events: [],
      events: [],
    };
  },
  methods: {
    async fetchArenaEvent(arenaId) {
      axios
        .get(`/arena/${arenaId}/events`)
        .then((response) => {
          this.arena_events = response.data;
        })
        .catch((err) => console.log(err));
    },
    goToAddEvent() {
      const arenaId = this.arena.id;
      this.$router.push({
        name: "create-arena-event",
        params: { arenaId },
      });
    },
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
    generateEvents(event) {
      const selectedDays = event.days;
      const startDate = event.startDate,
        endDate = event.endDate,
        startTime = event.startTime,
        endTime = event.endTime,
        title = event.title,
        description = event.description,
        repeat = event.repeat;
      const color = this.colors[this.rnd(0, this.colors.length - 1)];

      const startMoment = moment(
        `${startDate}T${startTime ? startTime : "00:00"}:00`
      );
      const endMoment = moment(`${endDate}T${endTime ? endTime : "00:00"}:00`);
      const arr_events = [];
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < selectedDays.length; j++) {
          if (Number(startMoment.day()) === selectedDays[j]) {
            const startMomentDate = startMoment.format("YYYY-MM-DDTHH:mm:ss");
            const beginMoment = moment(startMomentDate);

            while (
              Math.ceil(endMoment.diff(beginMoment, "weeks", true)) !== 0
            ) {
              const stopInterval = beginMoment.format("YYYY-MM-DD");
              const stopMoment = moment(
                `${stopInterval}T${endTime ? endTime : "00:00"}:00`
              );
              arr_events.push({
                name: title,
                start: beginMoment.format("YYYY-MM-DDTHH:mm:ss"),
                end: stopMoment.format("YYYY-MM-DDTHH:mm:ss"),
                color: color,
                timed: true,
                description: description,
              });
              if (repeat === 0) break;
              beginMoment.add(1, "weeks");
            }

            break;
          }
        }
        startMoment.add(1, "days");
      }
      return arr_events;
    },
    deleteEvent(eventId) {
      axios
        .delete(`/event/${eventId}`)
        .then((response) => {
          console.log(response.data);
          this.arena_events = this.arena_events.filter((x) => x.id !== eventId);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
.vertical-scroll {
  overflow: auto;
}
</style>
