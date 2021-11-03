<template>
<div style="margin-top: 50px;padding-top: 25px;max-width:1170px;margin:0 auto;">
    <v-row>
      <v-col style="padding: 0px; padding-bottom: 30px">
        <v-breadcrumbs style="padding: 0px" :items="path"></v-breadcrumbs>
      </v-col>
    </v-row>
    <v-row>
        <v-col style="padding: 0">
            <p class="text">Карточка продавца</p>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="4" style="padding-left: 0">
            <v-row>
                <v-col>
                    <v-card
                    style="display: flex; justify-content: center;"
                    elevation="0">
                        <v-list-item class="grow">
                            <v-col>
                                <div style="padding-top: 20px; width: 250px; height: auto; display: block; margin-left: auto; margin-right: auto;">
                                    <v-img
                                    style=" border-radius: 12px;"
                                    class="elevation-0"
                                    alt=""
                                    :src="vendor.vendor_photo"></v-img>
                                </div>
                                <div v-if="vendor.is_fiz_face">
                                    <p class="face_type">Физическое лицо</p>
                                </div>
                                <div v-else>
                                    <p class="face_type">Юридическое лицо</p>
                                </div>
                                <p class="vendor_fio">{{vendor.vendor_fio}}</p>
                                <div style="display: flex; justify-content: center">
                                    <div
                                    v-for="(item, i) in vendor_socials"
                                    :key="i">
                                    
                                        <div v-if="item.name == 'Инстаграмм'" style="margin: 0 5px">
                                            <a :href="item.linq">
                                                <v-icon
                                                size="40px"
                                                color="#000">mdi-instagram</v-icon>
                                            </a>
                                        </div>
                                        <div v-if="item.name == 'Ютуб'" style="margin: 0 5px">
                                            <a :href="item.linq">
                                                <v-icon
                                                size="40px"
                                                color="#000">mdi-youtube</v-icon>
                                            </a>
                                        </div>
                                        <div v-if="item.name == 'Твиттер'" style="margin: 0 5px">
                                            <a :href="item.linq">
                                                <v-icon
                                                size="40px"
                                                color="#000">mdi-twitter</v-icon>
                                            </a>
                                        </div>
                                        <div v-if="item.name == 'В контакте'" style="margin: 0 5px">
                                            <a :href="item.linq">
                                                <img style="margin-right: 30px" src="@/assets/vk.svg"/>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <p class="vendor_phone">{{vendor.vendor_phone}}</p>
                                <div style="display: flex; justify-content: center; ">
                                    <p class="vendor_rating">{{vendor.vendor_rating}}</p>
                                    <v-icon style="height: 26px; color: #323232; margin-right: 17px">mdi-star-outline</v-icon>
                                    <p class="vendor_rating" style="color: #0681C8; cursor: pointer" @click="open_reviews = true">{{vendor.comment_count}} отзыва</p>
                                </div>
                                <div
                                v-if="vendor.is_in_favourite == false"
                                style="display: flex; justify-content: center;">
                                    <v-btn
                                    @click="addVendorToFavourite"
                                    color="#C3E1F2"
                                    style="color: #0681C8; border: 1px solid #83c0e4; border-radius: 8px;"
                                    elevation="0">
                                        <v-icon color="#0681C8" dark>mdi-star-outline</v-icon>
                                        ДОБАВИТЬ В ИЗБРАННОЕ
                                    </v-btn>
                                </div>
                                <div
                                v-else
                                style="display: flex; justify-content: center;">
                                    <v-btn
                                    @click="removeVendorFromFavourite"
                                    color="#F0F5F8"
                                    style="color: #0681C8; border: 1px solid #4F8BAE; border-radius: 8px;"
                                    elevation="0">
                                        <v-icon color="#0681C8" dark>mdi-star-off-outline</v-icon>
                                        УДАЛИТЬ ИЗ ИЗБРАННОГО
                                    </v-btn>
                                </div>
                            </v-col>
                        </v-list-item>
                </v-card>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="8">
            <p class="advertisement_title">Объявления продавца:</p>
            <v-row
            v-for="(item) in vendor_products"
            :key="item.product_number">
                <div>
                    <v-list-item three-line>
                        <v-list-item-avatar
                        style="border-radius: 12px; width: 282px; height: auto">
                            <v-img
                            width="100%"
                            height="auto"
                            :src="`https://drive.google.com/uc?export=view&id=${item.product_photo}`"
                            ></v-img>
                        </v-list-item-avatar>
                        
                        <v-list-item-content>
                            <router-link
                            style="color: #000 !important;text-decoration: none"
                            :to="`/catalog/${item.product_en_category}/${item.product_number}/`"
                            >
                            <v-card-text style="width: 450px; height: auto">
                            <p
                                class="grey--text"
                                style="
                                margin-bottom: 10px;
                                font-family: Roboto;
                                font-size: 16px;
                                font-weight: 400;
                                line-height: 24px;
                                "
                            >
                            {{productDate(item.product_publish_date)}}
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
                                {{ item.product_category }}, {{ item.product_brand }}, {{item.product_type}}
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
                            </router-link>
                        <div style="display: inline-flex; margin-left: 8px; margin-bottom: 5px">
                            <div v-if="item.is_in_cart == false">
                                <v-btn
                                style="
                                    background: #379ad3;
                                    width: 51px;
                                    height: 30px;
                                    border: 1px solid #83c0e4;
                                    box-sizing: border-box;
                                    border-radius: 8px;
                                    margin-right: 15px;
                                "
                                    @click="addToCart(item.product_id)"
                                >
                                <img src="@/assets/cart.svg" />
                                </v-btn>
                            </div>
                            <div v-else>
                                <v-btn
                                :to="`/cart`"
                                style="
                                background: #f5f5f5;
                                width: 51px;
                                height: 30px;
                                border: 2px solid #379ad3;
                                box-sizing: border-box;
                                border-radius: 8px;
                                margin-right: 15px;">
                                    <v-icon color="#379ad3">
                                        mdi-check
                                    </v-icon>
                                </v-btn>
                            </div>
                            
                            <v-btn
                            style="
                                background: #c3e1f2;
                                width: 39px;
                                height: 30px;
                                border: 1px solid #83c0e4;
                                box-sizing: border-box;
                                border-radius: 8px;
                            "
                            >
                            <img src="@/assets/star.svg" />
                            </v-btn>
                        </div>
                        </v-list-item-content>
                    </v-list-item>
                </div>
            </v-row>
        </v-col>
    </v-row>
    <v-dialog v-model="open_reviews" max-width="800">
      <div style="background-color: #fff">
        <v-card-text  style="min-height: 100px;">

            <v-row style="display: flex; align-items: center">
                <div style="margin-left: auto; margin-right: auto;">
                <p class="comment_title">Отзывы: </p>
                </div>
                <v-btn
                icon
                @click="open_reviews = false"
                color="#000">
                    <v-icon>mdi-window-close</v-icon>
                </v-btn>
            </v-row>
            <v-row>
                <v-col
                v-for="(item, i) in vendor_comments"
                :key="i"
                cols="6">
                    <v-card
                    elevation="0"
                    style="background-color: #C3E1F2;
                    width: 100%;
                    height: 100%;
                    border-radius: 16px;
                    padding: 0px;">
                        <v-list-item>
                            <v-col style="padding: 0; margin-right: 10px; height: 100%;" cols="3">
                                <div style="margin-top: 3px">
                                    <v-img
                                    style="border-radius: 100px; display: block; margin-left: auto; margin-right: auto; "
                                    :src="`${item.client_photo}`"></v-img>
                                    <p class="client_name" >{{item.client_name}}</p>
                                </div>
                            </v-col>
                            <v-list-item-content>
                                <v-rating
                                readonly
                                background-color="warning lighten-1"
                                color="warning"
                                half-increments
                                hover
                                v-model="item.comment_rating"
                                length="5"
                                dense
                                size="25"></v-rating>
                                <p class="comment_name">
                                    {{ item.comment_header }}
                                </p>
                                <p style="word-break: normal" class="comment_text">
                                    {{ item.comment_text }}
                                </p>
                            </v-list-item-content>
                        </v-list-item>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-text>
      </div>
    </v-dialog>
