<template>
  <div class="grey lighten-4">
    <v-container class="pb-10">
      <v-row class="">
        <div>
          <v-breadcrumbs :items="breadcrumb_items" class="px-3"></v-breadcrumbs>
        </div>
      </v-row>
      <div>
        <div class="text-h5 py-5">Расписание мероприятий</div>
        <div class="mb-4">
          <v-btn class="mr-2 mb-2" color="grey lighten-2" elevation="0">
            Редактировать
          </v-btn>
          <v-btn class="mr-2 mb-2" color="grey lighten-2" elevation="0">
            Посмотреть страницу арены
          </v-btn>
        </div>
        <div class="mb-8">
          <div class="mb-4 text-h5">Список катков</div>
          <div class>
            <v-data-table
              :headers="headers"
              :items="desserts"
              :items-per-page="5"
              class="elevation-1"
            ></v-data-table>
          </div>
        </div>
        <div class="mb-8">
          <div class="mb-4 text-h5">Список помещений</div>
          <div class>
            <v-data-table
              :headers="headers"
              :items="desserts"
              :items-per-page="5"
              class="elevation-1"
            ></v-data-table>
          </div>
        </div>
      </div>
    </v-container>
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
          href: "/admin/sport_complex/id",
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

<style>
</style>