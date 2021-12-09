<template>
    <div>
      <div class="text-h4 mb-6">Расписание мероприятий</div>
        <v-row>
          <v-col>
            <v-select
            :items="allArenas"
            v-model="arenaId"
            placeholder="Арена"
            solo
            flat
            item-text="arenaTitle"
            item-value="arenaId"
            return-object
            hide-details="auto"
            ></v-select>
          </v-col>
        </v-row>
      <div  class="rounded-lg white">

      <admin-schedule-event :arenaId="arenaId" :userId="userId" />

    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import Axios from "axios";
import { GET_ARENAS } from "@/api";
import AdminScheduleEvent from '../Arena/View/AdminScheduleEvent.vue';

export default {
  components: {
    AdminScheduleEvent 
  },
  props: {
    userId: {
      type: String,
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
  computed: {
    ...mapState("arena", ["events"]),
    ievents() {
      const events = [];
      this.events.forEach((event) => {
        const nEvents = this.generateEvents(event);
        events.push(...nEvents);
      });
      return events;
    },
  },
  created() {
    this.$store.dispatch("arena/getEvents", this.arenaId);
    this.getArenas()
  },
  data() {
    return {
      arenaId: '',
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
      allArenas: [],
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

    async getArenas() {
        console.log(this.userId)
        let id = this.userId
      await Axios.get(`${GET_ARENAS}${id}/arenas/titles`).then( (res) => {
          res.data.forEach(elem => {
            let newObject = {
                arenaId: elem.arenaId,
                arenaTitle: elem.arenaTitle,
            }
            this.allArenas.push(newObject)
            console.log(this.allArenas)
          })
        console.log(res.data)
      })
      .catch((error) => {
        console.error(error);
      })
    },
  },
};
</script>

<style>
.vertical-scroll {
  overflow: auto;
}
</style>