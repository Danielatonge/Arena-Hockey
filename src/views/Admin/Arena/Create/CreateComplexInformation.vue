<template>
  <div class="grey lighten-4">
    <v-container class="pb-10">
      <v-row class="">
        <div>
          <v-breadcrumbs :items="breadcrumb_items" class="px-3"></v-breadcrumbs>
        </div>
      </v-row>
      <div>
        <div class="text-h5 font-weight-bold pb-3 pt-5">Информация</div>

        <div class="text-h6 mb-4">Основная информация</div>
        <div class="mb-4">
          <v-text-field
            label="Наименование арены (полное)"
            v-model="fullTitle"
            outlined
            flat
            hide-details="auto"
            class="rounded-lg"
          ></v-text-field>
        </div>
        <div class="mb-6">
          <v-text-field
            label="Наименование арены (сокращенное)"
            v-model="shortTitle"
            outlined
            flat
            hide-details="auto"
            class="rounded-lg"
          ></v-text-field>
        </div>
        <div class="mb-4">
          <div class="text-h6 mb-4">Основное изображение арены</div>
          <v-row>
            <v-col class="pa-2" cols="6" sm="4" md="3">
              <admin-image-uploader v-model="avatar">
                <div slot="activator">
                  <div v-if="!avatar" class="white rounded-xl pa-4">
                    <v-avatar
                      width="100%"
                      height="200"
                      v-ripple
                      tile
                      class="white rounded-xl"
                    >
                      <div class="upload-border rounded-xl pa-4">
                        <div class="my-4">
                          <v-icon large color="#379AD3"
                            >mdi-cloud-upload-outline</v-icon
                          >
                        </div>
                        <div class="body-1 mb-2 font-weight-bold">
                          Загрузите логотип
                        </div>
                        <div class="body-2 mb-4 grey--text">
                          Поддерживаемые форматы: PNG, JPG
                        </div>
                      </div>
                    </v-avatar>
                  </div>
                  <div v-else class="white rounded-xl pa-4">
                    <v-avatar width="100%" height="200" tile v-ripple>
                      <v-img
                        class="ma-10 rounded-xl"
                        :src="avatar.imageURL"
                        alt="avatar"
                        cover
                      ></v-img>
                    </v-avatar>
                  </div>
                </div>
              </admin-image-uploader>
            </v-col>
          </v-row>
        </div>
        <div>
          <div class="text-h6 mb-2">Описание</div>
          <v-textarea
            solo
            v-model="description"
            name=""
            flat
            elevation="0"
          ></v-textarea>
          <v-combobox
            v-model="tag_chips"
            :items="tag_items"
            chips
            clearable
            label="Теги"
            multiple
            solo
            flat
          >
            <template v-slot:selection="{ attrs, item, select, selected }">
              <v-chip
                v-bind="attrs"
                :input-value="selected"
                @click="select"
                @click:close="remove(item)"
              >
                <strong>{{ item }}</strong
                >&nbsp;
              </v-chip>
            </template>
          </v-combobox>
        </div>
        <div class="mb-6">
          <div class="text-h6 mb-2">Адрес</div>
          <v-autocomplete
            v-model="address"
            :items="addressOptions"
            :loading="isLoading"
            :search-input.sync="search"
            @change="assignCoordinates"
            hide-no-data
            hide-selected
            item-text="address"
            item-value="coords"
            return-object
            outlined
            cache-items
            flat
            hide-details="auto"
            class="rounded-lg"
          ></v-autocomplete>
        </div>
        <div class="mb-8">
          <v-row>
            <v-col>
              <v-sheet height="350px">
                <yandex-map
                  :settings="settings"
                  :coords="coords"
                  zoom="16"
                  style="width: 100%; height: 100%"
                  @map-was-initialized="initHandler"
                >
                  <ymap-marker
                    v-for="(billboard, index) in surfaces"
                    :key="index"
                    :marker-id="index"
                    marker-type="placemark"
                    :coords="billboard.coords"
                  ></ymap-marker>
                </yandex-map>
              </v-sheet>
            </v-col>

            <v-col>
              <v-row>
                <v-col class="d-flex" cols="12" md="6">
                  <v-select
                    :items="['Москва']"
                    v-model="city"
                    solo
                    flat
                    class="my-auto"
                    hide-details="auto"
                  ></v-select>
                </v-col>
                <v-col class="d-flex pr-0" cols="12" md="6">
                  <v-text-field
                    label="Метро"
                    outlined
                    v-model="metro"
                    flat
                    hide-details="auto"
                    class="rounded-lg mr-3"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="d-flex">
                  <v-text-field
                    label="широта"
                    outlined
                    v-model="coordinate.lat"
                    flat
                    disabled
                    hide-details="auto"
                    class="rounded-lg mr-3"
                  ></v-text-field>
                  <v-text-field
                    label="Долгота"
                    outlined
                    disabled
                    v-model="coordinate.lon"
                    flat
                    hide-details="auto"
                    class="rounded-lg ml-3"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>
        <div class="mb-4">
          <div class="text-h6">Социальные сети</div>
          <v-row class="mb-2">
            <v-col cols="6" md="12">
              <v-row>
                <v-col
                  cols="12"
                  md="3"
                  class="d-flex align-center"
                  v-for="(item, i) in social_media_display"
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
                  <v-icon class="ml-4" @click="removeSocialMedia(item)">
                    mdi-close
                  </v-icon>
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
                    >mdi-close
                  </v-icon>
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
                      v-for="(item, i) in social_media"
                      :key="i"
                    >
                      <v-icon> {{ item.icon }}</v-icon>
                    </v-btn>
                  </v-btn-toggle>
                </div>
                <div class="mb-2">
                  <v-text-field
                    v-model="social_media_text"
                    @keyup.enter="addSocialMedia"
                    label="Ссылка на социальную сеть"
                    outlined
                    autofocus
                    :hint="errMessage"
                    persistent-hint
                    flat
                    hide-details="auto"
                    class="rounded-lg"
                    ref="socialMediaText"
                  >
                    <template v-slot:message="{ message }">
                      <span class="error--text" v-html="message"></span>
                    </template>
                  </v-text-field>
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
        <div class="mb-6">
          <div class="text-h6">Контакты</div>
          <v-row v-show="contact.tel.length">
            <v-col cols="12" class="">Телефоны:</v-col>
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
            <v-col cols="12" class="">Почты:</v-col>
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
                    >mdi-close
                  </v-icon>
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
                      placeholder="служба :- номер телефона"
                      outlined
                      flat
                      dense
                      autofocus
                      v-model="telephone"
                      hide-details="auto"
                      class="rounded-lg"
                      @keyup.enter="addContactTelephone"
                    ></v-text-field>
                    <v-icon
                      class="ml-4"
                      v-if="telephone.length"
                      @click="addContactTelephone"
                    >
                      mdi-check
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
                      placeholder="служба :- Почта"
                      outlined
                      flat
                      v-model="email"
                      dense
                      hide-details="auto"
                      class="rounded-lg"
                      @keyup.enter="addContactMail"
                    ></v-text-field>
                    <v-icon
                      class="ml-4"
                      v-if="email.length"
                      @click="addContactMail"
                    >
                      mdi-check
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
        <div class="mb-6">
          <div class="text-h6 mb-4">Галерея</div>

          <v-row class="pb-6">
            <v-col
              class="pa-2"
              cols="4"
              md="3"
              lg="2"
              v-for="(i, indx) in galleryPics"
              :key="indx"
            >
              <v-avatar
                height="160"
                width="100%"
                tile
                v-ripple
                class="mb-3 white rounded-lg"
              >
                <v-img :src="i">
                  <v-container class="pa-0">
                    <v-row class="ma-2">
                      <div></div>
                      <v-spacer></v-spacer>
                      <v-btn
                        @click.stop="deleteGalleryItem(indx)"
                        x-small
                        class="rounded-lg white"
                        height="30px"
                        elevation="0"
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-row>
                  </v-container>
                </v-img>
              </v-avatar>
            </v-col>
          </v-row>
          <input
            type="file"
            ref="multifile"
            :name="galleryName"
            @change="
              selectGalleryItems($event.target.name, $event.target.files)
            "
            multiple
            style="display: none"
          />
          <v-btn
            class="mr-2 mb-2"
            color="primary"
            large
            elevation="0"
            @click.prevent="triggerMultiFileSelector()"
          >
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
                disabled
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
      <div class="d-flex">
        <v-btn
          @click="saveNewArena"
          large
          elevation="0"
          color="primary"
          class="body-2 px-6 mr-2"
        >
          Сохранить
        </v-btn>
        <v-btn
          color="grey lighten-2"
          large
          class="body-2 px-6 ml-2"
          elevation="0"
          @click="
            $router.push({
              name: 'admin-add-arena-sportcomplex',
              params: { userId },
            })
          "
        >
          Отменить
        </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import { yandexMap, ymapMarker } from "vue-yandex-maps";
