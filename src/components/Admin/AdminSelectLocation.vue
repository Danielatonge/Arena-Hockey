<template>
  <div>
    <div class="mb-6">
      <div class="text-h6 mb-2">Адрес</div>
      <v-text-field
        v-model="address"
        outlined
        flat
        disabled
        hide-details="auto"
        class="rounded-lg"
      ></v-text-field>
    </div>
    <div class="mb-8">
      <v-row>
        <v-col>
          <v-sheet height="350px">
            <yandex-map
              :settings="settings"
              :coords="coords"
              zoom="16"
              style="width: 100%; height: 100%"
              @map-was-initialized="initHandler"
              :controls="[
                'geolocationControl',
                'zoomControl',
                'trafficControl',
              ]"
            >
              <ymap-marker
                v-for="(billboard, index) in surfaces"
                :key="index"
                :marker-id="index"
                marker-type="placemark"
                :coords="billboard.coords"
              ></ymap-marker>
            </yandex-map>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-row>
            <v-col class="d-flex" cols="12" md="3">
              <v-select
                :items="cities"
                :value="city"
                solo
                flat
                disabled
                class="my-auto"
                hide-details="auto"
              ></v-select>
            </v-col>
            <v-col class="d-flex pr-0" cols="12" md="9">
              <v-select
                label="Метро"
                :items="mettro"
                :value="metro"
                @input="updateMetro"
                solo
                flat
                multiple
                disabled
                chips
                attach
                class="my-auto"
                hide-details="auto"
              ></v-select>
            </v-col>
          </v-row>
          <!-- <v-row>
            <v-col class="d-flex">
              <v-text-field
                label="Широта"
                outlined
                :value="coordinate.lat"
                disabled
                flat
                hide-details="auto"
                class="rounded-lg mr-3"
              ></v-text-field>
              <v-text-field
                label="Долгота"
                outlined
                disabled
                :value="coordinate.lon"
                flat
                hide-details="auto"
                class="rounded-lg ml-3"
              ></v-text-field>
            </v-col>
          </v-row> -->
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { yandexMap, ymapMarker } from "vue-yandex-maps";
import metros from "@/utils/metros";
import cities from "@/utils/cities";
export default {
  components: {
    yandexMap,
    ymapMarker,
  },
  props: {
    address: { type: String, required: true },
    city: {
      type: String,
      required: true,
    },
    coordinate: {
      type: Object,
      required: true,
    },
    metro: {
      type: Array,
      required: true,
    },
  },
  computed: {
    surfaces() {
      return [
        {
          id: "1",
          city: this.city,
          address: this.address,
          coords: this.coords,
        },
      ];
    },
    coords() {
      return [this.coordinate.lat, this.coordinate.lon];
    },
  },
  data() {
    return {
      settings: {
        apiKey: "c845f0cd-98df-40dc-9d9b-a4d580c6e230",
        lang: "ru_RU",
        coordorder: "latlong",
        version: "2.1",
      },
      cities: cities,
      mettro: metros,
      placeMark: null,
    };
  },
  methods: {
    initHandler(obj) {
      this.map = obj;

      // eslint-disable-next-line no-undef
      let mySearchControl = new ymaps.control.SearchControl({
        options: {
          noPlacemark: true,
        },
      });

      this.map.controls.add(mySearchControl);

      this.map.events.add("click", (e) => {
        let coords = e.get("coords");
        console.log(coords);
        this.map.geoObjects.removeAll();
        this.getMetroByCoord(coords);
        this.assignCoordinates(coords);

        if (this.placeMark) {
          this.placeMark.geometry.setCoordinates(coords);
        } else {
          this.placeMark = this.createPlacemark(coords);

          this.map.geoObjects.add(this.placeMark);
          this.placeMark.events.add("dragend", () => {
            this.getAddress(
              this.placeMark.geometry.getCoordinates(),
              this.placeMark
            );
          });
        }
        this.getAddress(coords, this.placeMark);
      });
    },

    getMetroByCoord(coords) {
      // eslint-disable-next-line no-undef
      ymaps
        .geocode(coords, {
          // Ищем только станции метро.
          kind: "metro",
          // Запрашиваем не более 20 результатов.
          results: 3,
        })
        .then((res) => {
          res.geoObjects.options.set("preset", "islands#redCircleIcon");
          console.log(res.geoObjects.get(0).getAddressLine());
          let metros = new Set();
          res.geoObjects.each((metro) => {
            metros.add(
              metro.getAddressLine().split(",").pop().replace(" метро ", "")
            );
          });
          console.log(metros);
          this.$emit("update-metro", Array.from(metros));

          // Добавляем коллекцию найденных геообъектов на карту.
          this.map.geoObjects.add(res.geoObjects);
        });
    },
    createPlacemark(coords) {
      // eslint-disable-next-line no-undef
      return new ymaps.Placemark(
        coords,
        {
          iconCaption: "поиск...",
        },
        {
          preset: "islands#violetDotIconWithCaption",
          draggable: true,
        }
      );
    },

    // Определяем адрес по координатам (обратное геокодирование).
    getAddress(coords, myPlaceMark) {
      myPlaceMark.properties.set("iconCaption", "поиск...");

      // eslint-disable-next-line no-undef
      ymaps.geocode(coords).then((res) => {
        var firstGeoObject = res.geoObjects.get(0);

        this.$emit("update-address", firstGeoObject.getAddressLine());
        const city = firstGeoObject.getLocalities().length
          ? firstGeoObject.getLocalities()
          : "";
        this.$emit("update-city", city[0]);
        console.log(city[0]);
        myPlaceMark.properties.set({
          // Формируем строку с данными об объекте.
          iconCaption: [
            // Название населенного пункта или вышестоящее административно-территориальное образование.
            firstGeoObject.getLocalities().length
              ? firstGeoObject.getLocalities()
              : firstGeoObject.getAdministrativeAreas(),
            // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
            firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
          ]
            .filter(Boolean)
            .join(", "),
          // В качестве контента балуна задаем строку с адресом объекта.
          balloonContent: firstGeoObject.getAddressLine(),
        });
      });
    },

    assignCoordinates(coords) {
      const coordinate = {
        lat: coords[0].toString(),
        lon: coords[1].toString(),
      };
      this.$emit("update-coords", coordinate);
    },
    updateMetro(event) {
      this.$emit("update-metro", event);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>