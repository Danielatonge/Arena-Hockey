<template>
  <div class="grey lighten-4">
    <v-container class="pb-10">
      <v-row class="">
        <div>
          <v-breadcrumbs :items="breadcrumb_items" class="px-3"></v-breadcrumbs>
        </div>
      </v-row>
      <div>
        <div class="text-h5 py-5">Изменить прайс-лист</div>
        <div class="mb-4">
          <v-row>
            <v-col>
              <div>8:30 - 12:00</div>
            </v-col>
            <v-col>
              <v-text-field
                label="Ссылка на альбом"
                outlined
                flat
                hide-details="auto"
                class="rounded-lg"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="Ссылка на альбом"
                outlined
                flat
                hide-details="auto"
                class="rounded-lg"
              ></v-text-field>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value_tab: 0,
      service_nav: ["Катки", "Другие помещения"],
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
          text: "Редактирование спортивного комплекса",
          disabled: false,
          href: "/admin/sport_complex",
        },
        {
          text: "Информация",
          disabled: false,
          href: "/admin/sport_complex",
        },
        {
          text: "Изменить прайс-лист",
          disabled: true,
          href: "",
        },
      ],
      price_list: [
        { interval: "06:00–08:30", weekday: "8 000", weekend: "10 000" },
        { interval: "08:30–15:00", weekday: "8 000", weekend: "10 000" },
        { interval: "15:00–17:00", weekday: "8 000", weekend: "10 000" },
        { interval: "17:00–19:00", weekday: "10 000", weekend: "10 000" },
        { interval: "19:00–22:30", weekday: "12 000", weekend: "10 000" },
        { interval: "22:30–00:00", weekday: "10 000", weekend: "10 000" },
      ],
    };
  },
};
</script>

<style>
</style>