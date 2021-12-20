<template>
  <div>
    <div class="white">
      <v-container class="pb-0">
        <v-row class="">
          <AppBreadcrumb :items="breadcrumb_items" />
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
                <v-icon color="black"> {{ item.icon }}</v-icon>
              </v-btn>
            </a>
          </div>
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
                    name: 'admin-edit-user',
                    params: { playerId: user.id },
                  })
                "
              >
                редактировать
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="grey lighten-4">
      <v-container>
        <div class="mb-4 text-h5" v-show="showPersonalData">
            Профессиональные навыки
        </div>
        <div 
        v-for="role in user.roles" 
        :key="role.id">
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
            <v-row class="mb-4">
                <v-col cols="12" class="mb-2" v-show="role.biography">
                <div class="body-1 mb-2 grey--text">Биография</div>
                <div class="">
                    {{ role.biography }}
                </div>
                </v-col>
            </v-row>
            </template>
        </div>
        <div class="mb-4 text-h5" v-if="advertisements.length != 0">
          Активные объявления
        </div>
        <v-row dense class="mt-5">
        <v-col cols="12" md="6" v-for="item in advertisements" :key="item.id">
          <AdminForumCard :forum="item">
          </AdminForumCard>
        </v-col>
      </v-row>
      </v-container>
    </div>    
  </div>
</template>

<script>
import { mapState } from "vuex";
import Axios from "axios";
import { GET_USER_BY_ID } from "@/api";
import AdminForumCard from '../../../components/Admin/Forum/AdminForumCard.vue';

export default {
  components: { AdminForumCard },
  created() {
    this.$store.dispatch("user/getUser", this.playerId).then(() => {
      this.mail = this.user.mail;
      const user = this.user;
      console.log(user)
      this.contact_list = [
        {
          icon: "mdi-whatsapp",
          link: `${user.whatsApp ? user.whatsApp : ""}`,
        },
        {
          icon: "mdi-instagram",
          link: `${user.instagram ? user.instagram : ""}`,
        },
        {
          icon: "mdi-alpha-k-box",
          link: `${user.vk ? user.vk : ""}`,
        },
        {
          icon: "mdi-web",
          link: `${user.website ? user.website : ""}`,
        },
        {
          icon: "mdi-music-note-outline",
          link: `${user.tiktok ? user.tiktok : ""}`,
        },
        {
          icon: "mdi-twitter",
          link: `${user.twitter ? user.twitter : ""}`,
        },
        {
          icon: "mdi-youtube",
          link: `${user.youtube ? user.youtube : ""}`,
        },
        {
          icon: "mdi-facebook",
          link: `${user.facebook ? user.facebook : ""}`,
        },
      ];
    })
    this.$store.dispatch("team-player/getPlayerInformation", this.playerId);
    //const playerId = this.playerId;
    
    
    this.getUserAdvertisements();
  },
  mounted(){
  },
  computed: {
    playerId() {
      return this.$route.params.playerId;
    },
    ...mapState("user", ["user"]),
    valid_contact_list() {
      return this.contact_list.filter((x) => {
        if (x.link !== "null") {
          if (x.link) return x.link;
        }
      });
    },
    showPersonalData() {
      const { birthDate, gender, phone, address, mail } = this.user;
      return birthDate || gender || phone || address || mail;
    },
    
  },
  data() {
    return {
      breadcrumb_items: [
        {
          text: "Личный кабинет",
          disabled: true,
        },
      ],
      sidebar_items: [],
      sidebar_tab: 0,
      enterMail: true,
      contact_list: [],
      checkbox: false,
      showPass: false,
      rules: {
        required: (value) => !!value || "Обязательный поль.",
      },
      password: "",
      mail: "",
      passCode: "",
      advertisements: [],
    };
  },
  methods: {
    getInfo(){
      console.log(this.user)
    },
    async getUserAdvertisements() {
        const playerId = this.playerId;
        await Axios.get(`${GET_USER_BY_ID}${playerId}/forums`)
        .then((res) => {
          this.advertisements = res.data
          // console.log(this.advertisements)
          // this.getInfo()
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style scoped></style>
