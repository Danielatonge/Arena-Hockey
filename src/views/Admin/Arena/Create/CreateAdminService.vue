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
        { value: "massSkating", translation: "Массовое катание", url: "http://193.187.173.125:9000/image/massSkating.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=O2QHQLCTSDQO2DH8OBK4%2F20211206%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211206T091200Z&X-Amz-Expires=604799&X-Amz-Security-Token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiJPMlFIUUxDVFNEUU8yREg4T0JLNCIsImV4cCI6MzYwMDAwMDAwMDAwMCwicG9saWN5IjoiY29uc29sZUFkbWluIn0.-H6YYI9ONLXZhgeVgtakHvDIoJdA4yUVg9tFO_n0fg4M_dfxd8hg1-9zOz4_vE1X2jjcaBfSwBIkyF_pNEmFww&X-Amz-SignedHeaders=host&versionId=null&X-Amz-Signature=0b84be8ea47cbd0ac0241958837a93a367558f1b48f4b877b1a0193790f90e1c" },
        { value: "figureSkating", translation: "Фигурное катание (платные группы)", url: "http://193.187.173.125:9000/image/figureSkating.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=O2QHQLCTSDQO2DH8OBK4%2F20211206%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211206T091212Z&X-Amz-Expires=604799&X-Amz-Security-Token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiJPMlFIUUxDVFNEUU8yREg4T0JLNCIsImV4cCI6MzYwMDAwMDAwMDAwMCwicG9saWN5IjoiY29uc29sZUFkbWluIn0.-H6YYI9ONLXZhgeVgtakHvDIoJdA4yUVg9tFO_n0fg4M_dfxd8hg1-9zOz4_vE1X2jjcaBfSwBIkyF_pNEmFww&X-Amz-SignedHeaders=host&versionId=null&X-Amz-Signature=748193c353c043dc545c0660347eb77db2cee6affac36e9f5316419cef2ba47f" },
        { value: "hockeySkating", translation: "Хоккей (платные группы)", url: "http://193.187.173.125:9000/image/hockeySkating.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=O2QHQLCTSDQO2DH8OBK4%2F20211206%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211206T091129Z&X-Amz-Expires=604799&X-Amz-Security-Token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiJPMlFIUUxDVFNEUU8yREg4T0JLNCIsImV4cCI6MzYwMDAwMDAwMDAwMCwicG9saWN5IjoiY29uc29sZUFkbWluIn0.-H6YYI9ONLXZhgeVgtakHvDIoJdA4yUVg9tFO_n0fg4M_dfxd8hg1-9zOz4_vE1X2jjcaBfSwBIkyF_pNEmFww&X-Amz-SignedHeaders=host&versionId=null&X-Amz-Signature=34d92ae56d6cc67cc24ab519458ed69d36c0f6e5ab6d13639e9a71ceb4c5d860" },
        { value: "additionalTasks", translation: "Дополнительные занятия с тренером (подкатки)", url: "http://193.187.173.125:9000/image/additionalTasks.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=O2QHQLCTSDQO2DH8OBK4%2F20211206%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211206T091148Z&X-Amz-Expires=604799&X-Amz-Security-Token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiJPMlFIUUxDVFNEUU8yREg4T0JLNCIsImV4cCI6MzYwMDAwMDAwMDAwMCwicG9saWN5IjoiY29uc29sZUFkbWluIn0.-H6YYI9ONLXZhgeVgtakHvDIoJdA4yUVg9tFO_n0fg4M_dfxd8hg1-9zOz4_vE1X2jjcaBfSwBIkyF_pNEmFww&X-Amz-SignedHeaders=host&versionId=null&X-Amz-Signature=45f3ff0ea2b0b4a9acd95745bbc0412657d139383b6035d292377338fb4dbaea" },
        { value: "iceRental", translation: "Аренда льда", url: "http://193.187.173.125:9000/image/iceRental.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=O2QHQLCTSDQO2DH8OBK4%2F20211206%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211206T091119Z&X-Amz-Expires=604799&X-Amz-Security-Token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiJPMlFIUUxDVFNEUU8yREg4T0JLNCIsImV4cCI6MzYwMDAwMDAwMDAwMCwicG9saWN5IjoiY29uc29sZUFkbWluIn0.-H6YYI9ONLXZhgeVgtakHvDIoJdA4yUVg9tFO_n0fg4M_dfxd8hg1-9zOz4_vE1X2jjcaBfSwBIkyF_pNEmFww&X-Amz-SignedHeaders=host&versionId=null&X-Amz-Signature=24f420cb6f47f058f74f0f97265cd4238bac9929ad57b330f41886b8054b68cd" },
      ],
      additionalServices:[
        { value: "gym", translation: "Спортивный зал", url: "http://193.187.173.125:9000/image/gym.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=O2QHQLCTSDQO2DH8OBK4%2F20211206%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211206T091055Z&X-Amz-Expires=604799&X-Amz-Security-Token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiJPMlFIUUxDVFNEUU8yREg4T0JLNCIsImV4cCI6MzYwMDAwMDAwMDAwMCwicG9saWN5IjoiY29uc29sZUFkbWluIn0.-H6YYI9ONLXZhgeVgtakHvDIoJdA4yUVg9tFO_n0fg4M_dfxd8hg1-9zOz4_vE1X2jjcaBfSwBIkyF_pNEmFww&X-Amz-SignedHeaders=host&versionId=null&X-Amz-Signature=768f053f0895229088f428da31ccbf86b0f6797701f9dccc6af5091c39c46e5d" },
        { value: "cafe", translation: "Кафе", url: "http://193.187.173.125:9000/image/cafe.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=O2QHQLCTSDQO2DH8OBK4%2F20211206%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211206T091111Z&X-Amz-Expires=604799&X-Amz-Security-Token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiJPMlFIUUxDVFNEUU8yREg4T0JLNCIsImV4cCI6MzYwMDAwMDAwMDAwMCwicG9saWN5IjoiY29uc29sZUFkbWluIn0.-H6YYI9ONLXZhgeVgtakHvDIoJdA4yUVg9tFO_n0fg4M_dfxd8hg1-9zOz4_vE1X2jjcaBfSwBIkyF_pNEmFww&X-Amz-SignedHeaders=host&versionId=null&X-Amz-Signature=8c77207005dfbe685212272814368f23e4fa2b617f6682bf747976793b03ad97" },
        { value: "throwingZone", translation: "Бросковая зона", url: "http://193.187.173.125:9000/image/throwingZone.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=O2QHQLCTSDQO2DH8OBK4%2F20211206%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211206T091038Z&X-Amz-Expires=604799&X-Amz-Security-Token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiJPMlFIUUxDVFNEUU8yREg4T0JLNCIsImV4cCI6MzYwMDAwMDAwMDAwMCwicG9saWN5IjoiY29uc29sZUFkbWluIn0.-H6YYI9ONLXZhgeVgtakHvDIoJdA4yUVg9tFO_n0fg4M_dfxd8hg1-9zOz4_vE1X2jjcaBfSwBIkyF_pNEmFww&X-Amz-SignedHeaders=host&versionId=null&X-Amz-Signature=2d064eb37dec8c9265786894f6846e673b028efce9fdd166c5e9a1888e89a3ac" },
        { value: "sharpeningSkates", translation: "Заточка коньков", url: "http://193.187.173.125:9000/image/sharpeningSkates.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=O2QHQLCTSDQO2DH8OBK4%2F20211206%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211206T091046Z&X-Amz-Expires=604799&X-Amz-Security-Token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiJPMlFIUUxDVFNEUU8yREg4T0JLNCIsImV4cCI6MzYwMDAwMDAwMDAwMCwicG9saWN5IjoiY29uc29sZUFkbWluIn0.-H6YYI9ONLXZhgeVgtakHvDIoJdA4yUVg9tFO_n0fg4M_dfxd8hg1-9zOz4_vE1X2jjcaBfSwBIkyF_pNEmFww&X-Amz-SignedHeaders=host&versionId=null&X-Amz-Signature=890deb2f9d65585c552196e772b366b7c6fa489a54ff5639e124291517576a0b" },
        { value: "wifi", translation: "Wi-Fi", url: "http://193.187.173.125:9000/image/WiFi.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=O2QHQLCTSDQO2DH8OBK4%2F20211206%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211206T091026Z&X-Amz-Expires=604799&X-Amz-Security-Token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiJPMlFIUUxDVFNEUU8yREg4T0JLNCIsImV4cCI6MzYwMDAwMDAwMDAwMCwicG9saWN5IjoiY29uc29sZUFkbWluIn0.-H6YYI9ONLXZhgeVgtakHvDIoJdA4yUVg9tFO_n0fg4M_dfxd8hg1-9zOz4_vE1X2jjcaBfSwBIkyF_pNEmFww&X-Amz-SignedHeaders=host&versionId=null&X-Amz-Signature=6f49fd19c97ef4a1588c4a4c8d06b298cd9495e0daf38cc4f2a3e96e4c957048" },
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
