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
            outlined
            flat
            hide-details="auto"
            class="rounded-lg"
          ></v-text-field>
        </div>
        <div class="mb-4">
          <div class="text-h6 mb-4">Основное изображение арены</div>
          <v-row>
            <v-col cols="3">
              <admin-image-uploader v-model="avatar">
                <div slot="activator">
                  <v-avatar
                    size="200px"
                    v-ripple
                    tile
                    v-if="!avatar"
                    class="grey lighten-3 mb-3 rounded-lg"
                  >
                    <span><v-icon large>mdi-upload</v-icon></span>
                  </v-avatar>
                  <v-avatar
                    size="200px"
                    tile
                    v-ripple
                    v-else
                    class="mb-3 rounded-lg"
                  >
                    <img :src="avatar.imageURL" alt="avatar" />
                  </v-avatar>
                </div>
              </admin-image-uploader>
            </v-col>
          </v-row>
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
        <div class="mb-4">
          <v-row>
            <v-col>
              <v-sheet height="350px">
                <arena-map
                  :coords="coords"
                  :surfaces="surfaces"
                  :zoom="zoom"
                ></arena-map>
              </v-sheet>
            </v-col>
            <v-col class="d-flex">
              <v-text-field
                label="широта"
                outlined
                v-model="coordinate.lat"
                flat
                hide-details="auto"
                class="rounded-lg mr-3"
              ></v-text-field>
              <v-text-field
                label="Долгота"
                outlined
                v-model="coordinate.lon"
                flat
                hide-details="auto"
                class="rounded-lg ml-3"
              ></v-text-field>
            </v-col>
          </v-row>
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
        <div class="mb-4">
          <div class="body-2 font-weight-bold mb-4 grey--text">Контакты</div>
          <v-row v-show="contact.tel.length">
            <v-col cols="12" class="">Телефоны: </v-col>
            <v-col
              cols="12"
              class="mt-n4 my-auto"
              v-for="(item, i) in contact.tel"
              :key="i"
            >
              <span class="mr-4 grey--text">{{ item }}</span>
            </v-col>
          </v-row>
          <v-row v-show="contact.mail.length">
            <v-col cols="12" class="">Почты: </v-col>
            <v-col
              cols="12"
              class="mt-n4 my-auto"
              v-for="(item, i) in contact.mail"
              :key="i"
            >
              <span class="mr-4 grey--text">{{ item }}</span>
            </v-col>
          </v-row>
          <v-dialog v-model="contact_dialog" max-width="600">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mr-2 mt-4"
                color="primary"
                large
                elevation="0"
                v-bind="attrs"
                v-on="on"
              >
                {{
                  contact.tel.length || contact.mail.length
                    ? "Изменить контакт"
                    : "Добавить контакт"
                }}
              </v-btn>
            </template>

            <v-card class="py-3">
              <v-card-title class="justify-space-between">
                <div class="text-h5 black--text">Добавить контакт</div>
                <div class="mb-4">
                  <v-icon @click.stop="contact_dialog = false"
                    >mdi-close</v-icon
                  >
                </div>
              </v-card-title>
              <v-card-text class="mb-4">
                <v-row>
                  <v-col cols="12" class="text-h6 mb-n4">Телефоны</v-col>
                  <v-col
                    cols="12"
                    class="mb-n2 my-auto"
                    v-for="(item, i) in contact.tel"
                    :key="i"
                  >
                    <span class="mr-4">{{ item }}</span>
                    <v-icon class="" @click="removeTelephoneItem(i)">
                      mdi-delete
                    </v-icon>
                  </v-col>
                  <v-col class="mb-2 d-flex">
                    <v-text-field
                      label="служба :- номер телефона"
                      outlined
                      flat
                      dense
                      v-model="telephone"
                      hide-details="auto"
                      class="rounded-lg"
                    ></v-text-field>
                    <v-icon class="ml-4" @click="addContactTelephone">
                      mdi-plus
                    </v-icon>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" class="text-h6 mb-n4">Почты</v-col>
                  <v-col
                    cols="12"
                    class="mb-n2 my-auto"
                    v-for="(item, i) in contact.mail"
                    :key="i"
                  >
                    <span class="mr-4">{{ item }}</span>
                    <v-icon class="" @click="removeMailItem(i)">
                      mdi-delete
                    </v-icon>
                  </v-col>
                  <v-col class="mb-2 d-flex">
                    <v-text-field
                      label="служба :- Почта"
                      outlined
                      flat
                      v-model="email"
                      dense
                      hide-details="auto"
                      class="rounded-lg"
                    ></v-text-field>
                    <v-icon class="ml-4" @click="addContactMail">
                      mdi-plus
                    </v-icon>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions class="mt-n6 mx-2">
                <v-btn
                  class="body-2 px-4"
                  @click="contact_dialog = false"
                  elevation="0"
                >
                  Назад
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  elevation="0"
                  color="primary"
                  class="body-2 px-4"
                  @click="saveContacts"
                >
                  Добавить
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
          <v-dialog v-model="album_dialog" max-width="600">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mr-2 mb-2"
                large
                color="grey lighten-2"
                elevation="0"
                v-bind="attrs"
                v-on="on"
              >
                Добавить ссылку на альбом
              </v-btn>
            </template>

            <v-card class="py-3">
              <v-card-title class="justify-space-between">
                <div class="text-h5 black--text">Добавить ссылку на альбом</div>
                <div class="mb-4">
                  <v-icon @click.stop="album_dialog = false">mdi-close</v-icon>
                </div>
              </v-card-title>
              <v-card-text class="mb-4">
                <div class="mb-4">
                  Добавьте ссылку на альбом в социальных сетях и фото будут
                  автоматически загружатьсяна вашу страницу арены.
                </div>
                <div class="mb-2">
                  <v-text-field
                    label="Ссылка на альбом"
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
                  @click="contact_dialog = false"
                  elevation="0"
                >
                  Назад
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn elevation="0" color="primary" class="body-2 px-4">
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
import ArenaMap from "@/components/Arena/ArenaMap.vue";
import AdminImageUploader from "@/components/Admin/AdminImageUploader.vue";

