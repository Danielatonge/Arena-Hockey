<template>
  <div>
    <div class="white">
      <v-container class="pb-0">
        <v-row class="">
          <AppBreadcrumb :items="breadcrumb_items" />
          <v-spacer></v-spacer>
          <div class="pr-3 my-auto">
            <a
              v-for="(item, index) in valid_contact_list"
              class="reset-link"
              :key="index"
              :href="item.link"
              target="_blank"
            >
              <v-btn
                elevation="0"
                x-small
                color="transparent"
                height="40px"
                class="mx-1"
              >
                <v-icon color="black"> {{ item.icon }}</v-icon>
              </v-btn>
            </a>
          </div>
        </v-row>
        <v-row class="mb-4">
          <v-col cols="4" md="3" class="text-center">
            <v-avatar
              class="rounded-lg"
              contain
              tile
              height="250px"
              width="100%"
            >
              <v-img
                :src="
                  user.profilePicture
                    ? user.profilePicture
                    : require('@/assets/unknown.jpeg')
                "
              ></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="8" md="9">
            <div class="mb-16">
              <div class="text-h5">{{ user.name }}</div>
              <div class="text-h5">{{ user.middleName }}</div>
              <div class="text-h5">{{ user.surname }}</div>
              <div>{{ validAge(user.age) }}</div>
            </div>
            <div>
              <v-btn
                large
                class="mr-2 mb-2"
                color="primary"
                elevation="0"
                @click="
                  $router.push({
                    name: 'admin-edit-user',
                    params: { userId: user.id },
                  })
                "
              >
                редактировать
              </v-btn>
              <v-btn
                large
                class="mr-2 mb-2"
                color="grey lighten-2"
                elevation="0"
                @click="changePassword = true"
              >
                Изменить пароль
              </v-btn>
            </div>
          </v-col>
        </v-row>
        <v-dialog v-model="changePassword" origin="" max-width="700">
          <v-card class="py-3">
            <v-card-title class="justify-center">
              <div class="text-h5 black--text font-weight-bold">
                Восстановить доступ
              </div>
              <v-icon
                style="position: absolute; top: 28px; right: 30px"
                @click="changePassword = false"
                >mdi-close</v-icon
              >
            </v-card-title>
            <v-card-text v-if="enterMail">
              <p class="body-1 mb-1">Введите адрес электронной почты</p>
              <v-row>
                <v-col>
                  <div class="mb-2">
                    <v-text-field
                      v-model="mail"
                      :rules="[rules.required]"
                      label="Ссылка на социальную сеть"
                      outlined
                      solo
                      dense
                      persistent-hint
                      flat
                      hide-details="auto"
                      class="rounded-lg"
                    >
                    </v-text-field>
                  </div>
                </v-col>
                <v-col class="my-0">
                  <v-btn
                    elevation="0"
                    color="primary"
                    class="body-2"
                    height="40px"
                    @click="sendCode"
                  >
                    Отправить код
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-text v-else>
              <p class="body-1 mb-1">
                На вашу почту был отправлен код для изменения вашего пароля
              </p>
              <div>
                <div class="mb-2">
                  <v-text-field
                    v-model="passCode"
                    :rules="[rules.required]"
                    outlined
                    placeholder="Введите код"
                    solo
                    dense
                    persistent-hint
                    flat
                    hide-details="auto"
                    class="rounded-lg"
                  >
                  </v-text-field>
                </div>

                <div>введите ваш новый пароль</div>
                <v-text-field
                  outlined
                  v-model="password"
                  flat
                  dense
                  solo
                  hide-details="auto"
                  class="rounded-lg"
                  :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required]"
                  :type="showPass ? 'text' : 'password'"
                  @click:append="showPass = !showPass"
                ></v-text-field>
                <div class="my-4">
                  <v-btn
                    elevation="0"
                    color="primary"
                    class="body-2"
                    height="40px"
                    @click="verifyCode"
                  >
                    изменить пароль
                  </v-btn>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-container>
    </div>
    <div class="grey lighten-4">
      <v-container>
        <v-row>
          <v-col cols="12" md="3">
            <AppVerticalSidebar :items="sidebar_items" />
          </v-col>
          <v-col cols="12" md="9">
            <router-view :user="user"></router-view>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  created() {
    this.$store.dispatch("user/getUser", this.userId).then(() => {
      const userId = this.userId;
      this.sidebar_items = [
        {
          text: "Профиль",
          link: { name: "user-profile", params: { userId } },
        },
        {
          text: "Центр сообщений",
          link: "",
        },
        {
          text: "Корзина",
          link: ``,
        },
        {
          text: "Избранное",
          link: ``,
        },
        {
          text: "Мои команды",
          link: { name: "admin-team", params: { userId } },
        },
        {
          text: "Мои спортивные комплексы",
          link: { name: "admin-add-arena-sportcomplex", params: { userId } },
        },

        {
          text: "Моя организация",
          link: ``,
        },
        {
          text: "Мои мероприятия",
          link: { name: "admin-events", params: { userId } },
        },
        { 
          text: "Календарь мероприятий", 
          link: `` 
        },
        {
          text: "Мои объявления",
          link: { name: "admin-advertisements", params: { userId } },
        },
      ];
      this.mail = this.user.mail;

      const user = this.user;
      this.contact_list = [
        {
          icon: "mdi-whatsapp",
          link: `${user.whatsApp ? user.whatsApp : ""}`,
        },
        {
          icon: "mdi-instagram",
          link: `${user.instagram ? user.instagram : ""}`,
        },
        {
          icon: "mdi-alpha-k-box",
          link: `${user.vk ? user.vk : ""}`,
        },
        {
          icon: "mdi-web",
          link: `${user.website ? user.website : ""}`,
        },
        {
          icon: "mdi-music-note-outline",
          link: `${user.tiktok ? user.tiktok : ""}`,
        },
        {
          icon: "mdi-twitter",
          link: `${user.twitter ? user.twitter : ""}`,
        },
        {
          icon: "mdi-youtube",
          link: `${user.youtube ? user.youtube : ""}`,
        },
        {
          icon: "mdi-facebook",
          link: `${user.facebook ? user.facebook : ""}`,
        },
      ];
    })
    
  },
  computed: {
    ...mapState("user", ["user"]),
    valid_contact_list() {
      return this.contact_list.filter((x) => {
        if (x.link !== "null") {
          if (x.link) return x.link;
        }
      });
    },
  },
  data() {
    return {
      breadcrumb_items: [
        {
          text: "Личный кабинет",
          disabled: true,
        },
      ],
      sidebar_items: [],
      sidebar_tab: 0,
      enterMail: true,
      changePassword: false,
      contact_list: [],
      checkbox: false,
      showPass: false,
      rules: {
        required: (value) => !!value || "Обязательный поль.",
      },
      password: "",
      mail: "",
      passCode: "",
    };
  },
  methods: {
    validAge(age) {
      if (age) {
        return `${age} год`;
      }
    },
    sendCode() {
      this.$store
        .dispatch("auth/sendConfirmationCode", this.mail)
        .then(() => {
          this.enterMail = false;
        })
        .catch(() => {});
    },
    verifyCode() {
      const credentials = {
        email: this.mail,
        code: this.passCode,
        password: this.password,
      };

      this.$store
        .dispatch("auth/changePassword", credentials)
        .then(() => {
          this.changePassword = false;
          this.$router.push({
            name: "login",
          });
        })
        .catch(() => {});
    },
    // restorePassword() {
    //   this.changePassword = true;
    //   this.enterMail = true;
    // },
  },
};
</script>

<style scoped></style>
