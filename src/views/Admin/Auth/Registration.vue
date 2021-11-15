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
          <AppSelectDatePicker
            :nudgeLeft="0"
            :dense="false"
            :date.sync="user.birthDate"
          />
          <!-- <v-text-field
            label="Дата рождения"
            outlined
            v-model="user.birthDate"
            flat
            hide-details="auto"
            class="rounded-lg"
          ></v-text-field> -->
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
        <v-col cols="12" md="6" class="mb-2">
          <v-select
            :items="cities"
            v-model="user.city"
            placeholder="Город"
            solo
            flat
            hide-details="auto"
          ></v-select>
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
            <AdminSocialMedia :items="social_media"></AdminSocialMedia>
          </v-row>
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
        <v-btn
          v-if="!currentUser"
          tile
          class="ml-4"
          large
          color="grey lighten-2"
          elevation="0"
          @click="
            $router.push({
              name: 'register-role',
            })
          "
        >
          следующий
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
import moment from "moment";
import { mapState } from "vuex";

export default {
  components: {
    AdminImageUploader,
  },
  computed: {
    ...mapState("auth", { currentUser: "user" }),
    profilePicture() {
      return this.avatar ? this.avatar.imageURL : "";
    },
  },
  created() {
    if (!this.currentUser) {
      const {
        gender,
        name,
        middleName,
        surname,
        phone,
        mail,
        password,
        birthDate,
        city,
      } = this.currentUser;
      this.user = {
        gender,
        name,
        middleName,
        surname,
        phone,
        mail,
        password,
        birthDate,
        city,
      };
    }
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
        birthDate: moment().format("YYYY-MM-DD"),
        city: "Москва",
      },
      feedback_dialog: false,
      rules: {
        required: (value) => !!value || "Обязательный поль.",
        match: (value) =>
          value === this.user.password || "Пароли не соответствуют",
      },
      avatar: null,
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
      cities: ["Москва"],
    };
  },
  methods: {
    registerUser() {
      if (this.repeatPassword !== this.user.password) {
        const notification = {
          type: "error",
          message: "Вводите все необходимые поля",
        };
        this.$store.dispatch("notification/add", notification);
        return;
      }
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
      console.log(
        "🚀 ~ file: Registration.vue ~ line 383 ~ registerUser ~ userParams",
        userParams
      );

      this.$store
        .dispatch("auth/postUser", userParams)
        .then(() => {
          this.$router.push({ name: "register-role" });
        })
        .catch(() => {});
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
