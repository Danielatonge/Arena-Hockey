<template>
  <div class="grey lighten-4">
    <v-img
      color="grey"
      height="350px"
      width="100%"
      src="@/assets/school_bg.jpg"
    >
      <v-container class="pt-8 pb-0">
        <v-row>
          <div>
            <v-breadcrumbs
              dark
              :items="breadcrumb_items"
              class="px-3"
            ></v-breadcrumbs>
          </div>
          <v-spacer></v-spacer>
          <div class="pr-3">
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
        <v-row class="mb-3">
          <v-col cols="8" sm="6" md="7" lg="5">
            <p class="text-h5 white--text">{{ school.city }}</p>
            <p class="text-h4 white--text">{{ school.title }}</p>
            <v-btn class="mt-8" color="primary" elevation="0"
              >Вступить в школы
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
          <v-avatar class="rounded-lg" size="200" tile>
            <v-img
              contain
              :src="
                school.profilePicture != null
                  ? school.profilePicture
                  : require('@/assets/team_room_1.jpg')
              "
            ></v-img>
          </v-avatar>
        </v-row>
      </v-container>
    </v-img>
    <v-container
      class="mt-10"
      v-if="school.description ? school.description.length : false"
    >
      <p class="text-h5">Описание</p>
      <div v-if="school.description.length < 580">
        <p class="text-justify" v-html="school.description"></p>
      </div>
      <div v-else>
        <p
          class="text-justify"
          v-if="!readMoreInfo"
          v-html="school.description.slice(0, 580) + '...'"
        ></p>
        <p class="text-justify" v-else v-html="school.description"></p>
      </div>
      <v-btn
        class="px-6"
        color="grey lighten-2"
        x-large
        elevation="0"
        @click.stop="readMoreInfo = !readMoreInfo"
      >
        {{ readMoreInfo ? "Скрыть" : "Развернуть" }}
      </v-btn>
    </v-container>
    <v-container
      class="mt-10"
      v-show="school.arenas ? school.arenas.length : false"
    >
      <p class="text-h5">Место проведения тренировок</p>
      <v-row dense class="mx-n4" v-for="(arena, id) in school.arenas" :key="id">
        <v-col cols="12" md="7">
          <v-card color="transparent" elevation="0">
            <div class="d-flex flex-no-wrap">
              <div class="ma-3">
                <v-avatar class="rounded-lg" width="282px" height="186px" tile>
                  <v-img
                    contain
                    :src="
                      arena.profilePicture != null
                        ? arena.profilePicture
                        : require('@/assets/team_room_1.jpg')
                    "
                  ></v-img>
                </v-avatar>
              </div>
              <div class="description">
                <v-card-text>
                  <div class="text-h5 mb-4">{{ arena.title }}</div>
                  <div class="body-1 grey--text">
                    {{ arena.city }}
                  </div>
                </v-card-text>
                <v-card-actions class="pl-4 bottom">
                  <router-link
                    :to="{ name: 'arena-information', params: { arenaId } }"
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
        <v-col cols="12" md="5">
          <p class="text-h5">Расписание тренировок</p>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr class="grey lighten-3">
                  <th class="text-left">Понедельник</th>
                  <th class="text-left">Среда</th>
                  <th class="text-left">Суббота</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>15:30 - 16:00</td>
                  <td>15:30 - 16:00</td>
                  <td>15:30 - 16:00</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-container>
    <v-container
      class="mt-10"
      v-if="
        school.trainers || school.players
          ? school.trainers.length || school.players.length
          : false
      "
    >
      <p class="text-h5">Состав</p>
      <p
        class="text-h6"
        v-if="school.trainers ? school.trainers.length : false"
      >
        Тренеры, сотрудники
      </p>
      <v-row dense class="mx-n4">
        <v-col cols="12" md="6" v-for="(item, i) in trainers" :key="i">
          <v-card color="transparent" elevation="0">
            <div class="d-flex flex-no-wrap">
              <v-avatar class="ma-3 rounded-lg" size="125" tile>
                <v-img
                  contain
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
                <div
                  class="body-1 blue--text mb-2"
                  v-show="item.user.age && item.user.city"
                >
                  {{ item.user.age }}, {{ item.user.city }}
                </div>

                <div class="body-1 grey--text">{{ item.user.position }}</div>
              </v-card-text>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <p
        class="text-h6 mt-8"
        v-if="school.players ? school.players.length : false"
      >
        Игроки
      </p>
      <v-row dense class="mx-n4">
        <v-col cols="12" md="6" v-for="(item, i) in players" :key="i">
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
                  {{ item.user.age ? item.user.age + "  " : "" }}
                  {{ item.user.level ? item.user.level : "" }}
                </div>

                <div class="body-1 grey--text">{{ item.user.position }}</div>
              </v-card-text>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container
      class="mt-10"
      v-if="
        schoolFindPlayer || schoolFindTrainer
          ? schoolFindPlayer.length || schoolFindTrainer.length
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
              v-for="(item, i) in schoolFindPlayer"
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
              v-for="(item, i) in schoolFindTrainer"
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

    <v-container class="mt-10" v-if="media ? media.length : false">
      <p class="text-h5">Галерея</p>
      <v-row>
        <v-col cols="6" md="4" lg="3" v-for="(item, i) in media" :key="i">
          <v-img :src="item" @click="openGallery(i)"></v-img>
        </v-col>
        <LightBox
          ref="lightbox"
          :media="media"
          :show-caption="true"
          :show-light-box="false"
        />
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import LightBox from "vue-image-lightbox";

export default {
  components: {
    LightBox,
  },
  props: {
    schoolId: {
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
    ...mapState("school", ["school"]),
    valid_contact_list() {
      return this.contact_list.filter((x) => x.link !== "");
    },
    media() {
      let _media = [];
      if (this.school.gallery) {
        this.school.gallery.forEach((x) => {
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
    const schoolId = this.schoolId;
    this.$store.dispatch("school/getSchool", schoolId);
    this.$store.dispatch("school/getPlayers", schoolId);
    this.$store.dispatch("school/getForums", schoolId);

    this.breadcrumb_items = [
      {
        text: "Школы",
        disabled: false,
        href: `/school`,
      },
      {
        text: this.school.title,
        disabled: true,
        href: "",
      },
    ];
    const schoolItem = this.school;

    this.contact_list = [
      { icon: "mdi-whatsapp", link: `${schoolItem.whatsApp}` },
      { icon: "mdi-instagram", link: `${schoolItem.instagram}` },
      { icon: "mdi-alpha-k-box", link: `${schoolItem.vk}` },
      { icon: "mdi-web", link: `${schoolItem.website}` },
      { icon: "mdi-music-note-outline", link: `${schoolItem.tiktok}` },
      { icon: "mdi-twitter", link: `${schoolItem.twitter}` },
      { icon: "mdi-youtube", link: `${schoolItem.youtube}` },
      { icon: "mdi-facebook", link: `${schoolItem.facebook}` },
    ];
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
