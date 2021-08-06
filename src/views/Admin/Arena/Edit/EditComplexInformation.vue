<template>
  <div class="grey lighten-4">
    <v-container class="pb-10">
      <v-row class="">
        <div>
          <v-breadcrumbs :items="breadcrumb_items" class="px-3"></v-breadcrumbs>
        </div>
      </v-row>
      <div>
        <div class="text-h5 pb-3 pt-5">Информация</div>
        <div class="mb-4">
          <v-btn
            class="mr-2 mb-2"
            color="primary"
            @click="updateArenaDetails"
            elevation="0"
          >
            Сохранить
          </v-btn>
          <v-btn class="mr-2 mb-2" color="grey lighten-2" elevation="0">
            Обратить в тех. поддержку
          </v-btn>
          <v-btn class="mr-2 mb-2" color="grey lighten-2" elevation="0">
            Вернуться к просмотру
          </v-btn>
        </div>
        <div class="text-h6 mb-4">Основная информация</div>
        <div class="mb-4">
          <v-text-field
            label="Наименование арены (полное)"
            v-model="arena.title"
            outlined
            flat
            hide-details="auto"
            class="rounded-lg"
          ></v-text-field>
        </div>
        <div class="mb-6">
          <v-text-field
            label="Наименование арены (сокращенное)"
            v-model="arena.title"
            outlined
            flat
            hide-details="auto"
            class="rounded-lg"
          ></v-text-field>
        </div>
        <div class="mb-6">
          <div class="text-h6 mb-2">Основное изображение арены</div>
          <v-sheet
            color="white"
            class="rounded-lg"
            elevation="0"
            height="100"
            width="300"
          ></v-sheet>
        </div>
        <div class="mb-6">
          <div class="text-h6 mb-2">Описание</div>
          <v-textarea
            solo
            v-model="arena.description"
            name=""
            flat
            elevation="0"
          ></v-textarea>
          <v-text-field
            label="Теги"
            outlined
            v-model="arena.tags"
            flat
            hide-details="auto"
            class="rounded-lg"
          ></v-text-field>
        </div>
        <div class="mb-6">
          <div class="text-h6 mb-2">Адрес</div>
          <v-text-field
            label="Адрес арены"
            outlined
            v-model="arena.address"
            flat
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
            outlined
            v-model="arena.route"
            flat
            hide-details="auto"
            class="rounded-lg"
          ></v-text-field>
        </div>
        <div class="mb-4">
          <div class="text-h6 mb-2">Социальные сети</div>
          <v-row class="mb-2">
            <v-col cols="6" md="4">
              <v-row>
                <v-col cols="12" class="d-flex align-center">
                  <v-btn
                    elevation="0"
                    x-small
                    color="grey"
                    height="40px"
                    class="mr-2"
                  >
                    <v-icon>mdi-whatsapp</v-icon>
                  </v-btn>
                  <div>ссылка на социальную сеть</div>
                  <v-icon class="ml-4">mdi-close</v-icon>
                </v-col>
                <v-col cols="12" class="d-flex align-center">
                  <v-btn
                    elevation="0"
                    x-small
                    color="grey"
                    height="40px"
                    class="mr-2"
                  >
                    <v-icon>mdi-instagram</v-icon>
                  </v-btn>
                  <div>ссылка на социальную сеть</div>
                  <v-icon class="ml-4">mdi-close</v-icon>
                </v-col>
                <v-col cols="12" class="d-flex align-center">
                  <v-btn
                    elevation="0"
                    x-small
                    color="grey"
                    height="40px"
                    class="mr-2"
                  >
                    <v-icon>mdi-vk</v-icon>
                  </v-btn>
                  <div>ссылка на социальную сеть</div>
                  <v-icon class="ml-4">mdi-close</v-icon>
                </v-col>
                <v-col cols="12" class="d-flex align-center">
                  <v-btn
                    elevation="0"
                    x-small
                    color="grey"
                    height="40px"
                    class="mr-2"
                  >
                    <v-icon>mdi-web</v-icon>
                  </v-btn>
                  <div>ссылка на социальную сеть</div>
                  <v-icon class="ml-4">mdi-close</v-icon>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-dialog v-model="social_media_dialog" max-width="600">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mr-2 mb-2"
                color="primary"
                large
                elevation="0"
                v-bind="attrs"
                v-on="on"
              >
                Добавить профиль соцсети
              </v-btn>
            </template>

            <v-card class="py-3">
              <v-card-title class="justify-space-between">
                <div class="text-h5 black--text">Добавить социальную сеть</div>
                <div class="mb-4">
                  <v-icon @click.stop="social_media_dialog = false"
                    >mdi-close</v-icon
                  >
                </div>
              </v-card-title>
              <v-card-text>
                <div class="mb-6">
                  <v-btn
                    elevation="0"
                    x-small
                    color="grey"
                    height="40px"
                    class="mr-2"
                  >
                    <v-icon>mdi-vk</v-icon>
                  </v-btn>
                  <v-btn
                    elevation="0"
                    x-small
                    color="grey"
                    height="40px"
                    class="mr-2"
                  >
                    <v-icon>mdi-whatsapp</v-icon>
                  </v-btn>
                  <v-btn
                    elevation="0"
                    x-small
                    color="grey"
                    height="40px"
                    class="mr-2"
                  >
                    <v-icon>mdi-instagram</v-icon>
                  </v-btn>
                </div>
                <div class="mb-2">
                  <v-text-field
                    label="Ссылка на социальную сеть"
                    outlined
                    flat
                    hide-details="auto"
                    class="rounded-lg"
                  ></v-text-field>
                </div>
              </v-card-text>
              <v-card-actions class="mt-n3">
                <v-btn
                  class="body-2"
                  @click="social_media_dialog = false"
                  elevation="0"
                >
                  Назад
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  elevation="0"
                  color="primary"
                  class="body-2"
                  @click="social_media_dialog = false"
                >
                  Добавить
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <div class="mb-4">
          <div class="body-2 font-weight-bold mb-4 grey--text">Контакты</div>
          <v-btn class="mr-2 mb-2" color="primary" large elevation="0">
            Добавить контакт
          </v-btn>
        </div>
        <div class="mb-4">
          <div class="body-2 font-weight-bold mb-4 grey--text">Галерея</div>
          <v-row class="pb-6">
            <v-col class="pa-2" cols="4" sm="2" md="1" v-for="i in 12" :key="i">
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
                <div class="pa-4"></div>
              </v-sheet>
            </v-col>
          </v-row>
          <v-btn class="mr-2 mb-2" color="primary" large elevation="0">
            Загрузить фотографии
          </v-btn>
          <v-btn class="mr-2 mb-2" color="grey lighten-2" large elevation="0">
            Добавить ссылку на альбом
          </v-btn>
        </div>
      </div>
      <div class="mb-8">
        <div class="mb-2 text-h5">Список катков</div>
        <div class="mb-4">
          <v-data-table
            :headers="headers"
            :items="desserts"
            :items-per-page="5"
            class="elevation-0"
          ></v-data-table>
        </div>
        <v-dialog v-model="katok_dialog" max-width="600">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mr-2 mb-2"
              color="primary"
              large
              elevation="0"
              v-bind="attrs"
              v-on="on"
            >
              Добавить новый каток
            </v-btn>
          </template>

          <v-card class="py-3">
            <v-card-title class="justify-space-between">
              <div class="text-h5 black--text">Добавить каток</div>
              <div class="mb-4">
                <v-icon @click.stop="katok_dialog = false">mdi-close</v-icon>
              </div>
            </v-card-title>
            <v-card-text>
              <div class="mb-6">
                <v-text-field
                  label="Название"
                  outlined
                  flat
                  hide-details="auto"
                  class="rounded-lg"
                ></v-text-field>
              </div>
              <div class="mb-2">
                <v-text-field
                  label="Размер поля"
                  outlined
                  flat
                  hide-details="auto"
                  class="rounded-lg"
                ></v-text-field>
              </div>
              <div class="">
                <v-checkbox v-model="checkbox">
                  <template v-slot:label>
                    <div>Крытое поле</div>
                  </template>
                </v-checkbox>
              </div>
            </v-card-text>
            <v-card-actions class="mt-n6">
              <v-btn
                class="body-2 px-4"
                @click="katok_dialog = false"
                elevation="0"
              >
                Назад
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                elevation="0"
                color="primary"
                class="body-2 px-4"
                @click="katok_dialog = false"
              >
                Добавить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <div class="mb-6">
        <div class="mb-2 text-h5">Список помещений</div>
        <div class="mb-4">
          <v-data-table
            :headers="headers"
            :items="desserts"
            :items-per-page="5"
            class="elevation-0"
          ></v-data-table>
        </div>
        <v-dialog v-model="service_dialog" max-width="600">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mr-2 mb-2"
              color="primary"
              large
              elevation="0"
              v-bind="attrs"
              v-on="on"
            >
              Добавить новое помещение
            </v-btn>
          </template>

          <v-card class="py-3">
            <v-card-title class="justify-space-between">
              <div class="text-h5 black--text">
                Добавить другой вид помещения
              </div>
              <div class="mb-4">
                <v-icon @click.stop="service_dialog = false">mdi-close</v-icon>
              </div>
            </v-card-title>
            <v-card-text>
              <div class="mb-5">
                <v-text-field
                  label="Название"
                  outlined
                  flat
                  hide-details="auto"
                  class="rounded-lg"
                ></v-text-field>
              </div>
              <div class="mb-5">
                <v-text-field
                  label="Размер поля"
                  outlined
                  flat
                  hide-details="auto"
                  class="rounded-lg"
                ></v-text-field>
              </div>
              <div class="mb-5">
                <v-text-field
                  label="Площадь"
                  outlined
                  flat
                  hide-details="auto"
                  class="rounded-lg"
                ></v-text-field>
              </div>
            </v-card-text>
            <v-card-actions class="mt-n6">
              <v-btn
                class="body-2 px-4"
                @click="service_dialog = false"
                elevation="0"
              >
                Назад
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                elevation="0"
                color="primary"
                class="body-2 px-4"
                @click="service_dialog = false"
              >
                Добавить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  mounted() {},
  data() {
    return {
      arena: this.$store.getters.current_arena,
      checkbox: null,
      service_dialog: false,
      social_media_dialog: false,
      katok_dialog: false,
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
          href: "/admin/sport_complex/edit",
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
        { text: "Расписание", value: "schedule" },
        { text: "Мероприятия", value: "event" },
      ],
      desserts: [
        {
          name: "Название катка",
          description: "Краткое описание катка",
          size: "50х50м",
          type: "Крытое",
          schedule: "Изменить расписание",
          event: "Посмотреть календарь мероприятий",
        },
        {
          name: "Название катка",
          description: "Краткое описание катка",
          size: "50х50м",
          type: "Крытое",
          schedule: "Изменить расписание",
          event: "Посмотреть календарь мероприятий",
        },
        {
          name: "Название катка",
          description: "Краткое описание катка",
          size: "50х50м",
          type: "Крытое",
          schedule: "Изменить расписание",
          event: "Посмотреть календарь мероприятий",
        },
        {
          name: "Название катка",
          description: "Краткое описание катка",
          size: "50х50м",
          type: "Крытое",
          schedule: "Изменить расписание",
          event: "Посмотреть календарь мероприятий",
        },
      ],
    };
  },
  methods: {
    updateArenaDetails() {
      console.log(this.arena);
      const id = this.arena.id;
      axios
        .post(`/arena/${id}`, this.arena)
        .then(() => {
          this.$router.push({path: `/admin/sport_complex/${id}/information`})
          // commit("SET_TEAMS", response.data);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
</style>