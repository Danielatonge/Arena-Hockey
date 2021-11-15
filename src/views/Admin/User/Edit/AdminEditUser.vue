<template>
  <div class="grey lighten-4">
    <v-container class="pb-10">
      <v-row class="">
        <div>
          <v-breadcrumbs :items="breadcrumb_items" class="px-3"></v-breadcrumbs>
        </div>
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
          <AdminSocialMedia :items="social_media"></AdminSocialMedia>
        </v-col>
      </v-row>
      <v-row class="">
        <v-col cols="12" md="6" class="mb-2">
          <v-text-field
            label="Фамилия"
            autocomplete="new-password"
            outlined
            flat
            hide-details="auto"
            v-model.trim="user.surname"
            class="rounded-lg"
            :rules="[$v.user.surname.required]"
            @blur="$v.user.surname.$touch()"
          ></v-text-field>
          <template v-if="$v.user.surname.$error">
            <p v-if="!$v.user.surname.required" class="error--text mb-0">
              Фамилия - обязательное поле
            </p>
          </template>
        </v-col>
        <v-col cols="12" md="6" class="mb-2">
          <v-text-field
            label="Номер телефона"
            autocomplete="new-password"
            outlined
            v-model="user.phone"
            flat
            type="tel"
            placeholder="+9 (999) 999-9999"
            hide-details="auto"
            class="rounded-lg"
            maxlength="17"
            :rules="[$v.user.phone.required, $v.user.phone.exactLength]"
            @blur="$v.user.phone.$touch()"
            @input="enforcePhoneFormat"
          ></v-text-field>
          <template v-if="$v.user.phone.$error">
            <p v-if="!$v.user.phone.required" class="error--text mb-0">
              Номер телефона - обязательное поле
            </p>
            <p v-if="!$v.user.phone.exactLength" class="error--text mb-0">
              Пример: +9 (999) 999-9999
            </p>
          </template>
        </v-col>
        <v-col cols="12" md="6" class="mb-2">
          <v-text-field
            label="Имя"
            autocomplete="new-password"
            v-model.trim="user.name"
            outlined
            flat
            hide-details="auto"
            class="rounded-lg"
            :rules="[$v.user.name.required]"
            @blur="$v.user.name.$touch()"
          ></v-text-field>
          <template v-if="$v.user.name.$error">
            <p v-if="!$v.user.name.required" class="error--text mb-0">
              Имя - обязательное поле
            </p>
          </template>
        </v-col>
        <v-col cols="12" md="6" class="mb-2">
          <v-text-field
            autocomplete="new-password"
            label="Электронная почта"
            outlined
            v-model="user.mail"
            flat
            hide-details="auto"
            class="rounded-lg"
            :rules="[$v.user.mail.required, $v.user.mail.email]"
            @blur="$v.user.mail.$touch()"
          ></v-text-field>
          <template v-if="$v.user.mail.$error">
            <p v-if="!$v.user.mail.required" class="error--text mb-0">
              Электронная почта - обязательное поле
            </p>
            <p v-if="!$v.user.mail.email" class="error--text mb-0">
              Пример: abc@yourcompany.com
            </p>
          </template>
        </v-col>
        <v-col cols="12" md="6" class="mb-2">
          <v-text-field
            label="Отчество"
            outlined
            aria-autocomplete="off"
            v-model="user.middleName"
            autocomplete="new-password"
            flat
            hide-details="auto"
            class="rounded-lg"
            :rules="[$v.user.middleName.required]"
            @blur="$v.user.middleName.$touch()"
          ></v-text-field>
          <template v-if="$v.user.middleName.$error">
            <p v-if="!$v.user.middleName.required" class="error--text mb-0">
              Отчество - обязательное поле
            </p>
          </template>
        </v-col>
        <v-col cols="12" md="6" class="mb-2">
          <AppSelectDatePicker
            :nudgeLeft="0"
            :dense="false"
            :date.sync="user.birthDate"
            label="Дата рождения"
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
      <div>
        <v-radio-group
          v-model="user.gender"
          :rules="[$v.user.gender.required]"
          row
          hide-details="auto"
        >
          <v-radio label="Мужской" value="Мужской"></v-radio>
          <v-radio label="Женский" value="Женский"></v-radio>
        </v-radio-group>
        <template v-if="$v.user.gender.$error">
          <p v-if="!$v.user.gender.required" class="error--text mb-0">
            Пол нужен
          </p>
        </template>
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
              params: { userId },
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
import AdminSocialMedia from "@/components/Admin/AdminSocialMedia.vue";
import { required, email } from "vuelidate/lib/validators";


import { mapState } from "vuex";
export default {
  components: {
    AdminImageUploader,
    AdminSocialMedia,
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
        text: "изменить пользователя",
        disabled: true,
        exact: true,
        to: "",
      },
    ];
    const user = this.currentUser;
    const { gender, surname, middleName, name, phone, mail, birthDate, city } =
      user;

    this.user = {
      gender,
      surname,
      middleName,
      name,
      phone,
      mail,
      birthDate,
      city,
    };
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
        birthDate: "",
        city: "",
      },
      cities: ["Москва"],
      feedback_dialog: false,

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
      breadcrumb_items: [],
    };
  },
  validations: {
    user: {
      gender: { required },
      name: { required },
      middleName: { required },
      surname: { required },
      phone: {
        required,
        exactLength: (value) => {
          if (value.length === 17) return true;
          return false;
        },
      },
      mail: { required, email },
      city: { required },
    },
    repeatPassword: {
      required,
      sameAsPassword: function (value) {
        return this.user.password === value;
      },
    },
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
        .dispatch("auth/updateUser", { userId: this.userId, user: userParams })
        .then(() => {
          this.$router.push({
            name: "user-profile",
            params: { userId: this.userId },
          });
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
