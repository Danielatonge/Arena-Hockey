<template>
  <div>
    <p class="text-h4">{{ current_arena.fullTitle }}</p>
    <p class="text-h6">Информация</p>
    <div class="ml-n2 mb-3">
      <v-chip
        color="primary"
        class="ma-2"
        label
        v-for="(tag, i) in current_arena.tags"
        :key="i"
      >
        {{ tag }}
      </v-chip>
    </div>
    <div v-if="current_arena.description.length < 580">
      <p class="text-justify">
        {{ current_arena.description }}
      </p>
    </div>
    <div v-else>
      <p class="text-justify" v-if="!readMoreInfo">
        {{ current_arena.description.slice(0, 580) + "..." }}
      </p>
      <p class="text-justify" v-else v-text="current_arena.description"></p>
    </div>
    <v-btn
      color="grey lighten-2 mb-5"
      v-show="current_arena.description.length > 580"
      elevation="0"
      @click="readMoreInfo = !readMoreInfo"
    >
      {{ readMoreInfo ? "Скрыть" : "Развернуть" }}
    </v-btn>

    <p class="text-h5 font-weight-bold mt-3">Галерея</p>
    <v-row class="mb-10">
      <v-col cols="6" md="4" lg="3" v-for="(item, i) in media" :key="i">
        <v-img
          style="height: 100px"
          :src="item.src"
          @click="openGallery(i)"
        ></v-img>
      </v-col>
      <LightBox
        ref="lightbox"
        :media="media"
        :show-caption="true"
        :show-light-box="false"
      />
    </v-row>
    <v-row>
      <v-col cols="12" md="8">
        <section class="wrapper-map" id="map">
          <a name="map" class="reset-link">
            <ArenaMap
              :coords="coords"
              :surfaces="surfaces"
              :zoom="zoom"
              @set-coords="coords = $event"
            />
          </a>
        </section>
      </v-col>
      <v-col cols="12" md="4">
        <p class="text-h6 mb-1">Адрес</p>
        <p class="blue--text">
          {{ current_arena.address }}
        </p>
        <p class="text-h6 mt-5 mb-1">Ближайшие станции метро:</p>
        <span class="mr-3" v-for="(metro, i) in current_arena.metro" :key="i">
          {{ metro }}
        </span>
        <p class="text-h6 font-weight-bold mt-10">Контакты</p>
        <div>
          <p v-if="current_arena.phones">
            <span v-for="x in current_arena.phones" :key="x">
              {{ x }} <br
            /></span>
          </p>
          <p>
            Администратор: Васильева Татьяна Михайловна <br />
            +7 495 964-39-69
          </p>
          <p>
            Email:
            {{ current_arena.mails ? current_arena.mails[0] : "" }}
            <br />
            Адрес: {{ current_arena.address }}
          </p>
          <a :href="current_arena.website" target="_blank">
            {{ current_arena.website }}
          </a>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ArenaMap from "@/components/Arena/ArenaMap";
import { mapState } from "vuex";
import LightBox from "vue-image-lightbox";

export default {
  components: {
    ArenaMap,
    LightBox,
  },
  filters: {
    descriptionLength(value) {
      if (!value) return "";
      if (value.length < 30) {
        return value;
      }
      return value.slice(0, 30) + "...";
    },
  },
  computed: {
    ...mapState(["current_arena"]),
    valid_contact_list() {
      return this.contact_list.filter((x) => x.link !== "");
    },
    media(){
      let _media = [];
      if(this.current_arena.gallery) {
        this.current_arena.gallery.forEach((x) => {
          const item = {
            thumb: x,
            src: x,
            caption: "<h4></h4>",
          }
          _media.push(item);
        });
      }
      return _media;
    },
  },
  created() {},
  methods: {
    openGallery(index) {
      this.$refs.lightbox.showImage(index);
    },
  },
  data() {
    console.log(this.$store.state);
    return {
      readMoreInfo: null,
      selectedItem: 0,
      readMoreActivated: false,

      zoom: 16,
      surfaces: [
        {
          id: "1",
          city: this.$store.state.current_arena.city,
          type: "Mediawall",
          address: this.$store.state.current_arena.address,
          coords:
            `${this.$store.state.current_arena.lat}, ` +
            `${this.$store.state.current_arena.lan}`,
        },
      ],
      coords: [
        this.$store.state.current_arena.lat,
        this.$store.state.current_arena.lan,
      ],
    };
  },
};
</script>

<style>
.border > .right-border {
  border-right: 1px solid #ccc;
}
.border:last-child .right-border {
  border-right: unset;
}
div.my-sidetabs [role="tab"] {
  justify-content: flex-start;
}

.wrapper-map {
  background-color: #ccc;
  height: 600px;
  width: 100%;
  position: relative;
  margin: 10px auto;
}
</style>