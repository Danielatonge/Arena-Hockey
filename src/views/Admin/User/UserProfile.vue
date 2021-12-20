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
      <v-row>
        <v-col cols="3">
          <div class="mb-4 text-h5">Ведение ролей</div>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="3">
          <v-btn
          width="100%"
          large
          class="mr-2 mb-2"
          color="grey lighten-2"
          elevation="0"
          @click="dialog = true"
          >
            Добавить роль
          </v-btn>
        </v-col>
      </v-row>
      

      <div>
        <v-tabs
        v-model="tab"
        background-color="#E0E0E0"
        color = "primary"
        centered
        >
          <v-tab
          v-for="(role, i) in rolelist"
          :key="i"
          @change="changeRoleId(role.id)"
          >
            {{ role.name }}
          </v-tab>
        </v-tabs>
        
        <v-tabs-items v-model="tab">
          <v-tab-item 
          v-for="(role, i) in rolelist"
          :key="i">
          
            <user-information :userId="userId" :roleId="componentKey" :key="componentKey"  />
            
          </v-tab-item>
        </v-tabs-items>
        
        <!-- <v-col
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
              user_role
            "
            @click="openRoleInformation(role.id)"
          >
            <div class="pa-2">
              {{ role.name }}
            </div>
          </v-sheet>
        </v-col> -->
        
      </div>
      <div>
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
                  <div class="text-h5 white--text">Заполнение роли</div>
                </v-row>
              </v-container>
            </v-sheet>
            <v-card-text class="grey lighten-4">
              <v-container>
                <v-row class="my-4">
                  <v-col cols="12" class="">
                    <div class="mb-2">Выберите роль</div>
                    <v-select
                      :items="allroles"
                      v-model="pickedRole"
                      placeholder="Роль"
                      solo
                      flat
                      item-text="text"
                      item-value="value"
                      return-object
                      hide-details="auto"
                      @change="checkUserRoles(pickedRole)"
                    ></v-select>
                  </v-col>
                </v-row>
                <div class="my-8 text-h6" v-if="pickedRole">
                  Заполните биографию и данные о своих профессиональных навыках
                </div>
                <v-row
                  v-if="pickedRole ? pickedRole.value === 'PLAYER' : false"
                >
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
                <v-row
                  v-if="pickedRole ? pickedRole.value === 'TRAINER' : false"
                >
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
                    <v-combobox
                      v-model="nrole.category"
                      :items="categories"
                      categories
                      clearable
                      placeholder="Возрастная категория"
                      multiple
                      solo
                      flat
                    >
                      <template
                        v-slot:selection="{ attrs, item, select, selected }"
                      >
                        <v-chip
                          v-bind="attrs"
                          :input-value="selected"
                          @click="select"
                          @click:close="remove(item)"
                        >
                          <strong>{{ item.text }}</strong
                          >&nbsp;
                        </v-chip>
                      </template>
                    </v-combobox>
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
                <v-row
                  v-if="pickedRole ? pickedRole.value === 'ARENA_ADMIN' : false"
                >
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
                <v-row
                  v-if="pickedRole ? pickedRole.value === 'TEAM_ADMIN' : false"
                >
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
                <div class="mt-6" v-if="pickedRole">
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
      <div v-if="userRoles">
        <user-information :userId="userId" :roleId="selectedRole"  />
      </div>
    </v-container>
    <v-snackbar
      :timeout="1500"
      v-model="errorRoleSnackbar"
      absolute
      centered
      color="primary"
      elevation="24"
      height="80px"
    >
      <p style="margin-bottom: 0;" class="snackbarText">Такая роль у вас уже есть</p> 
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from "vuex";
import UserInformation from './View/UserInformation.vue';

