<template>
  <div>
    <div
      v-for="(item,i) in products"
      :key="i"
      class="mx-auto"
      max-width="344"
      outlined
    >
    <div v-if="item.productType == 'Б/У'">
      <v-list-item three-line>
        <router-link
          style="text-decoration: none"
          :to="`/catalog/${category}/${item.productNumber}`"
        >
          <v-list-item-avatar
            style="border-radius: 12px; width: 282px; height: auto"
          >
            <v-img
            width="100%"
            height="auto"
            :src="`https://drive.google.com/uc?export=view&id=${item.productPhoto}`"
            ></v-img>
          </v-list-item-avatar>
        </router-link>
        <v-list-item-content>
          <router-link
            style="text-decoration: none; color: #202028"
            :to="`/catalog/${category}/${item.productNumber}`"
          >
            <v-card-text style="width: 100%; height: auto">
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
              {{productDate(item.productPublishDate)}}
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
                {{ item.productName }}
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
                {{ item.productCountry }}, {{ item.productCity }}
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
                {{ item.productCategory }}, {{ item.productBrand }}, {{item.productType}}
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
                {{ item.productPrise }} РУБ
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
                  @click="addToCart(item.productId)"
                >
                  <img src="../../../assets/cart.svg" />
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
            <div v-if="item.is_in_favourite == false"> 
              <v-btn
              @click="numberFavouriteProductAdd(item.productId)"
              style="background: #c3e1f2;
              width: 39px;
              height: 30px;
              border: 1px solid #83c0e4;
              box-sizing: border-box;
              border-radius: 8px;">
                <v-icon
                size="25px"
                color="#0681C8">
                  mdi-star-outline
                </v-icon>
              </v-btn>
            </div>
            <div v-else> 
              <v-btn
              @click="numberFavouriteProductRemove(item.productId)"
              color="#F0F5F8"
              elevation="0"
              width="39px"
              height="30px"
              style="border: 1px solid #83C0E4; box-sizing: border-box; border-radius: 8px;">
                <v-icon
                size="25px"
                color="#C3E1F2">
                  mdi-star-off-outline
                </v-icon>
              </v-btn>
            </div>
          </div>
        </v-list-item-content>
      </v-list-item>
    </div>
    <div v-else>
      <v-list-item three-line>
        <router-link
          style="text-decoration: none"
          :to="`/catalog/${category}/${item.productNumber}`"
        >
          <v-list-item-avatar
            style="border-radius: 12px; width: 282px; height: auto"
          >
            <v-img
            width="100%"
            height="auto"
            :src="`https://drive.google.com/uc?export=view&id=${item.productPhoto}`"
            ></v-img>
          </v-list-item-avatar>
        </router-link>
        <v-list-item-content>
          <router-link
            style="text-decoration: none; color: #202028"
            :to="`/catalog/${category}/${item.productNumber}`"
          >
            <v-card-text style="width: 100%; height: auto">
              <v-row style="margin-left: 1px ">
                <p class="rating">
                  {{ item.productRating }}
                </p>
                  <v-icon
                  style="height: 25px; color: #323232">
                    mdi-star-outline
                  </v-icon>
              </v-row>
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
                {{ item.productName }}
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
                {{ item.productCountry }}, {{ item.productCity }}
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
                {{ item.productCategory }}, {{ item.productBrand }}
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
                {{ item.productPrise }} РУБ
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
                  @click="addToCart(item.productId)"
                >
                  <img src="../../../assets/cart.svg" />
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
              
            <div v-if="item.is_in_favourite == false"> 
              <v-btn
              @click="numberFavouriteProductAdd(item.productId)"
              style="background: #c3e1f2;
              width: 39px;
              height: 30px;
              border: 1px solid #83c0e4;
              box-sizing: border-box;
              border-radius: 8px;">
                <v-icon
                size="25px"
                color="#0681C8">
                  mdi-star-outline
                </v-icon>
              </v-btn>
            </div>
            <div v-else> 
              <v-btn
              @click="numberFavouriteProductRemove(item.productId)"
              color="#F0F5F8"
              elevation="0"
              width="39px"
              height="30px"
              style="border: 1px solid #83C0E4; box-sizing: border-box; border-radius: 8px;">
                <v-icon
                size="25px"
                color="#C3E1F2">
                  mdi-star-off-outline
                </v-icon>
              </v-btn>
            </div>
          </div>
        </v-list-item-content>
      </v-list-item>
      </div>
    </div> 
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
import { mapGetters,mapActions } from "vuex";
import Axios from "axios";
import { ADD_PRODUCT_TO_CART, ADD_PRODUCT_TO_FAVOURITE, GET_CLIENT_CART_COUNT, REMOVE_FAVOURITE_PRODUCT } from "@/api";
import moment from 'moment';

export default {
  name: "cardItem",
  props: {
    products: {
      type: Array,
      default() {
        return [];
      },
    },
    category: {
      type: String,
      default(){
        return "";
      },
    },
  },
  data() {
    return {
      productNumberToCart: "",
      isMyProduct: false,
      numberFavProduct: 0,
    };
  },
  methods: {
    ...mapActions([
      "CHANGE_CART_COUNT", "CHANGE_UNAUTHTORISE"
    ]),
    async getCartCount() {
      const token = localStorage.getItem('access_token')
      await Axios.get(`${GET_CLIENT_CART_COUNT}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then( (res) => {
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
      })
      .then((res) => {
        if(res){
          this.products.forEach(item => {
          if(item.productId == this.productNumberToCart)
            item.is_in_cart = true
          })
          this.getCartCount();
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

    numberFavouriteProductAdd(number){
      this.numberFavProduct = number
      this.addProductToFavourite()
    },

    numberFavouriteProductRemove(number){
      this.numberFavProduct = number
      this.removeProductFromFavourite()
    },

    async addProductToFavourite() {
      const token = localStorage.getItem('access_token')
      await Axios.post(`${ADD_PRODUCT_TO_FAVOURITE}?productId=${this.numberFavProduct}`, [], {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        if(res.data){
          this.products.forEach(item => {
            if(item.productId == this.numberFavProduct){
              item.is_in_favourite = true
            }
          })
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
      await Axios.delete(`${REMOVE_FAVOURITE_PRODUCT}?productId=${this.numberFavProduct}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }, []).then((res) => {
        if(res.data){
          this.products.forEach(item => {
            if(item.productId == this.numberFavProduct){
              item.is_in_favourite = false
            }
          })
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
      // console.log(march)
      return march.locale('ru').format('D MMMM YYYY' )
    }  
  },
  computed: {
    ...mapGetters(["CART"]),
  },
  created() {},
  mounted() {},
};
</script>


<style scoped>
.v-list-item {
  padding: 0;
}
.v-btn:not(.v-btn--round).v-size--default {
  min-width: 1px;
}

.v-list-item {
  align-items: normal;
}

.v-card__subtitle,
.v-card__text,
.v-card__title {
  padding: 5px;
}

.rating{
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 26px;
  color: #323232;
  margin-right: 6px;
}

.v-application a {
  color: #f5f5f5;
}

.v-btn--is-elevated {
  box-shadow: 0px 0px 0px 0px rgb(0 0 0 / 0%);
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
</style>