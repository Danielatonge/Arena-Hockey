<template>
  <div class="grey lighten-4">
    <v-img
      color="grey"
      height="350px"
      width="100%"
      src="@/assets/banner-room.jpg"
    >
      <v-container class="pt-8 pb-0">
        <v-row class="">
          <div>
            <v-breadcrumbs
              dark
              :items="breadcrumb_items"
              class="px-3"
            ></v-breadcrumbs>
          </div>
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
                <v-icon color="white"> {{ item.icon }}</v-icon>
              </v-btn>
            </a>
          </div>
        </v-row>

        <div class="d-flex mt-5 mb-2">
          <div class="pr-4">
            <v-avatar class="rounded-lg" contain tile size="180">
              <v-img
                contain
                :src="
                  team.profilePicture != null
                    ? team.profilePicture
                    : require('@/assets/team_room_1.jpg')
                "
              ></v-img>
            </v-avatar>
          </div>
          <div class="my-auto">
            <p class="text-h4 white--text">{{ team.title }}</p>
            <p class="white--text">
              <v-icon color="white">mdi-map-marker-outline</v-icon>
              {{ team.city }}
            </p>
          </div>
        </div>
      </v-container>
    </v-img>
    <v-container
      class="mt-10"
      v-if="team.description ? team.description.length : false"
    >
      <p class="text-h5">Описание</p>
      <div v-if="team.description.length < 580">
        <p class="text-justify" v-html="team.description"></p>
      </div>
      <div v-else>
        <p
          class="text-justify"
          v-if="!readMoreInfo"
          v-html="team.description.slice(0, 580) + '...'"
        ></p>
        <p class="text-justify" v-else v-html="team.description"></p>
      </div>
     
      <v-btn
        class="px-6"
        color="grey lighten-2"
        v-if="team.description.length > 580"
        x-large
        elevation="0"
        @click.stop="readMoreInfo = !readMoreInfo"
      >
        {{ readMoreInfo ? "Скрыть" : "Развернуть" }}
      </v-btn>
    </v-container>
    <v-container
      v-show="teamArenas ? teamArenas.length : false"
    >
      <p class="text-h5">Место проведения тренировок</p>
      <v-row dense class="mx-n4" >
        <div v-for="(arena, id) in teamArenas" :key="id">
          <v-col class="pt-0" cols="12">
          <v-card color="transparent" elevation="0">
            <div class="d-flex flex-no-wrap">
              <div class="ma-3">
                <v-avatar class="rounded-lg" width="282px" height="186px" tile>
                  <v-img
                    contain
                    :src="
                      arena.arena.profilePicture != null
                        ? arena.arena.profilePicture
                        : require('@/assets/team_room_1.jpg')
                    "
                  ></v-img>
                </v-avatar>
              </div>
              <div class="description">
                <v-card-text style="width: 100%">
                  <div class="text-h5 mb-4">{{ arena.arena.title }}</div>
                  <div class="body-1 grey--text">
                    {{ arena.arena.city }}
                  </div>
                </v-card-text>
                <v-card-actions class="pl-4 bottom">
                  <router-link
                    :to="{ name: 'arena-information', params: { arenaId: arena.arena.id } }"
                    class="reset-link"
                  >
                    <v-btn
                      class="px-6"
                      color="grey lighten-2"
                      x-large
                      elevation="0"
                    >
                      Подробнее
                    </v-btn>
                  </router-link>
                </v-card-actions>
              </div>
            </div>
          </v-card>
        </v-col>
        </div>
      </v-row>
    </v-container>
    <v-container  v-if="media ? media.length : false">
      <p class="text-h5">Галерея</p>
      <v-row>
        <v-col cols="6" md="4" lg="3" v-for="(item, i) in media" :key="i">
          <v-img style="height: 200px" :src="item" @click="openGallery(i)"></v-img>
        </v-col>
        <LightBox
          ref="lightbox"
          :media="media"
          :show-caption="true"
          :show-light-box="false"
        />
      </v-row>
    </v-container>
    <v-container
      class="mt-10"
      v-if="
        teamTrainers || teamPlayers || teamAdmin
          ? teamTrainers.length || teamPlayers.length || teamAdmin.length
          : false
      "
    >
      <p class="text-h5">Состав</p>
      <p class="text-h6" v-if="teamTrainers ? teamTrainers.length : false">
        Тренеры
      </p>
      <v-row dense class="mx-n4">
        <v-col cols="12" md="6" v-for="(item, i) in teamTrainers" :key="i">
          <router-link
          :to="{ name: 'room-player-card', params: { playerId: item.user.id } }"
          class="undo-link-default"
          >
            <v-card color="transparent" elevation="0" >
              <div class="d-flex flex-no-wrap">
                <v-avatar class="ma-3 rounded-lg" size="125" tile>
                  <v-img
                    
                    :src="
                      item.user.profilePicture.length
                        ? item.user.profilePicture
                        : require('@/assets/team_room_1.jpg')
                    "
                  ></v-img>
                </v-avatar>
                <v-card-text>
                  <div class="text-h5 mb-2">
                    {{
                      item.user.name +
                      " " +
                      item.user.middleName +
                      " " +
                      item.user.surname
                    }}
                  </div>
                  <div class="body-1 blue--text mb-2">
                    {{ item.user.age ? item.user.age + ",  " : "" }}
                    {{ item.user.city ? item.user.city : "" }}
                  </div>

                  <div class="body-1 grey--text">{{ item.user.position }}</div>
                </v-card-text>
              </div>
            </v-card>
          </router-link>
        </v-col>
      </v-row>

      <p class="text-h6 mt-8" v-if="teamAdmin ? teamAdmin.length : false">
        Администраторы команды
      </p>
      <v-row dense class="mx-n4">
        <v-col cols="12" md="6" v-for="(item, i) in teamAdmin" :key="i">
          <router-link
          :to="{ name: 'room-player-card', params: { playerId: item.user.id } }"
          class="undo-link-default"
          >
            <v-card color="transparent" elevation="0" >
              <div class="d-flex flex-no-wrap">
                <v-avatar class="ma-3 rounded-lg" size="125" tile>
                  <v-img
                    :src="
                      item.user.profilePicture.length
                        ? item.user.profilePicture
                        : require('@/assets/team_room_1.jpg')
                    "
                  ></v-img>
                </v-avatar>
                <v-card-text>
                  <div class="text-h5 mb-2">
                    {{
                      item.user.name +
                      " " +
                      item.user.middleName +
                      " " +
                      item.user.surname
                    }}
                  </div>
                  <div class="body-1 blue--text mb-2">
                    {{ item.user.age ? item.user.age + ",  " : "" }}
                    {{ item.user.city ? item.user.city : "" }}
                  </div>

                  <div class="body-1 grey--text">{{ item.user.position }}</div>
                </v-card-text>
              </div>
            </v-card>
          </router-link>
        </v-col>
      </v-row>

      <p class="text-h6 mt-8" v-if="teamPlayers ? teamPlayers.length : false">
        Игроки
      </p>
      <v-row dense class="mx-n4">
        <v-col cols="6" v-for="(item, i) in teamPlayers" :key="i">
          <div v-show="!readMorePlayers && i < 4">
            <router-link
            :to="{ name: 'room-player-card', params: { playerId: item.user.id } }"
            class="undo-link-default"
            >
              <v-card color="transparent" elevation="0">
                <div class="d-flex flex-no-wrap">
                  <v-avatar class="ma-3 rounded-lg" size="125" tile>
                    <v-img
                      contain
                      :src="
                        item.user.profilePicture != null
                          ? item.user.profilePicture
                          : require('@/assets/team_room_1.jpg')
                      "
                    ></v-img>
                  </v-avatar>
                  <v-card-text>
                    <div class="text-h5 mb-2">
                      {{
                        item.user.name +
                        " " +
                        item.user.middleName +
                        " " +
                        item.user.surname
                      }}
                    </div>
                    <div class="body-1 blue--text mb-2">
                      {{ item.user.age ? item.user.age + ", " : "" }}
                      {{ item.user.city ? item.user.city : "" }}
                    </div>
                    <div v-for="(role, i) in item.user.roles" :key="i" class="body-1 mb-2">
                      <div v-if="role.name == 'PLAYER'">
                        {{ role.grip ? role.grip + ", " : "" }}
                        {{ role.position ? role.position : "" }}
                      </div>
                    </div>

                    <div class="body-1 grey--text">{{ item.user.position }}</div>
                  </v-card-text>
                </div>
              </v-card>
            </router-link>
          </div>
          <div v-if="readMorePlayers">
            <router-link
            :to="{ name: 'room-player-card', params: { playerId: item.user.id } }"
            class="undo-link-default"
            >
              <v-card color="transparent" elevation="0">
                <div class="d-flex flex-no-wrap">
                  <v-avatar class="ma-3 rounded-lg" size="125" tile>
                    <v-img
                      contain
                      :src="
                        item.user.profilePicture != null
                          ? item.user.profilePicture
                          : require('@/assets/team_room_1.jpg')
                      "
                    ></v-img>
                  </v-avatar>
                  <v-card-text>
                    <div class="text-h5 mb-2">
                      {{
                        item.user.name +
                        " " +
                        item.user.middleName +
                        " " +
                        item.user.surname
                      }}
                    </div>
                    <div class="body-1 blue--text mb-2">
                      {{ item.user.age ? item.user.age + ", " : "" }}
                      {{ item.user.city ? item.user.city : "" }}
                    </div>
                    <div v-for="(role, i) in item.user.roles" :key="i" class="body-1 mb-2">
                      <div v-if="role.name == 'PLAYER'">
                        {{ role.grip ? role.grip + ", " : "" }}
                        {{ role.position ? role.position : "" }}
                      </div>
                    </div>

                    <div class="body-1 grey--text">{{ item.user.position }}</div>
                  </v-card-text>
                </div>
              </v-card>
            </router-link>
          </div>
        </v-col>
        <v-btn
        color="grey lighten-2 mb-5 ml-5"
        v-show="teamPlayers.length > 4"
        elevation="0"
        @click="readMorePlayers = !readMorePlayers"
        >
          {{ readMorePlayers ? "Скрыть" : "Развернуть" }}
        </v-btn>
      </v-row>
    </v-container>

    <v-container
      class="mt-10"
      v-if="
        teamFindPlayer || teamFindTrainer
          ? teamFindPlayer.length || teamFindTrainer.length
          : false
      "
    >
      <p class="text-h5">Активные объявления</p>
      <v-row class="mt-2 ml-0">
        <v-tabs v-model="premises_tab" class="d-flex flex-no-wrap rounded-lg">
          <v-tab v-for="item in advert_nav" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
      </v-row>
      <v-tabs-items v-model="premises_tab" style="background-color: unset">
        <v-tab-item v-for="i in 2" :key="i">
          <v-row dense class="mt-5" v-show="premises_tab === 0">
            <v-col
              cols="12"
              md="6"
              v-for="(item, i) in teamFindPlayer"
              :key="i"
            >
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
          <v-row dense class="mt-5" v-show="premises_tab == 1">
            <v-col
              cols="12"
              md="6"
              v-for="(item, i) in teamFindTrainer"
              :key="i"
            >
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
                  <div class="body-2 blue--text" v-show="item.age">
                    Возраст: {{ item.age }}
                  </div>
                  <div class="body-2 blue--text ml-16" v-show="item.role">
                    Амплуа: {{ item.role }}
                  </div>
                </div>
                <div class="d-flex">
                  <div class="body-2 blue--text" v-show="item.grip">
                    Хват: {{ item.grip }}
                  </div>
                  <div class="body-2 blue--text ml-16" v-show="item.level">
                    Уровень: {{ item.level }}
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Axios from "axios";
import { GET_TEAM } from "@/api";
import LightBox from "vue-image-lightbox";

