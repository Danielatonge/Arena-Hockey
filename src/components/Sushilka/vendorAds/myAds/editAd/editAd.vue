<template>
    <div style="margin-top: 30px;padding-top: 25px;max-width:1170px;margin:0 auto;">
        <div style="margin-top: 40px; margin-bottom: 20px">
        <v-row>
            <v-col style="padding-top: 0; padding-bottom: 30px; padding-left: 12px">
                <v-breadcrumbs style="padding: 0px" :items="path"></v-breadcrumbs>
            </v-col>
        </v-row>
        </div>
        <div
        style="font-family: Roboto;
        font-style: normal;
        font-weight: 500;
        font-size: 32px;
        line-height: 40px;">
            Редактирование объявления
        </div>
        <v-row style="margin-top: 30px">
            <v-col
            cols="10">
                <v-text-field
                label="Наменование товара (объявления)"
                placeholder="Наменование товара (объявления)"
                v-model="productName"
                solo
                flat
                required
                ref="productName"
                :rules="[() => !!productName || 'Обязательно для заполнения']"
                :error-messages="errorMessages"
                ></v-text-field>
                <v-row>
                    <v-col
                    style="padding-bottom: 0"
                    cols="6">
                        <v-select
                        v-model="categoryName"
                        :items="categories"
                        label="Категория"
                        solo
                        flat
                        disabled
                        elevation="0"
                        required
                        ref="categoryName"
                        :rules="[() => !!categoryName || 'Обязательно для заполнения']"
                        :error-messages="errorMessages"
                        ></v-select>
                    </v-col>
                    <v-col
                    style="padding-bottom: 0"
                    v-if="subcategoriesField"
                    cols="6">
                        <v-select
                        v-model="subcategoryName"
                        :items="subcategories"
                        label="Подкатегория"
                        solo
                        flat
                        disabled
                        elevation="0"
                        required
                        ref="subcategoryName"
                        :rules="[() => !!subcategoryName || 'Обязательно для заполнения']"
                        :error-messages="errorMessages"
                        ></v-select>
                    </v-col>
                </v-row>
            </v-col>
            <v-col
            style="margin-bottom: 8px"
            cols="2">
                <v-card
                height="100%"
                style="padding-top: 11px; padding-left: 15px"
                elevation="0">
                    <p class="title">Тип товара</p>
                    <v-radio-group style="padding-top: 8px; margin-top: 0px" 
                    v-model="radioGroup"
                    required
                    ref="radioGroup"
                    :rules="[() => radioGroup != 0 || radioGroup != 1 || 'Обязательно для заполнения']"
                    :error-messages="errorMessages">
                        <v-radio
                        v-for="n in type"
                        :key="n.value"
                        :label="`${n.text}`"
                        :value="n.value"
                        ></v-radio>
                    </v-radio-group>
                </v-card>
            </v-col>
        </v-row>
        <div>
            <v-row>
                <v-col>
                    <p class="title">Технические характеристики</p>
                </v-col>
            </v-row>
            <v-row>
                <v-col
                style="padding-bottom: 0; padding-top: 0"
                v-for="(itemSM, sm) in technicalParametersSM"
                :key="sm"
                cols="3">
                    <v-select
                    :items="itemSM.values"
                    :label="itemSM.name"
                    v-model="itemSM.model"
                    solo
                    flat
                    clearable
                    elevation="0"
                    required
                    ref="itemSM.model"
                    :rules="[() => !!itemSM.model || 'Обязательно для заполнения']"
                    :error-messages="errorMessages"
                    @change="addParametr(itemSM.name, itemSM.model)"
                    ></v-select>
                </v-col>
                <v-col
                style="padding-bottom: 0; padding-top: 0"
                v-for="(itemLG, lg) in technicalParametersLG"
                :key="lg"
                cols="4">
                    <v-select
                    :items="itemLG.values"
                    :label="itemLG.name"
                    v-model="itemLG.model"
                    clearable
                    solo
                    flat
                    elevation="0"
                    required
                    ref="itemLG.model"
                    :rules="[() => !!itemLG.model || 'Обязательно для заполнения']"
                    :error-messages="errorMessages"
                    @change="addParametr(itemLG.name, itemLG.model)"
                    ></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col style="padding-bottom: 0; padding-top: 0" cols="9">
                    <v-row>
                        <v-col
                        style="padding-bottom: 0;"
                        cols="4">
                            <v-text-field
                            label="Цена товара"
                            placeholder="Цена товара"
                            v-model="productPrice"
                            solo
                            flat
                            required
                            :rules="[rules.required, rules.isNumber, rules.valueOfNumber]"
                            ></v-text-field>
                        </v-col>
                        <v-col
                        style="padding-bottom: 0;"
                        cols="4">
                            <v-text-field
                            label="Год выпуска"
                            placeholder="Год выпуска"
                            v-model="productYear"
                            solo
                            flat
                            required
                            :rules="[rules.required, rules.isNumber, rules.isFour]"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col
                        style="padding-bottom: 0; padding-top: 0">
                            <v-textarea
                            v-model="productDescription"
                            solo
                            flat
                            counter
                            name="input-7-4"
                            label="Описание товара"
                            maxlength="800"
                            required
                            ref="productDescription"
                            :rules="[() => !!productDescription || 'Обязательно для заполнения']"
                            :error-messages="errorMessages"
                            ></v-textarea>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="3">
                    <div class="uploadphoto_frameOut">
                        <div class="uploadphoto_frameIn">
                            <div>
                                <div class="icon">
                                    <v-icon
                                    size="52"
                                    color="#14396A">
                                        mdi-file-move
                                    </v-icon>
                                </div>
                                <div>
                                    <input multiple accept=".png,.jpeg,.jpg" name="file" id="input__file" class="input input__file" type="file" @change="uploadPhoto"> 
                                    <label for="input__file" class="input__file-button">
                                        <span class="input__file-button-text">Загрузить фото</span>
                                    </label>
                                </div>
                                <div style="margin-top: 7px">
                                    <p class="photo_names">Вы загрузили: {{quantityPhoto}} фото</p>
                                    <p @click="imgDialog = true" class="photo_names" style="text-decoration: underline; cursor: pointer">Посмотреть</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p class="photo_format_and_size">Формат фото - JPEG, JPG, PNG</p>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col
                style="padding-bottom: 0; padding-top: 0"
                cols="3">
                    <v-text-field
                    label="Количество товара"
                    placeholder="Количество товара"
                    v-model="productAmount"
                    solo
                    flat
                    required
                    :rules="[rules.required, rules.isNumber, rules.valueOfNumber]"
                    ></v-text-field>
                </v-col>
                <v-col
                style="padding-bottom: 0; padding-top: 0"
                cols="9">
                    <v-text-field
                    label="Адрес сделки"
                    placeholder="Адрес сделки"
                    v-model="coordsAddress"
                    solo
                    flat
                    required
                    ref="coordsAddress"
                    :rules="[() => !!coordsAddress || 'Обязательно для заполнения']"
                    :error-messages="errorMessages"
                    ></v-text-field>
                </v-col>
            </v-row>
            <!-- <v-row>
                <v-col
                cols="3"
                >
                    <v-text-field
                    label="Страна"
                    placeholder="Страна"
                    v-model="countryMap"
                    @input="addInLockalStorage"
                    solo
                    flat
                    ></v-text-field>
                </v-col>
                <v-col
                cols="3"
                >
                    <v-text-field
                    label="Город"
                    placeholder="Город"
                    v-model="cityMap"
                    @input="addInLockalStorage"
                    solo
                    flat
                    ></v-text-field>
                </v-col>
            </v-row>     -->
            <!-- <v-row>
                <v-col>
                    <vMapInAds 
                    @coordsAddress ='coordsAddress = $event'
                    @countryMap ="countryMap = $event"
                    @cityMap="cityMap = $event"
                    @coords="coordsMap = $event"
                    />
                </v-col>
            </v-row> -->
            <v-row>
                <v-col
                cols="3"
                style="padding-top: 0">
                    <v-checkbox
                    v-model="isPickup"
                    label="Возможность самовывоза"
                    ></v-checkbox>
                </v-col>
                <v-col
                cols="9"
                style="padding-top: 0; padding-left: 0">
                    <v-checkbox
                    v-model="isDelivery"
                    label="Организация доставки собственными силами"
                    ></v-checkbox>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <div style="display: flex; justify-content: center; ">
                        <div>
                        <v-btn
                        @click="cancelingAdUpdateDialog = true"
                        color="#0681C8"
                        height="48px"
                        elevation="0"
                        style="color: #fff; border-radius: 8px; margin-right: 30px; text-align: center">ОТМЕНА</v-btn>
                        <v-btn
                        :disabled="!productName || !(radioGroup == 0 || radioGroup == 1 ) || !productPrice || !productYear || !productDescription || !productAmount || !coordsAddress || !(quantityPhoto > 0) || !(quantityOfSelectParameters == quantityOfParameters) || !(productPrice > 0) || !(productYear.toString().length == 4) || !(productAmount > 0)"
                        @click="createNewProduct"
                        color="#0681C8"
                        height="48px"
                        elevation="0"
                        style="color: #fff; border-radius: 8px; margin-right: 30px; text-align: center">Сохранить</v-btn>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </div>
        <v-dialog
        v-model="imgDialog"
        width="1100px"
        persistent>
            <v-card
            :loading="loadPhoto"
            color="#EAEAEA"
            style="max-width: 1100px">
                <v-card-title style="display: flex; justify-content: flex-start; position: relative;">
                    <div class="itemcenter">
                        <p class="img_title">Загрузка фото</p>
                    </div>
                    <div class="itemright">
                            <v-btn
                            style="float: right;"
                            icon
                            @click="imgDialog = false"
                            color="#000">
                                <v-icon>mdi-window-close</v-icon>
                            </v-btn>
                    </div>
                </v-card-title>
                <v-card-text>
                    <v-row v-if="loadPhoto" style="padding-top: 20px padding-bottom: 20px">
                        <v-progress-linear
                        indeterminate
                        color="#0681C8"
                        ></v-progress-linear>
                    </v-row>
                    <v-row v-if="loadPhoto == false">
                        <v-col style="padding-left: 24px" align-self="center" cols="4">
                            <div v-if="srcMainImage == null" style="display: flex; align-items: center; text-align: center;">
                                <p style="font-family: Roboto; font-style: normal; font-weight: normal; font-size: 18px; line-height: 21px;">Выберите основную фотографию товара</p>
                            </div>
                            <div v-else>
                                <img :src="`https://drive.google.com/uc?export=view&id=${srcMainImage}`" alt='' >
                            </div>
                        </v-col>
                        <v-col cols="8" style="padding-right: 0px">
                            <div
                            class="block_with_img_all">
                                <div 
                                v-for="(item,i) in resultingPhoto "
                                :key="i"
                                class="block_with_img">
                                    <div @click="removePhoto(item.linq)" class="preview_remove">
                                        &times;
                                    </div>
                                    <img
                                    :src="`https://drive.google.com/uc?export=view&id=${item.linq}`"
                                    @click="photoIsMain(i)"
                                    >
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions v-if="loadPhoto == false">
                    <v-spacer></v-spacer>
                    <v-btn
                    elevation="0"
                    color="#0681C8"
                    height="48px"
                    width="145px"
                    class="btn_text"
                    @click="imgDialog = false">Сохранить</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
        v-model="cancelingAdUpdateDialog"
        width="800px"
        persistent>
            <v-card
            color="#EAEAEA"
            style="max-width: 1100px">
                <v-card-title style="display: flex; justify-content: center;">
                        <p class="img_title">Изменённые данные не будут сохранены</p>
                </v-card-title>
                <v-card-actions style="margin-top: 15px">
                    <v-spacer></v-spacer>
                    <v-btn
                        @click="cancelingAdUpdateDialog = false"
                        color="#0681C8"
                        height="48px"
                        elevation="0"
                        style="color: #fff; border-radius: 8px; margin-right: 30px; text-align: center">ОТМЕНА</v-btn>
                        <v-btn
                        @click="cancelingUpdateProduct"
                        color="#0681C8"
                        height="48px"
                        elevation="0"
                        style="color: #fff; border-radius: 8px; margin-right: 30px; text-align: center">Продолжить без сохранения</v-btn>
                        <v-btn
                        @click="createNewProduct"
                        color="#0681C8"
                        height="48px"
                        elevation="0"
                        style="color: #fff; border-radius: 8px; text-align: center">Сохранить и продолжить</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-bottom-sheet v-model="sheet">
            <v-sheet
            class="text-center"
            height="200px"
            >
                <div class="newCharactTitle">
                    Введите свое значение для поля <span style="color: #0681C8; font-weight: 500">{{newCharacteristickTitle}}</span>:
                </div>
                <v-row>
                    <v-spacer></v-spacer>
                    <v-col cols="3">
                        <v-row>
                            <v-text-field
                            v-model="newCharacteristickValue"
                            :label="newCharacteristickTitle"
                            :placeholder="newCharacteristickTitle"
                            solo
                            dense
                            style="margin-right: 15px"
                            ></v-text-field>
                            <v-btn
                            outlined
                            small
                            fab
                            color="#0681C8"
                            @click="addNewCharactValue(newCharacteristickTitle, newCharacteristickValue)">
                                <v-icon>mdi-check</v-icon>
                            </v-btn>
                        </v-row>
                    </v-col>
                    <v-spacer></v-spacer>
                </v-row>
            </v-sheet>
        </v-bottom-sheet>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import Axios from "axios";
