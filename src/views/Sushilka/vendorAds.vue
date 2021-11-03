<template>
  <v-container  style="margin-left: 50px;padding-top: 25px;max-width:1170px;margin:0 auto;">
    <v-row>
      <v-col cols="4" v-for="(item, i) in ads" :key="i">
        <v-card
        tile
        class="tile"
         :to= "item.path"
         >
          <div style="padding-top: 10%">
            <v-icon
            style="display: flex; align-items: center; justify-content: center;"
            x-large>
                {{item.icon}}
            </v-icon>
          </div>

          <v-card-title
          style=" display: flex; align-items: center; justify-content: center; text-align: center; word-break: normal;height:80px">
            {{ item.title }}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  components: {},
  name: "vendorAds",
  data(){
    return{
      access_token: "",
      showCategories: true,
      ads: [
          {
              title: "Мои объявления",
              icon: "mdi-file-outline",     
              path: "/vendor-ads/my-ads" ,        
          },
          {
              title: "Черновики",
              icon: "mdi-file-edit-outline",  
              path: "/vendor-ads/my-draft-ads" ,
          },
          {
              title: "Архив",
              icon: "mdi-file-lock-outline",
              path: "/vendor-ads/my-archive-ads" ,          
          },
      ]
    }
  },
  methods:{
  },
  created(){
  },
  computed: {
  },
  watch:{
  }
};
</script>


<style lang="scss" scoped>
</style>
