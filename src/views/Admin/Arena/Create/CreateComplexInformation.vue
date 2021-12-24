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

            <AdminSelectLocation
              :address="address"
              :city="city"
              :coordinate="coordinate"
              :metro="metro"
              @update-metro="
                (value) => {
                  metro = value;
                }
              "
              @update-coords="
                (value) => {
                  coordinate = value;
                }
              "
              @update-address="
                (value) => {
                  address = value;
                }
              "
              @update-city="
                (value) => {
                  city = value;
                }
              "
            />

            <!-- {{ address }} + {{ city }} + {{ coordinate }} + {{ metro }} -->
            <div class="mb-4">
              <AdminSocialMedia :items="social_media"></AdminSocialMedia>
            </div>
            <!-- <div class="mb-6">
              <AdminContact :contact="contact"></AdminContact>
            </div> -->
            <div class="mb-6">
              <AdminArenaContact :contact="contacts"></AdminArenaContact>
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
import AdminSelectLocation from "@/components/Admin/AdminSelectLocation.vue";
import AdminImageUploader from "@/components/Admin/AdminImageUploader.vue";
import AdminGallery from "@/components/Admin/AdminGallery.vue";
import AdminSocialMedia from "@/components/Admin/AdminSocialMedia.vue";
import AdminArenaContact from "@/components/Admin/AdminArenaContact.vue";
import { mapState } from "vuex";

export default {
  components: {
    AdminImageUploader,
    AdminSocialMedia,
    AdminArenaContact,
    AdminGallery,
    AdminSelectLocation,
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
      isLoading: false,
      galleryPics: [],
      map: {},
      fullTitle: "",
      shortTitle: "",
      description: "",
      metro: [],
      address: "",
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
      contacts: [],
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
        metro: this.metro.length ? this.metro : [],
        city: this.city,
        lat: Number(this.coordinate.lat),
        lan: Number(this.coordinate.lon),
        profilePicture: !this.avatar ? "" : this.avatar.imageURL,
        gallery: this.galleryPics,
        contacts: this.contacts,
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
        console.log(arena);
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

