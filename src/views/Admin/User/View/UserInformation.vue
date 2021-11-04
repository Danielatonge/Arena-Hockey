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
                @click="
                  $router.push({
                    name: 'admin-user-edit',
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
                @click="
                  $router.push({
                    name: 'user-profile',
                    params: { userId: user.id },
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
        <v-row class="mb-4">
          <v-col cols="6" md="3" class="mb-2">
            <div class="body-1 mb-2 grey--text">Амплуа</div>
            <div class="">
              {{ user.birthDate ? user.birthDate : "Защитник" }}
            </div>
          </v-col>
          <v-col cols="6" md="3" class="mb-2">
            <div class="body-1 mb-2 grey--text">Хват</div>
            <div class="">{{ user.gender ? user.gender : "Правый" }}</div>
          </v-col>
        </v-row>
        <v-row class="mb-4">
          <v-col cols="6" md="3" class="mb-2">
            <div class="body-1 mb-2 grey--text">Рост</div>
            <div class="">
              {{ user.birthDate ? user.birthDate : "162 см" }}
            </div>
          </v-col>
          <v-col cols="6" md="3" class="mb-2">
            <div class="body-1 mb-2 grey--text">Вес</div>
            <div class="">{{ user.gender ? user.gender : "58 кг" }}</div>
          </v-col>
        </v-row>
        <v-row class="mb-4">
          <v-col cols="12" class="mb-4" v-show="user.biography">
            <div class="body-1 mb-2 grey--text">Биография</div>
            <div v-html="user.biography"></div>
          </v-col>
          <v-col cols="12" class="mb-2" v-show="displaySocialMedia.length">
            <div class="body-1 mb-2">Социальные сети</div>
            <div class="">
              <template v-for="(item, i) in displaySocialMedia">
                <v-btn
                  elevation="0"
                  x-small
                  color="grey"
                  height="40px"
                  class="mr-2"
                  :key="i"
                  @click="goToLink(item.link)"
                >
                  <v-icon> {{ item.icon }}</v-icon>
                </v-btn>
              </template>
            </div>
          </v-col>
        </v-row>
        <div>
          <p class="text-h5">Активные объявления</p>
          <v-row dense class="mt-5">
            <v-col cols="12" md="6" v-for="(item, i) in forums" :key="i">
              <v-card elevation="0" class="pa-5">
                <div class="d-flex flex-no-wrap">
                  <v-card-text class="px-0">
                    <div class="body-1 grey--text">
                      {{ dateFormat(item.date) }}
                    </div>
                    <div class="text-h6 mb-2">{{ item.name }}</div>
                    <!-- <div class="body-2 grey--text">Участников: 19</div> -->
                  </v-card-text>
                </div>
                <div class="mb-4 text-justify">
                  {{ item.description.slice(0, 290) }}
                </div>
                <p class="bold">Необходимые требования:</p>
                <div class="d-flex mb-2">
                  <div class="body-2 blue--text">Возраст: {{ item.age }}</div>
                  <div class="body-2 blue--text ml-16">
                    Амплуа: {{ item.role }}
                  </div>
                </div>
                <div class="d-flex">
                  <div class="body-2 blue--text">Хват: {{ item.grip }}</div>
                  <div class="body-2 blue--text ml-16">
                    Уровень: {{ item.level }}
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
          <div>
            <v-btn
              large
              class="mr-2 mb-2 rounded-lg"
              color="grey lighten-2"
              elevation="0"
              @click="createForumDialog = true"
            >
              Создать объявление на поиск
            </v-btn>
          </div>
          <v-dialog v-model="createForumDialog" max-width="600">
            <v-card class="py-3 grey lighten-4">
              <v-card-title class="justify-space-between">
                <div class="text-h5 black--text">
                  Создать объявление на поиск
                </div>
                <div class="mb-4">
                  <v-icon @click.stop="createForumDialog = false"
                    >mdi-close</v-icon
                  >
                </div>
              </v-card-title>
              <v-card-text class="mb-4">
                <v-row>
                  <v-col cols="12">
                    <v-select
                      :items="playerSearch"
                      v-model="nforum.find"
                      placeholder="Игрок ищет команду"
                      solo
                      flat
                      item-text="state"
                      item-value="value"
                      return-object
                      hide-details="auto"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" class="">
                    <div class="mb-2">Описание объявления</div>
                    <v-textarea
                      solo
                      v-model="nforum.description"
                      height="100"
                      flat
                      elevation="0"
                      hide-details="auto"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Населеный пункт"
                      outlined
                      flat
                      v-model="nforum.location"
                      dense
                      hide-details="auto"
                      class="rounded-lg"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" class="">
                    <div class="mb-2">Навыки</div>
                    <v-select
                      :items="roles"
                      v-model="nforum.role"
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
                      v-model="nforum.grip"
                      placeholder="Хват"
                      solo
                      flat
                      item-text="state"
                      item-value="value"
                      return-object
                      hide-details="auto"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions class="mt-n6 mx-2">
                <v-btn
                  class="body-2 px-4"
                  @click="createForumDialog = false"
                  elevation="0"
                  color="grey lighten-1"
                >
                  Назад
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  elevation="0"
                  color="primary"
                  class="body-2 px-4"
                  @click="saveForum"
                >
                  Добавить
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="modifyForumDialog" max-width="600">
            <v-card class="py-3 grey lighten-4">
              <v-card-title class="justify-space-between">
                <div class="text-h5 black--text">
                  Редактировать объявление на поиск
                </div>
                <div class="mb-4">
                  <v-icon @click.stop="modifyForumDialog = false"
                    >mdi-close</v-icon
                  >
                </div>
              </v-card-title>
              <v-card-text class="mb-4">
                <v-row>
                  <v-col cols="12">
                    <v-select
                      :items="playerSearch"
                      v-model="nforum.find"
                      placeholder="Игрок ищет команду"
                      solo
                      flat
                      item-text="state"
                      item-value="value"
                      return-object
                      hide-details="auto"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" class="">
                    <div class="mb-2">Описание объявления</div>
                    <v-textarea
                      solo
                      v-model="nforum.description"
                      height="100"
                      flat
                      elevation="0"
                      hide-details="auto"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Населеный пункт"
                      outlined
                      flat
                      v-model="nforum.location"
                      dense
                      hide-details="auto"
                      class="rounded-lg"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" class="">
                    <div class="mb-2">Навыки</div>
                    <v-select
                      :items="roles"
                      v-model="nforum.role"
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
                      v-model="nforum.grip"
                      placeholder="Хват"
                      solo
                      flat
                      item-text="state"
                      item-value="value"
                      return-object
                      hide-details="auto"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions class="mt-n6 mx-2">
                <v-btn
                  class="body-2 px-4"
                  @click="modifyForumDialog = false"
                  elevation="0"
                  color="grey lighten-1"
                >
                  Назад
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  elevation="0"
                  color="primary"
                  class="body-2 px-4"
                  @click="updateForum"
                >
                  Сохранить
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";

export default {
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  created() {
    const userId = this.userId;
    this.$store.dispatch("user/getUser", userId).then(() => {
      this.getSocialMedia();
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
      breadcrumb_items: [
        {
          text: "Личный кабинет",
          disabled: false,
          href: "/",
        },
        {
          text: "Название подраздела",
          disabled: false,
          href: "/admin/sport_complex",
        },
        {
          text: "Название раздела",
          disabled: true,
          href: "",
        },
      ],
      loading: false,
      social_media: [],
      createForumDialog: false,
      modifyForumDialog: false,
      nforum: {
        find: "",
        description: "",
        location: "",
        role: "",
        grip: "",
      },
      roles: [],
      grips: [],
      playerSearch: [],
    };
  },
  methods: {
    dateFormat(date) {
      let newDate = new Date(date);
      let formatter = new Intl.DateTimeFormat("ru", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      return formatter.format(newDate);
    },
    getSocialMedia() {
      const { vk, whatsApp, instagram, website, facebook } = this.user;
      this.social_media = [
        {
          id: 1,
          name: "vk",
          link: vk,
          icon: "mdi-alpha-k-box-outline",
        },
        {
          id: 2,
          name: "whatsapp",
          link: whatsApp,
          icon: "mdi-whatsapp",
        },
        {
          id: 3,
          name: "web",
          link: website,
          icon: "mdi-web",
        },
        {
          id: 4,
          name: "instagram",
          link: instagram,
          icon: "mdi-instagram",
        },
        {
          id: 5,
          name: "facebook",
          link: facebook,
          icon: "mdi-facebook",
        },
      ];
    },
    initForumDialog() {
      return {
        find: "",
        description: "",
        location: "",
        role: "",
        grip: "",
      };
    },
    saveForum() {
      const { description, role, grip, find } = this.nforum;
      const postForum = {
        age: "",
        date: moment().format("YYYY-MM-DD"),
        description,
        grip,
        level: "",
        name: this.fullName,
        picture: "",
        role,
        userId: this.userId,
        type: find,
      };
      this.$store.dispatch("user/postForum", postForum).then(() => {
        this.nforum = this.initForumDialog();
      });
    },
    modifyForum(forum) {
      this.nforum = forum;
      this.modifyForumDialog = true;
    },
    updateForum() {
      const forumId = this.nforum.id;
      const { description, role, grip, find } = this.nforum;
      const putForum = {
        age: "",
        date: moment().format("YYYY-MM-DD"),
        description,
        grip,
        level: "",
        name: this.fullName,
        picture: "",
        role,
        userId: this.userId,
        type: find,
      };
      this.$store.dispatch("user/putForum", { forumId, putForum }).then(() => {
        this.nforum = this.initForumDialog();
      });
    },
  },
};
</script>

<style scoped></style>
