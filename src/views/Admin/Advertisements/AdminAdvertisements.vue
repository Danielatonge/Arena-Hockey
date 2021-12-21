<template>
  <div>
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
            <div class="text-h5 black--text">Создать объявление на поиск</div>
            <div class="mb-4">
              <v-icon @click.stop="createForumDialog = false">mdi-close</v-icon>
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
              <v-col cols="12">
                <div class="mb-2">Название объявления</div>
                <v-text-field
                label="Название объявления"
                v-model="nforum.title"
                solo
                flat
                hide-details="auto"
                ></v-text-field>
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

              <v-col cols="12" class="" v-if="nforum.find.value == 'TEAMPLAYER'">
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
              <v-col cols="12" class="mb-2" v-if="nforum.find.value == 'TEAMPLAYER'">
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
              <v-icon @click.stop="modifyForumDialog = false">mdi-close</v-icon>
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
              <v-col cols="12">
                <div class="mb-2">Название объявления</div>
                <v-text-field
                label="Название объявления"
                v-model="mforum.title"
                solo
                flat
                hide-details="auto"
                ></v-text-field>
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

              <v-col v-if="mforum.find.value == 'TEAMPLAYER'" cols="12" class="">
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
              <v-col v-if="mforum.find.value == 'TEAMPLAYER'" cols="12" class="mb-2">
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
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import AdminForumCard from "../../../components/Admin/Forum/AdminForumCard.vue";

export default {
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  components: {
    AdminForumCard,
  },
  created() {
    const userId = this.userId;
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
            if (cat == "KID") return "Детский";
            if (cat == "YOUTH") return "Юношеский";
            if (cat == "FEMALE") return "Женский";
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
        title: "",
        organizer: "",
      },
      mforum: {
        find: {},
        description: "",
        city: "",
        position: "",
        grip: "",
        title: "",
      },
      cities: ["Москва"],
      playerSearch: [
        { value: "PLAYERTEAM", state: "Игрок ищет команду" },
        { value: "TEAMPLAYER", state: "Команда ищет игроков" },
        { value: "TEAMTRAINER", state: "Команда ищет тренера" },
        { value: "TRAINERTEAM", state: "Тренер ищет команду" },
      ],
      positions: ["Защитник", "Нападающий", "Вратарь"],
      grips: ["Левый", "Правый"],
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
        const { type, description, city, role, grip, id, title } = forum;
        this.forumId = id;
        this.mforum = {
          find: { value: `${type}`, state: "" },
          description,
          city,
          position: role,
          grip,
          title,
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
      const { description, position, city, grip, find, title } = this.nforum;
      const postForum = {
        date: moment().format("YYYY-MM-DD"),
        description,
        grip,
        city,
        title,
        role: position,
        userId: this.userId,
        type: find.value,
        organizer: this.fullName,
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
      console.log(find)
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
          this.$store.dispatch("user/getForums", this.userId);
        });
    },
  },
};
</script>

<style scoped></style>
