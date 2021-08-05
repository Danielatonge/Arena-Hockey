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
            <div class="text-h5">{{ arena.title }}</div>
            <div>{{ arena.address }}</div>
          </div>
          <div>
            <v-btn class="mr-2 mb-2" color="primary" elevation="0">
              <router-link
                :to="`/admin/sport_complex/${arena.id}/edit`"
                class="reset-link"
              >
                Редактировать
              </router-link>
            </v-btn>
            <v-btn class="mr-2 mb-2" color="grey lighten-2" elevation="0">
              Добавить в избранное
            </v-btn>
            <v-btn class="mb-2" color="grey lighten-2" elevation="0">
              Удалить
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
        link: `/admin/sport_complex/${id}/information`,
      },
      {
        text: "Платные услуги",
        link: `/admin/sport_complex/${id}/payment_portal`,
      },
      {
        text: "Расписание мероприятий",
        link: `/admin/sport_complex/${id}/schedule_event`,
      },
      {
        text: "Список команд",
        link: `/admin/sport_complex/${id}/team_list`,
      },
      {
        text: "Тренерский состав",
        link: `/admin/sport_complex/${id}/training_staff`,
      },
      {
        text: "Состав руководства",
        link: `/admin/sport_complex/${id}/management_staff`,
      },
    ];
    this.sections = sections;
  },
  data() {
    return {
      checkbox: null,
      arena: this.$store.state.current_arena,
      breadcrumb_items: [
        {
          text: "Личный кабинет",
          disabled: false,
          href: "breadcrumbs_link_1",
        },
        {
          text: "Мои спортивные комплексы",
          disabled: false,
          href: "/admin/sport_complex",
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