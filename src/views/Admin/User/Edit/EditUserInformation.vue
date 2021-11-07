<template>
  <div>
    <div class="white">
      <v-container class="pb-0">
        <v-row class="">
          <AppBreadcrumb :items="breadcrumb_items" />
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
              <div>{{ user.city }}</div>
            </div>
            <div>
              <v-btn
                large
                class="mr-2 mb-2"
                color="primary"
                elevation="0"
                @click="updateUser"
              >
                Сохранить
              </v-btn>
              <v-btn
                large
                class="mr-2 mb-2"
                color="grey lighten-2"
                elevation="0"
                @click="
                  $router.push({
                    name: 'admin-user-role',
                    params: { userId, roleId },
                  })
                "
              >
                Назад
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="grey lighten-4">
      <v-container>
        <div class="mb-4 text-h5">Профессиональные навыки</div>
        <v-row>
          <v-col cols="12" class="">
            <v-select
              :items="positions"
              v-model="nuser.position"
              placeholder="Амплуа"
              solo
              flat
              item-text="state"
              item-value="value"
              return-object
              hide-details="auto"
            ></v-select>
          </v-col>
          <v-col cols="12" class="mb-2">
            <v-select
              :items="grips"
              v-model="nuser.grip"
              placeholder="Хват"
              solo
              flat
              item-text="state"
              item-value="value"
              return-object
              hide-details="auto"
            ></v-select>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Рост"
              outlined
              flat
              v-model="nuser.height"
              dense
              hide-details="auto"
              class="rounded-lg"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Вес"
              outlined
              flat
              v-model="nuser.weight"
              dense
              hide-details="auto"
              class="rounded-lg"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="">
            <div class="mb-2">Биография</div>
            <v-textarea
              solo
              v-model="nuser.biography"
              height="100"
              flat
              elevation="0"
              hide-details="auto"
            ></v-textarea>
          </v-col>
        </v-row>

        <v-row class="mb-4">
          <v-col cols="12">
            <div class="body-1 mb-4">Социальные сети</div>
            <v-row class="mb-2">
              <v-col cols="12">
                <v-row>
                  <v-col
                    cols="12"
                    md="3"
                    class="d-flex align-center"
                    v-for="(item, i) in displaySocialMedia"
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
              </v-col>
            </v-row>

            <v-dialog v-model="socialMediaDialog" max-width="600">
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
                  <div class="text-h5 black--text">
                    Добавить социальную сеть
                  </div>
                  <div class="mb-4">
                    <v-icon @click.stop="socialMediaDialog = false"
                      >mdi-close
                    </v-icon>
                  </div>
                </v-card-title>
                <v-card-text>
                  <div class="mb-6">
                    <v-btn-toggle v-model="toggleSocialMedia" mandatory>
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
                    @click="socialMediaDialog = false"
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
          <v-btn
            large
            class="mr-2 mb-2"
            color="primary"
            elevation="0"
            @click="updateUser"
          >
            Сохранить
          </v-btn>
          <v-btn
            large
            class="ml-2 mb-2"
            color="grey lighten-2"
            elevation="0"
            @click="
              $router.push({
                name: 'admin-user-role',
                params: { userId, roleId },
              })
            "
          >
            Назад
          </v-btn>
        </div>
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
    roleId: {
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
        text: "роль пользователя",
        disabled: true,
        to: "",
      },
    ];
    this.$store.dispatch("user/getUser", userId).then(() => {
      this.getSocialMedia();
      this.nuser = this.user;
    });
    this.$store.dispatch("user/getForums", this.userId);
  },
  computed: {
    ...mapState("user", ["user", "forums"]),
    displaySocialMedia() {
      return this.social_media.filter((element) => element.link);
    },
    fullName() {
      const { name, middleName, surname } = this.user;
      return `${name} ${middleName} ${surname}`;
    },
  },
  data() {
    return {
      breadcrumb_items: [],
      loading: false,
      social_media: [],
      nuser: {
        biography: "",
        grip: "",
        position: "",
        weight: "",
        height: "",
      },
      positions: ["Защитник", "Нападающий", "Вратарь"],
      grips: ["левый", "правый"],
      socialMediaDialog: false,
      social_media_text: "",
      toggleSocialMedia: null,
      errMessage: "",
    };
  },
  methods: {
    updateUser() {
      const userId = this.userId;
      const { biography, position, grip, weight, height } = this.nuser;
      const updateInfo = {
        name: this.fullName,
        biography,
        grip,
        position,
        weight,
        height,
      };
      this.$store.dispatch("user/putUser", { userId, updateInfo }).then(() => {
        this.nuser = this.initUserDialog();
      });
    },
    removeSocialMedia(item) {
      console.log(item);
      item.link = "";
    },
    addSocialMedia() {
      console.log(this.toggleSocialMedia);
      const link = this.social_media[this.toggleSocialMedia].link;
      if (link === "") {
        this.social_media[this.toggleSocialMedia].link = this.social_media_text;
        this.SocialMediaDialog = false;
      } else {
        this.errMessage = "Ссылка уже существует";
      }
      this.social_media_text = "";
    },
    getSocialMedia() {
      const { vk, whatsApp, instagram, website, facebook } = this.user;
      this.social_media = [
        {
          id: 1,
          name: "vk",
          link: vk ? vk : "",
          icon: "mdi-alpha-k-box-outline",
        },
        {
          id: 2,
          name: "whatsapp",
          link: whatsApp ? whatsApp : "",
          icon: "mdi-whatsapp",
        },
        {
          id: 3,
          name: "web",
          link: website ? website : "",
          icon: "mdi-web",
        },
        {
          id: 4,
          name: "instagram",
          link: instagram ? instagram : "",
          icon: "mdi-instagram",
        },
        {
          id: 5,
          name: "facebook",
          link: facebook ? facebook : "",
          icon: "mdi-facebook",
        },
      ];
    },
    initForumDialog() {
      return {
        biography: "",
        grip: "",
        level: "",
        position: "",
        qualification: "",
        weight: "",
      };
    },
  },
};
</script>

<style scoped></style>
