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
              <router-link to="/admin/name_complex/edit" class="reset-link">
                Редактировать
              </router-link>
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
          <router-link :to="`${section.link}`" class="reset-link">
            <div class="text-center py-2">
              {{ section.text }}
            </div>
          </router-link>
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
          link: "/admin/name_complex/information",
        },
        {
          text: "Платные услуги",
          link: "/admin/name_complex/payment_portal",
        },
        {
          text: "Расписание мероприятий",
          link: "/admin/name_complex/schedule_event",
        },
        {
          text: "Список команд",
          link: "/admin/name_complex/team_list",
        },
        {
          text: "Тренерский состав",
          link: "/admin/name_complex/training_staff",
        },
        {
          text: "Состав руководства",
          link: "/admin/name_complex/management_staff",
        },
      ],
    };
  },
};
</script>

<style>
</style>