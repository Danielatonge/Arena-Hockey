<template>
  <div class="grey lighten-4">
    <v-container class="pb-10">
      <div class="d-flex justify-space-between my-10">
        <div class="text-h3 d-flex pb-3 pt-5 my-auto">Регистрация</div>
        <div class="d-flex my-auto">
          <!-- <v-btn tile class="" large color="grey lighten-2" elevation="0">
            Назад
          </v-btn> -->
        </div>
      </div>
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
            label="Пароль"
            outlined
            v-model="user.password"
            flat
            hide-details="auto"
            class="rounded-lg"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="showPass ? 'text' : 'password'"
            @click:append="showPass = !showPass"
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
        <v-col cols="12" md="6" class="mb-2">
          <v-text-field
            label="Повторите пароль"
            outlined
            v-model="repeatPassword"
            flat
            :rules="[rules.required, rules.match]"
            type="password"
            hide-details="auto"
            class="rounded-lg"
          ></v-text-field>
        </v-col>
      </v-row>
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
      <div>
        <v-radio-group v-model="user.gender" row>
          <v-radio label="Мужской" value="Мужской"></v-radio>
          <v-radio label="Женский" value="Женский"></v-radio>
        </v-radio-group>
      </div>
    </v-container>
    <div>
      <div class="text-center align-center">
        <v-btn
          tile
          class=""
          large
          color="grey lighten-2"
          elevation="0"
          @click="registerUser"
        >
          Зарегистрироваться
        </v-btn>
        <p class="mt-4">
          Уже есть аккаунт?
          <router-link
            style="text-decoration: unset"
            :to="{
              name: 'login',
            }"
            >Войти</router-link
          >
        </p>
      </div>
    </div>
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

export default {
  components: {
    AdminImageUploader,
  },
  computed: {
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
    registerUser() {
      const userParams = {
        ...this.user,
        profilePicture: this.profilePicture,
      };

      this.$store.dispatch("auth/postUser", userParams).then(() => {
        this.$router.push({ name: "register-role" });
      });
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
