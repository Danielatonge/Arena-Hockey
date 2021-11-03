<template>
  <div style="padding-top: 25px;max-width:1170px;margin:0 auto;">
    <div style="margin-top: 40px; margin-bottom: 40px">
      <v-row>
        <v-col style="padding: 0px; padding-bottom: 30px">
          <v-breadcrumbs style="padding: 0px" :items="path"></v-breadcrumbs>
        </v-col>
      </v-row>

      <v-row>
        <v-col md="8">
          <div
            style="
              font-family: Roboto;
              font-style: normal;
              font-weight: 500;
              font-size: 32px;
              line-height: 40px;
            "
          >
            Черновики
          </div>
        </v-col>
        <!-- <v-col md="3">
          <v-btn
          class="create_ad_btn"
          elevation="0"
          color="#0681c8"
          :to="`/vendor-ads/my-ads/create-new-ad`">
              Создать новое объявление
          </v-btn>
        </v-col> -->
      </v-row>
    </div>
    <div
      v-for="(item, i) in draftProducts"
      :key="i"
      class="mx-auto"
      max-width="344"
      outlined
    >
      <div>
        <v-list-item three-line>
          <!-- <router-link
            style="text-decoration: none"
            :to="`/catalog/${category}/${item.product_number}`"
          > -->
            <v-list-item-avatar
              style="border-radius: 12px; width: 282px; height: auto"
            >
              <v-img
                width="100%"
                height="auto"
                :src="`https://drive.google.com/uc?export=view&id=${item.product_photo}`"
              ></v-img>
            </v-list-item-avatar>
          <!-- </router-link> -->
          <v-list-item-content>
            <!-- <router-link
              style="text-decoration: none; color: #202028"
              :to="`/catalog/${category}/${item.product_number}`"
            > -->
              <v-card-text style="width: 100%; height: auto">
                <p
                  class="grey--text"
                  style="
                    color: #000;
                    margin-bottom: 10px;
                    font-family: Roboto;
                    font-size: 16px;
                    font-weight: 400;
                    line-height: 24px;
                  "
                >
                  {{ productDate() }}
                </p>

                <p
                  style="
                    word-break: normal;
                    margin-bottom: 10px;
                    font-family: Roboto;
                    font-size: 24px;
                    font-style: normal;
                    font-weight: 500;
                    line-height: 28px;
                  "
                >
                  {{ item.product_name }}
                </p>

                <p
                  style="
                    margin-bottom: 10px;
                    font-family: Roboto;
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 24px;
                    text-align: left;
                    color: #0681c8;
                  "
                >
                  {{ item.product_country }}, {{ item.product_city }}
                </p>

                <p
                  style="
                    margin-bottom: 10px;
                    font-family: Roboto;
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 24px;
                    text-align: left;
                  "
                >
                  {{ item.product_category }}, {{ item.product_brand }}, {{item.product_status}}
                </p>
                <p
                  style="
                    font-family: Roboto;
                    font-size: 24px;
                    font-style: normal;
                    font-weight: 500;
                    line-height: 28px;
                    text-align: left;
                  "
                >
                  {{ item.product_prise }} РУБ
                </p>
              </v-card-text>
            <!-- </router-link> -->
          </v-list-item-content>
        </v-list-item>
      </div>
    </div>
  </div>
</template>
<script>
import Axios from "axios";
import { GET_MY_DRAFT_PRODUCTS } from "@/api";
import moment from "moment";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      draftProducts: [],
      path: [
        {
          text: "Сушилка",
          disabled: false,
          href: "/catalog",
        },
        {
          text: "Объявления",
          disabled: false,
          href: "/vendor-ads",
        },
        {
          text: "Черновики",
          disabled: true,
          href: "",
        },
      ],
    };
  },
  methods: {
    ...mapActions(["CHANGE_UNAUTHTORISE"]),
    async getMyDraftProducts() {
      const token = localStorage.getItem("access_token");
      await Axios.get(`${GET_MY_DRAFT_PRODUCTS}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        this.draftProducts = res.data.result
      }).catch((error) => {
        if(error.response.status == 401){
          this.CHANGE_UNAUTHTORISE()
          this.$router.push({name: 'authorizationForm'})
        }
        console.error(error);
      });
    },
    productDate() {
      var march = moment(this.draftProducts.product_publish_date);
      return march.locale("ru").format("D MMMM YYYY");
    },
  },
  created() {
    this.getMyDraftProducts();
  },
};
</script>

<style lang="scss" scoped>
.create_ad_btn{
  color: white;
  border-radius: 8px;
  border: 1px solid #83c0e4;
  box-sizing: border-box;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
}
</style>