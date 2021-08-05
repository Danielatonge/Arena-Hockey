<template>
  <div class="grey lighten-4">
    <v-container class="pb-10">
      <v-row class="">
        <div>
          <v-breadcrumbs :items="breadcrumb_items" class="px-3"></v-breadcrumbs>
        </div>
      </v-row>
      <div>
        <div class="text-h4 pb-3 pt-5">Создать арену</div>
        <div class="text-h6 mb-4">Основная информация</div>
        <div class="mb-4">
          <v-text-field
            label="Полное название арены"
            v-model="arena_name_full"
            outlined
            flat
            hide-details="auto"
            class="rounded-lg"
          ></v-text-field>
        </div>
        <div class="mb-4">
          <v-text-field
            label="Сокращенное название арены"
            v-model="arena_name_short"
            outlined
            flat
            hide-details="auto"
            class="rounded-lg"
          ></v-text-field>
        </div>
        <div class="mb-6">
          <v-text-field
            label="Адрес арены"
            v-model="arena_address"
            outlined
            flat
            hide-details="auto"
            class="rounded-lg"
          ></v-text-field>
        </div>
        <div class="mb-4" style="width: 40%">
          <v-img src="https://via.placeholder.com/200x100"></v-img>
        </div>
        <div class="mb-6">
          <div class="text-h6 mb-2">Описание</div>
          <v-textarea
            solo
            placeholder="Напишите о арене"
            v-model="arena_description"
            name=""
            flat
            elevation="0"
          ></v-textarea>
        </div>
        <div class="mb-4">
          <div class="text-h6 mb-2">Социальные сети</div>
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
      </div>
      <div class="mb-8">
        <div class="mb-2 text-h5">Катки</div>
        <div class="mb-4">
          <v-data-table
            :headers="headers"
            :items="desserts"
            :items-per-page="5"
            class="elevation-0"
          >
            <template v-slot:item.icon="{ item }">
              <v-icon small class="mr-6" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
          </v-data-table>
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
              Добавить Каток
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
      <div class="mb-15">
        <div class="mb-2 text-h5">Другие виды помещений</div>
        <div class="mb-4">
          <v-data-table
            :headers="headers"
            :items="desserts"
            :items-per-page="5"
            class="elevation-0"
          >
            <template v-slot:item.icon="{ item }">
              <v-icon small class="mr-6" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
          </v-data-table>
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
              Добавить другой вид помещения
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
      <div class="d-flex">
        <v-btn color="grey lighten-2" large class="body-2 px-6" elevation="0">
          Отменить
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          @click="saveNewArena"
          large
          elevation="0"
          color="primary"
          class="body-2 px-6"
        >
          Сохранить
        </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      arena_name_full: null,
      arena_name_short: null,
      arena_address: null,
      arena_description: null,
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
          href: "/admin/sport_complex",
        },
        {
          text: "Создать арену",
          disabled: true,
          href: "",
        },
      ],
      headers: [
        {
          text: "Название",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Размер", value: "size" },
        { text: "Тип", value: "type" },
        { text: "", value: "icon", sortable: false },
      ],
      desserts: [
        {
          name: "Название катка",
          size: "50х50м",
          type: "Крытое",
          icon: "",
        },
      ],
    };
  },
  methods: {
    saveNewArena() {
      axios
        .post(`/arena`, {
          title: this.arena_name_full,
          address: this.arena_address,
          description: this.arena_description,
        })
        .then((response) => {
          this.$router.push({ path: `/admin/sport_complex/${response.data.id}` });
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
</style>