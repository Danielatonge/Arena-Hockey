<template>
  <div class="grey lighten-4">
    <v-container class="pb-10">
      <div class="text-h4 pb-3 pt-5">Создать мероприятие</div>
      <div class="d-flex mb-6">
        <v-btn
          large
          elevation="0"
          rounded
          color="primary"
          class="body-2 px-6 mr-2 rounded-lg"
        >
          Сохранить
        </v-btn>
        <v-btn
          color="grey lighten-2"
          large
          class="body-2 px-6 ml-2 rounded-lg"
          elevation="0"
        >
          Отменить
        </v-btn>
      </div>
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

      <div class="text-h6 mb-4">Дата и время <i class="error--text">*</i></div>
      <v-row class="mb-4">
        <v-col class="d-flex" cols="12" md="2">
          <v-menu
            v-model="date_picker_start"
            :close-on-content-click="false"
            :nudge-right="0"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="startDate"
                prepend-inner-icon="mdi-calendar"
                readonly
                single-line
                outlined
                dense
                class="rounded-lg"
                hide-details
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="startDate"
              @input="date_picker_start = false"
              locale="ru-RU"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col class="d-flex" cols="12" md="2">
          <v-text-field
            label="время"
            prepend-inner-icon="mdi-calendar"
            outlined
            dense
            v-model="time"
            flat
            hide-details="auto"
            class="rounded-lg mr-3"
          ></v-text-field>
        </v-col>
        <v-col class="d-flex" cols="12" md="2">
          <v-text-field
            label="длительность"
            outlined
            dense
            v-model="timeNeeded"
            flat
            hide-details="auto"
            class="rounded-lg mr-3"
          ></v-text-field>
          <div class="my-auto">мин</div>
        </v-col>
        <v-spacer></v-spacer>

        <v-col class="d-flex" cols="12" md="2">
          <v-menu
            v-model="date_picker_end"
            :close-on-content-click="false"
            :nudge-left="120"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="endDate"
                prepend-inner-icon="mdi-calendar"
                readonly
                single-line
                outlined
                dense
                class="rounded-lg"
                hide-details
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="endDate"
              @input="date_picker_end = false"
              locale="ru-RU"
            ></v-date-picker>
          </v-menu>
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

      <div class="text-h6 mb-2">
        Место проведения <i class="error--text">*</i>
      </div>
      <v-row class="mb-4">
        <v-col class="d-flex" cols="12">
          <v-text-field
            outlined
            dense
            disabled
            flat
            hide-details="auto"
            class="rounded-lg mr-3"
          ></v-text-field>
        </v-col>
      </v-row>

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
        Вид мероприятия <i class="error--text">*</i>
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
    </v-container>
  </div>
</template>

<script>
export default {
  name: "CreateArenaEvent",
  data() {
    return {
      time: "11:00",
      timeNeeded: null,
      repeat: false,
      event_nav_value: 0,
      event_nav: ["Запланировано", "Выполнено", "Отменено"],
      date_picker_start: false,
      startDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      date_picker_end: false,
      endDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
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
    };
  },
  methods: {
    remove(item) {
      this.choosen_days.splice(this.choosen_days.indexOf(item), 1);
      this.choosen_days = [...this.choosen_days];
    },
  },
};
</script>

<style scoped></style>
