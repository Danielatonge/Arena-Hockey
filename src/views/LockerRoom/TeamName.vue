<template>
  <div class="grey lighten-4">
    <v-container class="pt-8 pb-0">
      <v-row>
        <div>
          <v-breadcrumbs :items="breadcrumb_items" class="px-3"></v-breadcrumbs>
        </div>
        <v-spacer></v-spacer>
        <div class="pr-3">
          <v-btn
            elevation="0"
            x-small
            color="grey lighten-2"
            height="40px"
            class="mr-1"
            ><v-icon color="grey lighten-0">mdi-whatsapp</v-icon></v-btn
          >
          <v-btn
            elevation="0"
            x-small
            color="grey lighten-2"
            height="40px"
            class="mx-1"
            ><v-icon color="grey lighten-0">mdi-instagram</v-icon></v-btn
          >
          <v-btn
            elevation="0"
            x-small
            color="grey lighten-2"
            height="40px"
            class="mx-1"
            ><v-icon color="grey lighten-0">mdi-vk</v-icon></v-btn
          >
          <v-btn
            elevation="0"
            x-small
            color="grey lighten-2"
            height="40px"
            class="ml-1"
            ><v-icon color="grey lighten-0">mdi-web</v-icon></v-btn
          >
        </div>
      </v-row>
      <v-row class="mb-3">
        <v-col cols="8" sm="6" md="7" lg="5">
          <p class="text-h5 blue--text">{{ team.city }}</p>
          <p class="text-h4">{{ team.title }}</p>
          <p class="grey--text">
            {{ team.miniDescription }}
          </p>
        </v-col>
        <v-spacer></v-spacer>
        <div class="px-3">
          <v-img
            src="@/assets/team_room_1.jpg"
            height="180px"
            width="180px"
          ></v-img>
        </div>
      </v-row>
      <v-btn color="primary" elevation="0">Вступить в команду</v-btn>
    </v-container>
    <v-container class="mt-10">
      <p class="text-h5">Описание</p>
      <div v-if="team.description.length < 580">
        <p class="">
          {{ team.description }}
        </p>
      </div>
      <div v-else>
        <p class="" v-if="!readMoreActivated">
          {{ team.description.slice(0, 580) + "..." }}
        </p>
        <p class="" v-else v-text="team.description"></p>
      </div>
      <v-btn
        color="grey lighten-2"
        v-show="team.description.length > 580"
        elevation="0"
        @click="readMoreActivated = !readMoreActivated"
      >
        {{ readMoreActivated ? "Cкрыть описание" : "Раскрыть описание" }}
      </v-btn>
    </v-container>
    <v-container class="mt-10">
      <p class="text-h5">Место проведения тренировок</p>
      <v-row dense class="mx-n4">
        <v-col cols="12" md="7">
          <v-card color="transparent" elevation="0">
            <div class="d-flex flex-no-wrap">
              <div class="ma-3" width="282px" height="186px">
                <v-img src="@/assets/preview_arena_1.jpg"></v-img>
              </div>
              <div class="description">
                <v-card-text>
                  <div class="text-h5 mb-4">Название команды</div>
                  <div class="body-1 grey--text">
                    2464 Royal Ln. Mesa, New Jersey 45463
                  </div>
                </v-card-text>
                <v-card-actions class="pl-4 bottom">
                  <v-btn
                    class="px-6"
                    color="grey lighten-2"
                    x-large
                    elevation="0"
                  >
                    Подробнее
                  </v-btn>
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
    <v-container class="mt-10">
      <p class="text-h5">Состав</p>
      <p class="text-h6">Тренеры, сотрудники</p>
      <v-row dense class="mx-n4">
        <v-col cols="12" md="6" v-for="(item, i) in player_items" :key="i">
          <v-card color="transparent" elevation="0">
            <div class="d-flex flex-no-wrap">
              <v-avatar class="ma-3" size="125" tile>
                <v-img :src="require('@/assets' + item + '.jpg')"></v-img>
              </v-avatar>
              <v-card-text>
                <div class="text-h5 mb-2">Фамилия Имя Отчество</div>
                <div class="body-1 blue--text mb-2">Возраст, город</div>

                <div class="body-1 grey--text">Директор команды</div>
              </v-card-text>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <p class="text-h6 mt-8">Вратари</p>
      <v-row dense class="mx-n4">
        <v-col cols="12" md="6" v-for="(item, i) in player_items" :key="i">
          <v-card color="transparent" elevation="0">
            <div class="d-flex flex-no-wrap">
              <v-avatar class="ma-3" size="125" tile>
                <v-img :src="require('@/assets' + item + '.jpg')"></v-img>
              </v-avatar>
              <v-card-text>
                <div class="text-h5 mb-2">Фамилия Имя Отчество</div>
                <div class="body-1 blue--text mb-2">Возраст, город</div>

                <div class="body-1 grey--text">Позиция</div>
              </v-card-text>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <p class="text-h6 mt-8">Защитники</p>
      <v-row dense class="mx-n4">
        <v-col cols="12" md="6" v-for="(item, i) in player_items" :key="i">
          <v-card color="transparent" elevation="0">
            <div class="d-flex flex-no-wrap">
              <v-avatar class="ma-3" size="125" tile>
                <v-img :src="require('@/assets' + item + '.jpg')"></v-img>
              </v-avatar>
              <v-card-text>
                <div class="text-h5 mb-2">Фамилия Имя Отчество</div>
                <div class="body-1 blue--text mb-2">Возраст, город</div>

                <div class="body-1 grey--text">Позиция</div>
              </v-card-text>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <p class="text-h6 mt-8">Нападающие</p>
      <v-row dense class="mx-n4">
        <v-col cols="12" md="6" v-for="(item, i) in player_items" :key="i">
          <v-card color="transparent" elevation="0">
            <div class="d-flex flex-no-wrap">
              <v-avatar class="ma-3" size="125" tile>
                <v-img :src="require('@/assets' + item + '.jpg')"></v-img>
              </v-avatar>
              <v-card-text>
                <div class="text-h5 mb-2">Фамилия Имя Отчество</div>
                <div class="body-1 blue--text mb-2">Возраст, город</div>

                <div class="body-1 grey--text">Позиция</div>
              </v-card-text>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="mt-10">
      <p class="text-h5">Активные объявления</p>
      <v-row class="mt-2 ml-0">
        <v-tabs v-model="value" class="d-flex flex-no-wrap rounded-lg">
          <v-tab v-for="item in advert_nav" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-card elevation="0" class="pa-5">
            <div class="d-flex flex-no-wrap">
              <v-avatar class="ma-3" size="100" tile>
                <v-img :src="require('@/assets/advert_1.jpg')"></v-img>
              </v-avatar>
              <v-card-text>
                <div class="body-1 grey--text">19 апреля 2021</div>
                <div class="text-h5 mb-2">Название команды</div>
                <div class="body-2 grey--text">Участников: 19</div>
              </v-card-text>
            </div>
            <div class="mb-4">
              Lorem non vitae eu nisl. Faucibus rhoncus est ultrices nisi. Amet
              est donec habitant sem odio aenean. At euismod euismod le...
            </div>
            <p class="bold">Необходимые требования:</p>
            <div class="d-flex mb-2">
              <div class="body-2 blue--text">Возраст: 24, 25</div>
              <div class="body-2 blue--text ml-16">Амплуа: защитник</div>
            </div>
            <div class="d-flex">
              <div class="body-2 blue--text">Хват: правый</div>
              <div class="body-2 blue--text ml-16">Уровень: профессионал</div>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card elevation="0" class="pa-5">
            <div class="d-flex flex-no-wrap">
              <v-avatar class="ma-3" size="100" tile>
                <v-img :src="require('@/assets/advert_2.jpg')"></v-img>
              </v-avatar>
              <v-card-text>
                <div class="body-1 grey--text">19 апреля 2021</div>
                <div class="text-h5 mb-2">Название команды</div>
                <div class="body-2 grey--text">Участников: 19</div>
              </v-card-text>
            </div>
            <div class="mb-4">
              Lorem non vitae eu nisl. Faucibus rhoncus est ultrices nisi. Amet
              est donec habitant sem odio aenean. At euismod euismod le...
            </div>
            <p class="bold">Необходимые требования:</p>
            <div class="d-flex mb-2">
              <div class="body-2 blue--text">Возраст: 24, 25</div>
              <div class="body-2 blue--text ml-16">Амплуа: защитник</div>
            </div>
            <div class="d-flex">
              <div class="body-2 blue--text">Хват: правый</div>
              <div class="body-2 blue--text ml-16">Уровень: профессионал</div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="mt-10">
      <p class="text-h5">Галерея</p>
      <v-row>
        <v-col cols="6" md="4" lg="3" v-for="(item, i) in media" :key="i">
          <v-img :src="item.src" @click="openGallery(i)"></v-img>
        </v-col>
        <LightBox
          ref="lightbox"
          :media="media"
          :show-caption="true"
          :show-light-box="false"
        />
      </v-row>
    </v-container>
    <v-container class="mt-10 pb-15">
      <p class="text-h5">Контакты</p>
      <div>
        <p>
          Касса: +7 495 964-39-69 <br />
          Кафе: +7 977 815-61-97 <br />
          Магазин: +7 495 369-19-77 <br />
          Отдел продаж: +7 925 278-77-41 <br />
          Ресепшн: +7 495 964-39-69 <br />
          Приемная директора: +7 495 964-39-69 <br />
        </p>
        <p>
          Администратор: Васильева Татьяна Михайловна <br />
          +7 495 964-39-69
        </p>
        <p>
          Email: office@spartak-academy.ru <br />
          Адрес: г. Москва, м. Сокольники, ул. Большая Тихоновская, д. 2.
        </p>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import LightBox from "vue-image-lightbox";
