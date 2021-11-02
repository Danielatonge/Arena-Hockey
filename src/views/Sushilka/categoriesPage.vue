<template>
  <v-container>
    <!-- <div v-if = "USER_ROLE == 'Продавец' ">
      <h1>Продавец</h1>
    </div>
    <div v-else>
      <h1>Покупатель </h1>
    </div> -->
    <v-row class="categoriesCols" v-if="showCategories == true">
      <v-col  v-for="(item, i) in categories" :key="i">
        <v-card
          :to="`/catalog/${item.en_name}`"
          max-width="344"
          tile
        >
          <div style="padding-top: 10%">
            <v-img
              style="display: block; margin: 0 auto"
              :src="`https://drive.google.com/uc?export=view&id=${item.photo}`"
              height="110px"
              width="100px"
            ></v-img>
          </div>
          <v-card-title
            style=" display: flex; align-items: center; justify-content: center; text-align: center; word-break: normal;height:80px"
          >
            {{ item.ru_name }}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="showCategories == false">
      <router-view></router-view>
    </v-row>
  </v-container>
</template>

<script>
import Axios from "axios";
import { GET_CATEGORIES } from "@/api";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {},
  name: "categoriesPage",
  props: {},
  data(){
    return{
      access_token: "",
      showCategories: true,
      categories: [],
      userRole: "",
    }
  },
  methods:{
    ...mapActions(["CHANGE_UNAUTHTORISE"]),

    async getCategories() {
      const token = localStorage.getItem('access_token')
      let category = this.categoryName 
      if(this.categoryName == undefined){
        category = ""
      }
      await Axios.get(`${GET_CATEGORIES}?categoryName=${category}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then( (res) => {
        if(res.data.result.length == 0){
          this.showCategories = false
          this.$router.push({name: 'productCatalog'})
        } else{
          this.showCategories = true
          this.categories = res.data.result
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

    myMethod(){
      this.userRole = localStorage.getItem('user_role')
      //console.log(this.userRole)
    }
  },
  created(){
    this.getCategories()
    this.myMethod();
  },
  computed: {
    ...mapGetters(["USER_ROLE"]),
    categoryName() {
      return this.$route.params.categoryName;
    },
  },
  watch:{
    '$route.params.categoryName'() {
      this.getCategories()
    }
  }
};
</script>


<style lang="scss" scoped>
.categoriesCols{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

@media (max-width: 1200px) {
  .categoriesCols{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media (max-width: 992px) {
  .categoriesCols{
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 576px) {
  .categoriesCols{
    display: grid;
    grid-template-columns: 1fr;
  }
}
</style>
