<template>
  <div class="grey lighten-4">
    <v-img
      color="grey"
      height="450px"
      width="100%"
      src="@/assets/banner-arena.jpg"
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
            <v-btn
              elevation="0"
              x-small
              color="transparent"
              height="40px"
              class="mr-1"
            >
              <v-icon color="white">mdi-whatsapp</v-icon>
            </v-btn>
            <v-btn
              elevation="0"
              x-small
              color="transparent"
              height="40px"
              class="mx-1"
            >
              <v-icon color="white">mdi-instagram</v-icon>
            </v-btn>
            <v-btn
              elevation="0"
              x-small
              color="transparent"
              height="40px"
              class="mx-1"
            >
              <v-icon color="white">mdi-vk</v-icon>
            </v-btn>
            <v-btn
              elevation="0"
              x-small
              color="transparent"
              height="40px"
              class="ml-1"
            >
              <v-icon color="white">mdi-web</v-icon>
            </v-btn>
          </div>
        </v-row>
        <div class="margin-top-big">
          <v-row class="mb-3">
            <v-col cols="12" sm="6" md="7" lg="5">
              <p class="text-h4 white--text">{{ arena.title }}</p>
              <p class="white--text">
                <v-icon color="white">mdi-map-marker-outline</v-icon>
                {{ arena.address }}
              </p>
            </v-col>
          </v-row>
          <v-btn color="primary mr-4 mt-4" elevation="0">Забронировать</v-btn>
          <v-btn class="mt-4" dark outlined elevation="0">Как проехать?</v-btn>
        </div>
      </v-container>
    </v-img>
    <v-container>
      <v-row class="mt-5">
        <v-col cols="5" md="3">
          <v-tabs vertical class="pl-4 rounded-lg" v-model="sidebar_tab">
            <v-tab
              v-for="(item, i) in sidebar_items"
              :key="i"
              router
              :to="item.link"
            >
              {{ item.text }}
            </v-tab>
          </v-tabs>
        </v-col>
        <v-col cols="7" md="9">
          <div>
            <p class="text-h4">Информация</p>
            <div class="ml-n2 mb-3">
              <v-chip
                color="primary"
                class="ma-2"
                label
                v-for="(tag, i) in arena.tags"
                :key="i"
              >
                {{ tag }}
              </v-chip>
            </div>
            <p>
              <!-- v-for can enter here -->
              {{ arena.description }}
            </p>

            <p>
              Хоккейный комплекс «Академия «Спартак» отвечает всем современным
              требованиям и оборудован высококлассной техникой для качественной
              организации тренировочного процесса и проведения спортивных
              мероприятий разного уровня. Только самое новейшее оборудование и
              тренажеры, инновационные материалы – все для комплексной
              подготовки профессионалов и любителей.
            </p>

            <p class="text-h6 mt-10">Адрес</p>
            <p class="blue--text text-h5">
              {{ arena.address }}
            </p>

            <p class="text-h6 mt-10">Как проехать?</p>
            <p class="grey--text">
              {{ arena.route }}
            </p>

            <p lass="mt-5">
              Ближайшие станции метро: <br />
              <span class="mr-3" v-for="(metro, i) in arena.metro" :key="i">
                {{ metro }}
              </span>
            </p>

            <section class="wrapper-map">
              <ArenaMap
                :coords="coords"
                :surfaces="surfaces"
                :zoom="zoom"
                @set-coords="coords = $event"
              />
            </section>

            <p class="text-h6 mt-10">Следж-хоккей</p>
            <p class>
              Следж-хоккей или хоккей на санях — командная спортивная игра на
              льду, паралимпийская версия классического хоккея. Игра заключается
              в противоборстве на специальных санях двух команд, которые,
              передавая шайбу клюшками, стремятся забросить её наибольшее
              количество раз в ворота соперника и не пропустить в свои.
              Побеждает команда, забросившая наибольшее количество шайб в ворота
              соперника. Следж-хоккей входит в программу зимних Паралимпийских
              игр.
            </p>
            <p>
              Следж-хоккей играют очень важную роль в социальной реабилитации
              детей и молодежи с различными нарушениями здоровья.
            </p>
            <v-btn color="grey lighten-2" elevation="0"> Подробнее </v-btn>

            <p class="text-h6 mt-10 mb-0">Прайс-лист</p>
            <p class="grey--text">Цены указаны за 1 час аренды</p>
            <div v-for="i in 3" :key="i">
              <p class="text-h4 mt-8 mb-0">Название катка {{ i }}</p>
              <p class="grey--text">Краткое описание катка</p>
              <v-row>
                <v-col
                  cols="2"
                  class="text-center border"
                  v-for="(item, indx) in price_list"
                  :key="indx"
                >
                  <div class="mb-3 grey--text">{{ item.interval }}</div>
                  <div class="right-border mr-n3">
                    <p class="mb-0">{{ item.weekday }}</p>
                    <p class="primary--text">{{ item.weekend }}</p>
                  </div>
                </v-col>
              </v-row>
              <div class="mt-n8">
                <span class="mr-5 font-weight-bold">
                  <v-icon style="font-size: 70px" color="#000" class="">
                    mdi-circle-small
                  </v-icon>
                  <span class="ml-n5">Будни</span>
                </span>
                <span class="font-weight-bold primary--text">
                  <v-icon style="font-size: 70px" color="primary" class="">
                    mdi-circle-small
                  </v-icon>
                  <span class="ml-n5"> Выходные </span>
                </span>
              </div>
            </div>
            <div class="mt-5">
              <v-btn color="primary" elevation="0" class="mr-3">
                Забронировать
              </v-btn>
              <v-btn color="grey lighten-2" elevation="0">
                Посмотреть катки
              </v-btn>
            </div>
            <p class="text-h5 font-weight-bold mt-10">Галерея</p>
            <v-row>
              <v-col
                cols="6"
                md="4"
                lg="3"
                v-for="(item, i) in gallery_items"
                :key="i"
              >
                <v-img :src="require('@/assets' + item + '.jpg')"></v-img>
              </v-col>
            </v-row>

            <p class="text-h5 font-weight-bold mt-10">Список помещений</p>
            <v-tabs
              v-model="premises_tab"
              class="d-flex flex-no-wrap rounded-lg"
            >
              <v-tab v-for="item in premises_nav" :key="item">
                {{ item }}
              </v-tab>
            </v-tabs>

            <v-tabs-items
              v-model="premises_tab"
              style="background-color: unset"
            >
              <v-tab-item v-for="item in premises_nav" :key="item">
                <v-row dense class="mx-n4 mt-5">
                  <v-col cols="12" v-for="i in 3" :key="i">
                    <v-card color="transparent" elevation="0">
                      <div class="d-flex flex-no-wrap">
                        <div class="ma-3" width="282px" height="186px">
                          <v-img src="@/assets/preview_arena_1.jpg"></v-img>
                        </div>
                        <div class="description">
                          <v-card-text>
                            <div class="text-h4 mb-4">Название катка 1</div>
                            <div class="body-1 grey--text mb-3">
                              Краткое описание катка
                            </div>
                            <div class="body-1 blue--text">
                              +7 (123) 234-15-23
                            </div>
                          </v-card-text>
                          <v-card-actions class="pl-4 bottom">
                            <v-btn
                              class="px-6"
                              color="primary"
                              x-large
                              elevation="0"
                            >
                              Забронировать
                            </v-btn>
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
                </v-row>
              </v-tab-item>
            </v-tabs-items>

            <p class="text-h5 font-weight-bold mt-10">Контакты</p>
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
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ArenaMap from "@/components/Arena/ArenaMap";
import { mapState } from "vuex";

