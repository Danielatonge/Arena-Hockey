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
          <v-img :src="arena.profilePicture"></v-img>
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
    </v-container>
    <v-container>
      <v-row class="mt-5">
        <v-col cols="5" md="3">
          <v-tabs
            vertical
            class="pl-4 rounded-lg my-sidetabs"
            v-model="sidebar_tab"
          >
            <v-tab
              v-for="(item, i) in sections"
              :key="i"
              router
              :to="item.link"
            >
              {{ item.text }}
            </v-tab>
          </v-tabs>
        </v-col>
        <v-col cols="7" md="9">
          <router-view></router-view>
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
    const sidebar_items = [
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
    this.sections = sidebar_items;
  },
  data() {
    return {
      checkbox: null,
      sidebar_tab: 0,
      arena: this.$store.state.current_arena,
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
          disabled: true,
          href: "",
        },
      ],
      sections: null,
    };
  },
};
</script>

<style></style>
