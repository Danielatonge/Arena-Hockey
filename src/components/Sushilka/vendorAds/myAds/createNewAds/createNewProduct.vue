<template>
    <div style="margin-top: 30px">
        <v-row>
            <v-col
            cols="10">
                <v-text-field
                label="Наменование товара (объявления)"
                placeholder="Наменование товара (объявления)"
                v-model="productName"
                @input="addInLockalStorage"
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
                        @change="changeCategoryFirst(categoryName)"
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
                        @change="changeCategorySecond(subcategoryName)"
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
                        @click="addInLockalStorage"
                        v-for="n in type"
                        :key="n.value"
                        :label="`${n.text}`"
                        :value="n.value"
                        ></v-radio>
                    </v-radio-group>
                </v-card>
            </v-col>
        </v-row>
        <div v-if="showCharacteristicks">
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
                            @input="addInLockalStorage"
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
                            @input="addInLockalStorage"
                            solo
                            flat
                            required
                            :rules="[rules.required, rules.isFour]"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col
                        style="padding-bottom: 0; padding-top: 0">
                            <v-textarea
                            v-model="productDescription"
                            solo
                            @input="addInLockalStorage"
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
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p class="photo_format_and_size">Формат фото - JPEG, JPG, PNG</p>   
                        <!-- <p class="photo_format_and_size">Размер - 400х400px</p> -->
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
                    @input="addInLockalStorage"
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
                    @input="addInLockalStorage"
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
            <v-row>
                <v-col>
                    <vMapInAds 
                    @coordsAddress ='coordsAddress = $event'
                    @countryMap ="countryMap = $event"
                    @cityMap="cityMap = $event"
                    @coords="coordsMap = $event"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col
                cols="3"
                style="padding-top: 0">
                    <v-checkbox
                    v-model="isPickup"
                    @click="addInLockalStorage"
                    label="Возможность самовывоза"
                    ></v-checkbox>
                </v-col>
                <v-col
                cols="9"
                style="padding-top: 0; padding-left: 0">
                    <v-checkbox
                    v-model="isDelivery"
                    @click="addInLockalStorage"
                    label="Организация доставки собственными силами"
                    ></v-checkbox>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <div style="display: flex; justify-content: center; ">
                        <div>
                        <v-btn
                        @click="cancelingAdCreationDialog = true"
                        color="#0681C8"
                        height="48px"
                        elevation="0"
                        style="color: #fff; border-radius: 8px; margin-right: 30px; text-align: center">ОТМЕНА</v-btn>
                        <v-btn
                        :disabled="!productName || !(radioGroup == 0 || radioGroup == 1 ) || !productPrice || !productYear || !productDescription || !productAmount || !coordsAddress || !(quantityPhoto > 0) || !(quantityOfSelectParameters == quantityOfParameters) || !(productPrice > 0) || !(productYear.length == 4) || !(productAmount > 0)"
                        @click="createNewProduct"
                        color="#0681C8"
                        height="48px"
                        elevation="0"
                        style="color: #fff; border-radius: 8px; margin-right: 30px; text-align: center">Разместить объявление</v-btn>
                        <v-btn
                        @click="createNewDraftProduct"
                        :disabled="!productName"
                        color="#0681C8"
                        height="48px"
                        elevation="0"
                        style="color: #fff; border-radius: 8px; text-align: center">сохранить в черновиках</v-btn>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </div>
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
        <v-dialog
        v-model="imgDialog"
        width="1100px"
        persistent>
            <v-card
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
                            @click="closeImgDialog"
                            color="#000">
                                <v-icon>mdi-window-close</v-icon>
                            </v-btn>
                    </div>
                    
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col style="padding-left: 24px" align-self="center" cols="4">
                            <div v-if="srcMainImage == null" style="display: flex; align-items: center; text-align: center;">
                                <p style="font-family: Roboto; font-style: normal; font-weight: normal; font-size: 18px; line-height: 21px;">Выберите основную фотографию товара</p>
                            </div>
                            <div v-else>
                                <img :src="srcMainImage" :alt="altMainImage" width="100%">
                            </div>
                        </v-col>
                        <v-col cols="8" style="padding-right: 0px">
                            <div
                            class="block_with_img_all">
                                <div 
                                v-for="(item,i) in srcImage "
                                :key="i"
                                class="block_with_img">
                                <div @click="removePhoto(i, altImage[i])" class="preview_remove">
                                    &times;
                                </div>
                                    <img @click="photoIsMain(item, i, altImage[i])" :src="item" :alt="altImage[i]">
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                    :loading="loadPhoto"
                    elevation="0"
                    color="#0681C8"
                    height="48px"
                    width="145px"
                    class="btn_text"
                    @click="getLinkToPhoto">Сохранить</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
        v-model="cancelingAdCreationDialog"
        max-width="450px">
            <v-card
            color="#EAEAEA">
                <v-card-title class="text-h5" style="display: flex; justify-content: center;">
                    <p class="cancellation_text">Данные не будут сохранены.</p>
                    <p class="cancellation_text">Продолжить?</p>
                </v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                    style="border-radius: 10px; margin-right: 40px"
                    elevation="0"
                    width="140px"
                    height="45px"
                    color="#E1E9FE"
                    class="cancellation_text"
                    @click="cancelingAdCreationDialog = false">
                        Отмена
                    </v-btn>
                    <v-btn
                    width="140px"
                    height="45px"
                    style="border-radius: 10px;"
                    elevation="0"
                    color="#BDD0FB"
                    class="cancellation_text"
                    @click="cancelingAdCreation">
                        Да
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
        v-model="adAddedDialog"
        persistent
        max-width="450px">
            <v-card
            color="#EAEAEA">
                <v-card-title class="text-h5" style="display: flex; justify-content: center;">
                    <p class="cancellation_text">Объявление будет размещено</p>
                    <p class="cancellation_text">Статус: «Ожидает проверки»</p>
                </v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                    width="160px"
                    height="48px"
                    style="border-radius: 8px;"
                    elevation="0"
                    color="#0681C8"
                    class="confirm_ad_creation"
                    @click="backToAds">
                        Подтвердить
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
        v-model="adDraftDialog"
        persistent
        max-width="450px">
            <v-card
            color="#EAEAEA">
                <v-card-title class="text-h5" style="display: flex; justify-content: center;">
                    <p class="cancellation_text">Объявление добавлено в черновики</p>
                </v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                    width="160px"
                    height="48px"
                    style="border-radius: 8px;"
                    elevation="0"
                    color="#0681C8"
                    class="confirm_ad_creation"
                    @click="backToDraftAds">
                        ГОТОВО
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
        v-model="quantityError"
        persistent
        max-width="560px">
            <v-card
            color="#EAEAEA">
                <v-card-title class="text-h5" style="display: flex; justify-content: center;">
                    <p class="cancellation_text">Некорректное количество товара для типа Б/У</p>
                    <p class="cancellation_text">Количество такого товара должно быть равно 1</p>
                </v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                    width="160px"
                    height="48px"
                    style="border-radius: 8px;"
                    elevation="0"
                    color="#0681C8"
                    class="confirm_ad_creation"
                    @click="quantityError = false">
                        ПОНЯТНО
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import Axios from "axios";
import vMapInAds from "./vMapInAds.vue"
import { GET_CATEGORIES, GET_PRODUCT_PARAMETERS, CREATE_PRODUCT, UPLOAD_PHOTO, CREATE_DRAFT_PRODUCT } from "@/api";
import { mapActions } from "vuex";

