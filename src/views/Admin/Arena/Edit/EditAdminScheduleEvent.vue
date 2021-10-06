<template>
  <div>
    <div>
      <div class="text-h4 pb-5">Расписание мероприятий</div>
      <div class="mb-4">
        <v-btn
          large
          @click="add_team_dialog = true"
          class="mr-2 mb-2 primary"
          elevation="0"
        >
          Добавить мероприятий
        </v-btn>
        <v-btn large class="mr-2 mb-2" color="grey lighten-2" elevation="0">
          Обратить в тех. поддержку
        </v-btn>
        <v-btn large class="mr-2 mb-2" color="grey lighten-2" elevation="0">
          Вернуться к просмотру
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      breadcrumb_items: [
        {
          text: "Личный кабинет",
          disabled: false,
          href: "/",
        },
        {
          text: "Мои спортивные комплексы",
          disabled: false,
          href: "/admin/sport_complex",
        },
        {
          text: "Название комплекса",
          disabled: false,
          href: "/admin/sport_complex",
        },
        {
          text: "Расписание мероприятий",
          disabled: true,
          href: "",
        },
      ],
      headers: [
        {
          text: "Название",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Описание", value: "description" },
        { text: "Размер", value: "size" },
        { text: "Тип", value: "type" },
        { text: "Мероприятия", value: "event" },
      ],
      desserts: [
        {
          name: "Название катка",
          description: "Краткое описание катка",
          size: "50х50м",
          type: "Крытое",
          event: "Посмотреть календарь мероприятий",
        },
        {
          name: "Название катка",
          description: "Краткое описание катка",
          size: "50х50м",
          type: "Крытое",
          event: "Посмотреть календарь мероприятий",
        },
        {
          name: "Название катка",
          description: "Краткое описание катка",
          size: "50х50м",
          type: "Крытое",
          event: "Посмотреть календарь мероприятий",
        },
        {
          name: "Название катка",
          description: "Краткое описание катка",
          size: "50х50м",
          type: "Крытое",
          event: "Посмотреть календарь мероприятий",
        },
      ],
    };
  },
};
</script>

<style></style>