export default {
  components: {
    UserInformation,
  },
  computed: {
    ...mapState("user", ["user"]),
    showPersonalData() {
      const { birthDate, gender, phone, address, mail } = this.user;
      return birthDate || gender || phone || address || mail;
    },
    displayRoles() {
      return this.user.roles.map((role) => {
        if (role.name === "PLAYER") return { ...role, name: "Игрок" };
        if (role.name === "TRAINER") return { ...role, name: "Тренер" };
        if (role.name === "SELLER") return { ...role, name: "Продавец" };
        if (role.name === "ARENA_ADMIN") return { ...role, name: "Администратор арены" };
        if (role.name === "TEAM_ADMIN") return { ...role, name: "Администратор команды" };
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
    this.$store.dispatch("user/getUser", this.userId).then(() => {
      this.defineRole();
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
    })
    // this.$store.dispatch("user/getUserRoles", this.userId);
    
  },
  data() {
    return {
      pickedRole: null,
      rolelist: [],
      allroles: [
        { name: "PLAYER", text: "Игрок" },
        { value: "TRAINER", text: "Тренер" },
        { value: "ARENA_ADMIN", text: "Администратор арены" },
        { value: "TEAM_ADMIN", text: "Администратор команды" },
      ],
      checkbox: null,
      sections: null,
      dialog: false,
      nrole: {
        name: "",
        biography: "",
        grip: "",
        position: "",
        weight: "",
        height: "",
        status: "",
        category: [],
      },
      statuses: ["действующий", "Не действующий"],
      positions: ["Защитник", "Нападающий", "Вратарь"],
      grips: ["левый", "правый"],
      categories: [
        { value: "ADULT", text: "Взрослый" },
        { value: "KID", text: "Детский" },
        { value: "YOUTH", text: "Юношеский" },
        { value: "FEMALE", text: "Женский" },
      ],
      userRoles: false,
      selectedRole: "",
      errorRoleSnackbar: false,
      tab: null,
      componentKey: "",
    };
  },
  methods: {
    remove(item) {
      this.categories.splice(this.categories.indexOf(item), 1);
      this.categories = [...this.categories];
    },
    createUserRole() {
      if (this.pickedRole.value === "PLAYER") {
        this.createPlayerRole();
      }
      if (this.pickedRole.value === "TRAINER") {
        this.createTrainerRole();
      }
      if (this.pickedRole.value === "ARENA_ADMIN") {
        this.createArenaAdminRole();
      }
      if (this.pickedRole.value === "TEAM_ADMIN") {
        this.createTeamAdminRole();
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
        this.$router.go();
      });
    },
    createTrainerRole() {
      const userId = this.userId;
      const { biography, status, category } = this.nrole;
      const roleCategory = category.map(({ value }) => value);
      const _role = {
        name: "TRAINER",
        biography,
        status,
        category: roleCategory,
        userId,
      };

      this.$store.dispatch("user/createRole", _role).then(() => {
        this.dialog = false;
        this.nrole = this.initUserDialog();
        this.$router.go();
      });
    },
    createArenaAdminRole() {
      const userId = this.userId;
      const { biography } = this.nrole;
      const _role = {
        name: "ARENA_ADMIN",
        biography,
        userId,
      };

      this.$store.dispatch("user/createRole", _role).then(() => {
        this.dialog = false;
        this.nrole = this.initUserDialog();
        this.$router.go();
      });
    },
    createTeamAdminRole() {
      const userId = this.userId;
      const { biography } = this.nrole;
      const _role = {
        name: "TEAM_ADMIN",
        biography,
        userId,
      };

      this.$store.dispatch("user/createRole", _role).then(() => {
        this.dialog = false;
        this.nrole = this.initUserDialog();
        this.$router.go();
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
    openRoleInformation(role){
      console.log(role)
      console.log(this.selectedRole)
      if(role === this.selectedRole && this.userRoles == true){
        this.userRoles = false
        this.selectedRole = role
        return
      }
      this.userRoles = true
      this.selectedRole = role
    },

    changeRoleId(id){
      this.componentKey = id
    },

    defineRole(){
      this.displayRoles.forEach(elem => {
        let newObject = {
          name: elem.name,
          id: elem.id,
        }
        this.rolelist.push(newObject)
      })
      this.componentKey = this.rolelist[0].id
    },

    checkUserRoles(data){
      this.displayRoles.forEach(element => {
        if(data.text == element.name){
          this.dialog = false
          this.errorRoleSnackbar = true
          this.pickedRole = null
        }
      });
    }
  },
  created(){
    
  }
};
</script>

<style lang="scss">
.user_role:hover{
  background-color: #0681c8;
  color: #fff;
  cursor: pointer;
}

.snackbarText{
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 26px;
  line-height: 26px;
  text-align: center;
}
</style>
