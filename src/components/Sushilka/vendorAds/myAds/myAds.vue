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
            Мои объявления
          </div>
        </v-col>
        <v-col >
          <div style="float: right;">
            <v-btn
            class="create_ad_btn"
            elevation="0"
            color="#0681c8"
            :to="`/vendor-ads/my-ads/create-new-ad`">
                Создать новое объявление
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </div>
    <div
      v-for="(item, i) in products"
      :key="i"
      class="mx-auto"
      max-width="344"
      outlined
    >
      <div>
        <v-list-item three-line>
            <v-list-item-avatar
              style="border-radius: 12px; width: 282px; height: auto"
            >
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
              <v-card-text style="width: 850px; height:auto">
                <v-row style="margin-bottom: 10px">
                  <v-col align-self="end" style="padding-bottom: 0" cols="4">
                    <p
                    class="grey--text"
                    style="
                    color: #000;
                    margin: 0;
                    font-family: Roboto;
                    font-size: 16px;
                    font-weight: 400;
                    line-height: 30px;">
                      {{ productDate() }}
                    </p>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col align-self="center" style="padding-bottom: 0" v-if="item.product_status == 'Выставлен'">
                    <div style="float: right;">
                      <v-chip
                      color="green"
                      outlined>{{item.product_status}}</v-chip>
                    </div>
                  </v-col>
                  <v-col align-self="center" style="padding-bottom: 0" v-else-if="item.product_status == 'Закончился'">
                    <div style="float: right;">
                      <v-chip
                      color="red"
                      outlined>{{item.product_status}}</v-chip>
                    </div>
                  </v-col>
                  <v-col align-self="center" style="padding-bottom: 0" v-else-if="item.product_status == 'Снят'">
                    <div style="float: right;">
                      <v-chip
                      color="purple"
                      outlined>{{item.product_status}}</v-chip>
                    </div>
                  </v-col>
                  <v-col align-self="center" style="padding-bottom: 0" v-else-if="item.product_status == 'Ожидает проверки'">
                    <div style="float: right;">
                      <v-chip
                      color="orange"
                      outlined>{{item.product_status}}</v-chip>
                    </div>
                  </v-col>
                  <v-col align-self="center" style="padding-bottom: 0" v-else-if="item.product_status == 'Подтверждён'">
                    <div style="float: right;">
                      <v-chip
                      color="blue"
                      outlined>{{item.product_status}}</v-chip>
                    </div>
                  </v-col>
                  <v-col align-self="center" style="padding-bottom: 0">
                    <div style="float: right;">
                      <v-btn
                      :to="`/vendor-ads/my-ads/edit-my-ad/${item.product_number}`"
                      height="32px"
                      color="#BDBDBD"
                      style="color: #202028; border-radius: 8px;"
                      elevation="0">
                        РЕДАКТИРОВАТЬ
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
                <p
                style="word-break: normal;
                margin-bottom: 10px;
                font-family: Roboto;
                font-size: 24px;
                font-style: normal;
                font-weight: 500;
                line-height: 28px;">
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
                  {{ item.product_category }}, {{ item.product_brand }}
                </p>
                <p
                style="margin-bottom: 10px;
                font-family: Roboto;
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: 24px;
                text-align: left;
                color: #000;">
                  Осталось: {{ item.product_count }} штук
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
              <v-card-actions v-if="item.product_type == 'Новый'">
                <v-btn
                @click="archiveIdProduct(item)"
                color="#0681C8"
                style="color: #fff; border-radius: 8px;"
                elevation="0">
                  СНЯТЬ ОБЪЯВЛЕНИЕ
                </v-btn>
                <v-btn
                @click="changeIdProduct(item)"
                color="#BDBDBD"
                style="color: #202028; border-radius: 8px;"
                elevation="0">
                  ДОБАВИТЬ ТОВАР 
                </v-btn>
                <v-btn
                @click ="deleteProductAds(item)"
                color="#BDBDBD"
                style="color: #202028; border-radius: 8px;"
                elevation="0">
                  УБРАТЬ ТОВАР 
                </v-btn>
                <div
                v-if="item.product_count == 0"
                >
                  <v-checkbox
                    style="margin-left:20px"
                    v-model="item.product_is_delivery_expected"
                    checked
                    @click="clickCheckBox(item)"
                    label="Ожидается пополнение товара"
                    ></v-checkbox>
                </div>
                <div
                v-else
                >
                   <v-checkbox
                    style="margin-left:20px"
                    v-model="checkboxFalse"
                    checked
                    disabled 
                    label="Ожидается пополнение товара"
                    ></v-checkbox>
                </div>
                
              </v-card-actions>
          </v-list-item-content>
        </v-list-item>
      </div>
    </div>
    <v-dialog
    v-model="addProduct"
    persistent
    max-width="800px"
    >
      <v-card
      color="#EAEAEA">
        <v-card-title class="text-h5" style="display: flex; justify-content: center;">
          <p style = "margin-left:auto" class="addProduct_title">Добавление товара</p>
          <div 
          style="float: right;margin-left:auto
          "
          >
              <v-btn
              style="float: right;"
              icon
              @click="addProduct = false"
              color="#000">
                  <v-icon>mdi-window-close</v-icon>
              </v-btn>
            </div>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
                        <v-text-field
                        v-model = "quantityProduct"
                        style="width: 680px"
                        placeholder="Введите количество товара"
                        outlined
                        >
                      
                    </v-text-field>
                        <v-btn
                    width="160px"
                    height="48px"
                    style="border-radius: 8px;position:absolute;margin-left:575px;margin-bottom:30px"
                    elevation="0"
                    color="#0681C8"
                    class="confirm_ad_creation"
                    @click="addProduct = false;changeProduct()">
                        ДОБАВИТЬ
                    </v-btn>
                    
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- <v-dialog
    v-model="checkboxDialog"
    persistent
    max-width="630px"
    >
      <v-card
      color="#EAEAEA">
        <v-card-title class="text-h5" style="display: flex; justify-content: center;">
          <p style = "text-align: center;margin-bottom:50px">Снятие метки приведёт к переносу объявления из вкладки «Мои объявления» во вкладку «Архив»</p>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
                        <v-btn
                    width="160px"
                    height="48px"
                    style="border-radius: 8px;position:absolute;margin-left:30px;margin-bottom:50px;background: #E1E9FE;color: black"
                    elevation="0"
                    color="#0681C8"
                    class="confirm_ad_creation"
                    @click="checkboxDialog = false;checkbox = true">
                        Отмена
                    </v-btn>

                    <v-btn
                    width="160px"
                    height="48px"
                    style="border-radius: 8px;position:absolute;margin-left:400px;margin-bottom:50px"
                    elevation="0"
                    color="#0681C8"
                    class="confirm_ad_creation"
                    @click="checkboxDialog = false;archiveProductAds()">
                        Да
                    </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
    <v-dialog
    v-model="deleteDialog"
    persistent
    max-width="800px"
    >
      <v-card
      color="#EAEAEA">
        <v-card-title class="text-h5" style="display: flex; justify-content: center;">
          <p style = "margin-left:auto" class="addProduct_title">Убрать товар</p>
          <div 
          style="float: right;margin-left:auto
          "
          >
              <v-btn
              style="float: right;"
              icon
              @click="deleteDialog = false"
              color="#000">
                  <v-icon>mdi-window-close</v-icon>
              </v-btn>
            </div>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
                        <v-text-field
                        v-model = "quantityProduct"
                        style="width: 680px"
                        placeholder="Введите количество товара"
                        outlined
                        >
                      
                    </v-text-field>
                        <v-btn
                    width="160px"
                    height="48px"
                    style="border-radius: 8px;position:absolute;margin-left:575px;margin-bottom:30px"
                    elevation="0"
                    color="#0681C8"
                    class="confirm_ad_creation"
                    @click="deleteDialog = false;changeProductDelete()">
                        УБРАТЬ
                    </v-btn>
                    
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
import { GET_MY_PRODUCTS,CHANGE_MY_PRODUCT_COUNT, ARCHIVE_PRODUCT,CHANGE_MY_PRODUCT_DELIVERY } from "@/api";
import moment from "moment";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      products: [],
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
          text: "Мои объявления",
          disabled: true,
          href: "/vendor-ads/myAds",
        },
      ],
      addProduct: false,
      product_id: "",
      productCount: 0,
      snackbar: false,
      textSnackBar: `Выставленный товар нельзя убрать`,
      checkbox: false,
      checkboxFalse: false,
      checkboxDialog: false,
      productStat: "",
      deleteDialog: false,
      quantityProduct: 0,
      finalCount: 0,
    };
  },
  methods: {
    ...mapActions(["CHANGE_UNAUTHTORISE"]),
    archiveProductAds(){
      if(this.productStat == "Выставлен"){
        this.snackbar = true;
        this.checkbox = true;
      }
      this.archiveProduct(this.product_id)
    },
    archiveIdProduct(data){
      this.product_id = data.product_id
      this.productStat =  data.product_status
      if(this.productStat == "Выставлен"){
        this.snackbar = true;
      }else{
        this.archiveProduct(this.product_id)
      }
      
    },
    async archiveProduct(id){
      const token = localStorage.getItem("access_token");
      await Axios.put(`${ARCHIVE_PRODUCT}?productId=${id}`, [], {
        headers: {
          Authorization: `Bearer ${token}`,
        },/* eslint-disable */
      }).then((res) => {
        this.getMyProducts()
      }).catch((error) => {
        if(error.response.status == 401){
          this.CHANGE_UNAUTHTORISE()
          this.$router.push({name: 'authorizationForm'})
        }
        console.error(error);
      });
    },
    clickCheckBox(data){
      this.product_id = data.product_id
      this.changeMyProductDelivery()
    },
    async changeMyProductDelivery(){
      var id = this.product_id
      const token = localStorage.getItem("access_token");
      await Axios.put(`${CHANGE_MY_PRODUCT_DELIVERY}?productId=${id}`, [], {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        this.getMyProducts()
      }).catch((error) => {
        if(error.response.status == 401){
          this.CHANGE_UNAUTHTORISE()
          this.$router.push({name: 'authorizationForm'})
        }
        console.error(error);
      });
    },
    changeProductDelete(){
      this.finalCount = this.productCount - this.quantityProduct
        this.changeMyProductCount()
    },
    changeProduct(){
      this.finalCount = parseInt(this.productCount, 10) + parseInt(this.quantityProduct , 10)
        this.changeMyProductCount()     
    },
    async changeMyProductCount(){
       const token = localStorage.getItem("access_token");
      await Axios.put(`${CHANGE_MY_PRODUCT_COUNT}?productId=${this.product_id}&productCount=${this.finalCount}`, [], {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        this.getMyProducts()
      }).catch((error) => {
        if(error.response.status == 401){
          this.CHANGE_UNAUTHTORISE()
          this.$router.push({name: 'authorizationForm'})
        }
        console.error(error);
      });
    },
    // changeProductCount(){
    //   this.productCount = this.quantityProduct
    // },
    changeIdProduct(data){
      this.product_id = data.product_id
      this.productCount = data.product_count
      this.quantityProduct = ""
      this.addProduct = true
    },
    deleteProductDialog(){
      this.deleteProduct(this.product_id)
    },
    deleteProductAds(data) {
      this.product_id = data.product_id
      this.productCount = data.product_count
      this.quantityProduct = ""
      this.deleteDialog = true
      // this.addProduct = true
      // if(data.product_status == "Выставлен"){
      //   this.snackbar = true;
      // }else{
      //   this.product_id = data.product_id
      //   this.deleteDialog = true
      // }
      
    },
    async deleteProduct(id){
      const token = localStorage.getItem("access_token");
      await Axios.put(`${CHANGE_MY_PRODUCT_DELIVERY}?productId=${id}`, [], {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        this.getMyProducts()
      }).catch((error) => {
        if(error.response.status == 401){
          this.CHANGE_UNAUTHTORISE()
          this.$router.push({name: 'authorizationForm'})
        }
        console.error(error);
      });
    },
    async getMyProducts() {
      const token = localStorage.getItem("access_token");
      await Axios.get(`${GET_MY_PRODUCTS}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        this.products = res.data.result
      }).catch((error) => {
        if(error.response.status == 401){
          this.CHANGE_UNAUTHTORISE()
          this.$router.push({name: 'authorizationForm'})
        }
        console.error(error);
      });
    },
    
    productDate() {
      var march = moment(this.products.product_publish_date);
      return march.locale("ru").format("D MMMM YYYY");
    },
  },
  created() {
    this.getMyProducts();
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

.addProduct_title{
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 40px;
}

.confirm_ad_creation{
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #fff;
}
</style>