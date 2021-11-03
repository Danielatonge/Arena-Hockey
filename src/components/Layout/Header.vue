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

        <router-link to="/admin" class="reset-link">
          <v-btn
            class="ml-4 rounded-lg fix-margin-right"
            height="40px"
            depressed
            color="primary"
          >
            Личный кабинет
          </v-btn>
          <router-link :to="{name: 'vCarte'}">
        <v-badge
        style="color:black !important;position: relative;
          left:80px;"
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
        </router-link>
      </div>
    </v-toolbar>
  </v-container>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style>
.fix-margin-left {
  margin-left: -16px;
}

.fix-margin-right {
  margin-right: -16px;
}

.my-logo {
  width: 40px;
  height: 40px;
  background-color: #eaeaea;
  border-radius: 8px;
}
</style>
