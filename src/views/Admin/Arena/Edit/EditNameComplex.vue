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
          <div class="text-h6">{{ arena.title }}</div>
          <div>{{ arena.address }}</div>
        </div>
      </div>
      <div class="mb-4 text-h6">Разделы арены</div>
      <v-row class="mx-n4 pb-10">
        <v-col
          class="pa-4"
          cols="4"
          md="4"
          v-for="(section, i) in sections"
          :key="i"
        >
          <router-link :to="`${section.link}`" class="reset-link">
            <v-sheet
              color="grey lighten-3"
              elevation="0"
              height="90"
              width="100%"
              class="
                font-weight-bold
                d-flex
                justify-center
                align-center
                rounded-lg
              "
            >
              <div class="pa-4">
                {{ section.text }}
              </div>
            </v-sheet>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  mounted() {
    const arena = this.$store.getters.current_arena;
    const id = arena.id;
    this.arena = arena;
    const sections = [
      {
        text: "Информация",
        link: `/admin/sport_complex/${id}/information/edit`,
      },
      {
        text: "Платные услуги",
        link: `/admin/sport_complex/${id}/payment_portal/edit`,
      },
      {
        text: "Расписание мероприятий",
        link: `/admin/sport_complex/${id}/schedule_event/edit`,
      },
      {
        text: "Список команд",
        link: `/admin/sport_complex/${id}/team_list/edit`,
      },
      {
        text: "Тренерский состав",
        link: `/admin/sport_complex/${id}/training_staff/edit`,
      },
      {
        text: "Состав руководства",
        link: `/admin/sport_complex/${id}/management_staff/edit`,
      },
    ];
    this.sections = sections;
  },
  data() {
    return {
      checkbox: null,
      arena: null,
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
      sections: null,
    };
  },
};
</script>

<style>
</style>