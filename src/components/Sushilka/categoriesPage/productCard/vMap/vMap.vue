<template>
  <div>
    <yandex-map
      ref="map"
      :coords="[this.productProp.x, this.productProp.y]"
      zoom="9"
      style="width: 680px;
height: 300px;"
      :controls="[]"
    >
      <ymap-marker
        v-for="n in marker"
        :key="n.id"
        :marker-id="n.id"
        marker-type="placemark"
        :icon="{color: 'blue', glyph: 'circle'}"
        :coords="n.coord"
        :balloon="{ body: n.text }"
      ></ymap-marker>
    </yandex-map>
  </div>
</template>

<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps'

export default {
  name: "vMap",
  components: {
    yandexMap, ymapMarker
  },
  props:{
    productProp: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      markers: [], // { coord: [55.72, 37.65], text: this.productProp.productAddress },
      
    };
  },
  methods: {
    onClick(m) {
      this.$refs.map.myMap.balloon.open(m.coord, m.text);
      
    },
  },
  created(){
   
  },
  mounted(){
    //  this.markers = [{ coord: [55.72, 37.65], text: this.productProp.productAddress }]
  },
  computed: {
    marker() {
      return [{coord:[this.productProp.x , this.productProp.y], text : this.productProp.productAddress}];
    },
  },
};
</script>

<style>
</style>