<template>
    <div>
        <div>
        <v-row style="padding-top: 50px">
            <v-col 
            class="d-flex"
            cols="12"
            sm="2"
            style="padding-right: 20px;">
                <v-select
                v-model="selectCity"
                :items="cities"
                label="Город"
                solo
                flat
                @change="getCatalogProducts()"
                elevation="0"
                ></v-select>
            </v-col>
            <v-col
            class="d-flex"
            cols="12"
            sm="9"
            style="padding-right: 10px;">
                <v-text-field
                label="Поиск"
                prepend-inner-icon="mdi-magnify"
                placeholder="Поиск"
                solo
                flat
                v-model="search"
                ></v-text-field>
            </v-col>
            <v-col
            class="d-flex"
            cols="12"
            sm="1">
                <v-btn
                color="#0681C8"
                elevation="0"
                style="height: 48px; border-radius: 8px; color: #fff"
                @click="getCatalogProducts()"
                >НАЙТИ</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="11">
                <p class="text">Сушилка</p>
            </v-col>
        </v-row>
        <v-row
        class="catalog">
            <v-col
            class="menu">
                <v-row >
                    <v-col style="padding-left: 0">                        
                        <v-card
                        style="width: 100%; border-radius: 16px; padding: 0px; margin: 0; padding-top: 10px"
                        elevation="0">
                            <v-row style="margin-top: 10px; margin-bottom: 15px">
                                <v-spacer></v-spacer>
                                <v-col
                                class="d-flex"
                                cols="12"
                                sm="11">
                                    <v-checkbox
                                    @click="getCatalogProducts()"
                                    v-model="checkbox"
                                    :label="`Товар есть в наличии`"
                                    ></v-checkbox>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-spacer></v-spacer>
                                <v-col
                                class="d-flex"
                                cols="12"
                                sm="11">
                                    <p class="filter_header">Ценовой диапазон</p>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-spacer></v-spacer>
                                <v-col
                                class="d-flex"
                                cols="12"
                                sm="4">
                                    <v-text-field
                                    v-model="fromFieldPrice"
                                    @input="workingWithDateAndYearFilters('Цена')"
                                    placeholder="От"
                                    dense
                                    elevation="0"
                                    outlined
                                    ></v-text-field>
                                </v-col>
                                <v-spacer></v-spacer>
                                <v-col
                                class="d-flex"
                                cols="12"
                                sm="4">
                                    <v-text-field
                                    v-model="toFieldPrice"
                                    @input="workingWithDateAndYearFilters('Цена')"
                                    placeholder="До"
                                    dense
                                    elevation="0"
                                    outlined
                                    ></v-text-field>
                                </v-col>
                                <v-spacer></v-spacer>
                            </v-row>
                            <v-row  >
                                <v-spacer></v-spacer>
                                <v-col
                                class="d-flex"
                                cols="12"
                                sm="11">
                                    <p class="filter_header">Тип товара</p>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-spacer></v-spacer>
                                <v-col
                                class="d-flex"
                                cols="12"
                                sm="11">
                                    <v-radio-group style="padding-top: 0px; margin-top: 0px" 
                                    v-model="radioGroup"
                                    @change="getCatalogProducts()">
                                        <v-radio
                                            v-for="n in type"
                                            :key="n.value"
                                            :label="`${n.text}`"
                                            :value="n.value"
                                        ></v-radio>
                                    </v-radio-group>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-spacer></v-spacer>
                                <v-col
                                class="d-flex"
                                cols="12"
                                sm="11">
                                    <p class="filter_header">Год выпуска</p>
                                </v-col>
                            </v-row>
                            <v-row style="margin-bottom: 10px">
                                <v-spacer></v-spacer>
                                <v-col
                                class="d-flex"
                                cols="12"
                                sm="4">
                                    <v-text-field
                                        v-model="fromFieldYear"
                                        @input="workingWithDateAndYearFilters('Год выпуска')"
                                        placeholder="От"
                                        dense
                                        elevation="0"
                                        outlined
                                    ></v-text-field>
                                </v-col>
                                <v-spacer></v-spacer>
                                <v-col
                                class="d-flex"
                                cols="12"
                                sm="4">
                                    <v-text-field
                                        v-model="toFieldYear"
                                        @input="workingWithDateAndYearFilters('Год выпуска')"
                                        placeholder="До"
                                        dense
                                        elevation="0"
                                        outlined
                                    ></v-text-field>
                                </v-col>
                                <v-spacer></v-spacer>
                            </v-row>
                            <div
                            v-for="(item, i) in categoriesParameters" 
                            :key="i">
                                <v-row>
                                    <v-spacer></v-spacer>
                                    <v-col
                                    cols="11">
                                        <p class="filter_header"> {{item.name}}</p>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-spacer></v-spacer>
                                    <v-col
                                    class="d-flex"
                                    cols="12"
                                    sm="10">
                                    <div v-if="textFieldName == item.name">
                                        <v-text-field
                                        prepend-inner-icon="mdi-magnify"
                                        placeholder="Поиск"
                                        v-model="searchInFilter"
                                        outlined
                                        @click="selectTextField(item.name)"
                                        @input="searchingFiltersValues(item.name)"
                                        dense
                                        ></v-text-field> 
                                    </div>
                                    <div v-else>
                                        <v-text-field
                                        prepend-inner-icon="mdi-magnify"
                                        placeholder="Поиск"
                                        outlined
                                        @click="selectTextField(item.name)"
                                        @input="searchingFiltersValues(item.name)"
                                        dense
                                        ></v-text-field> 
                                    </div>
                                    </v-col>
                                    <v-spacer></v-spacer>
                                </v-row>
                                <v-row
                                style="margin-bottom: 10px;">
                                    <v-spacer></v-spacer>
                                    <v-col
                                    cols="11">
                                        <div v-if="item.name == searchName">
                                            <div
                                            v-for="(checkitem, c) in searchArray"
                                            :key="c">
                                                <div v-if="item.name == itemsName">
                                                    <v-checkbox
                                                    style="margin: 0; padding: 0; padding-bottom: 10px"
                                                    @click="workingWithFilters(item.name, checkitem.vName)"
                                                    color="primary"
                                                    v-model="checkitem.vVal"
                                                    :label="`${checkitem.vName}`"
                                                    hide-details
                                                    ></v-checkbox>
                                                </div>
                                                <div v-else-if="c < quantityItems ">
                                                    <v-checkbox
                                                    style="margin: 0; padding: 0; padding-bottom: 10px"
                                                    @click="workingWithFilters(item.name, checkitem.vName)"
                                                    color="primary"
                                                    v-model="checkitem.vVal"
                                                    :label="`${checkitem.vName}`"
                                                    hide-details
                                                    ></v-checkbox>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else >
                                            <div
                                            v-for="(checkitem, c) in item.values"
                                            :key="c">
                                                <div v-if="item.name == itemsName">
                                                    <v-checkbox
                                                    style="margin: 0; padding: 0; padding-bottom: 10px"
                                                    @click="workingWithFilters(item.name, checkitem.vName)"
                                                    color="primary"
                                                    v-model="checkitem.vVal"
                                                    :label="`${checkitem.vName}`"
                                                    hide-details
                                                    ></v-checkbox>
                                                </div>
                                                <div v-else-if="c < quantityItems ">
                                                    <v-checkbox
                                                    style="margin: 0; padding: 0; padding-bottom: 10px"
                                                    @click="workingWithFilters(item.name, checkitem.vName)"
                                                    color="primary"
                                                    v-model="checkitem.vVal"
                                                    :label="`${checkitem.vName}`"
                                                    hide-details
                                                    ></v-checkbox>
                                                </div>
                                            </div>
                                        </div>
                                    </v-col>
                                </v-row>
                                <v-row style="margin-bottom: 25px">
                                    <v-spacer></v-spacer>
                                    <v-col cols="11">
                                        <p class="showtitle"
                                        v-if="item.name == itemsName"
                                        @click="showAll(item.name, showName)">{{showName}}</p>
                                        <p class="showtitle"
                                        v-else
                                        @click="showAll(item.name, 'показать все')">показать все</p>
                                    </v-col>
                                </v-row>
                            </div>
                        </v-card>
                        <p
                        class="reset"
                        @click="resetFilters()">Сбросить фильтры</p>
                    </v-col>
                </v-row> 
            </v-col>
            <v-col
            class="productCards"
            style="margin: 0; padding-left: 20px ">
                <v-container style="padding-top: 0">
                    <div style="display: inline-flex; margin-top: 15px">
                        <div style="width: 305px; margin-right: 10px">
                            <v-select
                            solo
                            flat
                            :items="filterSelect"
                            @change="onChange()"
                            v-model="sortingType"
                            label="Сортировка:">
                            </v-select>
                        </div>
                        <div style="width: 160px; margin-right: 10px">
                            <v-checkbox
                            style="padding: 0; margin-top: 6px;"
                                v-model="rating_checkbox"
                                @click="getCatalogProducts()"
                                label="Сначала с лучшей оценкой"
                            ></v-checkbox>
                        </div>
                        <div style="margin-right: 10px; margin-top: 15px">
                            <p
                                style="font-family: Roboto;
                                font-style: normal;
                                font-weight: normal;
                                font-size: 12px;
                                line-height: 10px;
                                color: #757575;">
                                Найдено: {{quantity}} результатов
                            </p>
                        </div>
                        <div style="width: 205px">
                            <v-select
                            flat
                            solo
                            :items="cardCount"
                            v-model="productCount"
                            @change="getCatalogProducts()"
                            label="Выберите кол-во карточек">
                            </v-select>
                        </div>
                    </div>
                    <v-row>
                        <v-col>
                            <div v-if="isEmpty" style="margin-left: auto; margin-right: auto;">
                                <h2 class="text" style="text-align: center;">По вашему запросу ничего не найдено</h2>
                                <v-icon color="#E0E0E0" size="400px" style="display: flex; align-items: center">
                                    mdi-emoticon-cry-outline
                                </v-icon>
                            </div>
                            <div v-else>
                                <card-item
                                :products="allProducts"
                                :category="categoryName" />
                            </div>
                        </v-col>
                    </v-row>
                    <div v-if="!isEmpty" @click="getCatalogProducts()">
                        <v-pagination
                        v-model="pageNumber"
                        :length="paginationLength"
                        /> 
                    </div>
                </v-container>           
            </v-col>
        </v-row>
        </div>
        <v-snackbar v-model="show" rounded="pill">
            <template>
                <v-row>
                <v-spacer></v-spacer>
                <v-col cols="7">
                    <v-btn color="#0681C8" @click="getCatalogProducts()">Отфильтровать</v-btn>
                </v-col>
                <v-spacer></v-spacer>
                </v-row>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
