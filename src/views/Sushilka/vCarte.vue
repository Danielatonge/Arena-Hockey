<template >
  <div style="padding-top: 25px">
    <v-col style="padding: 0px; padding-bottom: 30px">
        <v-breadcrumbs style="padding: 0px" :items="path"></v-breadcrumbs>
      </v-col>
      <v-row>
        <v-col>
          <div
      style="font-family: Roboto;
      max-width:250px;
font-style: normal;
font-weight: 500;
font-size: 40px;
line-height: 48px;"
      >Корзина</div>
        </v-col>
        <v-col>
          <router-link
      :to="{ name: 'categoriesPage' }"
      style="text-decoration: none; color: #202028"
    >
    
      
      <div
        style="
          margin-left: 50%;
          margin-top:10px;
          background: #c4c4c4;
          padding: 6px 16px;
          border-radius: 8px;
          font-family: Roboto;
          font-style: normal;
          font-weight: bold;
          font-size: 14px;
          line-height: 20px;
          color: rgba(0, 0, 0, 0.26);
        "
      >
        ВЕРНУТЬСЯ К КАТЕГОРИЯМ
      </div>
    </router-link>
        </v-col>
      </v-row>
      

    
    <div v-if="CART_COUNT > 0">
      <vCartItem 
      v-for="(item, i) in clientCart"
      :clientCArt="item"
      :key="i"
      @getClientCart="getClientCart"
      />

      <p
        style="
          font-family: Roboto;
          font-style: normal;
          font-weight: 500;
          font-size: 20px;
          line-height: 40px;
          margin-left: 1000px;
          margin-right: 0;
        "
      >
        К оплате: {{ productPriceData }}
      </p>
      <v-container>
        <v-row>
          <v-col md="6">
            <div
              style="
              color: #000000;
              margin-top:10px
              font-family: Roboto;
              font-style: normal;
              font-weight: 500;              
              font-size: 21px;
              line-height: 28px;
            "
            >
              Завершите оплату в течении: {{ displayMinutes }} :
              {{ displaySeconds }}
            </div>
          </v-col>
          <v-col md="2" offset-md="4">
            <v-btn
              class="buttn"
              style="
                width: 169px;
                height: 60px;
                background-color: #379ad3;
                margin-left: 100px;
                border-radius: 8px;
              "
            >
              <div
                style="
                  font-family: Roboto;
                  font-style: normal;
                  font-weight: 500;
                  font-size: 32px;
                  line-height: 40px;
                  text-align: center;
                  color: #ffffff;
                  text-transform: capitalize;
                "
              >
                Оплата
              </div>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div style="height: 500px; width: 100%" v-else>
      <h1 style="text-align: center">Ваша корзина пуста</h1>
      <v-icon
        color="rgb(212, 212, 212, 0.8)"
        size="300px"
        style="margin-left: 450px"
      >
        mdi-cart-outline
      </v-icon>
    </div>

  </div>
</template>
<script>

import vCartItem from '.../components/Sushilka/vCarte/vCartItem.vue'
import Axios from "axios";
import { GET_CLIENT_CART } from "@/api";
import { mapGetters, mapActions  } from "vuex";

export default {
  name: "vCarte",
  components: {vCartItem},
  data() {
    return {
      path: [
            {
            text: "Сушилка",
            disabled: false,
            href: "/catalog",
            },
            {
            text: "Корзина",
            disabled: true,
            href: "",
            },
        ],
      clientCart: [],
      paymentDate: "",
      endYear: 0,
      endMonth: 0,
      endDay: 0,
      endHour: 0,
      endMinute: 0,
      endSecond: 0,
      displaySeconds: 0,
      displayMinutes: 0,
      productPriceData: 0,
    };
  },
  methods: {
    ...mapActions(["CHANGE_UNAUTHTORISE"]),
    
    async getClientCart() {
      const token = localStorage.getItem('access_token')
      await Axios.get(`${GET_CLIENT_CART}?clientNumber=1`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then((res) => {
          this.clientCart = res.data.result.cartProducts;
          this.productPriceData = 0;
          this.clientCart.forEach(item => {
            this.changeProductPrice(item);
          });
          this.productPriceData = (this.productPriceData).toFixed(2);
          this.paymentDate = res.data.result.paymentDate;
          var date = new Date(this.paymentDate);
          this.endYear = date.getUTCFullYear()
          this.endMonth = date.getUTCMonth()
          this.endDay = date.getUTCDate()
          this.endHour = date.getUTCHours() + 3
          this.endMinute = date.getUTCMinutes()
          this.endSecond = date.getUTCSeconds() 
        })
        .catch((error) => {
          // if(error.response.status == 401){
          //   console.log("401")
            this.CHANGE_UNAUTHTORISE()
            this.$router.push({name: 'authorizationForm'})
          // }
          console.error(error);
        });
    },
    changeProductPrice(data){
      this.productPriceData += data.product_prise * data.product_count
      },
      showRemaining(){
      const timer = setInterval(() => {
        const now = new Date()
        const end = new Date(this.endYear, this.endMonth, this.endDay, this.endHour, this.endMinute, this.endSecond, 0)
        const distance = end.getTime() - now.getTime()

        if(distance < 0){
          clearInterval(timer)
          return
        }

        const minutes = Math.floor((distance % this._hours)/ this._minutes)
        const seconds = Math.floor((distance % this._minutes)/ this._seconds)

        this.displayMinutes = minutes < 10 ? "0" + minutes : minutes
        this.displaySeconds = seconds < 10 ? "0" + seconds : seconds

      }, 1000)

    },
  },
  created(){
    this.getClientCart();
  },
  computed:{
    ...mapGetters(["CART_COUNT"]),
    _seconds: () => 1000,
    _minutes(){
      return this._seconds * 60
    },
    _hours(){
      return this._minutes * 60
    },
    _days(){
      return this._hours * 24
    }
  },
  mounted(){
    this.showRemaining()
  },
};
</script>
<style >
</style>