import { media } from "@/data/dummy";

export default {
  name: "TeamName",
  components: {
    LightBox,
  },
  computed: {
    ...mapState({ team: "current_team" }),
  },
  mounted() {
    const teamId = this.$route.params.teamId;
    const arenaId = this.$route.params.arenaId;

    this.$store.dispatch("getTeamByID", teamId);
    this.breadcrumb_items = [
      {
        text: "Название арены",
        disabled: false,
        href: `/arena/${arenaId}/information`,
      },
      {
        text: "Список команд",
        disabled: false,
        href: `/arena/${arenaId}/list_teams`,
      },
      {
        text: "Название команды",
        disabled: true,
        href: "breadcrumbs_link_2",
      },
    ];
  },
  methods: {
    openGallery(index) {
      this.$refs.lightbox.showImage(index);
    },
  },
  data() {
    return {
      value: 0,
      advert_nav: ["Команда ищет игроков", "Команда ищет тренера"],
      player_items: ["/player_1", "/player_2"],
      advert_items:["/advert_1","/advert_2"],
      readMoreActivated: false,
      breadcrumb_items: null,
      gallery_items: [
        "/gallery_1",
        "/gallery_2",
        "/gallery_3",
        "/gallery_4",
        "/gallery_5",
        "/gallery_6",
        "/gallery_7",
        "/gallery_8",
      ],
      media,
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