<template>
  <div class="grey lighten-4">
    <v-container class="pb-0">
      <v-row class="">
        <div>
          <v-breadcrumbs :items="breadcrumb_items" class="px-3"></v-breadcrumbs>
        </div>
      </v-row>
      <div class="mb-4">
        <div class="my-6 text-h5">Редактирование спортивного комплекса</div>
        <div class="mb-8">
          <div class="text-h6">Название комплекса</div>
          <div>ул. Лермонтова, д. 14, пом. 3, г. Чита</div>
        </div>
      </div>
      <div class="mb-4 text-h6">Разделы арены</div>
      <v-row class="mx-n4 pb-10">
        <v-col
          class="pa-4"
          cols="4"
          md="2"
          v-for="(section, i) in sections"
          :key="i"
        >
          <v-sheet
            color="grey lighten-3"
            elevation="0"
            height="60"
            width="100%"
          >
            <div class="text-center py-2">
              {{ section.text }}
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkbox: null,
      breadcrumb_items: [
        {
          text: "Личный кабинет",
          disabled: false,
          href: "breadcrumbs_link_1",
        },
        {
          text: "Мои спортивные комплексы",
          disabled: false,
          href: "breadcrumbs_dashboard",
        },
        {
          text: "Название комплекса",
          disabled: true,
          href: "breadcrumbs_dashboard",
        },
      ],
      sections: [
        {
          text: "Информация",
          link: "",
        },
        {
          text: "Платные услуги",
          link: "",
        },
        {
          text: "Расписание мероприятий",
          link: "",
        },
        {
          text: "Список команд",
          link: "",
        },
        {
          text: "Тренерский состав",
          link: "",
        },
        {
          text: "Состав руководства",
          link: "",
        },
      ],
    };
  },
};
</script>

<style>
</style>