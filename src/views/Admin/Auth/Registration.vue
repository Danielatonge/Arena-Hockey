<template>
  <div class="grey lighten-4">
    <v-container class="pb-2">
      <form @submit.prevent="registerUser">
        <div class="d-flex justify-space-between my-5">
          <div class="text-h3 d-flex pb-3 my-auto">Регистрация</div>
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
            <v-text-field
              label="Пароль"
              outlined
              v-model="user.password"
              autocomplete="new-password"
              flat
              hide-details="auto"
              class="rounded-lg"
              :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPass ? 'text' : 'password'"
              @click:append="showPass = !showPass"
              :rules="[
                $v.user.password.required,
                $v.user.password.minLength,
                $v.user.password.containSymbol,
              ]"
              @blur="$v.user.password.$touch()"
            ></v-text-field>
            <template v-if="$v.user.password.$error">
              <div>
                <span
                  v-if="!$v.user.password.required"
                  class="error--text mb-0"
                >
                  Пароль - обязательное поле
                </span>
                <span
                  v-if="!$v.user.password.minLength"
                  class="error--text mb-0"
                >
                  Пароль должен быть длиннее 5 символов.
                </span>
                <span
                  v-if="!$v.user.password.containSymbol"
                  class="error--text mb-0"
                >
                  Пароль должен содержать любой из этих символов !@#$%^&.
                </span>
              </div>
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
            <v-text-field
              label="Повторите пароль"
              outlined
              v-model="repeatPassword"
              flat
              :append-icon="showRepeatPass ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showRepeatPass ? 'text' : 'password'"
              @click:append="showRepeatPass = !showRepeatPass"
              hide-details="auto"
              class="rounded-lg"
              :rules="[
                $v.repeatPassword.required,
                $v.repeatPassword.sameAsPassword,
              ]"
              @blur="$v.repeatPassword.$touch()"
            ></v-text-field>
            <template v-if="$v.repeatPassword.$error">
              <div>
                <span
                  v-if="!$v.repeatPassword.required"
                  class="error--text mb-0"
                >
                  Повторите пароль - обязательное поле.
                </span>
                <span
                  v-if="!$v.repeatPassword.sameAsPassword"
                  class="error--text mb-0"
                >
                  Повторите пароль не совпадает с паролем.
                </span>
              </div>
            </template>
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
            <AdminSocialMedia :items="social_media"></AdminSocialMedia>
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
        <div>
          <div class="text-center align-center">
            <v-btn
              tile
              class=""
              large
              color="grey lighten-2"
              elevation="0"
              type="submit"
              :disabled="$v.$anyError"
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
      </form>
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
import moment from "moment";
import { mapState } from "vuex";
import { required, email, helpers, minLength } from "vuelidate/lib/validators";
const containSymbol = helpers.regex("containSymbol", /[!@#$%^&]/);
export default {
  components: {
    AdminSocialMedia,
    AdminImageUploader,
  },
  computed: {
    ...mapState("auth", { currentUser: "user" }),
    profilePicture() {
      return this.avatar ? this.avatar.imageURL : "";
    },
  },
  data() {
    return {
      showPass: false,
      showRepeatPass: false,
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
      password: { required, minLength: minLength(5), containSymbol },
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
    registerUser() {
      this.$v.$touch();
      if (this.$v.$invalid) return;

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
      console.log(x);

      let value = !x[2]
        ? x[1]
        : x[1] + " " + "(" + x[2] + ") " + x[3] + (x[4] ? "-" + x[4] : "");
      this.user.phone = "+" + value;
    },
  },
};
</script>

<style scoped></style>
