<template>
  <v-container>
    <v-toolbar flat class="my-2">
      <div class="mr-4 fix-margin-left">
        <router-link to="/" class="reset-link">
          <div class="my-logo"></div>
        </router-link>
      </div>
      <v-toolbar-title class="">
        <div class="text-h5">Портал любителей хоккея</div>
        <div class="text-body-2">Вся информация в одном месте</div>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <div class="d-none d-md-flex">
        <v-text-field
          label="Поиск"
          single-line
          prepend-inner-icon="mdi-magnify"
          outlined
          dense
          hide-details="auto"
          class="rounded-lg"
        ></v-text-field>

        <v-btn
          class="ml-4 rounded-lg fix-margin-right"
          height="40px"
          depressed
          color="primary"
          @click="$router.push({ name: 'user-profile', params: { userId } })"
        >
          Личный кабинет
        </v-btn>

        <v-btn
          class="ml-7 rounded-lg fix-margin-right"
          height="40px"
          depressed
          color="primary"
          v-show="loggedIn"
          @click="logout"
        >
          Выйти
        </v-btn>
        <router-link :to="{name: 'vCarte'}">
        <v-badge
        style="position: relative;
          left:60px;"
        color = "rgba(234, 234, 234, 1)"
        :content="CART_COUNT"
        :value="CART_COUNT"
        overlap>
          <v-btn
          style="background:#0681C8;
          min-width: 1px;
          width: 50px;
          height: 40px;
          border: 1px solid #83c0e4;
          box-sizing: border-box;
          border-radius: 8px;">
            <img src="@/assets/big_cart.svg" />              
              <!-- <p
              style="
              position: absolute;
              background-color: #EAEAEA;
              border-radius: 50%;
              width:18px;
              height:18px;
              bottom:5px;
              left:29px;
              "
              >{{CART_COUNT}}</p> -->
          </v-btn>
        </v-badge>
      </router-link>

      <!-- <div v-if="(USER_ROLE == 'Продавец') || (userRole == 'Продавец')" > -->
        <v-btn
        style = "position: relative;
          left:70px;"
        :to="'/vendor-ads'"
        icon>
          <v-icon
          color="#0681C8">mdi-file-document-multiple-outline</v-icon>
        </v-btn>
      <!-- </div> -->
        
      </div>
    </v-toolbar>
  </v-container>
</template>

<script>
import Axios from "axios";
import { mapGetters, mapActions } from "vuex";
import { GET_CLIENT_CART_COUNT } from "@/api";
export default {
  name: "Header",
  computed: {
    ...mapGetters("auth", ["loggedIn"]),
    ...mapState("auth", ["userId"]),
    ...mapGetters('sushilka',["CART_COUNT", "USER_ROLE"]),
  },
  methods: {
       ...mapActions('sushilka',["CHANGE_CART_COUNT"]),
    logout() {
      const userId = this.userId;
      this.$store.dispatch("auth/logoutUser");
      this.$router.push({ name: "login", params: { userId } });
    },
    async getCartCount() {
      const token = localStorage.getItem("access_token");
      await Axios.get(`${GET_CLIENT_CART_COUNT}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          this.CHANGE_CART_COUNT(res.data.result);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style>
.fix-margin-left {
  margin-left: -16px;
}

.fix-margin-right {
  margin-right: -16px;
}
.v-badge__badge {
  color: black !important;
}
.my-logo {
  width: 40px;
  height: 40px;
  background-color: #eaeaea;
  border-radius: 8px;
}
</style>
