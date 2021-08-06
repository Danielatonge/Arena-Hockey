<template>
  <div class="grey lighten-4">
    <v-container class="pb-10">
      <v-row class="">
        <div>
          <v-breadcrumbs :items="breadcrumb_items" class="px-3"></v-breadcrumbs>
        </div>
      </v-row>
      <div>
        <div class="text-h5 py-5">Тренерский состав</div>
        <div class="mb-4">
          <v-btn class="mr-2 mb-2" color="grey lighten-2" elevation="0">
            Редактировать
          </v-btn>
          <v-btn class="mr-2 mb-2" color="grey lighten-2" elevation="0">
            Посмотреть страницу арены
          </v-btn>
        </div>
        <div class="pb-16">
          <v-row dense>
            <v-col class="d-flex" cols="3" md="2">
              <v-select
                :items="team_tags"
                value="Москва"
                solo
                flat
                hide-details="auto"
              ></v-select>
            </v-col>
            <v-col cols="9" md="6" lg="8">
              <v-text-field
                label="Поиск по названию команды"
                single-line
                prepend-inner-icon="mdi-magnify"
                solo
                flat
                hide-details="auto"
                class="rounded-lg"
              ></v-text-field>
            </v-col>
            <v-col cols="3" md="2" lg="1">
              <v-text-field
                label="от"
                single-line
                solo
                flat
                hide-details="auto"
                class="rounded-lg"
              ></v-text-field>
            </v-col>
            <v-col cols="3" md="2" lg="1">
              <v-text-field
                label="до"
                single-line
                solo
                flat
                hide-details="auto"
                class="rounded-lg"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex" cols="6" md="4" lg="3" xl="2">
              <v-select
                :items="sort_by_team"
                value="По популярности"
                solo
                flat
                prepend-icon="mdi-sort"
                hide-details="auto"
              ></v-select>
            </v-col>
            <v-col class="my-auto" cols="6" md="4">
              <div class="body-1 grey--text">Найдено: 160 результатов</div>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="6" md="4" lg="3" xl="2">
              <v-select
                :items="display_items"
                value="Показывать по 12"
                solo
                flat
                hide-details="auto"
              ></v-select>
            </v-col>
          </v-row>
        </div>
        <v-row dense class="mx-n4">
          <v-col cols="12" v-for="(item, i) in player_items" :key="i">
          <v-card color="transparent" elevation="0">
            <div class="d-flex flex-no-wrap">
              <v-avatar class="ma-3" size="125" tile>
                <v-img :src="require('@/assets' + item + '.jpg')"></v-img>
              </v-avatar>
              <v-card-text>
                <div class="text-h5 mb-2">Фамилия Имя Отчество</div>
                <div class="body-1 blue--text mb-1">Возраст, город</div>
                <div class="body-2 grey--text">Уровень: профессионал</div>
              </v-card-text>
            </div>
          </v-card>
        </v-col>
        </v-row>
      </div>
      <div class="text-center py-10">
        <v-pagination
          color="grey"
          v-model="page"
          :length="15"
          :total-visible="7"
        ></v-pagination>
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
          href: "breadcrumbs_link_1",
        },
        {
          text: "Мои спортивные комплексы",
          disabled: false,
          href: "breadcrumbs_dashboard",
        },
        {
          text: "Название комплекса",
          disabled: false,
          href: "/admin/sport_complex",
        },
        {
          text: "Список команд",
          disabled: true,
          href: "breadcrumbs_dashboard",
        },
      ],
      player_items: [
        "/player_1",
        "/player_2",
        "/player_3",
        "/player_4",
        "/player_5",
        "/player_6",
      ],
      team_tags: ["Москва", "Казань"],
      sort_by_team: ["По популярности", "По именни"],
      type_team: ["возрасту", "город"],
      display_items: ["Показывать по 12", "Показывать по 25"],
    };
  },
};
</script>

<style>
</style>