import { GET_PRODUCT_TO_UPDATE, GET_CATEGORIES, GET_PRODUCT_PARAMETERS, UPDATE_PRODUCT, UPLOAD_PHOTO, GET_PRODUCT_CARD} from "@/api";
// import moment from 'moment';

export default {
  name: "editAd",
  data() {
    return {
        rules: {
          required: value =>{
            return !!value || 'Обязательно для заполнения'
          },
          isNumber: value => {
            const pattern = /^[0-9]+$/
            return pattern.test(value) || 'Необходимо ввести число'
          },
          isFour: value => {
            const pattern = /^[0-9]{4}$/
            return pattern.test(value) || 'Необходимо ввести 4 цифры'
          },
          valueOfNumber: value => {
            return Number(value) >= 0  || 'Должно быть больше 0'
          },
        },
        productId: "",
        sheet: false,
        loadPhoto: false,
        subcategoriesField: false,
        cancelingAdUpdateDialog: false,
        imgDialog: false,
        dataAboutProduct: {},
        path: [
            {
            text: "Сушилка",
            disabled: false,
            href: "/catalog",
            },
            {
            text: "Мои объявления",
            disabled: false,
            href: "/vendor-ads/my-ads",
            },
            {
            text: "Редактирование",
            disabled: true,
            href: "",
            },
        ],
        type:[
            {text: "Новый", value: 0},
            {text: "Б/У", value: 1},
        ],
        radioGroup: null,
        productPrice: "",
        productYear: null,
        productName: "",
        productDescription: "",
        productBrand: "",
        productAddress: "",
        productAmount: null,
        coordsAddress: "",
        cityMap: "",
        countryMap: "",
        mapX: 0,
        mapY: 0,
        isPickup: false,
        isDelivery: false,
        productCategory: "",
        productSubCategory: "",
        technicalParametersSM: [],
        technicalParametersLG: [],
        productProperties: [],
        resultingCategory: "",
        categoryName: "",
        subcategoryName: "",
        mainCategories: [],
        subCategories: [],
        subCategory: "",
        categories: [],
        subcategories: [],
        errorMessages: "",
        srcMainImage: "",
        quantityPhoto: 0,
        resultingPhoto: [],
        selectedFilesArr: [],
        selectedFile: null,
        have_brand: false,
        newCharacteristickTitle: "",
        newCharacteristickValue: "",
        newProduct: {
            product_id: "",
            product_type: "",
            product_name: "",
            product_category: "",
            product_brand: "",
            product_prise: 0,
            product_description: "",
            product_release_year: 0,
            product_amount: 0,
            product_is_pickuped: false,
            product_address: "",
            product_country: "",
            product_city: "",
            product_x: 0,
            product_y: 0,
            product_is_delivered: false,
            product_properties: [],
            product_photoes: [],
        },
        quantityOfParameters: 0,
        quantityOfSelectParameters: 0,
    };
  },
  methods: {
    ...mapActions(["CHANGE_UNAUTHTORISE"]),

    async getProductCard() {
      const number = this.productNumber;
      const token = localStorage.getItem('access_token')
      await Axios.get(`${GET_PRODUCT_CARD}?productNumber=${number}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        this.productId = res.data.result.productInfo.productId;
        this.getProductToUpdate()
      })
      .catch((error) => {
        if(error.response.status == 401){
          this.CHANGE_UNAUTHTORISE()
          this.$router.push({name: 'authorizationForm'})
        }
        console.error(error);
      });
    },

    async getProductToUpdate() {
        const token = localStorage.getItem('access_token')
        await Axios.get(`${GET_PRODUCT_TO_UPDATE}?productId=${this.productId}`, {
            headers: {
            'Authorization': `Bearer ${token}`
            }
        }).then( (res) => {
            this.dataAboutProduct = res.data.result
            this.productName = res.data.result.product_name
            this.productPrice = res.data.result.product_prise
            this.productYear = res.data.result.product_release_year
            this.productDescription = res.data.result.product_description
            this.productAmount = res.data.result.product_amount
            this.coordsAddress = res.data.result.product_address
            this.isPickup = res.data.result.product_is_pickuped
            this.isDelivery = res.data.result.product_is_delivered
            this.cityMap = res.data.result.product_city
            this.countryMap = res.data.result.product_country
            this.mapX = res.data.result.product_x
            this.mapY = res.data.result.product_y
            this.productProperties = res.data.result.product_properties
            this.productProperties.forEach(item => {
                if(item.property_name == "Бренд"){
                    item.property_value = res.data.result.product_brand
                    this.have_brand = true
                }
            })
            if(this.have_brand == false){
                let Obj = {
                    property_name: "Бренд",
                    property_value: ""
                }
                this.productProperties.push(Obj)
                let i = this.productProperties.length
                this.productProperties[i-1].property_value = res.data.result.product_brand
            }
            this.quantityOfSelectParameters = this.productProperties.length
            this.productBrand = res.data.result.product_brand
            res.data.result.product_photoes.forEach(item => {
                if(item.is_main == true){
                    this.srcMainImage = item.linq
                }
            })
            this.quantityPhoto = res.data.result.product_photoes.length
            this.resultingPhoto = res.data.result.product_photoes
            this.type.forEach(item => {
                if(item.text == res.data.result.product_type){
                    this.radioGroup = item.value
                }
            })
            this.resultingCategory = res.data.result.product_category
            if(res.data.result.product_category != ""){
                this.mainCategories.forEach(item => {
                    if(res.data.result.product_category == item.ru_name){
                        this.categoryName = item.ru_name
                        this.subcategoryName = ""
                        this.productCategory = res.data.result.product_category
                        this.subcategoriesField = false
                        this.getProductParameters()
                        return false
                    }
                })
            }
            this.mainCategories.forEach(item => {
                if(item.is_last == false){
                    this.subCategory = item.en_name
                    this.getSubCategories()
                }
                
            })
        }).catch((error) => {
            if(error.response.status == 401){
                this.CHANGE_UNAUTHTORISE()
                this.$router.push({name: 'authorizationForm'})
            }
            if(error.response.status == 500){
                console.log("500")
            }
            console.error(error);
        })
    },

    async getMainCategories() {
        const token = localStorage.getItem('access_token')
        let category = ""
        await Axios.get(`${GET_CATEGORIES}?categoryName=${category}`, {
            headers: {
            'Authorization': `Bearer ${token}`
            }
        }).then( (res) => {
            this.mainCategories = res.data.result
            this.mainCategories.forEach(item => {
                this.categories.push(item.ru_name)
            })
        }).catch((error) => {
            if(error.response.status == 401){
                this.CHANGE_UNAUTHTORISE()
                this.$router.push({name: 'authorizationForm'})
            }
            if(error.response.status == 500){
                console.log("500")
            }
            console.error(error);
        })
    },

    async getSubCategories() {
        const token = localStorage.getItem('access_token')
        let category = this.subCategory
        await Axios.get(`${GET_CATEGORIES}?categoryName=${category}`, {
            headers: {
            'Authorization': `Bearer ${token}`
            }
        }).then( (res) => {
            this.subCategories = []
            res.data.result.forEach(item => {
                this.subCategories.push(item.ru_name)
            })
            this.subCategories.forEach(elem => {
                if(this.resultingCategory == elem){
                    this.subcategoryName = elem
                    this.mainCategories.forEach(item => {
                        if(item.en_name == category){
                            this.subcategoriesField = true
                            this.categoryName = item.ru_name
                        }
                    })
                    this.productCategory = this.resultingCategory
                    this.subcategories = this.subCategories
                    this.getProductParameters()
                    return false
                }
            })
        }).catch((error) => {
            if(error.response.status == 401){
                this.CHANGE_UNAUTHTORISE()
                this.$router.push({name: 'authorizationForm'})
            }
            if(error.response.status == 500){
                console.log("500")
            }
            console.error(error);
        })
    },

    async getProductParameters(){
        const token = localStorage.getItem('access_token')
        let category = this.productCategory
        await Axios.get(`${GET_PRODUCT_PARAMETERS}?categoryName=${category}`, {
            headers: {
            'Authorization': `Bearer ${token}`
            }
        }).then( (res) => {
            this.technicalParametersSM = []
            this.technicalParametersLG = []
            let sm = 0
            let lg = 0
            this.quantityOfParameters = res.data.result.length
            res.data.result.forEach(item =>{
                if(item.name != 'Размерная характеристика (полнота ноги)'){
                    let newObject = {
                        name: "",
                        values: [],
                        model: ""
                    }
                    this.technicalParametersSM.push(newObject)

                    this.technicalParametersSM[sm].name = item.name
                    this.technicalParametersSM[sm].values = item.values.concat(["Другое значение"])
                    this.technicalParametersSM[sm].model = sm
                    sm++
                } else {
                    let newObject = {
                        name: "",
                        values: [],
                        model: ""
                    }
                    this.technicalParametersLG.push(newObject)

                    this.technicalParametersLG[lg].name = item.name
                    this.technicalParametersLG[lg].values = item.values.concat(["Другое значение"])
                    this.technicalParametersLG[lg].model = lg
                    lg++
                }
            })
            this.technicalParametersSM.forEach(item => {
                this.productProperties.forEach(elem => {
                    if(item.name == elem.property_name){
                        item.model = elem.property_value
                        item.values.push(elem.property_value)
                    }
                    if(item.name == 'Бренд'){
                        item.model = this.productBrand
                        item.values.push(this.productBrand)
                    }
                })
            })
            this.technicalParametersLG.forEach(item => {
                this.productProperties.forEach(elem => {
                    if(item.name == elem.property_name){
                        item.model = elem.property_value
                        item.values.push(elem.property_value)
                    }
                })
            })
        }).catch((error) => {
            if(error.response.status == 401){
                this.CHANGE_UNAUTHTORISE()
                this.$router.push({name: 'authorizationForm'})
            }
            console.error(error);
        })
    },

    addParametr(name, value){
        console.log(name)
        console.log(value)
        console.log(this.productProperties)
        if(value == 'Другое значение'){
            this.newCharacteristickTitle = name
            this.sheet = true
            return false;
        }
        let number = 0
        this.productProperties.forEach(item =>{
            if(item.property_name == name){
                item.property_value = value
                number++
            }
        })
        if(number == 0 ){
            this.i = this.productProperties.length
            let newObject = {
                property_name: "",
                property_value: null,
            }
            this.productProperties.push(newObject)
            this.productProperties[this.i].property_name = name
            this.productProperties[this.i].property_value = value
        }       
        
        this.productProperties.forEach(x => {
            if(!this.newProduct.product_properties.some(y => JSON.stringify(y) === JSON.stringify(x))){
                this.newProduct.product_properties.push(x)
            }
        })
        this.newProduct.product_properties.forEach(item =>{
            if(item.property_value == null){
                let num = this.newProduct.product_properties.indexOf(item)
                this.newProduct.product_properties.splice(num,1)
            }
        })
        this.quantityOfSelectParameters = this.newProduct.product_properties.length
        //console.log(this.newProduct.product_properties)
    },

    addNewCharactValue(name, value){
        this.newCharacteristickValue = ""
        this.technicalParametersSM.forEach(item => {
            if(item.name == name){
                item.model = value
                item.values.push(value)
                //console.log(item.values)
            }
        })
        //console.log(this.technicalParametersSM)
        this.technicalParametersLG.forEach(item => {
            if(item.name == name){
                item.model = value
                item.values.push(value)
                //console.log(item.values)
            }
        })
        //console.log(this.technicalParametersLG)
        this.sheet = false
        this.addParametr(name, value)
    },

    async updateProduct() {
        const token = localStorage.getItem('access_token')
        await Axios.put(`${UPDATE_PRODUCT}`, this.newProduct ,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then( (res) => {
            if(res.data){
                this.cancelingAdUpdateDialog = false
                this.$router.push({name: 'my-ads'})
            }
        }).catch((error) => {
            if(error.response.status == 401){
                this.CHANGE_UNAUTHTORISE()
                this.$router.push({name: 'authorizationForm'})
            }
            if(error.response.status == 500){
                console.log("500")
            }
            console.error(error);
        })
    },

    uploadPhoto(event){
        if(event.target.files.length == 0){
            return
        }
        this.srcMainImage = null
        this.quantityPhoto = event.target.files.length
        this.selectedFilesArr = event.target.files
        this.imgDialog = true
        this.resultingPhoto = []
        this.selectedFilesArr.forEach(file => {
            this.selectedFile = file
            this.uploadPhotoPost()
        })
        
    },

    removePhoto(linq){
        this.resultingPhoto.forEach(item => {
            if(item.linq == linq){
                let num = this.resultingPhoto.indexOf(item)
                this.resultingPhoto.splice(num,1)
            }
        })
    },

    photoIsMain(i){
        this.srcMainImage = this.resultingPhoto[i].linq
        this.resultingPhoto[i].is_main = true
    },

    async uploadPhotoPost(){
        const token = localStorage.getItem('access_token')
        this.loadPhoto = true
        var fd = new FormData();      
        fd.append('file', this.selectedFile, this.selectedFile.name)
        await Axios.post(`${UPLOAD_PHOTO}`, fd, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then( (res) => {
            console.log(res.data.result)
            let newObject = {
                linq: "",
                is_main: false,
            }
            this.resultingPhoto.push(newObject)
            let i = this.resultingPhoto.length
            this.resultingPhoto[i-1].linq = res.data.result.photo_linq
            if(this.selectedFilesArr.length == i){
                this.loadPhoto = false
            }
        }).catch((error) => {
            if(error.response.status == 401){
                this.CHANGE_UNAUTHTORISE()
                this.$router.push({name: 'authorizationForm'})
            }
            console.error(error);
        })
    },

    createNewProduct(){
        this.newProduct.product_id = this.productId
        this.newProduct.product_photoes = this.resultingPhoto
        this.newProduct.product_city = this.cityMap
        this.newProduct.product_country = this.countryMap
        if(this.subcategoryName == ""){
            this.newProduct.product_category = this.categoryName
        } else {
            this.newProduct.product_category = this.subcategoryName
        }
        this.newProduct.product_name = this.productName
        this.newProduct.product_address = this.coordsAddress
        this.newProduct.product_amount = Number(this.productAmount)
        this.newProduct.product_type = String(this.radioGroup)
        this.newProduct.product_description = this.productDescription
        this.newProduct.product_prise = Number(this.productPrice)
        this.newProduct.product_release_year = Number(this.productYear)
        this.newProduct.product_is_pickuped = this.isPickup
        this.newProduct.product_is_delivered = this.isDelivery
        this.newProduct.product_x = Number(this.mapX)
        this.newProduct.product_y = Number(this.mapY)
        if(this.newProduct.product_properties.length == 0){
            this.newProduct.product_properties = this.productProperties
        }
        this.newProduct.product_properties.forEach(item => {
            if(item.property_name == 'Бренд'){
                this.newProduct.product_brand = item.property_value
                var delB = this.newProduct.product_properties.indexOf(item)
                console.log(delB)
                this.newProduct.product_properties.splice(delB,1)
            }
        })
        this.updateProduct()
    },

    cancelingUpdateProduct(){
        this.$router.push({name: 'my-ads'})
    }
  },
  computed: {
    productNumber() {
        return this.$route.params.productNumber;
    },
  },
  created() {
      this.getProductCard();
      this.getMainCategories();
  },
  mounted() {},
};
</script>


<style scoped>
.title{
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 10px;
}

.newCharactTitle{
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 24px;
    padding-bottom: 35px;
    padding-top: 20px;
}

.uploadphoto_frameOut{
    border-radius: 8px;
    margin-bottom: 12px;
    padding: 10px;
    background-color: #fff;
    height: 193px
}

.uploadphoto_frameIn{
    border: 1px dashed #323232;
    box-sizing: border-box;
    border-radius: 8px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.icon{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 12px;
}

.btn{
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
}

.input__file {
  opacity: 0;
  visibility: hidden;
  position: absolute;
}
 
.input__file-button-text {
    line-height: 1;
    margin-top: 1px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 18px;
    margin: 0 auto;
}
 
.input__file-button {
  width: 100%;
  width: 130px;
  height: 35px;
  background: #379AD3;
  color: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: start;
      -ms-flex-pack: start;
          justify-content: flex-start;
  border-radius: 8px;
  cursor: pointer;
  margin: 0 auto;
}


.block_with_img_all{
    display: flex;
    flex-wrap: wrap;
}

.block_with_img{
    position: relative;
    margin-bottom: .5rem;
    margin-right: .5rem;
}

.block_with_img:hover .preview_remove{
    opacity: 1;
}

.block_with_main_img{
    margin-bottom: .5rem;
    margin-right: .5rem;
}

.block_with_img img{
    width: 160px;
    height: auto;
}

.block_with_main_img img{
    width: 100%;
    height: auto;
}

.iimmgg{
    width: 100%;
    height: auto;
}

.img_title{
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 40px;
  align-items: center;
  margin: 0;
}

.btn_text{
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #fff;
}

.itemcenter{
    flex: 0 1 auto;
    left: 100%;
    margin-left: auto;
}

.itemright{
    flex: 0 1 auto;
    margin-left: auto;
    width: 20px;
}

.cancellation_text{
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 29px;
    align-items: center;
}

.preview_remove{
    opacity: 0;
    width: 25px;
    height: 25px;
    position: absolute;
    right: 0;
    top: 0;
    background: rgba(255, 255, 255, .5);
    font-weight: normal;
    font-size: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: opacity .22s;
}

.photo_format_and_size{
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 26px;
    margin: 0;
    text-align: center;
}

.photo_names{
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 26px;
    margin: 0;
    text-align: center;
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