import Axios from "axios";
import { GET_CATALOG_PRODUCTS, GET_CATEGORIES_PARAMETERS } from "@/api";
import CardItem from './cardItem.vue';
import { mapActions  } from "vuex";


export default {
    name: 'sushilka',
    components: {
        CardItem
    },
    props: {
    },
    data () {
      return {
        isEmpty: false,
        show: false,
        checkbox: false,
        categoriesParameters: [],
        radioGroup: 0,
        type:[
            {text: "Новый", value: 1},
            {text: "б/у", value: 2},
            {text: "Все", value: 0},
        ],
        filtersArray: [],
        fromFieldPrice: 0,
        toFieldPrice: 0,
        fromFieldYear: 0,
        toFieldYear: 0,
        quantityItems: 5,
        itemsName: "",
        showName: "показать все",
        searchInFilter: '',
        searchArray: [],
        searchName:'',
        textFieldName: "",
        searchArr: [],
        cities: [],
        selectCity: "",
        city: "",
        filterSelect: [
            { text: "Сортировка: по умолчанию", value: 0 },
            { text: "Сортировка: сначала новые", value: 1  },
            { text: "Сортировка: сначала старые", value: 2 },
            { text: "Сортировка: сначала дорогие", value: 3 },
            { text: "Сортировка: сначала дешёвые", value: 4 },
        ],
        sortingType: 0,
        rating_checkbox: false,
        cardCount: [
            { text: "Показывать по 12", value: 12 },
            { text: "Показывать по 24", value: 24 },
            { text: "Показывать по 36", value: 36 },
            { text: "Показывать по 48", value: 48 },
        ],
        productCount: 12,
        pageNumber: 1,
        allProducts: {},
        quantity: 0,
        paginationLength: 0,
        search: "",
        nullArray: [],
      }
    },
    methods:{
        ...mapActions('sushilka',["CHANGE_UNAUTHTORISE"]),

        async getCatalogProducts() {
            const categor = this.categoryName
            const token = localStorage.getItem('access_token')
            if(this.selectCity == "Все города"){
                this.city = ""
            } else{
                this.city = this.selectCity
            }
            console.log(this.sortingType)
            await Axios.post(`${GET_CATALOG_PRODUCTS}?productCategory=${categor}&searchBody=${this.search}&productCount=${this.productCount}&pageNumber=${this.pageNumber}&sortingType=${this.sortingType}&bestRatingFirst=${this.rating_checkbox}&productInStock=${this.checkbox}&productType=${this.radioGroup}&productCity=${this.city}`, this.filtersArray, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then( (res) => {
                if(res.data.result.products.length == 0){
                    this.isEmpty = true
                }
                else{
                    this.isEmpty = false
                    this.allProducts = res.data.result.products 
                }
                this.paginationLength = res.data.result.pageCount
                this.quantity = res.data.result.productCount
                this.fromFieldPrice = res.data.result.minPrise
                this.toFieldPrice = res.data.result.maxPrise
                this.fromFieldYear = res.data.result.minYear
                this.toFieldYear = res.data.result.maxYear
                this.show = false
            }).catch((error) => {
                if(error.response.status == 401){
                    this.CHANGE_UNAUTHTORISE()
                    this.$router.push({name: 'authorizationForm'})
                }
                console.error(error);
            })
        },

        resetFilters() {
            this.productCount = 12
            this.pageNumber = 1
            this.selectCity = "Все города"
            this.search = ""
            this.rating_checkbox = false
            this.checkbox = false
            this.filtersArray = []
            this.sortingType = 0
            this.radioGroup = 0
            this.categoriesParameters.forEach(item => {
                item.values.forEach(vItem => {
                    vItem.vVal = false
                })
            })
            this.getCatalogProducts()
        },

        async getCategoriesParameters() {
            const token = localStorage.getItem('access_token')
            const category = this.categoryName
            await Axios.get(`${GET_CATEGORIES_PARAMETERS}?categoryName=${category}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then( (res) => {
                res.data.result.forEach(item => {
                    if(item.name == "Город"){
                        this.cities.push("Все города")
                        item.values.forEach(itemV => {
                            this.cities.push(itemV)
                        })
                        const i = res.data.result.indexOf(item);
                        res.data.result.splice(i, 1)
                    }
                })
                let index = 0
                res.data.result.forEach(item => {
                    let newObject = {
                        name: "",
                        values: [],
                    }
                    this.categoriesParameters.push(newObject)
                    this.categoriesParameters[index].name = item.name
                    let indexV = 0
                    item.values.forEach(itemV => {
                        let vObject = {
                            vName: "",
                            vVal: false
                        }
                        this.categoriesParameters[index].values.push(vObject);
                        this.categoriesParameters[index].values[indexV].vName = itemV
                        indexV++
                    })
                    index++
                })
            }).catch((error) => {
                if(error.response.status == 401){
                    this.CHANGE_UNAUTHTORISE()
                    this.$router.push({name: 'authorizationForm'})
                }
                console.error(error);
            })
        },

        workingWithDateAndYearFilters(dataname){
            this.show = true
            this.pageNumber = 1
            if(this.filtersArray.length == 0){
                let newObject = {
                name: "",
                values: [],
                minValue: 0,
                maxValue: 0
                }
                this.filtersArray.push(newObject);
            }

            for(let i = 0; i < this.filtersArray.length; i++){
                if(this.filtersArray[i].name == "" || this.filtersArray[i].name == dataname){
                    this.filtersArray[i].name = dataname
                    if(this.filtersArray[i].name == "Цена"){
                        if( (this.fromFieldPrice == 0 && this.toFieldPrice == 0) || (this.fromFieldPrice > this.toFieldPrice) ){
                            this.filtersArray.splice(i,1)
                        } else{
                            this.filtersArray[i].minValue = this.fromFieldPrice
                            this.filtersArray[i].minValue = Number(this.filtersArray[i].minValue);
                            this.filtersArray[i].maxValue = this.toFieldPrice
                            this.filtersArray[i].maxValue = Number(this.filtersArray[i].maxValue);
                        }
                    } else if(this.filtersArray[i].name == "Год выпуска"){
                        if( (this.fromFieldYear == 0 && this.toFieldPrice == 0) || (this.fromFieldYear > this.toFieldPrice) ){
                            this.filtersArray.splice(i,1)
                        } else{
                            this.filtersArray[i].minValue = this.fromFieldYear
                            this.filtersArray[i].minValue = Number(this.filtersArray[i].minValue);
                            this.filtersArray[i].maxValue = this.toFieldYear
                            this.filtersArray[i].maxValue = Number(this.filtersArray[i].maxValue);
                        }
                    }
                    return this.filtersArray
                } else {
                    if(this.filtersArray.length == i+1){
                        let newObject = {
                            name: "",
                            values: [],
                            minValue: 0,
                            maxValue: 0
                        }
                        this.filtersArray.push(newObject); 
                        this.filtersArray[i+1].name = dataname
                        if(this.filtersArray[i+1].name == "Цена"){
                            if( (this.fromFieldPrice == 0 && this.toFieldPrice == 0) || (this.fromFieldPrice > this.toFieldPrice) ){
                            this.filtersArray.splice(i+1,1)
                            } else{
                                this.filtersArray[i+1].minValue = this.fromFieldPrice
                                this.filtersArray[i+1].minValue = Number(this.filtersArray[i+1].minValue);
                                this.filtersArray[i+1].maxValue = this.toFieldPrice
                                this.filtersArray[i+1].maxValue = Number(this.filtersArray[i+1].maxValue);
                            }
                            
                        } else if(this.filtersArray[i+1].name == "Год выпуска"){
                            if( (this.fromFieldPrice == 0 && this.toFieldPrice == 0) || (this.fromFieldYear > this.toFieldPrice) ){
                            this.filtersArray.splice(i+1,1)
                            } else{
                                this.filtersArray[i+1].minValue = this.fromFieldYear
                                this.filtersArray[i+1].minValue = Number(this.filtersArray[i+1].minValue);
                                this.filtersArray[i+1].maxValue = this.toFieldYear
                                this.filtersArray[i+1].maxValue = Number(this.filtersArray[i+1].maxValue);
                            }
                        }
                        return this.filtersArray
                    }
                }
            }
        },


        workingWithFilters(dataname, datavalue){
            this.show = true
            this.pageNumber = 1

            if(this.filtersArray.length == 0){
                let newObject = {
                name: "",
                values: [],
                minValue: 0,
                maxValue: 0
                }
                this.filtersArray.push(newObject); 
            }

            for(let i = 0; i < this.filtersArray.length; i++){
                
                if(this.filtersArray[i].name == "" || this.filtersArray[i].name == dataname){
                    if(this.filtersArray[i].values.length == 0){
                        this.filtersArray[i].name = dataname
                        this.filtersArray[i].values.push(datavalue)
                    } else {
                        if(this.filtersArray[i].values.includes(datavalue)){
                        var del = this.filtersArray[i].values.indexOf(datavalue)
                        this.filtersArray[i].values.splice(del,1)
                        if(this.filtersArray[i].values.length == 0){
                            this.filtersArray.splice(i,1)
                        }
                        } else{
                        this.filtersArray[i].name = dataname
                        this.filtersArray[i].values.push(datavalue)
                        }            
                    }
                    console.log(this.filtersArray)
                    return this.filtersArray
                } else{
                    if(this.filtersArray.length == i+1){
                        let newObject = {
                            name: "",
                            values: [],
                            minValue: 0,
                            maxValue: 0
                        }
                        this.filtersArray.push(newObject); 
                        this.filtersArray[i+1].name = dataname
                        this.filtersArray[i+1].values.push(datavalue)
                        console.log(this.filtersArray)
                        return this.filtersArray
                    }
                }
            }
        },

        onChange(){
            this.rating_checkbox = false
            this.getCatalogProducts()
        },

        showAll(data, dataShow){
            this.itemsName = data
            if(dataShow == "показать все"){
                this.showName = "скрыть"
            } else{
                this.itemsName = ""
                this.showName = "показать все"
            }
        },

        searchingFiltersValues( title ){
            this.show = true
            this.searchArray = []
            this.categoriesParameters.forEach(item => {
                if(item.name == title){
                    this.searchName = title
                    if(this.searchArr.length == 0){
                        item.values.forEach(el => {
                            this.searchArr.push(el.vName)
                        })
                    }

                    for(let i = 0; i< this.searching.length; i++){
                        let newObject = {
                            vName: "",
                            vVal: false,
                        }
                        this.searchArray.push(newObject);
                        this.searchArray[i].vName = this.searching[i]
                    }
                    this.searchArr = []
                }
            })
        },

        selectTextField(title){
            this.textFieldName = title
        },
    },
    computed: {
      categoryName() {
        return this.$route.params.categoryName;
      },
      searching(){
        return this.searchArr.filter(el => {
            return el.toLowerCase().indexOf(this.searchInFilter.toLowerCase()) !== -1
        }) 
      },
    },
    created(){
        this.getCategoriesParameters()
    },
    mounted(){
        this.getCatalogProducts()
    }
}
</script>

<style lang="scss" scoped>
.text{
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 32px;
    line-height: 40px;
    color: #202028;
}

.v-input--selection-controls .v-input__slot > .v-label, .v-input--selection-controls .v-radio > .v-label{
    color: #000;
    font-size: 14px;
    line-height: 20px;
    align-items: center;
    display: inline-flex;
    flex: 1 1 auto;
    height: auto;
}

// .v-text-field.v-text-field--enclosed .v-text-field__details {
//     padding-top: 0px;
//     margin-bottom: 8px;
//     display: none;
// }

.filter_header{
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #000000;
}

// .v-messages{
//     display: none;
// }

.v-input--selection-controls{
    margin-top: 0;
    padding-top: 0;
}

.col-12{
    padding: 0;
    margin: 0;
}

.col-11{
    padding: 0;
}

.v-text-field input {
  text-align: start;
}

.showtitle{
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 18px;
    cursor: pointer;
    color: #0681C8;
}

.reset{
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 18px;
    color: #0681C8;
    cursor: pointer;
    margin-top: 15px;
}

.catalog{
    display: grid;
    grid-template-columns: 3fr 9fr;
}

.nuv_filters_header{
    background-color: #0681C8;
    display: inline-flex;
    width: 100%;
}

.nuv_header{
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 24px;
    color: #fff;
    padding-top: 6px;
    margin: 0;
}
</style>
