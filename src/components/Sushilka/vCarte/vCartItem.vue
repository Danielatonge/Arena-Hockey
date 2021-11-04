<template >
  <div style="margin-left: 50px;padding-top: 25px;max-width:1170px;margin:0 auto;">
    <div v-if="clientCArt.product_type == 'Б/У'">
      <v-list-item three-line>
        <a
          style="
            border-radius: 12px;
            width: 282px;
            height: 210px;
            margin-bottom: 60px;
            margin-right: 20px;
          "
        >
          <v-img
            :src="`https://drive.google.com/uc?export=view&id=${clientCArt.product_photo}`"
          ></v-img>
        </a>

        <router-link
          style="text-decoration: none"
          :to="`/catalog/${clientCArt.product_en_category}/${clientCArt.product_number}/`"
        >
          <v-list-item-content>
            <div style="margin-bottom: 35px">
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
                  color: #000;
                  margin-bottom: 10px;
                  font-family: Roboto;
                  font-size: 24px;
                  font-style: normal;
                  font-weight: 500;
                  line-height: 28px;
                "
              >
                {{ clientCArt.product_name }}
              </p>

              <p
                style="
                  color: #0681c8;
                  margin-bottom: 10px;
                  font-family: Roboto;
                  font-size: 16px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: 24px;
                  text-align: left;
                "
              >
                {{ clientCArt.product_country }}, {{ clientCArt.product_city }}
              </p>

              <p
                style="
                  color: #000;
                  margin-bottom: 10px;
                  font-family: Roboto;
                  font-size: 16px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: 24px;
                  text-align: left;
                "
              >
                {{ clientCArt.product_ru_category }},
                {{ clientCArt.product_brand }}
              </p>

              <p
                style="
                  color: #000;
                  font-family: Roboto;
                  font-size: 24px;
                  font-style: normal;
                  font-weight: 500;
                  line-height: 28px;
                  text-align: left;
                "
              >
                {{ clientCArt.product_prise }} РУБ
              </p>
            </div>
          </v-list-item-content>
        </router-link>

        <v-card-actions
          style="margin-bottom: 20px; margin-left: auto; margin-right: 0"
        >
          <div style="margin-left: 25px">
            <p
              style="
                font-family: Roboto;
                font-style: normal;
                font-weight: 500;
                font-size: 24px;
                line-height: 28px;
                text-align: center;
              "
            >
              Количество товара
            </p>
            <div
              style="
                margin-left: 20px;
                width: 178px;
                height: 62px;
                border: 1px solid #83c0e4;
                box-sizing: border-box;
                border-radius: 12px;
              "
            >
              <span
                style="
                  position: relative;
                  cursor: pointer;
                  width: 19px;
                  height: 28px;
                  left: 20px;
                  top: 15px;
                  font-family: Roboto;
                  font-style: normal;
                  font-weight: 500;
                  font-size: 24px;
                  line-height: 28px;
                  pointer-events: none;
                  color: rgb(156, 156, 156);
                "
                @click="decrementItem(clientCArt.product_id)"
                >-</span
              >
              <v-text-field
                disabled
                style="border-radius: 12px; margin-left: 25px"
                v-model="clientCArt.product_count"
                class="in"
                :rules="[numberRule]"
                solo
                flat
                maxlength="2"
                @blur="changeProductFromCart(clientCArt.product_id)"
              ></v-text-field>

              <span
                style="
                  position: relative;
                  left: 140px;
                  bottom: 45px;
                  cursor: pointer;
                  font-family: Roboto;
                  font-style: normal;
                  font-weight: 500;
                  font-size: 24px;
                  line-height: 28px;
                  text-align: center;
                  color: #000000;
                  pointer-events: none;
                  color: rgb(156, 156, 156);
                "
                @click="incrementItem(clientCArt.product_id)"
                >+</span
              >
            </div>
          </div>

          <v-container style="padding: 0px; margin-top: 20px; margin-top: 10px">
            <v-row>
              <v-col offset-md="3">
                В наличии: {{ clientCArt.product_amount }} штук
              </v-col>
            </v-row>
            <v-row>
              <v-col md="6">
                <span
                  class="buttn"
                  style="position: bottom; cursor: pointer"
                  @click="deleteFromCart(clientCArt.product_id)"
                >
                  В избранное
                </span>
              </v-col>
              <v-col md="3" offset-md="">
                <span
                  class="buttn"
                  style="margin-left: 50px; cursor: pointer"
                  @click="deleteFromCart(clientCArt.product_id)"
                >
                  Удалить
                </span>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-list-item>
    </div>

    <div v-else>
      <v-list-item three-line>
        <a
          style="
            border-radius: 12px;
            width: 282px;
            height: 210px;
            margin-bottom: 60px;
            margin-right: 20px;
          "
        >
          <v-img
            :src="`https://drive.google.com/uc?export=view&id=${clientCArt.product_photo}`"
          ></v-img>
        </a>

        <router-link
          style="text-decoration: none"
          :to="`/catalog/${clientCArt.product_en_category}/${clientCArt.product_number}/`"
        >
          <v-list-item-content>
            <div style="margin-bottom: 35px">
              
              <div style="display: inline; float: left">
                <p
                  style="
                    color: rgba(50, 50, 50, 1);
                    margin-bottom: 10px;
                    font-family: Roboto;
                    font-size: 16px;
                    font-weight: 400;
                    line-height: 24px;
                  "
                >
                  {{ clientCArt.product_rating }}
                </p>
              </div>

              <div
              style="margin-left:40px"
              >
                <v-icon style="height: 25px; color: #323232">
                  mdi-star-outline
                </v-icon>
              </div>
              
              <p
                style="
                  color: #000;
                  margin-top: 10px;
                  margin-bottom: 10px;
                  font-family: Roboto;
                  font-size: 24px;
                  font-style: normal;
                  font-weight: 500;
                  line-height: 28px;
                "
              >
                {{ clientCArt.product_name }}
              </p>

              <p
                style="
                  color: #0681c8;
                  margin-top: 10px;
                  margin-bottom: 10px;
                  font-family: Roboto;
                  font-size: 16px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: 24px;
                  text-align: left;
                "
              >
                {{ clientCArt.product_country }}, {{ clientCArt.product_city }}
              </p>

              <p
                style="
                  color: #000;
                  margin-bottom: 10px;
                  font-family: Roboto;
                  font-size: 16px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: 24px;
                  text-align: left;
                "
              >
                {{ clientCArt.product_ru_category }},
                {{ clientCArt.product_brand }}
              </p>

              <p
                style="
                  color: #000;
                  font-family: Roboto;
                  font-size: 24px;
                  font-style: normal;
                  font-weight: 500;
                  line-height: 28px;
                  text-align: left;
                "
              >
                {{ clientCArt.product_prise }} РУБ
              </p>
            </div>
          </v-list-item-content>
        </router-link>

        <v-card-actions
          style="margin-bottom: 20px; margin-left: auto; margin-right: 0"
        >
          <div style="margin-left: 25px">
            <p
              style="
                font-family: Roboto;
                font-style: normal;
                font-weight: 500;
                font-size: 24px;
                line-height: 28px;
                text-align: center;
              "
            >
              Количество товара
            </p>
            <div
              style="
                margin-left: 20px;
                width: 178px;
                height: 62px;
                border: 1px solid #83c0e4;
                box-sizing: border-box;
                border-radius: 12px;
              "
            >
              <span
                style="
                  position: relative;
                  cursor: pointer;
                  width: 19px;
                  height: 28px;
                  left: 20px;
                  top: 15px;
                  font-family: Roboto;
                  font-style: normal;
                  font-weight: 500;
                  font-size: 24px;
                  line-height: 28px;
                "
                @click="decrementItem(clientCArt.product_id)"
                >-</span
              >
              <v-text-field
                style="border-radius: 12px; margin-left: 25px"
                v-model="clientCArt.product_count"
                class="in"
                :rules="[numberRule]"
                solo
                flat
                maxlength="2"
                @blur="changeProductFromCart(clientCArt.product_id)"
              ></v-text-field>

              <span
                style="
                  position: relative;
                  left: 140px;
                  bottom: 45px;
                  cursor: pointer;
                  font-family: Roboto;
                  font-style: normal;
                  font-weight: 500;
                  font-size: 24px;
                  line-height: 28px;
                  text-align: center;
                  color: #000000;
                "
                @click="incrementItem(clientCArt.product_id)"
                >+</span
              >
            </div>
          </div>

          <v-container style="padding: 0px; margin-top: 20px; margin-top: 10px">
            <v-row>
              <v-col offset-md="3">
                В наличии: {{ clientCArt.product_amount }} штук
              </v-col>
            </v-row>
            <v-row>
              <v-col md="6">
                <span
                  class="buttn"
                  style="position: bottom; cursor: pointer"
                  @click="deleteFromCart(clientCArt.product_id)"
                >
                  В избранное
                </span>
              </v-col>
              <v-col md="3" offset-md="">
                <span
                  class="buttn"
                  style="margin-left: 50px; cursor: pointer"
                  @click="deleteFromCart(clientCArt.product_id)"
                >
                  Удалить
                </span>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-list-item>
    </div>
    <v-snackbar v-model="snackbar" color="rgb(6, 129, 200)">
      {{ textSnackBar }}

      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Закрыть
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import Axios from "axios";
import { mapActions } from "vuex";
import { ADD_PRODUCT_TO_CART, GET_CLIENT_CART_COUNT, DECREASE_PRODUCT_IN_CART, REMOVE_PRODUCT_FROM_CART, CHANGE_PRODUCT_COUNT_IN_CART } from "@/api";
import moment from "moment";

