<template>
  <div class="grey lighten-4">
    <v-container class="pb-0">
      <v-row class="">
        <div>
          <v-breadcrumbs :items="breadcrumb_items" class="px-3"></v-breadcrumbs>
        </div>
      </v-row>
      <v-row class="mb-4">
        <v-col cols="4">
          <v-img src="https://via.placeholder.com/140x80"></v-img>
        </v-col>
        <v-col cols="8">
          <div class="mb-16">
            <div class="text-h5">Название комплекса</div>
            <div>ул. Лермонтова, д. 14, пом. 3, г. Чита</div>
          </div>
          <div>
            <v-btn class="mr-2 mb-2" color="primary" elevation="0">
              Редактировать
            </v-btn>
            <v-btn class="mr-2 mb-2" color="grey lighten-2" elevation="0">
              Добавить в избранное
            </v-btn>
            <v-btn class="mb-2" color="grey lighten-2" elevation="0">
              Редактировать
            </v-btn>
          </div>
          <div>
            <v-checkbox v-model="checkbox">
              <template v-slot:label>
                <div>Уведомлять при появлении изменений</div>
              </template>
            </v-checkbox>
          </div>
        </v-col>
      </v-row>
      <div class="mb-4 text-h6">Разделы арены</div>
      <v-row class="mx-n4 pb-10">
        <v-col class="pa-4" cols="4" md='2' v-for="(section, i) in sections" :key="i">
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