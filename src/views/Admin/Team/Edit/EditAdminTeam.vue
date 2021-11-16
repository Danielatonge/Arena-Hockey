<template>
  <div class="grey lighten-4">
    <v-container class="pb-10">
      <v-row class="">
        <div>
          <v-breadcrumbs :items="breadcrumb_items" class="px-3"></v-breadcrumbs>
        </div>
      </v-row>
      <div>
        <div class="text-h5 pb-3 pt-5 font-weight-bold">
          Редактировать команду
        </div>
        <v-row>
          <v-col cols="4" class="pr-10">
            <div class="body-1 mb-4 font-weight-bold">Эмблема команды</div>

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
          <v-col>
            <div class="body-1 mb-4 font-weight-bold">Основная информация</div>
            <div class="mb-4">
              <v-text-field
                label="Название команды"
                v-model="title"
                outlined
                flat
                dense
                hide-details="auto"
                class="rounded-lg"
              ></v-text-field>
            </div>
            <div class="mb-4">
              <v-select
                :items="locations"
                v-model="location"
                placeholder="Населеный пункт"
                solo
                flat
                item-text="state"
                item-value="value"
                return-object
                hide-details="auto"
              ></v-select>
            </div>
            <div class="mb-4">
              <v-select
                :items="categories"
                v-model="category"
                placeholder="Возрастная категория"
                solo
                flat
                item-text="state"
                item-value="value"
                return-object
                hide-details="auto"
              ></v-select>
            </div>
          </v-col>
        </v-row>

        <div>
          <div class="text-h6 mb-2">Описание</div>
          <v-textarea
            solo
            v-model="description"
            name=""
            flat
            elevation="0"
          ></v-textarea>
        </div>
        <div class="mb-4">
          <AdminSocialMedia :items="social_media"></AdminSocialMedia>
        </div>
        <div class="mb-6">
          <AdminGallery :items="galleryPics"> </AdminGallery>
        </div>

        <div class="mb-6">
          <AdminContact :contact="contact"></AdminContact>
        </div>
      </div>
      <div class="d-flex mt-16">
        <v-btn
          @click="updateTeam"
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
              name: 'admin-team',
              params: { userId: userId },
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
import AdminImageUploader from "@/components/Admin/AdminImageUploader.vue";
import AdminGallery from "@/components/Admin/AdminGallery.vue";
import AdminContact from "@/components/Admin/AdminContact.vue";
import AdminSocialMedia from "@/components/Admin/AdminSocialMedia.vue";
import { mapState } from "vuex";

export default {
  components: {
    AdminImageUploader,
    AdminGallery,
    AdminContact,
    AdminSocialMedia,
  },
  props: {
    teamId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
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
    ...mapState("user", ["team"]),
    social_media_display() {
      return this.social_media.filter((x) => x.link);
    },
    profilePicture() {
      return this.avatar ? this.avatar.imageURL : "";
    },
  },
  created() {
    this.breadcrumb_items = [
      {
        text: "Личный кабинет",
        disabled: false,
        exact: true,
        to: { name: "user-profile", params: { userId: this.userId } },
      },
      {
        text: "Мои команды",
        disabled: false,
        exact: true,
        to: {
          name: "admin-team",
          params: { userId: this.userId },
        },
      },
      {
        text: "Редактировать команду",
        disabled: true,
        to: "",
      },
    ];
    this.$store.dispatch("user/getTeam", this.teamId).then(() => {
      const team = this.team;
      this.galleryPics = team.gallery;
      this.title = team.title;
      this.location = team.city;
      this.category = team.type;
      this.avatar = team.profilePicture
        ? { imageURL: team.profilePicture }
        : null;
      this.contact.tel = team.phones;
      this.contact.mail = team.mails;
      this.social_media[0].link = team.vk;
      this.social_media[1].link = team.whatsApp;
      this.social_media[2].link = team.website;
      this.social_media[3].link = team.instagram;
      this.social_media[4].link = team.facebook;
      this.description = team.description;
    });
  },
  data() {
    return {
      files: {},
      galleryPics: [],
      title: "",
      description: "",
      location: "",
      locations: ["Москва"],
      category: "",
      categories: ["Детские", "Юношеские", "Взрослые", "Женские"],
      avatar: null,
      contact: {
        tel: [],
        mail: [],
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
    updateTeam() {
      let whatsapp = "";
      if (this.social_media[1].link) {
        whatsapp = `https://wa.me/${this.social_media[1].link
          .replace("(", "")
          .replace(")", "")
          .replace(" ", "")}`;
      }
      const data = {
        title: this.title,
        miniDescription: "",
        city: this.location,
        type: this.category,
        level: "",
        description: this.description,
        profilePicture: this.profilePicture,
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
        arena: null,
        twitter: null,
      };
      console.log(data);
      this.$store
        .dispatch("team/putTeam", { teamId: this.teamId, team: data })
        .then((response) => {
          console.log(response);
          this.$router.push({
            name: "admin-team",
            params: { userId: this.userId },
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
