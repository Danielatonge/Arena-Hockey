<template>
  <div class="grey lighten-4">
    <v-container>
      <v-row class="mb-4">
        <v-col cols="4" md="3" class="text-center">
          <v-avatar class="rounded-lg" contain tile height="250px" width="100%">
            <v-img
              :src="
                user.profilePicture
                  ? user.profilePicture
                  : require('@/assets/unknown.jpeg')
              "
            ></v-img>
          </v-avatar>
        </v-col>
        <v-col cols="8" md="9" class="my-auto">
          <div class="mb-16">
            <div class="text-h5">{{ user.name }}</div>
            <div class="text-h5">{{ user.middleName }}</div>
            <div class="text-h5">{{ user.surname }}</div>
            <div>{{ user.city }}</div>
          </div>
        </v-col>
      </v-row>
      <div class="mb-4 text-h6">Выберите роли</div>
      <v-row class="mx-n4 pb-10">
        <v-col
          class="pa-4"
          cols="4"
          md="4"
          v-for="(section, i) in sections"
          :key="i"
        >
          <v-sheet
            color="grey lighten-3"
            elevation="0"
            height="90"
            width="100%"
            v-ripple
            class="
              font-weight-bold
              d-flex
              justify-center
              align-center
              rounded-lg
            "
            @click="openDialog(section.code)"
          >
            <div class="pa-4">
              {{ section.text }}
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card tile>
        <v-toolbar flat dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Заполнение роли «{{ section }}»</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false"> Save </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <div class="mb-4 text-h6">
              ПрофессиЗаполните биографию и данные о своих профессиональных
              навыках
            </div>
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
                    name: 'admin-user-view',
                    params: { userId },
                  })
                "
              >
                Назад
              </v-btn>
            </div>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";
export default {
  computed: { ...mapState("auth", ["userId"]), ...mapState("user", ["user"]) },
  mounted() {
    this.$store.dispatch("user/getUser", this.userId).then(() => {});
    const sections = [
      {
        text: "Игрок",
        edited: false,
        code: "PLAYER",
      },
      {
        text: "Представитель команды",
        edited: false,
        code: "TEAM",
      },
      {
        text: "Тренер",
        edited: false,
        code: "TRAINER",
      },
    ];
    this.sections = sections;
  },
  data() {
    return {
      checkbox: null,
      sections: null,
      dialog: true,
      section: "",
      nuser: {
        biography: "",
        grip: "",
        level: "",
        position: "",
        qualification: "",
        weight: 0,
      },
      positions: [],
      grips: [],
    };
  },
  methods: {
    openDialog(dialogCode) {
      console.log(
        "🚀 ~ file: RegisterRole.vue ~ line 116 ~ openDialog ~ dialogCode",
        dialogCode
      );
      this.section = dialogCode;
      this.dialog = true;
    },
    updateUser() {
      const userId = this.userId;
      const { biography, position, grip, find } = this.nuser;
      const updateInfo = {
        date: moment().format("YYYY-MM-DD"),
        picture: "",
        name: this.fullName,
        biography,
        grip,
        age: "",
        position,
        level: "",
        type: find,
        userId: this.userId,
      };
      this.$store.dispatch("user/putUser", { userId, updateInfo }).then(() => {
        this.nuser = this.initUserDialog();
      });
    },
    initForumDialog() {
      return {
        biography: "",
        grip: "",
        level: "",
        position: "",
        qualification: "",
        weight: 0,
      };
    },
  },
};
</script>

<style></style>
