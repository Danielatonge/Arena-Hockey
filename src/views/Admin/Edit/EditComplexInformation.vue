<template>
  <div class="grey lighten-4">
    <v-container class="pb-10">
      <v-row class="">
        <div>
          <v-breadcrumbs :items="breadcrumb_items" class="px-3"></v-breadcrumbs>
        </div>
      </v-row>
      <div>
        <div class="text-h5 py-5">Информация</div>

        <div class="text-h6">Основная информация</div>
        <div class="mb-4">
          <v-text-field
            label="Полное название катка"
            single-line
            solo
            flat
            dense
            hide-details="auto"
            class="rounded-lg"
          ></v-text-field>
        </div>
        <div class="mb-4">
          <v-text-field
            label="Сокращенное название катка"
            single-line
            solo
            flat
            dense
            hide-details="auto"
            class="rounded-lg"
          ></v-text-field>
        </div>
        <div class="mb-4">
          <div class="body-2 font-weight-bold mb-2 grey--text">
            Основное изображение арены
          </div>
          <v-sheet
            color="white"
            class="rounded-lg"
            elevation="0"
            height="100"
            width="300"
          ></v-sheet>
        </div>
        <v-textarea
          solo
          name=""
          flat
          label="Описание"
          elevation="0"
        ></v-textarea>
        <div class="mb-4">
          <v-text-field
            label="Адрес катка"
            solo
            flat
            dense
            hide-details="auto"
            class="rounded-lg"
          ></v-text-field>
        </div>
        <div class="mb-4" style="width: 50%">
          <v-img src="https://via.placeholder.com/200x100"></v-img>
        </div>
        <div class="mb-4">
          <v-text-field
            label="Как проехать"
            solo
            flat
            dense
            hide-details="auto"
            class="rounded-lg"
          ></v-text-field>
        </div>
        <div class="mb-4">
          <div class="body-2 font-weight-bold mb-1 grey--text">
            Социальные сети
          </div>
          <div class="pr-3 my-auto">
            <v-btn
              elevation="0"
              x-small
              color="transparent"
              height="40px"
              class="mr-1"
            >
              <v-icon>mdi-whatsapp</v-icon>
            </v-btn>
            <v-btn
              elevation="0"
              x-small
              color="transparent"
              height="40px"
              class="mx-1"
            >
              <v-icon>mdi-instagram</v-icon>
            </v-btn>
            <v-btn
              elevation="0"
              x-small
              color="transparent"
              height="40px"
              class="mx-1"
            >
              <v-icon>mdi-vk</v-icon>
            </v-btn>
            <v-btn
              elevation="0"
              x-small
              color="transparent"
              height="40px"
              class="ml-1"
            >
              <v-icon>mdi-web</v-icon>
            </v-btn>
          </div>
        </div>
        <div class="mb-4">
          <div class="body-2 font-weight-bold mb-1 grey--text">Контакты</div>
          <div>
            <p>
              Касса: +7 495 964-39-69 <br />
              Кафе: +7 977 815-61-97 <br />
              Магазин: +7 495 369-19-77 <br />
              Отдел продаж: +7 925 278-77-41 <br />
              Ресепшн: +7 495 964-39-69 <br />
              Приемная директора: +7 495 964-39-69 <br />
            </p>
            <p>
              Администратор: Васильева Татьяна Михайловна <br />
              +7 495 964-39-69
            </p>
            <p>
              Email: office@spartak-academy.ru <br />
              Адрес: г. Москва, м. Сокольники, ул. Большая Тихоновская, д. 2.
            </p>
          </div>
        </div>
        <div class="mb-4">
          <div class="body-2 font-weight-bold mb-1 grey--text">Галерея</div>
          <v-row class="mx-n4 pb-10">
            <v-col class="pa-4" cols="4" md="2" v-for="i in 8" :key="i">
              <v-sheet
                color="grey lighten-3"
                elevation="0"
                height="100"
                width="100%"
              >
              </v-sheet>
            </v-col>
          </v-row>
        </div>
      </div>
      <div class="mb-8">
        <div class="mb-2 text-h5">Список катков</div>
        <div class>
          <v-data-table
            :headers="headers"
            :items="desserts"
            :items-per-page="5"
            class="elevation-1"
          ></v-data-table>
        </div>
      </div>
      <div>
        <div class="mb-2 text-h5">Список помещений</div>
        <div class>
          <v-data-table
            :headers="headers"
            :items="desserts"
            :items-per-page="5"
            class="elevation-1"
          ></v-data-table>
        </div>
      </div>
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
          disabled: false,
          href: "/admin/name_complex",
        },
        {
          text: "Информация",
          disabled: true,
          href: "breadcrumbs_dashboard",
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