export default {
  name: "vCartItem",
  props: {
    clientCArt: {
      type: Object,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      productNumberToCart: "",
      valueInput: {},
      snackbar: false,
      textSnackBar: `Не правильное значение`,
      numberRule: (v) => {
        this.valueInput = v;
        if (
          !isNaN(parseFloat(this.valueInput)) &&
          this.valueInput >= 1 &&
          this.valueInput <= this.clientCArt.product_amount
        ) {
          return true;
        }
        this.snackbar = true;
        this.changeModel();
        return "";
      },
    };
  },
  methods: {
    ...mapActions('sushilka',["CHANGE_CART_COUNT", "CHANGE_UNAUTHTORISE"]),

    async getCartCount() {
      const token = localStorage.getItem("access_token");
      await Axios.get(`${GET_CLIENT_CART_COUNT}?clientNumber=1`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        this.CHANGE_CART_COUNT(res.data.result);
      }).catch((error) => {
        if(error.response.status == 401){
          this.CHANGE_UNAUTHTORISE()
          this.$router.push({name: 'authorizationForm'})
        }
        console.error(error);
      });
    },

    incrementItem(data) {
      this.productNumberToCart = data;
      this.addProductToCart();
    },

    async addProductToCart() {
      // let number = parseInt(this.productNumberToCart, 10);
      const token = localStorage.getItem("access_token");
      await Axios.post(`${ADD_PRODUCT_TO_CART}?productId=${this.productNumberToCart}`, [], {
        headers: {
          Authorization: `Bearer ${token}`,
        },/* eslint-disable */
      }).then((res) => {
        this.getCartCount();
        this.$emit("getClientCart");
      }).catch((error) => {
        if(error.response.status == 401){
          this.CHANGE_UNAUTHTORISE()
          this.$router.push({name: 'authorizationForm'})
        }
        console.error(error);
      });
    },

    decrementItem(data) {
      this.productNumberToCart = data;
      this.decreaseProductInCart();
    },

    async decreaseProductInCart() {
      // let number = parseInt(this.productNumberToCart, 10);
      const token = localStorage.getItem("access_token");
      await Axios.put(`${DECREASE_PRODUCT_IN_CART}?productId=${this.productNumberToCart}`, [], {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        this.getCartCount();
        this.$emit("getClientCart");
      }).catch((error) => {
        if(error.response.status == 401){
          this.CHANGE_UNAUTHTORISE()
          this.$router.push({name: 'authorizationForm'})
        }
        console.error(error);
      });
    },

    deleteFromCart(data) {
      this.productNumberToCart = data;
      this.removeProductFromCart();
    },

    async removeProductFromCart() {
      // let number = parseInt(this.productNumberToCart, 10);
      const token = localStorage.getItem("access_token");
      await Axios.delete(`${REMOVE_PRODUCT_FROM_CART}?productId=${this.productNumberToCart}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }, []).then((res) => {
        this.getCartCount();
        this.$emit("getClientCart");
      }).catch((error) => {
        if(error.response.status == 401){
          this.CHANGE_UNAUTHTORISE()
          this.$router.push({name: 'authorizationForm'})
        }
        console.error(error);
      });
    },

    changeProductFromCart(data) {
      this.productNumberToCart = data;
      this.changeProductCountInCart();
    },

    async changeProductCountInCart() {
      // let number = parseInt(this.productNumberToCart, 10);
      const token = localStorage.getItem("access_token");
      await Axios.put(`${CHANGE_PRODUCT_COUNT_IN_CART}?productId=${this.productNumberToCart}&productCount=${this.valueInput}`, [], {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        this.CHANGE_CART_COUNT(this.clientCArt.product_count);
        this.$emit("getClientCart");
      }).catch((error) => {
        if(error.response.status == 401){
          this.CHANGE_UNAUTHTORISE()
          this.$router.push({name: 'authorizationForm'})
        }
        console.error(error);
      });
    },

    productDate() {
      var march = moment(this.clientCArt.product_publish_date);
      return march.locale("ru").format("D MMMM YYYY");
    },

    changeModel() {
      if (this.valueInput < this.clientCArt.product_amount) {
        return this.valueInput;
      }
      if (this.valueInput >= this.clientCArt.product_amount) {
        this.valueInput = this.clientCArt.product_amount;
        return this.valueInput; 
      } 
      if (!!this.valueInput) {
        return this.clientCArt.product_count;
      }
    },
  },
};
</script>
<style scoped>
.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
  box-shadow: none;
}
input:disabled {
  background-color: red;
}
.in {
  position: relative;
  width: 54px;
  height: 32px;
  min-height: 5px;
  left: 30px;
  bottom: 22px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  text-align: center;
}
.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
  box-shadow: 0px 0px 0px 0px rgb(0 0 0 / 0%);
}
.v-messages__message {
  min-width: 100px;
}
.v-messages {
  font-size: 11px;
}
.v-card__actions {
  display: inline;
}
</style>