export default {
  components: { vMapInAds },
  name: "createNewProduct",
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
        errorMessages: '',
        cancelingAdCreationDialog: false,
        adDraftDialog: false,
        quantityError: false,
        imgDialog: false,
        loadPhoto: false,
        adAddedDialog: false,
        files: [],
        sheet: false,
        moreInformation: false,
        isPickup: false,
        isDelivery: false,
        radioGroup: null,
        newCharacteristickTitle: "",
        newCharacteristickValue: "",
        type:[
            {text: "Новый", value: 0},
            {text: "Б/У", value: 1},
        ],
        categoryName: "",
        subcategoryName: "",
        categories: [],
        allCategoriesFirst: [],
        subcategories: [],
        subcategoriesField: false,
        category:"",
        finalСategory:"",
        counter: 0,
        quantityOfParameters: 0,
        quantityOfSelectParameters: 0,
        selectedFilesArr: [],
        selectedFile: null,
        srcMainImage: null,
        altMainImage: null,
        quantityPhoto: 0,
        mainNumber: 0,
        altImage: [],
        srcImage: [],
        showCharacteristicks: false,
        technicalParametersSM: [],
        technicalParametersLG: [],
        i: 0,
        productCharacteristics: [],
        productPrice: null,
        productYear: null,
        productName: "",
        productDescription: "",
        productBrand: "",
        productAddress: "",
        productAmount: null,
        newProduct: {
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
    coordsAddress: "",
    cityMap: "",
    countryMap: "",
    coordsMap: [],
    };
  },
  methods: {
    ...mapActions(["CHANGE_UNAUTHTORISE"]),
    changeCategoryFirst(data){
        localStorage.setItem("productCategory", data)
        localStorage.removeItem("productSubCategory")
        this.showCharacteristicks = false
        this.subcategoryName = ""
        this.finalСategory = data
        this.allCategoriesFirst.forEach(item => {
            if(item.ru_name == data){
                this.category = item.en_name
                this.getCategories()
            }
        })
    },

    changeCategorySecond(data){
        localStorage.setItem("productSubCategory", data)
        this.finalСategory = data
        this.showCharacteristicks = false
        this.allCategoriesSecond.forEach(item => {
            if(item.ru_name == data){
                this.category = item.en_name
                this.getCategories()
            }
        })
    },

    async getCategories() {
        const token = localStorage.getItem('access_token')
        let category = ""
        if(this.category != ""){
            category = this.category
        } else {
            category = ""
        }
        await Axios.get(`${GET_CATEGORIES}?categoryName=${category}`, {
            headers: {
            'Authorization': `Bearer ${token}`
            }
        }).then( (res) => {
            this.counter++
            if(this.counter > 1 && res.data.result.length != 0){
                this.subcategories = []
                res.data.result.forEach(item => {
                    this.subcategories.push(item.ru_name)
                })
                this.subcategoriesField = true
                this.allCategoriesSecond = res.data.result
            } else if(this.counter > 1) {
                if(this.subcategoryName != ""){
                    this.getProductParameters()
                }else {
                    this.subcategoriesField = false
                    this.subcategoryName = ""
                    this.getProductParameters()
                }
            } else {
                this.categories = []
                this.subcategoriesField = false
                this.subcategoryName = ""
                res.data.result.forEach(item => {
                    this.categories.push(item.ru_name)
                })
                this.allCategoriesFirst = res.data.result
            }
      })
        .catch((error) => {
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
        let category = this.category
        await Axios.get(`${GET_PRODUCT_PARAMETERS}?categoryName=${category}`, {
            headers: {
            'Authorization': `Bearer ${token}`
            }
        }).then( (res) => {
            const now = new Date()
            var expires_date = new Date(localStorage.getItem('expires'));
            var endYear = expires_date.getUTCFullYear()
            var endMonth = expires_date.getUTCMonth()
            var endDay = expires_date.getUTCDate()
            var endHour = expires_date.getUTCHours() + 3
            var endMinute = expires_date.getUTCMinutes()
            var endSecond = expires_date.getUTCSeconds()
            const end = new Date(endYear, endMonth, endDay, endHour, endMinute, endSecond, 0)
            if(now > end){
                this.$router.push({name: 'authorizationForm'})
            } else {
                this.showCharacteristicks = true
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
            }
        })
        .catch((error) => {
            if(error.response.status == 401){
                this.CHANGE_UNAUTHTORISE()
                this.$router.push({name: 'authorizationForm'})
            }
            console.error(error);
        })
    },

    async createProduct() {
        const token = localStorage.getItem('access_token')
        await Axios.post(`${CREATE_PRODUCT}`, this.newProduct, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then( (res) => {
            this.adAddedDialog = true
            console.log(res.data.result)
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

    async createDraftProduct() {
        const token = localStorage.getItem('access_token')
        await Axios.post(`${CREATE_DRAFT_PRODUCT}`, this.newProduct, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then( (res) => {
            if(res.data){
                this.adDraftDialog = true
            }
            
        }).catch((error) => {
            if(error.response.status == 401){
                this.CHANGE_UNAUTHTORISE()
                this.$router.push({name: 'authorizationForm'})
            }
            if(error.response.data.title == "Некорректное количество товара для типа Б/У"){
                this.quantityError = true
            }
            if(error.response.status == 500){
                console.log("500")
            }
                console.error(error);
        })
    },

    addParametr(name, value){
        if(value == 'Другое значение'){
            this.newCharacteristickTitle = name
            this.sheet = true
            return false;
        }
        let newObject = {
            property_name: "",
            property_value: "",
        }
        this.productCharacteristics.push(newObject)
        
        this.productCharacteristics.forEach(item =>{
            if(item.property_name == name){
                item.property_value = value
            }
        })
        this.productCharacteristics[this.i].property_name = name
        this.productCharacteristics[this.i].property_value = value
        this.i++
        this.productCharacteristics.forEach(x => {
            if(!this.newProduct.product_properties.some(y => JSON.stringify(y) === JSON.stringify(x))){
                this.newProduct.product_properties.push(x)
            }
        })
        let num = 0
        this.newProduct.product_properties.forEach(item =>{
            if(item.property_value == null){
                this.newProduct.product_properties.splice(num,1)
                num--
            }
            num++
        })
        this.quantityOfSelectParameters = this.newProduct.product_properties.length
        // ?????????????????????????
        // let numm = 0
        // this.newProduct.product_properties.forEach(item =>{
        //     if(item.property_value == null){
        //         this.newProduct.product_properties.splice(numm,1)
        //         numm--
        //     }
        //     numm++
        // })
        localStorage.setItem("product_properties", JSON.stringify(this.newProduct.product_properties))
        //array = JSON.parse(localStorage.getItem("array"));
        console.log(this.newProduct.product_properties)
    },

    addNewCharactValue(name, value){
        this.newCharacteristickValue = ""
        this.technicalParametersSM.forEach(item => {
            if(item.name == name){
                item.model = value
                item.values.push(value)
                console.log(item.values)
            }
        })
        console.log(this.technicalParametersSM)
        this.technicalParametersLG.forEach(item => {
            if(item.name == name){
                item.model = value
                item.values.push(value)
                console.log(item.values)
            }
        })
        console.log(this.technicalParametersLG)
        this.sheet = false
        this.addParametr(name, value)
    },

    createNewProduct(){
        this.newProduct.product_photoes[this.mainNumber].is_main = true
        this.newProduct.product_city = this.cityMap
        this.newProduct.product_country = this.countryMap
        this.newProduct.product_category = this.finalСategory
        this.newProduct.product_name = this.productName
        this.newProduct.product_address = this.coordsAddress
        this.newProduct.product_amount = Number(this.productAmount)
        this.newProduct.product_type = String(this.radioGroup)
        this.newProduct.product_description = this.productDescription
        this.newProduct.product_prise = Number(this.productPrice)
        this.newProduct.product_release_year = Number(this.productYear)
        this.newProduct.product_is_pickuped = this.isPickup
        this.newProduct.product_is_delivered = this.isDelivery
        this.newProduct.product_x = Number(this.coordsMap[0])
        this.newProduct.product_y = Number(this.coordsMap[1])
        this.newProduct.product_properties.forEach(item => {
            if(item.property_name == 'Бренд'){
                this.newProduct.product_brand = item.property_value
                var delB = this.newProduct.product_properties.indexOf(item)
                console.log(delB)
                this.newProduct.product_properties.splice(delB,1)
            }
        })
        let num = 0
        this.newProduct.product_properties.forEach(item =>{
            if(item.property_value == null){
                this.newProduct.product_properties.splice(num,1)
                num--
            }
            num++
        })
        localStorage.removeItem("product_properties")
        localStorage.removeItem("productCategory")
        localStorage.removeItem("productSubCategory")
        localStorage.removeItem("productName")
        localStorage.removeItem("productDescription")
        localStorage.removeItem("productPrice")
        localStorage.removeItem("productYear")
        localStorage.removeItem("productAmount")
        localStorage.removeItem("productAddress")
        localStorage.removeItem("isDelivery")
        localStorage.removeItem("isPickup")
        localStorage.removeItem("radioGroup")
        this.createProduct()
    },

    createNewDraftProduct(){
        this.newProduct.product_category = this.finalСategory
        this.newProduct.product_name = this.productName
        this.newProduct.product_properties.forEach(item => {
            if(item.property_name == 'Бренд'){
                this.newProduct.product_brand = item.property_value
                var delB = this.newProduct.product_properties.indexOf(item)
                console.log(delB)
                this.newProduct.product_properties.splice(delB,1)
            }
        })
        let num = 0
        this.newProduct.product_properties.forEach(item =>{
            if(item.property_value == null){
                this.newProduct.product_properties.splice(num,1)
                num--
            }
            num++
        })
        this.newProduct.product_is_pickuped = this.isPickup
        this.newProduct.product_is_delivered = this.isDelivery

        if(this.newProduct.product_photoes.length != 0){
            this.newProduct.product_photoes[this.mainNumber].is_main = true
        }
        if(this.cityMap != ""){
            this.newProduct.product_city = this.cityMap
        }
        if(this.countryMap != ""){
            this.newProduct.product_country = this.countryMap
        }
        if(this.coordsAddress != ""){
            this.newProduct.product_address = this.coordsAddress
        }
        if(Number(this.productAmount) >= 0){
            this.newProduct.product_amount = Number(this.productAmount)
        }
        if(String(this.radioGroup) == 0 || String(this.radioGroup) == 1){
            this.newProduct.product_type = String(this.radioGroup)
        }
        if(this.productDescription != ""){
            this.newProduct.product_description = this.productDescription
        }
        if(Number(this.productPrice) >= 0){
            this.newProduct.product_prise = Number(this.productPrice)
        }
        if(Number(this.productYear) > 0){
            this.newProduct.product_release_year = Number(this.productYear)
        }
        if(this.coordsMap.length != 0){
            this.newProduct.product_x = Number(this.coordsMap[0])
            this.newProduct.product_y = Number(this.coordsMap[1])
        }
        
        localStorage.removeItem("product_properties")
        localStorage.removeItem("productCategory")
        localStorage.removeItem("productSubCategory")
        localStorage.removeItem("productName")
        localStorage.removeItem("productDescription")
        localStorage.removeItem("productPrice")
        localStorage.removeItem("productYear")
        localStorage.removeItem("productAmount")
        localStorage.removeItem("productAddress")
        localStorage.removeItem("isDelivery")
        localStorage.removeItem("isPickup")
        localStorage.removeItem("radioGroup")
        this.createDraftProduct()
        console.log(this.newProduct)
    },

    uploadPhoto(event){
        if(event.target.files.length == 0){
            return
        }
        this.quantityPhoto = event.target.files.length
        this.selectedFilesArr = event.target.files
        this.srcImage = []
        this.srcMainImage = null
        const files = this.selectedFilesArr
        this.imgDialog = true
        Array.prototype.forEach.call(files, file => {
            this.altImage.push(file.name)
            const reader = new FileReader()
            reader.onload = ev => {
                this.srcImage.push(ev.target.result)
            }
            reader.readAsDataURL(file)
        })
        // files.forEach(file => {
        //     this.altImage.push(file.name)
        //     const reader = new FileReader()
        //     reader.onload = ev => {
        //         this.srcImage.push(ev.target.result)
        //     }
        //     reader.readAsDataURL(file)
        // })
    },

    getLinkToPhoto(){
        Array.prototype.forEach.call(this.selectedFilesArr, file => {
            this.selectedFile = file
            this.uploadPhotoPost()
        })
        // this.selectedFilesArr.forEach(file => {
        //     this.selectedFile = file
        //     this.uploadPhotoPost()
        // })
    },

    photoIsMain(src, num, alt){
        this.mainNumber = num
        this.srcMainImage = src
        this.altMainImage = alt
    },

    removePhoto(num, alt){
        if(this.altMainImage == alt){
            this.srcMainImage = null
        }
        this.selectedFilesArr = Array.from(this.selectedFilesArr)
        this.selectedFilesArr.splice(num, 1)
        this.altImage = []
        this.srcImage = []
        Array.prototype.forEach.call(this.selectedFilesArr, file => {
            this.altImage.push(file.name)
            const reader = new FileReader()
            reader.onload = ev => {
                this.srcImage.push(ev.target.result)
            }
            reader.readAsDataURL(file)
        })
        // this.selectedFilesArr.forEach(file => {
        //     this.altImage.push(file.name)
        //     const reader = new FileReader()
        //     reader.onload = ev => {
        //         this.srcImage.push(ev.target.result)
        //     }
        //     reader.readAsDataURL(file)
        // })
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
            this.newProduct.product_photoes.push(newObject)
            let i = this.newProduct.product_photoes.length
            this.newProduct.product_photoes[i-1].linq = res.data.result.photo_linq
            if(this.srcImage.length == i){
                this.loadPhoto = false
                this.imgDialog = false
            }
        }).catch((error) => {
            if(error.response.status == 401){
                this.CHANGE_UNAUTHTORISE()
                this.$router.push({name: 'authorizationForm'})
            }
            console.error(error);
        })
    },

    closeImgDialog(){
        this.imgDialog = false
    },

    addInLockalStorage(){
        localStorage.setItem("productName", this.productName)
        localStorage.setItem("productDescription", this.productDescription)
        localStorage.setItem("productPrice", this.productPrice)
        localStorage.setItem("productYear", this.productYear)
        localStorage.setItem("productAmount", this.productAmount)
        localStorage.setItem("productAddress", this.productAddress)
        localStorage.setItem("isDelivery", this.isDelivery)
        localStorage.setItem("isPickup", this.isPickup)
        localStorage.setItem("radioGroup", this.radioGroup)
    },

    cancelingAdCreation(){
        this.cancelingAdCreationDialog = false
        localStorage.removeItem("product_properties")
        localStorage.removeItem("productCategory")
        localStorage.removeItem("productSubCategory")
        localStorage.removeItem("productName")
        localStorage.removeItem("productDescription")
        localStorage.removeItem("productPrice")
        localStorage.removeItem("productYear")
        localStorage.removeItem("productAmount")
        localStorage.removeItem("productAddress")
        localStorage.removeItem("isDelivery")
        localStorage.removeItem("isPickup")
        localStorage.removeItem("radioGroup")
        this.$router.push({name: 'my-ads'})
    },

    backToAds(){
        this.$router.push({name: 'my-ads'})
    },

    backToDraftAds(){
        this.adDraftDialog = false
        this.$router.push({name: 'my-draft-ads'})
    }
  },
  created() {
    this.getCategories();
  },
  computed: {
  },
  watch: {},
};
</script>


<style lang="scss" scoped>
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
