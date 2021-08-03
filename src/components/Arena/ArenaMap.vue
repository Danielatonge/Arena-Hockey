<template>
  <yandex-map
    :coords="coords"
    :controls="[]"
    :zoom="zoom"
    @map-was-initialized="initHandler"
    :options="{
      suppressMapOpenBlock: true,
      autoFitToViewport: 'always',
    }"
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
      :icon="{ content: billboard.id }"
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
    };
  },
    watch: {
    selectedSurfaces() {
      this.makeSurfaceSelected(
        this.selectedSurfaces[this.selectedSurfaces.length - 1].SURFACEID
      );
    }
  },
  methods: {
      selectedBillboard(billboard) {
      let data = {
        SURFACEID: billboard.surface_id,
        NETWORKID: billboard.networkid
      };
      return data;
    },
    makeSurfaceSelected: function(surface_id) {
      this.surfaces.forEach(surface => {
        if (surface.surface_id === surface_id) {
          surface.selected = true;
        }
      });
    },
    mapBalloon(billboard) {
      return `
      <div><h1>${billboard.id}</h1>
      <div><strong>City</strong>: ${billboard.city}</div>
      <div><strong>Address</strong>: ${billboard.address}</div>
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

