<template>
  <div>
    <div>
      <div class="text-h4 pb-3">Информация</div>
      <v-btn
        large
        class="mr-2 mb-2"
        color="grey lighten-2"
        elevation="0"
        @click="
          $router.push({
            name: 'complex-information',
            params: { arenaId, userId },
          })
        "
      >
        Вернуться к просмотру
      </v-btn>
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
          <v-col cols="6" md="4">
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
      <div class="mb-4">
        <v-btn
          @click="updateArena"
          large
          class="mr-2 px-6 mb-2"
          color="primary"
          elevation="0"
        >
          Сохранить
        </v-btn>
        <!-- <v-btn
          large
          class="mr-2 mb-2"
          color="grey px-6 lighten-2"
          elevation="0"
        >
          Обратить в тех. поддержку
        </v-btn> -->
        <v-btn
          large
          class="mr-2 mb-2"
          color="grey px-6 lighten-2"
          elevation="0"
          @click="
            $router.push({
              name: 'complex-information',
              params: { arenaId, userId },
            })
          "
        >
          Вернуться к просмотру
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import AdminSelectLocation from "@/components/Admin/AdminSelectLocation.vue";
import AdminImageUploader from "@/components/Admin/AdminImageUploader.vue";
import AdminGallery from "@/components/Admin/AdminGallery.vue";
// import AdminContact from "@/components/Admin/AdminContact.vue";
import AdminSocialMedia from "@/components/Admin/AdminSocialMedia.vue";
import AdminArenaContact from "@/components/Admin/AdminArenaContact.vue";

export default {
  components: {
    AdminImageUploader,
    AdminSelectLocation,
    AdminGallery,
    AdminSocialMedia,
    AdminArenaContact,
  },
  props: {
    arena: {
      type: Object,
      required: true,
    },
    arenaId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
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
  computed: {
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
      return this.avatar ? this.avatar.name : "";
    },
  },
  created() {
    const arena = this.arena;
    this.galleryPics = arena.gallery;
    this.fullTitle = arena.fullTitle;
    this.shortTitle = arena.title;
    this.avatar = arena.profilePicture
      ? { imageURL: arena.profilePicture }
      : null;
    this.tag_chips = arena.tags;
    this.coordinate.lat = arena.lat;
    this.coordinate.lon = arena.lan;
    this.address = arena.address;
    this.city = arena.city;
    this.metro = arena.metro;
    this.contacts = arena.contacts;
    // this.contact.mail = arena.mails;
    this.social_media[0].link = arena.vk;
    this.social_media[1].link = arena.whatsApp;
    this.social_media[2].link = arena.website;
    this.social_media[3].link = arena.instagram;
    this.social_media[4].link = arena.facebook;
    this.description = arena.description;
  },
  data() {
    return {
      files: {},
      galleryPics: [],
      map: {},
      fullTitle: "",
      shortTitle: "",
      description: "",
      metro: [],
      address: "",
      route: "",
      city: "",
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

      settings: {
        apiKey: "c845f0cd-98df-40dc-9d9b-a4d580c6e230",
        lang: "ru_RU",
        coordorder: "latlong",
        version: "2.1",
      },
      addressOptions: [],
      isLoading: false,
      search: null,
    };
  },
  methods: {
    assignCoordinates() {
      const coords = this.address.coords;
      this.coordinate.lat = coords[0];
      this.coordinate.lon = coords[1];
      console.log(coords);
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

    updateArena() {
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
      this.$store
        .dispatch("arena/putArena", {
          arenaId: this.arenaId,
          arena: data,
        })
        .then((nArena) => {
          console.log(
            "🚀 ~ file: EditComplexInformation.vue ~ line 926 ~ .then ~ nArena",
            nArena
          );

          this.$router.push({
            name: "complex-information",
            params: { arenaId: this.arenaId, userId: this.userId },
          });
        });
    },
  },
};
</script>

<style>
.upload-border {
  border: 1px dashed #c3e1f2;
}
</style>