export default {
  name: "TeamName",
  components: {
    LightBox,
  },
  props: {
    teamId: {
      type: String,
      required: true,
    },
  },
  filters: {
    descriptionLength(value) {
      if (!value) return "";
      if (value.length < 30) return value;
      return value.slice(0, 30) + "...";
    },
  },
  computed: {
    ...mapState("team", ["team"]),
    ...mapState("team", ["users"]),
    ...mapState("team", ["forums"]),
    valid_contact_list() {
      return this.contact_list.filter((x) => x.link !== "");
    },
    teamFindPlayer() {
      return this.forums.filter((x) => x.type === "PLAYERTEAM");
    },
    teamFindTrainer() {
      return this.forums.filter((x) => x.type === "TEAMTRAINER");
    },
    trainers() {
      return this.users.filter((x) => x.user.role === "TRAINER");
    },
    players() {
      return this.users.filter((x) => x.user.role === "PLAYER");
    },
    media() {
      let _media = [];
      if (this.team.gallery) {
        this.team.gallery.forEach((x) => {
          const item = {
            thumb: x,
            src: x,
            caption: "<h4></h4>",
          };
          _media.push(item);
        });
      }
      return _media;
    },
  },
  created() {
    this.getAllTeamPlayers()
    this.getAllTeamTrainer()
    this.getAllTeamArenas()
    this.getAllTeamAdmin()
    const teamId = this.$route.params.teamId;

    this.$store.dispatch("team/getPlayers", teamId)
    this.$store.dispatch("team/getForums", teamId);
    this.$store.dispatch("team/getTeam", teamId).then(() => {
      const teamItem = this.team;
      this.breadcrumb_items = [
        {
          text: "Список команд",
          disabled: false,
          exact: true,
          to: { name: "room" },
        },
        {
          text: teamItem.title,
          disabled: true,
          to: "",
        },
      ];

      this.contact_list = [
        {
          icon: "mdi-whatsapp",
          link: `${teamItem.whatsApp ? teamItem.whatsApp : ""}`,
        },
        {
          icon: "mdi-instagram",
          link: `${teamItem.instagram ? teamItem.instagram : ""}`,
        },
        { 
          icon: "mdi-alpha-k-box", 
          link: `${teamItem.vk ? teamItem.vk : ""}` },
        {
          icon: "mdi-web",
          link: `${teamItem.website ? teamItem.website : ""}`,
        },
        {
          icon: "mdi-music-note-outline",
          link: `${teamItem.tiktok ? teamItem.tiktok : ""}`,
        },
        {
          icon: "mdi-twitter",
          link: `${teamItem.twitter ? teamItem.twitter : ""}`,
        },
        {
          icon: "mdi-youtube",
          link: `${teamItem.youtube ? teamItem.youtube : ""}`,
        },
        {
          icon: "mdi-facebook",
          link: `${teamItem.facebook ? teamItem.facebook : ""}`,
        },
      ];
    });
  },
  methods: {
    openGallery(index) {
      this.$refs.lightbox.showImage(index);
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
    async getAllTeamPlayers() {
      await Axios.get(`${GET_TEAM}${this.teamId}/users?role=PLAYER`)
      .then( (res) => {
        this.teamPlayers = res.data
        console.log(this.teamPlayers)
      })
      .catch((error) => {
        console.error(error);
      })
    },
    async getAllTeamTrainer() {
      await Axios.get(`${GET_TEAM}${this.teamId}/users?role=TRAINER`)
      .then( (res) => {
        this.teamTrainers = res.data
      })
      .catch((error) => {
        console.error(error);
      })
    },
    async getAllTeamAdmin() {
      await Axios.get(`${GET_TEAM}${this.teamId}/users?role=TEAM_ADMIN`)
      .then( (res) => {
        this.teamAdmin = res.data
      })
      .catch((error) => {
        console.error(error);
      })
    },
    async getAllTeamArenas() {
      await Axios.get(`${GET_TEAM}${this.teamId}/arenas`)
      .then( (res) => {
        this.teamArenas = res.data
        
        console.log(this.teamArenas)
      })
      .catch((error) => {
        console.error(error);
      })
    },
  },
  data() {
    return {
      contact: null,
      premises_tab: null,
      arenaId: null,
      advert_nav: ["Команда ищет игроков", "Команда ищет тренера"],
      contact_list: null,
      readMoreInfo: false,
      breadcrumb_items: null,
      teamPlayers: [],
      teamTrainers: [],
      teamAdmin: [],
      teamArenas: [],
      readMorePlayers: false,
    };
  },
};
</script>

<style>
.description {
  position: relative;
}

.bottom {
  position: absolute;
  bottom: 0;
}
</style>