export default {
  components: {
    ArenaMap,
  },
  computed: {
    ...mapState({ arena: "current_arena" }),
  },
  mounted() {
    const arenaId = this.$route.params.id;
    this.$store.dispatch("getArenaGivenID", arenaId);
    console.log(
      `${this.$store.state.current_arena.lat}, ` +
        `${this.$store.state.current_arena.lan}`
    );
  },
  data() {
    return {
      name: "ArenaName",
      sidebar_tab: 0,
      premises_tab: null,
      premises_nav: ["Катки", "Бросковые зоны", "Спортивные залы"],
      breadcrumb_items: [
        {
          text: "Москва",
          disabled: false,
          href: "breadcrumbs_link_1",
        },
        {
          text: "Название арены",
          disabled: true,
          href: "breadcrumbs_dashboard",
        },
      ],
      selectedItem: 0,
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
      sidebar_items: [
        { text: "Информация", link: "/arenaname" },
        { text: "Платные услуги", link: "/payment_portal" },
        { text: "Расписание мероприятий", link: "/event_schedule" },
        { text: "Список команд", link: "/list_teams" },
        { text: "Тренерский состав", link: "/training_staff" },
      ],
      price_list: [
        { interval: "06:00–08:30", weekday: "8 000", weekend: "10 000" },
        { interval: "08:30–15:00", weekday: "8 000", weekend: "10 000" },
        { interval: "15:00–17:00", weekday: "8 000", weekend: "10 000" },
        { interval: "17:00–19:00", weekday: "10 000", weekend: "10 000" },
        { interval: "19:00–22:30", weekday: "12 000", weekend: "10 000" },
        { interval: "22:30–00:00", weekday: "10 000", weekend: "10 000" },
      ],
      zoom: 16,
      surfaces: [
        {
          id: "1",
          city: this.$store.state.current_arena.city,
          type: "Mediawall",
          address: this.$store.state.current_arena.address,
          coords:
            `${this.$store.state.current_arena.lat}, ` +
            `${this.$store.state.current_arena.lan}`,
        },
      ],
      coords: [
        this.$store.state.current_arena.lat,
        this.$store.state.current_arena.lan,
      ],
    };
  },
};
</script>

<style>
.border > .right-border {
  border-right: 1px solid #ccc;
}
.border:last-child .right-border {
  border-right: unset;
}
.margin-top-big {
  margin-top: 178px;
}
.wrapper-map {
  background-color: #ccc;
  height: 600px;
  width: 100%;
  position: relative;
  margin: 10px auto;
}

@media (max-width: 600px) {
  .margin-top-big {
    margin-top: 100px;
  }
}
</style>