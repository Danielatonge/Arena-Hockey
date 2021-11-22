<template>
  <div style="padding-top: 25px;max-width:1170px;margin:0 auto;">
    <div id="map"></div>
  </div>
</template>
<script>
import { loadYmap } from "vue-yandex-maps";

export default {
  components: {},
  name: "vMap",
  props: {},

  data() {
    return {
      coordsCoords: [],
      coordsAddress: "",
      cords: [55.72, 37.65],
      anySearchControl: {},
      myPlacemark: {},
      myMap: {},
      cityMap: {},
      countryMap: {},
      searchControl: {},
      secondArray: [],
    };
  },
  async mounted() {
    const settings = {
      apiKey: "731875f2-582a-4e1d-85a2-df8b603c5136",
      lang: "ru_RU",
      coordorder: "latlong",
      version: "2.1",
    };

    await loadYmap(settings);
    /* eslint-disable */

    let myPlacemark,
      myMap = new ymaps.Map(
        "map",
        {
          center: this.cords,
          zoom: 9,
          controls: ["searchControl"],
        },
        {
          searchControlProvider: "yandex#search",
        }
      );

    this.anySearchControl = myMap.controls.get("searchControl");
    
    this.anySearchControl.events.add("resultselect", function (e) {
        this.getCoords() 
    }, this);


  },
  methods: {
    sortArray(value) {
     this.secondArray = value.filter(item => {
      return item.kind.includes('locality');
    });
    },
    getCoords() {
    this.anySearchControl.getResult(0).then(function (result) {
    this.coordsAddress = result.properties.get('address')
    if(result.properties.get('type') == "toponym"){
        this.sortArray(result.properties.get('geocoderMetaData.Address.Components'))
        this.cityMap = this.secondArray[0].name
    }
    if(result.properties.get('type') == "business"){
        this.cityMap = this.coordsAddress.split(',')[1]
    }

    this.countryMap = this.coordsAddress.split(',')[0];

    let coordsSecond = result.properties.get('boundedBy')[0][0] + result.properties.get('boundedBy')[1][0];
    let coordsSecond2 = result.properties.get('boundedBy')[0][1] + result.properties.get('boundedBy')[1][1];
    if(this.coordsCoords == 0){
        this.coordsCoords.push(coordsSecond / 2);
        this.coordsCoords.push(coordsSecond2 / 2);
    }else{
        this.coordsCoords.splice(0);
        this.coordsCoords.push(coordsSecond / 2);
        this.coordsCoords.push(coordsSecond2 / 2);
    }
    this.$emit('coordsAddress',this.coordsAddress)
    this.$emit('cityMap', this.cityMap);
    this.$emit('countryMap', this.countryMap);
    this.$emit('coords', this.coordsCoords);
    // console.log(this.coordsCoords);
    // console.log(this.coordsAddress);
    result.properties.clear;
},this)
    },
    getcoords(coords) {
      this.cords = coords;
    },
  },
};
</script>

<style>
#map {
  width: 1100px;
  height: 600px;
}
</style>