export default {
  components: {
    ArenaMap,
    AdminImageUploader,
  },
  watch: {
    avatar: {
      handler: function () {
        this.saved = false;
      },
      deep: true,
    },
  },
  computed: {
    surfaces() {
      let surface = [
        {
          id: "1",
          city: this.arena.city,
          address: this.arena.address,
          coords: `${this.coordinate.lat}, ` + `${this.coordinate.lon}`,
        },
      ];
      return surface;
    },
    coords() {
      let coordinate = [this.coordinate.lat, this.coordinate.lon];
      return coordinate;
    },
    profilePicture() {
      return this.avatar ? this.avatar.name : "";
    },
  },
  data() {
    return {
      arena: { title: "", description: "", tags: "", address: "", route: "" },
      avatar: null,
      saving: false,
      saved: false,
      contact: {
        tel: [],
        mail: [],
      },
      coordinate: {
        lat: "",
        lon: "",
      },
      checkbox: null,
      errMessage: "",
      service_dialog: false,
      social_media_dialog: false,
      toggle_social_media: null,
      social_media_text: "",
      katok_dialog: false,
      contact_dialog: false,
      album_dialog: false,
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
      zoom: 16,
      promise: {
        name: "",
        size: "",
        place: "",
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
    saveContacts() {
      this.contact_dialog = false;
    },
    addContactTelephone() {
      this.contact.tel.push(this.telephone);
      this.telephone = "";
    },
    removeTelephoneItem(idx) {
      this.contact.tel.splice(idx, 1);
    },
    addContactMail() {
      this.contact.mail.push(this.email);
      this.email = "";
    },
    removeMailItem(idx) {
      this.contact.mail.splice(idx, 1);
    },
    uploadImage() {
      this.saving = true;
      setTimeout(() => this.savedAvatar(), 1000);
    },
    savedAvatar() {
      this.saving = false;
      this.saved = true;
    },
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
      const data = {
        title: this.arena.title,
        tags: this.arena.tags.split(","),
        address: this.arena.address,
        description: this.arena.description,
        route: this.arena.route,
        sledgeHockey: "string",
        sledgeHockeyLink: "string",
        metro: ["string"],
        courtSize: 0,
        city: "string",
        lat: Number(this.coordinate.lat),
        lan: Number(this.coordinate.lon),
        profilePicture: "/" + this.profilePicture,
        gallery: ["string"],
      };
      axios
        .post(`/arena`, data)
        .then((response) => {
          const arena = response.data;
          console.log(arena);
          this.$store.dispatch("setCurrentArena", arena).then(() => {
            this.$router.push({
              path: `/admin/sport_complex/${arena.id}`,
            });
          });
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
</style>