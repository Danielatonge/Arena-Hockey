<template v-if="isLoading">
  <v-container class="pb-10">
    <v-card >
      <v-row >
          <v-col cols = "12" md = "4">
            <v-avatar class="ma-3" size="250" tile>
              <v-img
              :src="team.profilePicture"
              contain
              ></v-img>
              
              </v-avatar>
              <div class = "ml-15">Название команды <div class = "ml-7">{{team.title}} </div></div>
        
          </v-col>
        
          <v-col cols = "12" md = "7">
          <div style="font-size: 25px" class= "mb-2" >Описание</div>
          <div> {{team.description}} </div>
          <div style="font-size: 25px" class= "mt-2" >Галерея</div>
          
          <div  v-for="(photo, index) in team.gallery.slice(0, 2)"
              class = "mx-2 pb-4 inline" :key="index">
              <v-avatar size="200" tile>
              <v-img
                style="border-radius: 10%;"
                :src="photo"
              ></v-img>
              </v-avatar>              
          </div>
          <v-btn v-if="team.gallery.length > 2 && showBtn" @click="changeShowPhoto">Показать еще</v-btn>

          <div v-if="showPhoto">
            
            <div  v-for="(photo, index) in team.gallery.slice(2)"

              class = "mx-2 pb-4 inline" :key="index">
              <v-avatar size="200" tile>
              <v-img
                
                style="border-radius: 10%;"
                :src="photo"
              ></v-img>
              </v-avatar>              
            
            </div>
          
          </div>
            
            
        </v-col>
        <v-col cols = "12" md = "4">
        </v-col>
        <v-col cols = "12" md = "7">
          <div style="font-size: 25px" class= "my-5" >Социальные сети</div>
            <v-row class = "ma-5">
              
              <v-col cols = "12" md = "6">
                <img  class ="inline" src="@/assets/WhatsApp.svg" />
                <a class = "mx-3">Ссылка</a>
              </v-col>
              <v-col cols = "12" md = "6">
                <img class ="inline" src="@/assets/Instagram.svg" />
                <a class = "mx-3">Ссылка</a>
              </v-col>
              <v-col cols = "12" md = "6">
                <img class ="inline" src="@/assets/VkArena.svg" />
                <a class = "mx-3">Ссылка</a>
              </v-col>
              <v-col cols = "12" md = "6">
                <img class ="inline" src="@/assets/www.svg" />
                <a class = "mx-3">Ссылка</a>
              </v-col>
            </v-row>
        </v-col>
        
        <v-col cols = "12" md = "4">
        </v-col>
        <v-col cols = "12" md = "7">
          <div style="font-size: 25px" class= "my-5" >Арены</div>
            <v-row class = "ma-5">
              
              <v-col cols = "12" md = "6">
                <img  class ="inline" src="@/assets/WhatsApp.svg" />
                <a class = "mx-3">Ссылка</a>
              </v-col>
              <v-col cols = "12" md = "6">
                <img class ="inline" src="@/assets/VkArena.svg" />
                <a class = "mx-3">Ссылка</a>
              </v-col>
              <v-col cols = "12" md = "6">
                <img class ="inline" src="@/assets/www.svg" />
                <a class = "mx-3">Ссылка</a>
              </v-col>
            </v-row>
        </v-col>

      </v-row>
    </v-card>

  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState("team", ["team"]),
  },
  async mounted() {
    console.log(this.team)
    await this.getArenas()
    this.isLoading = true
  },
  methods: {
    async getArenas(){
     await this.$store.dispatch("team/getArenas", this.userId).then((res) => {
      console.log("arenas", res)
      })
    },
    changeShowPhoto(){
      this.showPhoto = true
      this.showBtn = false
    }
  },
  data() {
    return {
      showPhoto: false,
      showBtn: true,
      isLoading: false,
    };
  },
};
</script>
<style scoped>
  .inline{
    display:inline; float:left;
  }
</style>

