<template>
  <div>
    <p class="text-h4">Информация</p>
    <div class="ml-n2 mb-3">
      <v-chip
        color="primary"
        class="ma-2"
        label
        v-for="(tag, i) in arena.tags"
        :key="i"
      >
        {{ tag }}
      </v-chip>
    </div>
    <div v-if="arena.description">
      <div v-if="arena.description.length < 580">
        <p
          style="white-space: pre-line"
          class="text-justify"
          v-html="arena.description"
        ></p>
      </div>
      <div v-else>
        <p
          style="white-space: pre-line"
          class="text-justify"
          v-if="!readMoreInfo"
          v-html="arena.description.slice(0, 580) + '...'"
        ></p>
        <p
          style="white-space: pre-line"
          class="text-justify"
          v-else
          v-html="arena.description"
        ></p>
      </div>
      <v-btn
        color="grey lighten-2 mb-5"
        v-show="arena.description.length > 580"
        elevation="0"
        @click="readMoreInfo = !readMoreInfo"
      >
        {{ readMoreInfo ? "Скрыть" : "Развернуть" }}
      </v-btn>
    </div>
    <div v-if="media ? media.length : false">
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
    </div>
    <v-row>
      <v-col cols="12" md="8">
        <section class="wrapper-map">
          <ArenaMap
            :coords="coords"
            :surfaces="surfaces"
            :zoom="zoom"
            @set-coords="coords = $event"
          />
        </section>
      </v-col>
      <v-col cols="12" md="4">
        <div v-if="arena.address">
          <p class="text-h6 mb-1">Адрес</p>
          <p class="blue--text">
            {{ arena.address }}
          </p>
        </div>
        <div v-if="arena.metro ? arena.metro.length : false">
          <p class="text-h6 mt-5 mb-1">Ближайшие станции метро:</p>
          <span class="mr-3" v-for="(metro, i) in arena.metro" :key="i">
            {{ metro }}
          </span>
        </div>
        <p class="text-h6 font-weight-bold mt-10">Контакты</p>
        <div>
          <p v-if="arena.phones">
            <span v-for="x in arena.phones" :key="x"> {{ x }} <br /> </span>
          </p>
          <p v-if="arena.mails ? arena.mails.length : false">
            Email:
            {{ arena.mails ? arena.mails.toString() : "" }}
            <br />
          </p>
          <a :href="arena.website" target="_blank">
            {{ arena.website }}
          </a>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ArenaMap from "@/components/Arena/ArenaMap";
import LightBox from "vue-image-lightbox";
import { mapState } from "vuex";
export default {
  components: {
    ArenaMap,
    LightBox,
  },
  props: {
    arenaId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
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
    ...mapState("arena", ["arena"]),
    media() {
      let _media = [];
      if (this.arena.gallery) {
        this.arena.gallery.forEach((x) => {
          const item = {
            thumb: x,
            src: x,
            caption: "<h4></h4>",
          };
          _media.push(item);
        });
      }
      return _media;
    },
  },
  created() {
    const arenaId = this.arenaId;
    this.$store.dispatch("arena/getArena", arenaId);
    this.surfaces = [
      {
        id: this.arena.id,
        city: this.arena.city,
        title: this.arena.title,
        address: this.arena.address,
        coords: `${this.arena.lat}, ${this.arena.lan}`,
      },
    ];
    this.coords = [this.arena.lat, this.arena.lan];
  },
  methods: {
    openGallery(index) {
      this.$refs.lightbox.showImage(index);
    },
  },
  data() {
    return {
      readMoreInfo: null,
      selectedItem: 0,
      readMoreActivated: false,
      zoom: 16,
      surfaces: [],
      coords: [],
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
