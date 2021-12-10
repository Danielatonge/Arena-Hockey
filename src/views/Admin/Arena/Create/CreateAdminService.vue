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
        { value: "massSkating", translation: "Массовое катание", url: "http://minio.gr-team.ru:9000/image/massSkating.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=appsuser%2F20211209%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211209T182858Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=7d52c4319398bac5e0bd47a1ac7bde4aa847ebb1a7c602ce47ffed1219a82a84" },
        { value: "figureSkating", translation: "Фигурное катание (платные группы)", url: "http://minio.gr-team.ru:9000/image/figureSkating.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=appsuser%2F20211209%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211209T183014Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=329d4af672e4e82d242f9771d1fa681bc9ecc724bd75b40f054ea9fce141d9cb" },
        { value: "hockeySkating", translation: "Хоккей (платные группы)", url: "http://minio.gr-team.ru:9000/image/hockeySkating.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=appsuser%2F20211209%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211209T182933Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=c55c476f25187cae4e5d6c7cfe610b8e3bbcf334acda10653a1498e75c035b83" },
        { value: "additionalTasks", translation: "Дополнительные занятия с тренером (подкатки)", url: "http://minio.gr-team.ru:9000/image/additionalTasks.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=appsuser%2F20211209%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211209T183045Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=7b80b628455d8783637fb3828116cae4afba8b51f0c442f095b2d022b86cce05" },
        { value: "iceRental", translation: "Аренда льда", url: "http://minio.gr-team.ru:9000/image/iceRental.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=appsuser%2F20211209%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211209T182916Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=09510bf7733593c836ac614889209be23585c8aae537ec0391333abf1290c052" },
      ],
      additionalServices:[
        { value: "gym", translation: "Спортивный зал", url: "http://minio.gr-team.ru:9000/image/gym.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=appsuser%2F20211209%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211209T182956Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=6897e2328695cdd4b1c106aa361646a77fc015c2e46da5074acceb566f65d667" },
        { value: "cafe", translation: "Кафе", url: "http://minio.gr-team.ru:9000/image/cafe.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=appsuser%2F20211209%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211209T183029Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=550a714e41b64fccab293f6c315a7c03effd20cdc70f4d781f0790e96b8b18ef" },
        { value: "throwingZone", translation: "Бросковая зона", url: "http://minio.gr-team.ru:9000/image/throwingZone.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=appsuser%2F20211209%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211209T182819Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=3c10a3f293cc060c8276aca84b7f27ad4ac78e7619ebffe8cdcc574123162ae1" },
        { value: "sharpeningSkates", translation: "Заточка коньков", url: "http://minio.gr-team.ru:9000/image/sharpeningSkates.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=appsuser%2F20211209%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211209T182838Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=d88abb3e8bfd37dd2d0ec86e6ae2e08da965174781f2878742ea144d0cced002" },
        { value: "wifi", translation: "Wi-Fi", url: "http://minio.gr-team.ru:9000/image/WiFi.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=appsuser%2F20211209%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211209T182701Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=1e9dc9a6b51c6bce2ffb80dff406e3297b1c2ebf87402c901afaf73ef4cf3156" },
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
