<template>
  <div class="card_text" id="productCard">
    <v-row>
      <v-col style="padding: 0px; padding-bottom: 30px">
        <v-breadcrumbs style="padding: 0px" :items="path"></v-breadcrumbs>
      </v-col>
    </v-row>
    <v-row>
      <v-col style="padding: 0px; width: 100%" cols="7">
        <v-row>
          <p class="card_title">{{ product.productName }}</p>
        </v-row>
        <v-row>
          <p class="card_category_brand">
            {{ product.productCategory }}, {{ product.productBrand }}
          </p>
          <p
            v-if="product.productType == 'Новый'"
            class="card_category_brand"
            style="margin-left: 20px"
          >
            {{ product.productRating }}
          </p>
          <v-icon
            v-if="product.productType == 'Новый'"
            style="height: 22px; color: #323232"
            >mdi-star-outline</v-icon>
        </v-row>
        <v-row>
          <p class="card_price">{{ product.productPrise }} РУБ</p>
        </v-row>
        <div v-if="product.productType == 'Новый'">
          <v-row v-if="product.productCount != 0">
            <p class="card_quantity">В наличии: {{ product.productCount }}</p>
          </v-row>
          <v-row v-else-if="product.isDeliveryExpected">
            <p class="card_quantity">Ожидается поставка</p>
          </v-row>
          <v-row v-else>
            <p class="card_quantity">Нет в наличии</p>
          </v-row>
        </div>
        <v-row style="margin-top: 20px">
            <div v-if="product.is_in_cart == false">
                <v-btn
                color="#0681C8"
                style="color: #fff"
                elevation="0"
                height="48px"
                width="120px"
                class="btn_text"
                @click="addToCart()"
                >
                КУПИТЬ
                </v-btn>
            </div>
            <div v-else>
                <v-btn
                style="color: #0681C8; background-color:#f5f5f5; border: 3px solid #0681C8;"
                elevation="0"
                height="48px"
                width="120px"
                class="btn_text"
                :to="`/cart`"
                >
                В КОРЗИНУ
                </v-btn>
            </div>
            <div v-if="product.is_in_favourite == false">
              <v-btn
              @click="addProductToFavourite"
              color="#C3E1F2"
              elevation="0"
              width="48px"
              height="48px"
              style="margin-left: 20px; border: 1px solid #83c0e4; border-radius: 8px; padding: 0">
                <v-icon color="#0681C8" dark> mdi-star-outline </v-icon>
              </v-btn>
            </div>
            <div v-else>
              <v-btn
              @click="removeProductFromFavourite"
              color="#F0F5F8"
              elevation="0"
              width="48px"
              height="48px"
              style="margin-left: 20px; border: 1px solid #83C0E4; border-radius: 8px; padding: 0">
                <img src="../../../../assets/mi_favorite.png"/>
              </v-btn>
            </div>
          <v-btn
            height="48px"
            color="#E0E0E0"
            elevation="0"
            class="btn_text"
            style="margin-left: 20px"
            >Связаться с продавцом</v-btn
          >
        </v-row>
        <v-row>
          <p class="card_description_title">Характеристики</p>
        </v-row>
        <v-row v-for="(prod, p) in product.productProperties" :key="p">
          <v-col style="padding: 0">
            <p class="product_specifications">
              {{ prod.name }}: {{ prod.value }}
            </p>
          </v-col>
        </v-row>
        <v-row>
          <p class="card_type" style="margin-top: 20px">
            {{ product.productType }} товар
          </p>
        </v-row>
        <v-row>
          <p class="card_description_title">Описание товара</p>
        </v-row>
        <v-row style="width: 95%">
          <p class="card_description">{{ product.productDescription }}</p>
        </v-row>
        <v-row>
          <p class="card_addres_title">Адрес</p>
        </v-row>
        <v-row>
          <p class="card_addres">{{ product.productAddress }}</p>
        </v-row>
        <v-row style="margin-bottom: 40px">
          <vMap :productProp="product" />
        </v-row>
      </v-col>
      <v-col style="padding: 0px" cols="5">
        <v-row>
          <v-carousel hide-delimiters style="height: auto">
            <v-carousel-item
              v-for="(item, i) in product.productPhotoes"
              :key="i"
              :src="`https://drive.google.com/uc?export=view&id=${item.photo}`"
            >
            </v-carousel-item>
          </v-carousel>
        </v-row>
        <v-row style="margin-bottom: 20px; padding: 0px">
          <!-- <router-link
          style="text-decoration: none;"
          > -->
            <v-card
            :to="`/catalog/vendor/card/${vendor.vendor_number}`"
            elevation="0"
            style="
            width: 100%;
            border-radius: 16px;
            margin-top: 30px;
            padding: 0px;">
              <v-list-item class="grow">
                <v-list-item-avatar width="15%"  height="auto" color="grey darken-3">
                  <v-img
                    class="elevation-0"
                    alt=""
                    :src="vendor.vendor_photo"
                  ></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <div style="display: flex; justify-content: space-between">
                    <div
                    style="
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;">
                      <p style="margin-right: 10px" class="seller_title">
                        Продавец
                      </p>
                      <p class="seller_title">{{ vendor.vendor_rating }}</p>
                      <p>
                        <v-icon style="height: 10px; color: #323232">mdi-star-outline</v-icon>
                      </p>
                    </div>
                    <div>
                      <div v-if="vendor.is_ur_face">
                        <p class="seller_title" style="color: #0681c8">
                          Юридическое лицо
                        </p>
                      </div>
                      <div v-if="vendor.is_fiz_face">
                        <p class="seller_title" style="color: #0681c8">
                          Физическое лицо
                        </p>
                      </div>
                    </div>
                  </div>
                  <v-list-item-title class="seller_fio">
                    {{ vendor.vendor_fio }}
                  </v-list-item-title>
                  <v-list-item-title class="seller_phone">
                    {{ vendor.vendor_phone }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          <!-- </router-link> -->
        </v-row>
        <v-row>
          <p class="card_date">
            Дата публикации: {{ productDate(product.productPublicationDate) }}
          </p>
        </v-row>
        <v-row style="margin-bottom: 30px">
          <v-col cols="5" style="padding: 0">
            <v-btn
            elevation="0"
              @click="dialogSize = true"
              color="#C3E1F2"
              style="
                color: #0681c8;
                border: 1px solid #83c0e4;
                box-sizing: border-box;
                border-radius: 8px;
              "
            >
              Размерная сетка
            </v-btn>
          </v-col>
          <v-col cols="3" style="padding: 0">
            <v-btn
            elevation="0"
            @click="dialogReviews = true"
              color="#C3E1F2"
              style="
                color: #0681c8;
                border: 1px solid #83c0e4;
                box-sizing: border-box;
                border-radius: 8px;
              "
            >
              Отзывы
            </v-btn>
          </v-col>
          <v-col cols="4" style="padding: 0">
            <v-btn
            elevation="0"
              color="#F0F5F8"
              style="
                color: #0681c8;
                border: 1px solid #83c0e4;
                box-sizing: border-box;
                border-radius: 8px;
              "
            >
              Пожаловаться
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-dialog v-model="dialogSize" max-width="800">
      <div style="background-color: #fff">
        <v-img
          :src="`https://drive.google.com/uc?export=view&id=${product.productSizes}`"
        >
        </v-img>
      </div>
    </v-dialog>

    <v-dialog v-model="dialogReviews" max-width="800">
      <div style="background-color: #fff">
        <v-card-text  style="min-height: 100px;">

            <v-row style="display: flex; align-items: center">
                <div style="margin-left: auto; margin-right: auto;">
                <p class="comment_title">Отзывы: </p>
                </div>
                <v-btn
                icon
                @click="dialogReviews = false"
                color="#000">
                <v-icon>mdi-window-close</v-icon>
                </v-btn>
            </v-row>
            <v-row v-if="product.productComments.length != 0">
                <v-col
                v-for="(item, i) in product.productComments"
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
            <div v-else style="display: flex; justify-content: center">
              <p class="noncomment_title">Отзывов на этот товар еще нет</p>
            </div>
        </v-card-text>
      </div>
    </v-dialog>
    <v-bottom-sheet v-model="isMyProduct">
      <v-sheet
      class="text-center"
      height="200px">
        <div class="title">
          Вы не можете добавить свой товар в корзину
        </div>
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="3">
            <v-btn
            style="color: #fff"
            color="#0681C8"
            @click="isMyProduct = false">
              понятно
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-sheet>
    </v-bottom-sheet>   
  </div>
</template>

<script>
import Axios from "axios";
import { GET_PRODUCT_CARD, ADD_PRODUCT_TO_CART, GET_CLIENT_CART_COUNT, ADD_PRODUCT_TO_FAVOURITE, REMOVE_FAVOURITE_PRODUCT } from "@/api";
import moment from "moment";
import vMap from "./vMap/vMap.vue"
import { mapActions } from "vuex";

export default {
  components: { vMap },
  name: "productCard",

  data() {
    return {
      rating: 3,
      dialogSize: false,
      dialogReviews: false,
      product: {},
      vendor: {},
      path: [
        {
          text: "Сушилка",
          disabled: false,
          href: "/catalog",
        },
        {
          text: "",
          disabled: false,
          href: "",
        },
        {
          text: "",
          disabled: true,
          href: "",
        },
      ],
      productNumberToCart: "",
      prNum: 0,
      isMyProduct: false,
    };
  },
  methods: {
    ...mapActions('sushilka',["CHANGE_CART_COUNT", "CHANGE_UNAUTHTORISE"]),
    addToCart() {
      this.productNumberToCart = this.product.productId;
      this.addProductToCart();
    },
    async addProductToCart() {
      // let number = parseInt(this.productNumberToCart, 10);
      const token = localStorage.getItem('access_token')
      await Axios.post(`${ADD_PRODUCT_TO_CART}?productId=${this.productNumberToCart}`, [], {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })// eslint-disable-next-line
      .then((res) => {
        console.log(res.data.result)
        this.product.is_in_cart = true
        this.getCartCount();
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

    async addProductToFavourite() {
      const token = localStorage.getItem('access_token')
      await Axios.post(`${ADD_PRODUCT_TO_FAVOURITE}?productId=${this.product.productId}`, [], {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        if(res.data){
          this.product.is_in_favourite = true
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

    async removeProductFromFavourite() {
      const token = localStorage.getItem("access_token");
      await Axios.delete(`${REMOVE_FAVOURITE_PRODUCT}?productId=${this.product.productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }, []).then((res) => {
        if(res.data){
          this.product.is_in_favourite = false
        }
      }).catch((error) => {
        if(error.response.status == 401){
          this.CHANGE_UNAUTHTORISE()
          this.$router.push({name: 'authorizationForm'})
        }
        console.error(error);
      });
    },

    async getCartCount() {
      const token = localStorage.getItem('access_token')
      await Axios.get(`${GET_CLIENT_CART_COUNT}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
          // this.cartCount = res.data
          this.CHANGE_CART_COUNT(res.data.result);
          // console.log(this.CART_COUNT)
          // console.log(this.cartCount)        
      })
      .catch((error) => {
        if(error.response.status == 401){
          this.CHANGE_UNAUTHTORISE()
          this.$router.push({name: 'authorizationForm'})
        }
        console.error(error);
      });
    },
    async getProductCard() {
      const number = this.productNumber;
      const token = localStorage.getItem('access_token')
      await Axios.get(`${GET_PRODUCT_CARD}?productNumber=${number}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        this.product = res.data.result.productInfo;
        this.vendor = res.data.result.vendorInfo;
        this.path[1].text = res.data.result.productInfo.productCategory;
        this.path[1].href = `/catalog/${this.categoryName}`;
        this.path[2].text = res.data.result.productInfo.productName;
      })
      .catch((error) => {
        if(error.response.status == 401){
          this.CHANGE_UNAUTHTORISE()
          this.$router.push({name: 'authorizationForm'})
        }
        console.error(error);
      });
    },

    productDate(data) {
      var march = moment(data);
      return march.locale("ru").format("D MMMM YYYY");
    },
  },
  computed: {
    productNumber() {
      return this.$route.params.productNumber;
    },
    categoryName() {
      return this.$route.params.categoryName;
    },
  },
  mounted() {},
  created() {
    this.getProductCard();
    this.getCartCount()
  },
};
</script>

<style lang="scss" scoped>
.v-btn:not(.v-btn--round).v-size--default {
  height: 40px;
  min-width: 40px;
}

.card_text {
  font-family: Roboto;
  font-style: normal;
  color: #202028;
  padding-top: 40px;
  max-width: 1170px;
  margin: 0 auto;
}

.card_title {
  font-weight: 500;
  font-size: 32px;
  line-height: 40px;
}

.card_category_brand {
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  padding-bottom: 8px;
}

.card_price {
  font-weight: normal;
  font-size: 32px;
  line-height: 40px;
  margin-top: 8px;
}

.card_quantity {
  font-weight: normal;
  font-size: 18px;
  line-height: 26px;
  padding-top: 10px;
}

.btn_text {
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
}

.card_description_title {
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  margin-top: 40px;
  padding-bottom: 15px;
}

.card_description {
  font-weight: normal;
  font-size: 18px;
  line-height: 26px;
  text-align: justify;
}

.product_specifications {
  font-weight: normal;
  font-size: 18px;
  line-height: 26px;
}

.card_addres_title {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  margin-top: 40px;
  padding-bottom: 10px;
}

.card_addres {
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: #0681c8;
  padding-bottom: 25px;
}

.v-application p {
  margin-bottom: 5px;
}

.v-application a {
  color: #f5f5f5;
}

.seller_title {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
}

.seller_fio {
  font-weight: normal;
  font-size: 20px;
  line-height: 28px;
  padding-bottom: 10px;
}

.seller_phone {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #0681c8;
}

.card_date {
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #757575;
  padding-bottom: 20px;
}

.card_type {
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #757575;
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

.comment_title{
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 40px;
}

.comment_name {
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  color: #060C2D;
}

.comment_text{
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: #060C2D;
}

.title{
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  padding-bottom: 35px;
  padding-top: 20px;
}

.noncomment_title{
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  align-items: center;
  margin-top: 20px;
}
</style>
