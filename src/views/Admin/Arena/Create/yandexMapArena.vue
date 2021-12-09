<template>
  <div>
    <div id="map"></div>
  
  </div>
</template>
<script>
import { loadYmap } from "vue-yandex-maps";

export default {
  components: {},
  name: "vMap",
  props: {},
  async mounted() {
    
    const settings = {
  apiKey: '731875f2-582a-4e1d-85a2-df8b603c5136',
  lang: "ru_RU",
  coordorder: 'latlong',
  version: "2.1"
};
    await loadYmap(settings);
   /* eslint-disable */
    let myPlacemark,myMap = new ymaps.Map('map', {
            center: this.cords,
            zoom: 9,
        }, {
            searchControlProvider: 'yandex#search'
        });

    // Слушаем клик на карте.
    myMap.events.add(
      "click",
      function (e) {
        let coords = e.get("coords");
        // Если метка уже создана – просто передвигаем ее.
        if (myPlacemark) {
          myPlacemark.geometry.setCoordinates(coords);
        }
        // Если нет – создаем.
        else {
         myPlacemark = createPlacemark(coords);
         myMap.geoObjects.add(myPlacemark);
        }
       
        
        // this.getcoords(coords);
        this.$emit('coordss',coords)
        // console.log(coords)
        this.getAddress(coords,myPlacemark);
        // console.log(this.cords);
      },this
    );

    // Создание метки.
    function createPlacemark(coords) {
         /* eslint-disable */
      return new ymaps.Placemark(
        coords,
        {
          iconCaption: "Диаграмма",
        },
        {
          preset: "islands#violetDotIconWithCaption",
          draggable: true,
        }
      );
    }
  },
  methods: {
    getcoords(coords){
      this.cords = coords;
    },
    getAddress(coords,myPlacemark) {
       myPlacemark.options.set('preset','islands#blueCircleDotIconWithCaption');
        myPlacemark.properties.set('iconCaption', 'поиск...');
     /* eslint-disable */
       ymaps.geocode(coords).then( function (res) {
            var firstGeoObject = res.geoObjects.get(0);
            adress = res.geoObjects.get(0)
            console.log(res.geoObjects.get(0))
            console.log(adress)
            this.$emit('coordsAddress',firstGeoObject.getAddressLine())
           myPlacemark.properties
                .set({
                    // Формируем строку с данными об объекте.
                    iconCaption: [
                        // Название населенного пункта или вышестоящее административно-территориальное образование.
                        firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                        // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
                        firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                    ].filter(Boolean).join(', '),
                    // В качестве контента балуна задаем строку с адресом объекта.
                      balloonContent: firstGeoObject.getAddressLine(), //тут метка получает адресс
                      // adress: firstGeoObject.getAddressLine()
                
                });
                // console.log(adress)
                // console.log("adress")
                
                
                
                // console.log(adress)
                // console.log(myPlacemark)    
                // consol.log(adresss)
            //     this.adress = myPlacemark.properties    
            
        });
          
    },
  },
  data() {
    return {
      cords: [55.72, 37.65],
      myPlacemark: {},
      myMap: {},
      adress: {},
    };
  },
};
</script>

<style>
#map {
  width: 200px;
  height: 300px;
}
</style>