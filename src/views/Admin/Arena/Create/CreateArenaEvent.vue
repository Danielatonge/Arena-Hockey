<template>
  <div>
    <div class="text-h4 pb-3">Создать мероприятие</div>

    <div v-show="false">
      <div class="text-h6">Статус мероприятия</div>
      <v-row class="mt-0 mb-6">
        <v-col cols="12">
          <v-tabs
            v-model="event_nav_value"
            class="d-flex flex-no-wrap rounded-lg"
          >
            <v-tab class="px-6" v-for="item in event_nav" :key="item">
              {{ item }}
            </v-tab>
          </v-tabs>
        </v-col>
      </v-row>
    </div>
    <div class="text-h6 mb-4">Дата и время<i class="error--text">*</i></div>
    <v-row class="mb-4">
      <v-col class="d-flex" cols="12" md="3">
        <AppSelectDatePicker :date.sync="startDate" />
      </v-col>
      <v-col class="d-flex" cols="12" md="2">
        <v-menu
          ref="menu"
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="time"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              label="время"
              prepend-inner-icon="mdi-calendar"
              outlined
              dense
              v-model="time"
              flat
              v-bind="attrs"
              v-on="on"
              hide-details="auto"
              class="rounded-lg mr-3"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="menu2"
            v-model="time"
            format="24hr"
            full-width
            @click:minute="$refs.menu.save(time)"
          ></v-time-picker>
        </v-menu>
      </v-col>
      <v-col class="d-flex" cols="12" md="2">
        <v-text-field
          label="длительность"
          outlined
          dense
          v-model="timeNeeded"
          flat
          hide-details="auto"
          type="number"
          class="rounded-lg mr-3"
        ></v-text-field>
        <div class="my-auto">мин</div>
      </v-col>
      <v-spacer></v-spacer>
      <v-col class="d-flex" cols="12" md="3">
        <AppSelectDatePicker :date.sync="endDate" />
      </v-col>
      <v-col class="d-flex" cols="12" md="10">
        <v-combobox
          v-model="choosen_days"
          :items="days"
          chips
          clearable
          dense
          flat
          hide-details="auto"
          label="выберите дни"
          multiple
          solo
        >
          <template v-slot:selection="{ attrs, item, select, selected }">
            <v-chip
              v-bind="attrs"
              :input-value="selected"
              small
              close
              @click="select"
              @click:close="remove(item)"
            >
              <strong>{{ item }}</strong
              >&nbsp;
            </v-chip>
          </template>
        </v-combobox>
      </v-col>
      <v-col class="d-flex" cols="5" md="2">
        <v-checkbox
          v-model="repeat"
          label="Повторять"
          color="blue darken-3"
          class="my-auto"
        ></v-checkbox>
      </v-col>
    </v-row>

    <div class="text-h6 mb-2">Место проведения<i class="error--text">*</i></div>
    <v-row class="mb-4">
      <v-col class="d-flex" cols="12">
        <v-text-field
          :value="arena.address"
          outlined
          dense
          disabled
          flat
          hide-details="auto"
          class="rounded-lg"
        ></v-text-field>
      </v-col>
    </v-row>
    <div class="mb-4">
      <v-text-field
        label="название мероприятие"
        outlined
        v-model="title"
        flat
        hide-details="auto"
        class="rounded-lg"
      ></v-text-field>
    </div>
    <div class="text-h6 mb-2">Описание</div>
    <v-textarea
      solo
      v-model="description"
      name=""
      flat
      elevation="0"
    ></v-textarea>
    <div v-show="false">
      <div class="text-h6 mb-2">Арендатор</div>
      <v-row class="mb-5">
        <v-col class="d-flex" cols="12">
          <v-text-field
            label="Выберите клиента"
            outlined
            dense
            flat
            hide-details="auto"
            class="rounded-lg mr-3"
          ></v-text-field>
        </v-col>
        <div class="blue--text pl-3">+ Добавить арендатора</div>
      </v-row>

      <div class="text-h6 mb-2">
        Вид мероприятия<i class="error--text">*</i>
      </div>
      <v-row class="mb-4">
        <v-col class="d-flex" cols="12">
          <v-text-field
            label="Бронирование недоступно"
            outlined
            dense
            flat
            hide-details="auto"
            class="rounded-lg mr-3"
          ></v-text-field>
        </v-col>
      </v-row>
    </div>
    <div class="d-flex mb-6">
      <v-btn
        large
        elevation="0"
        rounded
        color="primary"
        class="body-2 px-6 mr-2 rounded-lg"
        @click="saveEvent"
      >
        Сохранить
      </v-btn>
      <v-btn
        color="grey lighten-2"
        large
        class="body-2 px-6 ml-2 rounded-lg"
        elevation="0"
        @click="
          $router.push({
            name: 'admin-events',
            params: { arenaId },
          })
        "
      >
        Отменить
      </v-btn>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  created() {},
  props: {
    arenaId: {
      type: String,
      required: true,
    },
    arena: {
      type: Object,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      time: "00:00",
      menu2: false,
      timeNeeded: 0,
      repeat: false,
      event_nav_value: 0,
      event_nav: ["Запланировано", "Выполнено", "Отменено"],
      date_picker_start: false,
      startDate: moment().format("YYYY-MM-DD"),
      date_picker_end: false,
      endDate: moment().format("YYYY-MM-DD"),
      choosen_days: [],
      days: [
        "понедельник",
        "вторник",
        "среда",
        "четверг",
        "пятница",
        "суббота",
        "воскресенье",
      ],
      description: "",
      title: "",
    };
  },
  methods: {
    remove(item) {
      this.choosen_days.splice(this.choosen_days.indexOf(item), 1);
      this.choosen_days = [...this.choosen_days];
    },
    processChoosenDays(days) {
      return days.map((day) => {
        if (day === "понедельник") return 1;
        if (day === "вторник") return 2;
        if (day === "среда") return 3;
        if (day === "четверг") return 4;
        if (day === "пятница") return 5;
        if (day === "суббота") return 6;
        if (day === "воскресенье") return 0;
      });
    },
    saveEvent() {
      const arenaId = this.arenaId;
      let startDate = this.startDate;
      let startDateTime = new Date(`${startDate}T${this.time}:00`);
      let startMoment = moment(startDateTime);
      let endDate = this.endDate;
      let endTime = startMoment.add(this.timeNeeded, "minutes").format("HH:mm");

      const event = {
        title: this.title,
        phone: "",
        type: "",
        days: this.processChoosenDays(this.choosen_days),
        startDate: startDate,
        endDate: endDate,
        startTime: this.time,
        endTime: endTime,
        description: this.description,
        activityType: "",
        price: 0,
        arenaId: arenaId,
        repeat: this.repeat ? 1 : 0,
      };
      this.$store.dispatch("arena/saveEvent", event).then(() => {
        this.$router.push({
          name: "admin-events",
          params: { arenaId },
        });
      });
    },
  },
};
</script>

<style scoped></style>
