<template>
  <div class="grey lighten-4">
    <v-container class="pb-0">
      <div class="mb-4 text-h5" v-show="showPersonalData">
        Персональные данные
      </div>
      <v-row class="mb-4">
        <v-col cols="6" class="mb-2" v-show="user.birthDate">
          <div class="body-1 mb-2 grey--text">День рождения</div>
          <div class="">
            {{ user.birthDate }}
          </div>
        </v-col>
        <v-col cols="6" class="mb-2" v-show="user.gender">
          <div class="body-1 mb-2 grey--text">Пол</div>
          <div class="">{{ user.gender }}</div>
        </v-col>
        <v-col cols="6" class="mb-2" v-show="user.phone">
          <div class="body-1 mb-2 grey--text">Номер телефона</div>
          <div class="">
            {{ user.phone }}
          </div>
        </v-col>
        <v-col cols="6" class="mb-2" v-show="user.mail">
          <div class="body-1 mb-2 grey--text">Электронная почта</div>
          <div class="blue--text">
            {{ user.mail }}
          </div>
        </v-col>
        <v-col cols="6" class="mb-2" v-show="user.address">
          <div class="body-1 mb-2 grey--text">Адрес</div>
          <div class="">
            {{ user.address }}
          </div>
        </v-col>
      </v-row>
      <div class="mb-4 text-h5">Ведение ролей</div>
      <v-row class="mx-n4 pb-10">
        <v-col
          class="pa-2"
          cols="4"
          md="4"
          v-for="(role, i) in displayRoles"
          :key="i"
        >
          <v-sheet
            elevation="0"
            height="70"
            width="100%"
            v-ripple
            class="
              font-weight-light
              d-flex
              justify-center
              align-center
              rounded-lg
            "
            @click="
              $router.push({
                name: 'admin-user-role',
                params: { userId: userId, roleId: role.id },
              })
            "
          >
            <div class="pa-2">
              {{ role.name }}
            </div>
          </v-sheet>
        </v-col>
      </v-row>
      <div>
        <v-btn
          class="mr-2 mb-2"
          large
          color="grey lighten-2"
          elevation="0"
          @click="dialog = true"
        >
          Добавить роли
        </v-btn>
        <v-dialog
          v-model="dialog"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
          scrollable
        >
          <v-card tile>
            <v-sheet color="primary">
              <v-container>
                <v-row class="my-auto">
                  <v-btn class="mr-4 pb-1" icon dark @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <div class="text-h5 white--text">
                    Заполнение роли «{{ dialogCode }}»
                  </div>
                </v-row>
              </v-container>
            </v-sheet>
            <v-card-text class="grey lighten-4">
              <v-container>
                <div class="my-8 text-h6">
                  Заполните биографию и данные о своих профессиональных навыках
                </div>
                <v-row v-if="dialogCode === 'PLAYER'">
                  <v-col cols="12" class="">
                    <v-select
                      :items="positions"
                      v-model="nrole.position"
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
                      v-model="nrole.grip"
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
                      v-model="nrole.height"
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
                      v-model="nrole.weight"
                      dense
                      hide-details="auto"
                      class="rounded-lg"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" class="">
                    <div class="mb-2">Биография</div>
                    <v-textarea
                      solo
                      v-model="nrole.biography"
                      height="100"
                      flat
                      elevation="0"
                      hide-details="auto"
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-row v-if="dialogCode === 'TRAINER'">
                  <v-col cols="12" class="">
                    <v-select
                      :items="statuses"
                      v-model="nrole.status"
                      placeholder="Статус"
                      solo
                      flat
                      hide-details="auto"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" class="mb-2">
                    <v-select
                      :items="categories"
                      v-model="nrole.category"
                      placeholder="Возрастная категория"
                      solo
                      flat
                      item-text="text"
                      item-value="value"
                      return-object
                      hide-details="auto"
                    ></v-select>
                  </v-col>

                  <v-col cols="12" class="">
                    <div class="mb-2">Биография</div>
                    <v-textarea
                      solo
                      v-model="nrole.biography"
                      height="100"
                      flat
                      elevation="0"
                      hide-details="auto"
                    ></v-textarea>
                  </v-col>
                </v-row>
                <div class="mt-6">
                  <v-btn
                    large
                    class="mr-2 mb-2"
                    color="primary"
                    elevation="0"
                    @click="createUserRole"
                  >
                    Сохранить
                  </v-btn>
                  <v-btn
                    large
                    class="ml-2 mb-2"
                    color="grey lighten-2"
                    elevation="0"
                    @click="dialog = false"
                  >
                    Назад
                  </v-btn>
                </div>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("user", ["user", "roles"]),
    showPersonalData() {
      const { birthDate, gender, phone, address, mail } = this.user;
      return birthDate || gender || phone || address || mail;
    },
    displayRoles() {
      return this.roles.map((role) => {
        if (role.name === "PLAYER") return { ...role, name: "Игрок" };
        if (role.name === "TRAINER") return { ...role, name: "Тренер" };
        if (role.name === "SELLER") return { ...role, name: "Продавец" };
        if (role.name === "string")
          return { ...role, name: "недопустимая роль" };
      });
    },
  },
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.$store.dispatch("user/getUser", this.userId);
    this.$store.dispatch("user/getUserRoles", this.userId);
    const id = this.userId;
    this.sections = [
      {
        text: "Игрок",
        link: `/admin/sport_complex/${id}/information`,
      },
      {
        text: "Представитель команды",
        link: `/admin/sport_complex/${id}/payment_portal`,
      },
      {
        text: "Тренер",
        link: `/admin/sport_complex/${id}/schedule_event`,
      },
      {
        text: "Представитель организации",
        link: `/admin/sport_complex/${id}/team_list`,
      },
      {
        text: "Представитель катка",
        link: `/admin/sport_complex/${id}/training_staff`,
      },
      {
        text: "Продавец",
        link: `/admin/sport_complex/${id}/management_staff`,
      },
      {
        text: "Покупатель",
        link: `/admin/sport_complex/${id}/management_staff`,
      },
    ];
  },
  data() {
    return {
      checkbox: null,
      sections: null,
      dialog: false,
      dialogCode: "",
      nrole: {
        name: "",
        biography: "",
        grip: "",
        position: "",
        weight: "",
        height: "",
        status: "",
        category: "",
      },
      statuses: ["действующий", "Не действующий"],
      positions: ["Защитник", "Нападающий", "Вратарь"],
      grips: ["левый", "правый"],
      categories: [
        { value: "ADULT", text: "взрослый" },
        { value: "CHILDREN", text: "дети" },
      ],
    };
  },
  methods: {
    openDialog(dialogCode) {
      console.log(
        "🚀 ~ file: RegisterRole.vue ~ line 116 ~ openDialog ~ dialogCode",
        dialogCode
      );

      this.dialogCode = dialogCode;
      this.dialog = true;
    },
    createUserRole() {
      if (this.dialogCode === "PLAYER") {
        this.createPlayerRole();
      }
      if (this.dialogCode === "TRAINER") {
        this.createTrainerRole();
      }
    },
    createPlayerRole() {
      const userId = this.userId;
      const { biography, position, grip, weight, height } = this.nrole;
      const _role = {
        name: "PLAYER",
        biography,
        grip,
        position,
        weight: Number(weight),
        height: Number(height),
        userId,
      };

      this.$store.dispatch("user/createRole", _role).then(() => {
        this.dialog = false;
        this.nrole = this.initUserDialog();
      });
    },
    createTrainerRole() {
      const userId = this.userId;
      const { biography, status, category } = this.nrole;
      const _role = {
        name: "TRAINER",
        biography,
        status,
        category,
        userId,
      };

      this.$store.dispatch("user/createRole", _role).then(() => {
        this.dialog = false;
        this.nrole = this.initUserDialog();
      });
    },
    initUserDialog() {
      return {
        biography: "",
        grip: "",
        role: "",
        weight: "",
        height: "",
        status: "",
        category: "",
        name: "",
      };
    },
  },
};
</script>

<style></style>
