<template>
  <yandex-map
    :settings="settings"
    :coords="coords"
    :zoom="zoom"
    @map-was-initialized="initHandler"
    :options="{
      suppressMapOpenBlock: true,
      autoFitToViewport: 'always',
    }"
    :controls="['geolocationControl', 'zoomControl', 'trafficControl']"
    :cluster-callbacks="{ '1': { click: getDataPoint } }"
    :cluster-options="{
      1: {
        clusterDisableClickZoom: false,
        hasBalloon: false,
        clusterLayout: [
          '<div class=cluster-icon>{{ properties.geoObjects.length }}</div>',
        ].join(''),
      },
    }"
  >
    <ymap-marker
      v-for="(billboard, index) in surfaces"
      :key="index"
      :marker-id="index"
      marker-type="placemark"
      :callbacks="{ click: getDataPoint }"
      cluster-name="1"
      :balloon-template="mapBalloon(billboard)"
      :coords="billboard.coords.split(',')"
    ></ymap-marker>
  </yandex-map>
</template>

<script>
import { yandexMap, ymapMarker } from "vue-yandex-maps";

export default {
  name: "ArenaMap",
  components: {
    yandexMap,
    ymapMarker,
  },
  props: {
    surfaces: {
      type: Array,
      required: true,
    },
    coords: {
      type: Array,
      required: true,
    },
    zoom: {
      type: Number,
      default: 12,
      required: true,
    },
  },
  data() {
    return {
      map: {},
      settings: {
        apiKey: "c845f0cd-98df-40dc-9d9b-a4d580c6e230",
        lang: "ru_RU",
        coordorder: "latlong",
        enterprise: false,
        version: "2.1",
      },
    };
  },
  watch: {
    selectedSurfaces() {
      this.makeSurfaceSelected(
        this.selectedSurfaces[this.selectedSurfaces.length - 1].SURFACEID
      );
    },
  },
  methods: {
    selectedBillboard(billboard) {
      let data = {
        SURFACEID: billboard.surface_id,
        NETWORKID: billboard.networkid,
      };
      return data;
    },
    makeSurfaceSelected: function (surface_id) {
      this.surfaces.forEach((surface) => {
        if (surface.surface_id === surface_id) {
          surface.selected = true;
        }
      });
    },
    mapBalloon(billboard) {
      return `
      <div>
        <h1><a href="/arena/${billboard.id}" target="_blank" class="reset-link primary--text">${billboard.title}</a></h1>
        <div><strong>Город</strong>: ${billboard.city}</div>
        <div><strong>Адрес</strong>: ${billboard.address}</div>
      </div>
      `;
    },
    getDataPoint(obj) {
      const coords = obj.get("coords");
      this.$emit("set-coords", coords);
      this.$emit("get-data-point", coords.join());
    },
    initHandler(obj) {
      this.map = obj;

      // eslint-disable-next-line no-undef
      let mySearchControl = new ymaps.control.SearchControl({
        options: {
          noPlacemark: true,
        },
      });

      this.map.controls.add(mySearchControl);
    },
  },
};
</script>

<style scoped>
.ymap-container {
  height: 100%;
}

.cluster-icon {
  background: lime;
  color: tomato;
}
</style>
