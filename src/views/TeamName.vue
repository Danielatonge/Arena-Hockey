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
          <p class="text-h5 blue--text">Москва</p>
          <p class="text-h4">Название команды</p>
          <p class="grey--text">
            Sapien, aliquet amet, libero enim, id amet in in habitasse amet
            augue et risus tincidunt dolor consequat urna, odio ridiculus nisl
            at
          </p>
        </v-col>
        <v-spacer></v-spacer>
        <div class="px-3">
          <v-img
            src="../assets/team_room_1.jpg"
            height="180px"
            width="180px"
          ></v-img>
        </div>
      </v-row>
      <v-btn color="primary" elevation="0">Вступить в команду</v-btn>
    </v-container>
    <v-container class="mt-10">
      <p class="text-h5">Описание</p>
      <div>
        <p class="text-justify">
          Хоккейный клуб «А-Линия» без преувеличения можно назвать старейшим
          клубом Москвы. Он был образован в далеком 1998 году, и вырос из
          обыкновенной дворовой команды: в районе Бирюлево Западное, построили
          ледовый каток. В те годы, когда развитие массового спорта не входило в
          число приоритетных направлений государственной политики, это
          воспринималось как подарок судьбы. Хоккейные площадки Москвы были
          наперечет.
        </p>
        <p class="text-justify">
          Молодые люди, играющие до этого только в зимний сезон на открытых
          площадках, пришли к директору катка с просьбой арендовать лед. Им было
          отказано. Тогда они обратились к Бородаевой Алине , как к депутату.
          Алина Юрьевна, занимающая активную жизненную
        </p>
      </div>
      <v-btn color="grey lighten-2" elevation="0">Раскрыть описание</v-btn>
    </v-container>
    <v-container class="mt-10">
      <p class="text-h5">Место проведения тренировок</p>
      <v-row dense class="mx-n4">
        <v-col cols="12" lg="6">
          <v-card color="transparent" elevation="0">
            <div class="d-flex flex-no-wrap">
              <div class="ma-3" width="282px" height="186px">
                <v-img src="../assets/preview_arena_1.jpg"></v-img>
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
      </v-row>
    </v-container>
    <v-container class="mt-10">
      <p class="text-h5">Расписание тренировок</p>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr class="grey lighten-3">
              <th class="text-left">Понедельник</th>
              <th class="text-left">Вторник</th>
              <th class="text-left">Среда</th>
              <th class="text-left">Четверг</th>
              <th class="text-left">Пятница</th>
              <th class="text-left">Суббота</th>
              <th class="text-left">Воскресенье</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>15:30 - 16:00</td>
              <td>-</td>
              <td>15:30 - 16:00</td>
              <td>-</td>
              <td>-</td>
              <td>15:30 - 16:00</td>
              <td>-</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
    <v-container class="mt-10">
      <p class="text-h5">Состав</p>
      <p class="text-h6">Тренеры, сотрудники</p>
      <v-row dense class="mx-n4">
        <v-col cols="12" md="6" v-for="(item, i) in player_items" :key="i">
          <v-card color="transparent" elevation="0">
            <div class="d-flex flex-no-wrap">
              <v-avatar class="ma-3" size="125" tile>
                <v-img :src="require('../assets' + item + '.jpg')"></v-img>
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
                <v-img :src="require('../assets' + item + '.jpg')"></v-img>
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
                <v-img :src="require('../assets' + item + '.jpg')"></v-img>
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
                <v-img :src="require('../assets' + item + '.jpg')"></v-img>
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
      <v-row class="mt-2">
        <v-col cols="12" sm="7" md="5" lg="4" xl="3">
          <v-bottom-navigation
            :value="value"
            color="primary"
            class="rounded-lg remove-horizontal-space"
            grow
          >
            <v-btn class="">
              <span class="body-2">Команда ищет игроков</span>
            </v-btn>
            <v-btn>
              <span class="body-2">Команда ищет тренера</span>
            </v-btn>
          </v-bottom-navigation>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-card elevation="0" class="pa-5">
            <div class="d-flex flex-no-wrap">
              <v-avatar class="ma-3" size="100" tile>
                <v-img src="../assets/advert_1.jpg"></v-img>
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
                <v-img src="../assets/advert_2.jpg"></v-img>
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
        <v-col
          cols="6"
          md="4"
          lg="3"
          v-for="(item, i) in gallery_items"
          :key="i"
        >
          <v-img :src="require('../assets' + item + '.jpg')"></v-img>
        </v-col>
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
export default {
  data() {
    return {
      value: 0,
      player_items: ["/player_1", "/player_2"],
      breadcrumb_items: [
        {
          text: "Название арены",
          disabled: false,
          href: "breadcrumbs_dashboard",
        },
        {
          text: "Список команд",
          disabled: false,
          href: "breadcrumbs_link_1",
        },
        {
          text: "Название команды",
          disabled: true,
          href: "breadcrumbs_link_2",
        },
      ],
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