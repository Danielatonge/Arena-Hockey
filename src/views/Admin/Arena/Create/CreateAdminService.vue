<template>
  <div>
    <div class="text-h4 pb-5">Платные услуги</div>
    <v-card color="transparent" elevation="0" class="mb-5">
      <v-row>
        <v-col cols="4">
          <v-select
          :items="serviceTypes"
          v-model="item.serviceType"
          solo
          flat
          class="my-auto"
          hide-details="auto"
          item-text="translation"
          item-value="value"
          return-object
          ></v-select>
        </v-col>
        <v-col v-if="item.serviceType.value == 'RENT'" cols="8">
          <v-select
          :items="basicServices"
          v-model="dopServices"
          solo
          flat
          class="my-auto"
          hide-details="auto"
          item-text="translation"
          item-value="value"
          return-object
          @change="saveUrl(dopServices)"
          ></v-select>
        </v-col>
        <v-col v-if="item.serviceType.value == 'OTHER'" cols="8">
          <v-select
          :items="additionalServices"
          v-model="dopServices"
          solo
          flat
          class="my-auto"
          hide-details="auto"
          item-text="translation"
          item-value="value"
          return-object
          @change="saveUrl(dopServices)"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <p class="descroption_text">Описание</p>
          <v-textarea
            solo
            v-model="item.description"
            name=""
            flat
            elevation="0"
          ></v-textarea>
        </v-col>
      </v-row>
      <!-- <v-row>
        <v-col class="pa-2" cols="6" sm="4" md="4">
          <admin-image-uploader v-model="avatar">
            <div slot="activator">
              <div v-if="!avatar" class="white rounded-xl pa-4">
                <v-avatar
                  width="100%"
                  height="200"
                  v-ripple
                  tile
                  class="white rounded-xl"
                >
                  <div class="upload-border rounded-xl pa-4">
                    <div class="my-4">
                      <v-icon large color="#379AD3"
                        >mdi-cloud-upload-outline</v-icon
                      >
                    </div>
                    <div class="body-1 mb-2 font-weight-bold">
                      Загрузите логотип
                    </div>
                    <div class="body-2 mb-4 grey--text">
                      Поддерживаемые форматы: PNG, JPG
                    </div>
                  </div>
                </v-avatar>
              </div>
              <div v-else class="white rounded-xl pa-4">
                <v-avatar width="100%" height="200" tile v-ripple>
                  <v-img
                    class="ma-10 rounded-xl"
                    :src="avatar.imageURL"
                    alt="avatar"
                    cover
                  ></v-img>
                </v-avatar>
              </div>
            </div>
          </admin-image-uploader>
        </v-col>
        <v-col cols="12" md="8">
          <v-row>
            <v-col cols="8">
              <v-text-field
                label="Название"
                v-model="item.title"
                outlined
                flat
                hide-details="auto"
                class="rounded-lg"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-select
                :items="serviceTypes"
                v-model="item.serviceType"
                solo
                flat
                class="my-auto"
                hide-details="auto"
                item-text="translation"
                item-value="value"
                return-object
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-textarea
                solo
                v-model="item.description"
                name=""
                flat
                elevation="0"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-col>
      </v-row> -->
    </v-card>
    <div>
      <v-btn
        class="px-6"
        color="primary"
        large
        elevation="0"
        @click="saveService"
      >
        Сохранить
      </v-btn>
      <v-btn
        class="px-6 ml-2 grey"
        large
        elevation="0"
        @click="
          $router.push({
            name: 'edit-admin-payment-portal',
            params: { arenaId },
          })
        "
      >
        Назад
      </v-btn>
    </div>
  </div>
</template>

<script>
// import AdminImageUploader from "@/components/Admin/AdminImageUploader.vue";

export default {
  components: {
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
  created() {},
  data() {
    return {
      serviceTypes: [
        { value: "RENT", translation: "Основные" },
        { value: "OTHER", translation: "Сопутствующие" },
      ],
      basicServices:[
        { value: "massSkating", translation: "Массовое катание", url: "http://77.73.69.230:8090/file?filename=ea11aa8f-73d4-4c64-8399-3cbff6a8b8edmassSkating.png" },
        { value: "figureSkating", translation: "Фигурное катание (платные группы)", url: "http://77.73.69.230:8090/file?filename=15c328e2-3f28-4c2f-9c21-9c525d1889c6figureSkating.png" },
        { value: "hockeySkating", translation: "Хоккей (платные группы)", url: "http://77.73.69.230:8090/file?filename=5e69049d-6a00-4e1d-a246-b5e4425a4468hockeySkating.png" },
        { value: "additionalTasks", translation: "Дополнительные занятия с тренером (подкатки)", url: "http://77.73.69.230:8090/file?filename=41c55ec8-2bab-4206-ba6c-7362acfbde81additionalTasks.png" },
        { value: "iceRental", translation: "Аренда льда", url: "http://77.73.69.230:8090/file?filename=49e4b48b-a6d5-477c-a907-e2000685c7a2iceRental.png" },
      ],
      additionalServices:[
        { value: "gym", translation: "Спортивный зал", url: "http://77.73.69.230:8090/file?filename=2c85f49b-7061-4de2-a185-274fa82e0f44gym.png" },
        { value: "cafe", translation: "Кафе", url: "http://77.73.69.230:8090/file?filename=83709e1a-f680-4d87-ba58-65c75966b7f9cafe.png" },
        { value: "throwingZone", translation: "Бросковая зона", url: "http://77.73.69.230:8090/file?filename=ac920713-5204-419c-9116-7d0ffa0b8817throwingZone.png" },
        { value: "sharpeningSkates", translation: "Заточка коньков", url: "http://77.73.69.230:8090/file?filename=01a2b387-ce43-4d04-938c-b942064ddf23sharpeningSkates.png" },
        { value: "wifi", translation: "Wi-Fi", url: "http://77.73.69.230:8090/file?filename=ac617d09-698f-480c-8f00-f6ae86191b91WiFi.png" },
      ],
      item: {
        title: "",
        description: "",
        type: "",
        serviceType: { value: "RENT", translation: "Основные" },
        length: "",
        width: "",
        url: "",
      },
      dopServices: { value: "", translation: "", url: "" },
      avatar: null,
    };
  },
  methods: {
    saveUrl(url){
      this.item.url = url.url
      this.item.title = url.translation
      // console.log(this.item.url)
      console.log(url)
    },
    saveService() {
      const { title, description, type, serviceType, length, width, url } =
        this.item;
      const data = {
        title: title,
        description: description ? description : "",
        arenaId: this.arenaId,
        profilePicture: url,
        type: type,
        serviceType: serviceType.value,
        length: length,
        width: width,
      };
      console.log(data);
      this.$store.dispatch("arena/saveService", data).then(() => {
        this.$router.push({
          name: "edit-admin-payment-portal",
          params: { arenaId: this.arenaId },
        });
      });
    },
  },
};
</script>

<style scoped>
.descroption_text{
  font-size: 20px;
}
</style>
