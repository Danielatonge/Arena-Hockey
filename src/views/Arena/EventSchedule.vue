<template>
  <div class="grey lighten-4">
    <v-container class="pt-8 pb-0">
      <v-row>
        <div>
          <v-breadcrumbs :items="breadcrumb_items" class="px-3"></v-breadcrumbs>
        </div>
      </v-row>
      <v-row class="mb-0">
        <v-col cols="8" sm="6" md="7">
          <p class="text-h5">Выбранные арены</p>
          <p class="grey--text">
            Нет выбранных арен. Чтобы добавить арену, нажмите на значок добавить
            на карточке арены.
          </p>
        </v-col>
      </v-row>
      <v-btn color="primary" elevation="0">Добавить арену</v-btn>
    </v-container>
    <v-container class="mt-14">
      <p class="text-h4">Расписание мероприятий</p>

    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      breadcrumb_items: [
        {
          text: "Ледовые дворцы и арены",
          disabled: false,
          href: "/",
        },
        {
          text: "Расписание мероприятий",
          disabled: true,
          href: "/event_schedule",
        },
      ],
    };
  },
};
</script>

<style>
</style>