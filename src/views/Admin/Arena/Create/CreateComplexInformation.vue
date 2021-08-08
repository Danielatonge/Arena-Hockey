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
          <v-row class="mb-2">
            <v-col cols="6" md="4">
              <v-row>
                <v-col
                  cols="12"
                  class="d-flex align-center"
                  v-for="(item, i) in social_media_links"
                  :key="i"
                >
                  <v-btn
                    elevation="0"
                    x-small
                    color="grey"
                    height="40px"
                    class="mr-2"
                  >
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-btn>
                  <div>{{ item.link }}</div>
                  <v-icon class="ml-4" @click="removeSocialMedia(i)"
                    >mdi-close</v-icon
                  >
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
                  <v-btn-toggle v-model="toggle_social_media" mandatory>
                    <v-btn
                      elevation="0"
                      x-small
                      color="grey"
                      height="40px"
                      class="mr-2"
                      v-for="item in social_icons"
                      :key="item"
                    >
                      <v-icon> {{ item }} </v-icon>
                    </v-btn>
                  </v-btn-toggle>
                </div>
                <div class="mb-2">
                  <v-text-field
                    v-model="social_media_text"
                    label="Ссылка на социальную сеть"
                    outlined
                    :hint="errMessage"
                    persistent-hint
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
                  @click="addSocialMedia"
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
            :items="rollers"
            :items-per-page="5"
            class="elevation-0"
          >
            <template v-slot:item.icon="{ item }">
              <v-icon small class="mr-6" @click="editRoller(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteRoller(item)"> mdi-delete </v-icon>
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
                  v-model="edited_roller.name"
                ></v-text-field>
              </div>
              <div class="mb-2">
                <v-text-field
                  label="Размер поля"
                  outlined
                  flat
                  hide-details="auto"
                  class="rounded-lg"
                  v-model="edited_roller.size"
                ></v-text-field>
              </div>
              <div class="">
                <v-checkbox
                  v-model="edited_roller.type"
                  :value="edited_roller.type ? 'Крытое поле' : 'Не крытое поле'"
                >
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
                @click="saveRoller"
              >
                <span v-if="edited_roller_index > -1">Обновить</span>
                <span v-else>Добавить</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <div class="mb-15">
        <div class="mb-2 text-h5">Другие виды помещений</div>
        <div class="mb-4">
          <v-data-table
            :headers="headers_services"
            :items="promises"
            :items-per-page="5"
            class="elevation-0"
          >
            <template v-slot:item.icon="{ item }">
              <v-icon small class="mr-6" @click="editPromise(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deletePromise(item)"> mdi-delete </v-icon>
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
                <v-icon
                  @click.stop="
                    service_dialog = false;
                    editingPromise = false;
                  "
                  >mdi-close</v-icon
                >
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
                  v-model="promise.name"
                ></v-text-field>
              </div>
              <div class="mb-5">
                <v-text-field
                  label="Размер поля"
                  outlined
                  flat
                  hide-details="auto"
                  class="rounded-lg"
                  v-model="promise.size"
                ></v-text-field>
              </div>
              <div class="mb-5">
                <v-text-field
                  label="Площадь"
                  outlined
                  flat
                  hide-details="auto"
                  class="rounded-lg"
                  v-model="promise.place"
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
                @click="add_promise()"
              >
                <span v-if="editingPromise">Обновить</span>
                <span v-else>Добавить</span>
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
      errMessage: "",
      service_dialog: false,
      social_media_dialog: false,
      toggle_social_media: null,
      social_media_text: "",
      katok_dialog: false,
      social_media_links: [
        {
          icon: "mdi-instagram",
          link: "https://www.instagram.com/p/B6hJFmkFvHG/",
        },
        {
          icon: "mdi-web",
          link: "https://www.google.com",
        },
      ],
      social_icons: ["mdi-vk", "mdi-whatsapp", "mdi-web", "mdi-instagram"],
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
      headers_services: [
        {
          text: "Название",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Размер", value: "size" },
        { text: "Площадь", value: "place" },
        { text: "", value: "icon", sortable: false },
      ],
      promises: [
        {
          name: "Название катка",
          size: "50х50м",
          place: "Крытое",
          icon: "",
        },
      ],
      promise: {
        name: "Name1",
        size: "12",
        place: "something",
        icon: "",
      },
      editingPromise: false,
      rollers: [],
      edited_roller: {
        name: "",
        size: "",
        type: "",
        icon: "",
      },
      default_roller: {
        name: "",
        size: "",
        type: "",
        icon: "",
      },
      edited_roller_index: -1,
    };
  },
  methods: {
    saveRoller() {
      if (this.edited_roller_index > -1) {
        Object.assign(
          this.rollers[this.edited_roller_index],
          this.edited_roller
        );
      } else {
        this.rollers.push(this.edited_roller);
      }
      this.closeRoller();
    },

    editRoller(item) {
      this.edited_roller_index = this.rollers.indexOf(item);
      this.edited_roller = Object.assign({}, item);
      this.katok_dialog = true;
    },
    deleteRoller(item) {
      this.edited_roller_index = this.rollers.indexOf(item);
      this.edited_roller = Object.assign({}, item);
      this.katok_dialog = true;
      this.deleteRollerConfirm();
    },

    deleteRollerConfirm() {
      this.rollers.splice(this.edited_roller, 1);
      this.closeDelete();
    },

    closeRoller() {
      this.katok_dialog = false;
      this.$nextTick(() => {
        this.edited_roller = Object.assign({}, this.defaultItem);
        this.edited_roller_index = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closePromiseDialog() {
      this.service_dialog = false;
      this.promise = {
        name: "",
        size: "",
        place: "",
        icon: "",
      };
    },
    add_promise() {
      if (this.editingPromise) {
        const index = this.promises.indexOf(this.promise);
        if (index > -1) {
          this.promises[index] = this.promise;
        }
        this.editingPromise = false;
      } else {
        this.promises = [
          ...this.promises,
          {
            id: this.promises.length + 1,
            name: this.promise.name,
            size: this.promise.size,
            place: this.promise.place,
            icon: "",
          },
        ];
      }
      this.closePromiseDialog();
    },
    editPromise(item) {
      this.editingPromise = true;
      const id = this.promises.indexOf(item);
      //alert(id);
      if (id > -1) {
        this.promise = this.promises[id];
        this.service_dialog = true;
      }
    },
    deletePromise(item) {
      const id = this.promises.indexOf(item);
      if (id > -1) this.promises.splice(id, 1);
    },
    removeSocialMedia(index) {
      if (index > -1) {
        this.social_media_links.splice(index, 1);
      }
    },
    addSocialMedia() {
      const check = this.social_media_links.filter(
        (x) => x.icon === this.social_icons[this.toggle_social_media]
      );
      if (check.length == 0) {
        const link = {
          icon: this.social_icons[this.toggle_social_media],
          link: this.social_media_text,
        };
        this.social_media_links.push(link);
        this.social_media_dialog = false;
      } else {
        this.errMessage = "A link already exist";
      }
      this.social_media_text = "";
    },
    saveNewArena() {
      axios
        .post(`/arena`, {
          title: this.arena_name_full,
          address: this.arena_address,
          description: this.arena_description,
        })
        .then((response) => {
          this.$router.push({
            path: `/admin/sport_complex/${response.data.id}`,
          });
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
</style>