</div>
</template>

<script>
import Axios from "axios";
import { GET_VENDOR_CARD, ADD_VENDOR_TO_FAVOURITE, REMOVE_FAVOURITE_VENDOR, ADD_PRODUCT_TO_CART, GET_CLIENT_CART_COUNT } from "@/api";
import moment from 'moment';
import { mapActions } from "vuex";

export default {
  components: {  },
  name: "vendorCard",
  data() {
    return {
        vendor: {},
        productNumberToCart: "",
        vendor_comments: [],
        vendor_products: [],
        vendor_socials: [],
        open_reviews: false,
        path: [
            {
            text: "Сушилка",
            disabled: false,
            href: "/catalog",
            },
            {
            text: "Карточка продавца",
            disabled: true,
            href: "",
            },
        ],
    }
  },
  methods: {
    ...mapActions(["CHANGE_UNAUTHTORISE", "CHANGE_CART_COUNT"]),
    async getCartCount() {
      const token = localStorage.getItem('access_token')
      await Axios.get(`${GET_CLIENT_CART_COUNT}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then( (res) => {
          console.log(res.data.result)
        this.CHANGE_CART_COUNT(res.data.result)
      })
      .catch((error) => {
        if(error.response.status == 401){
          this.CHANGE_UNAUTHTORISE()
          this.$router.push({name: 'authorizationForm'})
        }
        console.error(error);
      })
    },
    addToCart(data) {
      this.productNumberToCart = data;
      this.addProductToCart();
    },
    async addProductToCart() {
      // let number = parseInt(this.productNumberToCart, 10);
      const token = localStorage.getItem('access_token')
      await Axios.post(`${ADD_PRODUCT_TO_CART}?productId=${this.productNumberToCart}`, [], {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })/* eslint-disable */
      .then((res) => {
        this.vendor_products.forEach(item => {
        if(item.product_id == this.productNumberToCart)
          item.is_in_cart = true
        })
        this.getCartCount();
      })
      .catch((error) => {
          if(error.response.status == 401){
          this.CHANGE_UNAUTHTORISE()
          this.$router.push({name: 'authorizationForm'})
        }
        console.error(error);
      });
    },
    async getVendorCard() {
      const number = this.vendorNumber;
      const token = localStorage.getItem('access_token')
      await Axios.get(`${GET_VENDOR_CARD}?vendorNumber=${number}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((res) => {
            
            this.vendor_socials = res.data.result.vendorSocials
            this.vendor = res.data.result.vendorInfo;
            this.vendor_comments = res.data.result.vendorComments;
            this.vendor_products = res.data.result.vendorProducts;
        })
        .catch((error) => {
            if(error.response.status == 401){
                this.CHANGE_UNAUTHTORISE()
                this.$router.push({name: 'authorizationForm'})
            }
            console.error(error);
        });
    },

    async addVendorToFavourite() {
      const token = localStorage.getItem('access_token')
      await Axios.post(`${ADD_VENDOR_TO_FAVOURITE}?vendorId=${this.vendor.vendor_id}`, [], {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        if(res.data){
          this.vendor.is_in_favourite = true
        }
      })
      .catch((error) => {
        if(error.response.data.title == 'Вы не можете добавить свой товар в корзину'){
          this.isMyProduct = true
        } else if(error.response.status == 401){
          this.CHANGE_UNAUTHTORISE()
          this.$router.push({name: 'authorizationForm'})
        }
        console.error(error);
      });
    },

    async removeVendorFromFavourite() {
      const token = localStorage.getItem("access_token");
      await Axios.delete(`${REMOVE_FAVOURITE_VENDOR}?vendorId=${this.vendor.vendor_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }, []).then((res) => {
        if(res.data){
          this.vendor.is_in_favourite = false
        }
      }).catch((error) => {
        if(error.response.status == 401){
          this.CHANGE_UNAUTHTORISE()
          this.$router.push({name: 'authorizationForm'})
        }
        console.error(error);
      });
    },

    productDate(data){
      var march = moment(data)
      return march.locale('ru').format('D MMMM YYYY' )
    },
  },
  created(){
    this.getVendorCard()
  },
  computed: {
    vendorNumber() {
      return this.$route.params.vendorNumber;
    },
  }
}
</script>

<style scoped>
.text{
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 32px;
    line-height: 40px;
    color: #202028;
}

.advertisement_title{
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 28px;
    color: #202028;
}

.face_type{
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: #0681C8;
    text-align: center;
    margin-top: 15px;
}

.vendor_fio{
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 28px;
    color: #202028;
    text-align: center;
}

.vendor_phone{
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 28px;
    color: #0681C8;
    text-align: center;
    margin-top: 20px;
}

.vendor_rating{
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 26px;
}

.comment_title{
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 40px;
}

.client_name{
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 21px;
  text-align: center;
  color: #060C2D;
}
</style>
