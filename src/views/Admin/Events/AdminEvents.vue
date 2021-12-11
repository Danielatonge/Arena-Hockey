<template>
    <div>
      <div class="text-h4 mb-6">Расписание мероприятий</div>
      <!-- Мой вариант -->

        <!-- <v-row>
          <v-col>
            <v-select
            :items="allArenas"
            v-model="arenaId"
            placeholder="Арена"
            solo
            flat
            item-text="arenaTitle"
            item-value="arenaId"
            return-object
            hide-details="auto"
            ></v-select>
          </v-col>
        </v-row> -->

        <!-- Вариант Влада -->

        <v-tabs
        v-model="tab"
        background-color="#0681c8"
        corol="primary"
        color = "white"
        centered
        icons-and-text
        >
          <v-tab
          v-for="arena in allArenas"
          :key="arena.arenaId"
          @change="showArenaId(arena.arenaId)"
          >
            {{ arena.arenaTitle }}
          </v-tab>
        </v-tabs>
        
        <v-tabs-items v-model="tab">
          <v-tab-item 
          v-for="arena in allArenas"
          :key="arena.arenaId">
            <admin-schedule-event :arenaId="componentKey" :userId="userId" :key="componentKey" />
            <!-- <create-event :arenaId="componentKey" :userId="userId" :key="componentKey" /> -->
          </v-tab-item>
        </v-tabs-items>
    <div  class="rounded-lg white">
      
    </div>
    
  </div>
</template>

<script>
import Axios from "axios";
import { GET_ARENAS } from "@/api";
import AdminScheduleEvent from '../Arena/View/AdminScheduleEvent.vue';
// import CreateEvent from './CreateEvent/CreateEvent.vue';

export default {
  components: {
    AdminScheduleEvent,
    // CreateEvent,
  },
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  watch: {
  },
  computed: {
  },
  created() {
    this.getArenas()
  },
  data() {
    return {
      tab: null,
      arenaId: '',
      allArenas: [],
      componentKey: 0,
    };
  },
  methods: {
    async getArenas() {
      let id = this.userId
      await Axios.get(`${GET_ARENAS}${id}/arenas/titles`).then( (res) => {
          res.data.forEach(elem => {
            let newObject = {
              arenaId: elem.arenaId,
              arenaTitle: elem.arenaTitle,
            }
            this.allArenas.push(newObject)
            
          })
          this.componentKey = this.allArenas[0].arenaId
          console.log(this.allArenas)
      })
      .catch((error) => {
        console.error(error);
      })
    },

    showArenaId(id){
      this.componentKey = id
    }
  },
};
</script>

<style>
</style>