import AdminImageUploader from "@/components/Admin/AdminImageUploader.vue";
import { mapState } from "vuex";

export default {
  components: {
    AdminImageUploader,
    yandexMap,
    ymapMarker,
  },
  watch: {
    toggle_social_media() {
      this.$refs["socialMediaText"].$refs.input.focus();
    },
    avatar: {
      handler: function () {
        this.saved = false;
      },
      deep: true,
    },
    search(input) {
      input && input !== this.address && this.findCoordinateGivenAddress(input);
    },
  },
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  created() {
    const userId = this.userId;
    this.breadcrumb_items = [
      {
        text: "Личный кабинет",
        disabled: false,
        exact: true,
        to: { name: "user-profile", params: { userId } },
      },
      {
        text: "Мои спортивные комплексы",
        disabled: false,
        exact: true,
        to: { name: "admin-add-arena-sportcomplex", params: { userId } },
      },
      {
        text: "Создать арену",
        disabled: true,
        exact: true,
        to: "",
      },
    ];
  },
  computed: {
    ...mapState("user", ["user"]),
    social_media_display() {
      return this.social_media.filter((x) => x.link);
    },
    surfaces() {
      return [
        {
          id: "1",
          city: this.city,
          address: this.address,
          coords: this.coords,
        },
      ];
    },
    coords() {
      return [this.coordinate.lat, this.coordinate.lon];
    },
    profilePicture() {
      return this.avatar ? this.avatar.imageURL : "";
    },
  },
  data() {
    return {
      settings: {
        apiKey: "cd43d2ef-9a2e-465e-b60b-fd240a2ec37a",
        lang: "ru_RU",
        coordorder: "latlong",
        version: "2.1",
      },
      addressOptions: [],
      isLoading: false,
      search: "",
      files: {},
      galleryPics: [],
      map: {},
      fullTitle: "",
      shortTitle: "",
      description: "",
      metro: null,
      address: "",
      route: "",
      city: "Москва",
      avatar: null,
      tag_chips: [],
      tag_items: [
        "Хоккейное катание",
        "Раздевалки",
        "Душ",
        "Инвентарь",
        "Бесплатный WiFi",
        "Парковка",
        "Заточка коньков",
        "Аренда коньков",
        "Фигурное катание",
        "Кафе",
        "Массовое катание",
        "Гимнастический зал",
        "Медкабинет",
        "Зона ОФП",
        "Бросковая зона",
        "Ночное катание",
        "Сухой лед",
        "Оплата картой",
      ],
      contact: {
        tel: [],
        mail: [],
      },
      coordinate: {
        lat: "55.753336",
        lon: "37.623084",
      },
      galleryName: "multifile",
      checkbox: null,
      telephone: "",
      email: "",
      errMessage: "",
      social_media_dialog: false,
      toggle_social_media: null,
      social_media_text: "",
      contact_dialog: false,
      album_dialog: false,
      social_media: [
        {
          id: 1,
          name: "vk",
          link: "",
          icon: "mdi-alpha-k-box-outline",
        },
        {
          id: 2,
          name: "whatsapp",
          link: "",
          icon: "mdi-whatsapp",
        },
        {
          id: 3,
          name: "web",
          link: "",
          icon: "mdi-web",
        },
        {
          id: 4,
          name: "instagram",
          link: "",
          icon: "mdi-instagram",
        },
        {
          id: 5,
          name: "facebook",
          link: "",
          icon: "mdi-facebook",
        },
      ],
      breadcrumb_items: [],
    };
  },
  methods: {
    deleteGalleryItem(index) {
      this.galleryPics.splice(index, 1);
    },
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1);
      this.chips = [...this.chips];
    },
    initHandler(obj) {
      this.map = obj;
    },
    findCoordinateGivenAddress(address) {
      this.isLoading = true;
      this.addressOptions = [];
      // const { address } = this;
      // eslint-disable-next-line no-undef
      ymaps
        .geocode(address, {
          results: 5,
        })
        .then((res) => {
          console.log("findCoordinate:");
          const responseLength = res.metaData.geocoder.found;
          for (let i = 0; i < responseLength; i++) {
            let geoObject = res.geoObjects.get(i);
            let coords = geoObject.geometry.getCoordinates();
            let address = geoObject.getAddressLine();
            const addressObj = {
              coords: coords,
              address: address,
            };
            this.addressOptions.push(addressObj);
          }
          this.isLoading = false;
        });
    },
    selectGalleryItems(fieldName, files) {
      this.galleryPics = [];
      console.log(fieldName, files);
      this.files = files;
      for (let i = 0; i < files.length; i++) {
        const picture = files[i];
        let formData = new FormData();
        formData.append("file", picture);
        axios
          .post("https://file-hockey.herokuapp.com/file/upload", formData)
          .then((response) => {
            console.log(response.data);
            this.galleryPics.push(response.data.url);
          });
      }
    },
    triggerMultiFileSelector() {
      console.log(this.$refs.multifile);
      this.$refs.multifile.click();
    },
    saveContacts() {
      this.contact_dialog = false;
    },
    addContactTelephone() {
      if (this.telephone) {
        this.contact.tel.push(this.telephone);
        this.telephone = "";
      }
    },
    removeTelephoneItem(idx) {
      this.contact.tel.splice(idx, 1);
    },
    addContactMail() {
      if (this.email) {
        this.contact.mail.push(this.email);
        this.email = "";
      }
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
    assignCoordinates() {
      const coords = this.address.coords;
      this.coordinate.lat = coords[0];
      this.coordinate.lon = coords[1];
      console.log(coords);
    },

    removeSocialMedia(item) {
      console.log(item);
      item.link = "";
    },
    addSocialMedia() {
      console.log(this.toggle_social_media);
      const link = this.social_media[this.toggle_social_media].link;
      if (link === "") {
        this.social_media[this.toggle_social_media].link =
          this.social_media_text;
        this.social_media_dialog = false;
      } else {
        this.errMessage = "Ссылка уже существует";
      }
      this.social_media_text = "";
    },
    saveNewArena() {
      let whatsapp = "";
      if (this.social_media[1].link) {
        whatsapp = `https://wa.me/${this.social_media[1].link
          .replace("(", "")
          .replace(")", "")
          .replace(" ", "")}`;
      }
      const data = {
        title: this.shortTitle,
        fullTitle: this.fullTitle,
        tags: this.tag_chips,
        address: this.address.address,
        description: this.description,
        metro: this.metro ? this.metro.split(",") : [],
        city: this.city,
        lat: Number(this.coordinate.lat),
        lan: Number(this.coordinate.lon),
        profilePicture: this.avatar ? this.avatar.imageURL : "",
        gallery: this.galleryPics,
        phones: this.contact.tel,
        mails: this.contact.mail,
        instagram: this.social_media[3].link,
        vk: this.social_media[0].link,
        website: this.social_media[2].link,
        whatsApp: whatsapp,
        facebook: this.social_media[4].link,
        classmates: "",
        tiktok: "",
        youtube: "",
      };
      console.log(data);
      const userId = this.userId;

      this.$store.dispatch("arena/saveArena", data).then((arena) => {
        const ndata = {
          arenaId: arena.id,
          userId: userId,
          visibility: 1,
        };
        this.$store
          .dispatch("arena/createArenaUser", {
            data: ndata,
            user: this.user,
          })
          .then(() => {
            this.$router.push({
              name: "admin-add-arena-sportcomplex",
              params: { userId: this.userId },
            });
          })
          .catch((err) => console.log(err));
      });
    },
  },
};
</script>

<style></style>
