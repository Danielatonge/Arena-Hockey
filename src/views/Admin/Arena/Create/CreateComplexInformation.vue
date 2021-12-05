<template>
  <div class="grey lighten-4">
    <v-container class="pb-10">
      <v-row class="justify-center">
        <v-col cols="12" lg="10" xl="8">
          <v-row class="">
            <div>
              <v-breadcrumbs
                :items="breadcrumb_items"
                class="px-3"
              ></v-breadcrumbs>
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
                label="Услуги"
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
              <v-text-field
                v-model="address"
                outlined
                flat
                hide-details="auto"
                class="rounded-lg"
              ></v-text-field>
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
                      <v-select
                        label="Метро"
                        :items="mettro"
                        v-model="metro"
                        solo
                        flat
                        multiple
                        chips
                        attach
                        class="my-auto"
                        hide-details="auto"
                      ></v-select>
                      <!-- <v-text-field
                    label="Метро"
                    outlined
                    v-model="metro"
                    flat
                    hide-details="auto"
                    class="rounded-lg mr-3"
                  ></v-text-field> -->
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="d-flex">
                      <v-text-field
                        label="Широта"
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
                </v-col>
              </v-row>
            </div>
            <div class="mb-4">
              <AdminSocialMedia :items="social_media"></AdminSocialMedia>
            </div>
            <div class="mb-6">
              <AdminContact :contact="contact"></AdminContact>
            </div>
            <div class="mb-6">
              <AdminGallery :items="galleryPics"> </AdminGallery>
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
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { yandexMap, ymapMarker } from "vue-yandex-maps";
import AdminImageUploader from "@/components/Admin/AdminImageUploader.vue";
import AdminGallery from "@/components/Admin/AdminGallery.vue";
import AdminContact from "@/components/Admin/AdminContact.vue";
import AdminSocialMedia from "@/components/Admin/AdminSocialMedia.vue";
import { mapState } from "vuex";

export default {
  components: {
    AdminImageUploader,
    yandexMap,
    ymapMarker,
    AdminSocialMedia,
    AdminContact,
    AdminGallery,
  },
  watch: {
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
      galleryPics: [],
      map: {},
      fullTitle: "",
      shortTitle: "",
      description: "",
      metro: [],
      mettro: [
        "Юго-западная",
        "Охотный ряд",
        "Библиотека им. Ленина",
        "Кропоткинская",
        "Парк культуры",
        "Фрунзенская",
      ],
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
      checkbox: null,

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

    assignCoordinates() {
      const coords = this.address.coords;
      this.coordinate.lat = coords[0];
      this.coordinate.lon = coords[1];
      console.log(coords);
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
        address: this.address,
        description: this.description,
        metro: this.metro,
        city: this.city,
        lat: Number(this.coordinate.lat),
        lan: Number(this.coordinate.lon),
        profilePicture: !this.avatar ? "" : this.avatar.imageURL,
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
