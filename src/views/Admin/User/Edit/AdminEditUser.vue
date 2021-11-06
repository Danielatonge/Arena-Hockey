<template>
  <div class="grey lighten-4">
    <v-container class="pb-10 mt-10">
      <v-row>
        <v-col cols="4" md="3">
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
          <v-row class="mb-2">
            <v-col cols="12" class="text-h6">Социальные сети</v-col>
            <v-col
              cols="4"
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
                    label="Ссылка на социальную сеть"
                    outlined
                    :hint="errMessage"
                    persistent-hint
                    flat
                    hide-details="auto"
                    class="rounded-lg"
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
        </v-col>
      </v-row>
      <v-row class="">
        <v-col cols="12" md="6" class="mb-2">
          <v-text-field
            label="Фамилия"
            v-model="user.surname"
            outlined
            flat
            hide-details="auto"
            class="rounded-lg"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="mb-2">
          <v-text-field
            label="Номер телефона"
            outlined
            v-model="user.phone"
            flat
            placeholder="+9 (999) 999-9999"
            hide-details="auto"
            class="rounded-lg"
            @input="enforcePhoneFormat"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="mb-2">
          <v-text-field
            label="Имя"
            v-model="user.name"
            outlined
            flat
            hide-details="auto"
            class="rounded-lg"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="mb-2">
          <v-text-field
            label="Электронная почта"
            outlined
            v-model="user.mail"
            flat
            hide-details="auto"
            class="rounded-lg"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="mb-2">
          <v-text-field
            label="Отчество"
            outlined
            v-model="user.middleName"
            flat
            hide-details="auto"
            class="rounded-lg"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6" class="mb-2">
          <v-text-field
            label="Дата рождения"
            outlined
            v-model="user.birthDate"
            flat
            hide-details="auto"
            class="rounded-lg"
          ></v-text-field>
        </v-col>
      </v-row>
      <div>
        <v-radio-group v-model="user.gender" row>
          <v-radio label="Мужской" value="Мужской"></v-radio>
          <v-radio label="Женский" value="Женский"></v-radio>
        </v-radio-group>
      </div>
      <div class="mt-5">
        <v-btn
          tile
          class=""
          large
          color="primary"
          elevation="0"
          @click="modifyUser"
        >
          изменить пользователя
        </v-btn>
        <v-btn
          tile
          class="ml-3"
          large
          color="grey lighten-2"
          elevation="0"
          @click="
            $router.push({
              name: 'user-profile',
              params: { userId: user.id },
            })
          "
        >
          назад
        </v-btn>
      </div>
    </v-container>

    <v-dialog v-model="feedback_dialog" max-width="600">
      <v-card class="py-3">
        <v-card-title class="justify-space-between mb-5">
          <div class="body-1 black--text">
            Данный номер или/и электронная почта уже используются
          </div>
          <div class="mb-4">
            <v-icon @click.stop="feedback_dialog = false">mdi-close</v-icon>
          </div>
        </v-card-title>
        <v-card-actions class="mt-n6">
          <v-btn class="body-2 px-4" elevation="0"> Восстановить доступ</v-btn>
          <v-spacer></v-spacer>
          <v-btn elevation="0" color="primary" class="body-2 px-4">
            Обратиться в тех.поддержку
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import AdminImageUploader from "@/components/Admin/AdminImageUploader.vue";
import { mapState } from "vuex";
export default {
  components: {
    AdminImageUploader,
  },
  created() {
    const user = this.currentUser;
    this.user = user;
    this.avatar = user.profilePicture
      ? { imageURL: user.profilePicture }
      : null;
    this.social_media[0].link = user.vk;
    this.social_media[1].link = user.whatsApp;
    this.social_media[2].link = user.website;
    this.social_media[3].link = user.instagram;
    this.social_media[4].link = user.facebook;
  },
  computed: {
    ...mapState("user", { currentUser: "user" }),
    social_media_display() {
      return this.social_media.filter((x) => x.link);
    },
    profilePicture() {
      return this.avatar ? this.avatar.imageURL : "";
    },
  },
  data() {
    return {
      showPass: false,
      repeatPassword: "",
      user: {
        gender: "",
        name: "",
        middleName: "",
        surname: "",
        phone: "",
        mail: "",
        password: "",
      },
      feedback_dialog: false,
      rules: {
        required: (value) => !!value || "Обязательный поль.",
        match: (value) =>
          value === this.user.password || "Пароли не соответствуют",
      },
      avatar: null,
      social_media_dialog: false,
      toggle_social_media: null,
      social_media_text: "",
      errMessage: "",
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
    };
  },
  methods: {
    modifyUser() {
      let whatsapp = "";
      if (this.social_media[1].link) {
        whatsapp = `https://wa.me/${this.social_media[1].link
          .replace("(", "")
          .replace(")", "")
          .replace(" ", "")}`;
      }
      const userParams = {
        ...this.user,
        profilePicture: this.profilePicture,
        instagram: this.social_media[3].link,
        vk: this.social_media[0].link,
        website: this.social_media[2].link,
        whatsApp: whatsapp,
        facebook: this.social_media[4].link,
      };

      this.$store
        .dispatch("auth/updateUser", { userId: this.user.id, user: userParams })
        .then(() => {
          this.$router.push({ name: "register-role" });
        })
        .catch(() => {});
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
    enforcePhoneFormat() {
      let x = this.user.phone
        .replace(/\D/g, "")
        .match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4})/);

      let value = !x[2]
        ? x[1]
        : x[1] + " " + "(" + x[2] + ") " + x[3] + (x[4] ? "-" + x[4] : "");
      this.user.phone = "+" + value;
    },
  },
};
</script>

<style scoped></style>
