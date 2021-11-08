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
                    name: 'admin-user-role-edit',
                    params: { userId, roleId },
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
        <template v-if="role.name === 'PLAYER'">
          <v-row class="mb-4">
            <v-col cols="6" md="3" class="mb-2" v-show="role.position">
              <div class="body-1 mb-2 grey--text">Амплуа</div>
              <div class="">
                {{ role.position }}
              </div>
            </v-col>
            <v-col cols="6" md="3" class="mb-2" v-show="role.grip">
              <div class="body-1 mb-2 grey--text">Хват</div>
              <div class="">{{ role.grip }}</div>
            </v-col>
          </v-row>
          <v-row class="mb-4">
            <v-col cols="6" md="3" class="mb-2" v-show="role.height">
              <div class="body-1 mb-2 grey--text">Рост</div>
              <div class="">
                {{ role.height + " см" }}
              </div>
            </v-col>
            <v-col cols="6" md="3" class="mb-2" v-show="role.weight">
              <div class="body-1 mb-2 grey--text">Вес</div>
              <div class="">{{ role.weight + " кг" }}</div>
            </v-col>
          </v-row>
        </template>
        <template v-if="role.name === 'TRAINER'">
          <v-row class="mb-4">
            <v-col cols="6" md="3" class="mb-2" v-show="role.status">
              <div class="body-1 mb-2 grey--text">Статус</div>
              <div class="">
                {{ role.status }}
              </div>
            </v-col>
            <v-col cols="6" md="3" class="mb-2" v-show="role.category">
              <div class="body-1 mb-2 grey--text">Возрастная категория</div>
              <div class="">{{ roleCategory }}</div>
            </v-col>
          </v-row>
        </template>
        <v-row class="mb-4">
          <v-col cols="12" class="mb-4" v-show="role.biography">
            <div class="body-1 mb-2 grey--text">Биография</div>
            <div v-html="role.biography"></div>
          </v-col>
          <v-col cols="12" class="mb-2" v-show="displaySocialMedia.length">
            <div class="body-1 mb-2">Социальные сети</div>
            <div class="">
              <template v-for="(item, i) in displaySocialMedia">
                <a
                  class="reset-link"
                  :href="item.link"
                  :key="i"
                  target="_blank"
                >
                  <v-btn
                    elevation="0"
                    x-small
                    color="grey"
                    height="40px"
                    class="mr-2"
                  >
                    <v-icon> {{ item.icon }}</v-icon>
                  </v-btn>
                </a>
              </template>
            </div>
          </v-col>
        </v-row>
        <div>
          <p class="text-h5">Активные объявления</p>
          <v-row dense class="mt-5">
            <v-col cols="12" md="6" v-for="item in forums" :key="item.id">
              <AdminForumCard :forum="item">
                <template #edit-delete>
                  <div style="position: absolute; top: 30px; right: 15px">
                    <v-icon class="mr-2" @click="goToEdit(item.id)">
                      mdi-pencil-outline
                    </v-icon>
                    <v-icon class="ml-2" @click="deleteForum(item.id)">
                      mdi-delete-outline
                    </v-icon>
                  </div>
                </template>
              </AdminForumCard>
            </v-col>
          </v-row>
          <div>
            <v-btn
              large
              class="mr-2 my-5 rounded-lg"
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
                      placeholder="Тип форума"
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
                    <v-select
                      :items="cities"
                      v-model="nforum.city"
                      placeholder="Город"
                      solo
                      flat
                      item-text="state"
                      item-value="value"
                      return-object
                      hide-details="auto"
                    ></v-select>
                  </v-col>

                  <v-col cols="12" class="">
                    <div class="mb-2">Навыки</div>
                    <v-select
                      :items="positions"
                      v-model="nforum.position"
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
                      v-model="mforum.find"
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
                      v-model="mforum.description"
                      height="100"
                      flat
                      elevation="0"
                      hide-details="auto"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      :items="cities"
                      v-model="nforum.city"
                      placeholder="Город"
                      solo
                      flat
                      item-text="state"
                      item-value="value"
                      return-object
                      hide-details="auto"
                    ></v-select>
                  </v-col>

                  <v-col cols="12" class="">
                    <div class="mb-2">Навыки</div>
                    <v-select
                      :items="positions"
                      v-model="mforum.position"
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
                      v-model="mforum.grip"
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
import AdminForumCard from "@/components/Admin/Forum/AdminForumCard.vue";

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
  components: {
    AdminForumCard,
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
    });
    this.$store.dispatch("user/getForums", this.userId);
    this.$store.dispatch("user/getRole", this.roleId);
  },
  computed: {
    ...mapState("user", ["user", "forums", "role"]),
    roleCategory() {
      if (this.role.name === "TRAINER") {
        return this.role.category
          .map((cat) => {
            if (cat == "ADULT") return "Взрослый";
            if (cat == "KIDS") return "Детский";
            if (cat == "YOUTH") return "Юношеский";
            if (cat == "WOMEN") return "Женский";
          })
          .join(", ");
      } else return "";
    },
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
      createForumDialog: false,
      modifyForumDialog: false,
      nforum: {
        find: { value: "PLAYERTEAM", state: "Игрок ищет команду" },
        description: "",
        city: "Москва",
        position: "",
        grip: "",
      },
      mforum: {
        find: {},
        description: "",
        city: "",
        position: "",
        grip: "",
      },
      cities: ["Москва"],
      playerSearch: [{ value: "PLAYERTEAM", state: "Игрок ищет команду" }],
      positions: ["Защитник", "Нападающий", "Вратарь"],
      grips: ["левый", "правый"],
      forumId: "",
    };
  },
  methods: {
    isValid(input) {
      if (input) return true;
      return false;
    },
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
    goToEdit(forumId) {
      this.$store.dispatch("user/getForum", forumId).then((forum) => {
        console.log(
          "🚀 ~ file: UserInformation.vue ~ line 441 ~ this.$store.dispatch ~ response",
          forum
        );
        const { description, city, role, grip, id } = forum;
        this.forumId = id;
        this.mforum = {
          find: { value: "PLAYERTEAM", state: "Игрок ищет команду" },
          description,
          city,
          position: role,
          grip,
        };
      });
      this.modifyForumDialog = true;
    },
    deleteForum(forumId) {
      this.$store.dispatch("user/deleteForum", forumId);
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
        city: "",
        position: "",
        grip: "",
      };
    },
    saveForum() {
      const { description, position, city, grip, find } = this.nforum;
      const postForum = {
        date: moment().format("YYYY-MM-DD"),
        description,
        grip,
        city,
        title: this.fullName,
        role: position,
        userId: this.userId,
        type: find.value,
      };
      this.$store.dispatch("user/postForum", postForum).then(() => {
        this.nforum = this.initForumDialog();
        this.createForumDialog = false;
      });
    },
    modifyForum(forum) {
      this.nforum = forum;
      this.modifyForumDialog = true;
    },
    updateForum() {
      const forumId = this.forumId;
      const { description, position, city, grip, find } = this.mforum;
      const putForum = {
        date: moment().format("YYYY-MM-DD"),
        description,
        grip,
        city,
        role: position,
        type: find.value,
      };
      this.$store
        .dispatch("user/putForum", { forumId, forum: putForum })
        .then(() => {
          this.mforum = this.initForumDialog();
          this.modifyForumDialog = false;
          this.$router.go();
        });
    },
  },
};
</script>

<style scoped></style>
