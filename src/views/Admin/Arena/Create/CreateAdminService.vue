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
        { value: "massSkating", translation: "Массовое катание", url: "http://minio.gr-team.ru:9000/image/massSkating.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=appsuser%2F20211206%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211206T154032Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=3e35f3cee9923626f4a26caa445d921eed5b9efe5b59bed9ce264ac2a917ff2a" },
        { value: "figureSkating", translation: "Фигурное катание (платные группы)", url: "http://minio.gr-team.ru:9000/image/figureSkating.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=appsuser%2F20211206%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211206T154032Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=5aa688c2fa73aa61567a662258793ee89277f74d83056812b0c3c35b938ad0e4" },
        { value: "hockeySkating", translation: "Хоккей (платные группы)", url: "http://minio.gr-team.ru:9000/image/hockeySkating.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=appsuser%2F20211206%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211206T154032Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=42c34d71f40db98192ceb299f3860e54fac4a7310fd891e472acf23297e8d4f3" },
        { value: "additionalTasks", translation: "Дополнительные занятия с тренером (подкатки)", url: "http://minio.gr-team.ru:9000/image/additionalTasks.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=appsuser%2F20211206%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211206T154032Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=69c39e8c205e14c6cc582c7c32e50b644572e057e8121bdedb2006e0b90e0d6a" },
        { value: "iceRental", translation: "Аренда льда", url: "http://minio.gr-team.ru:9000/image/iceRental.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=appsuser%2F20211206%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211206T154033Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=afbe81a479de9be88c92f1a55c8f6389d42f428cd505380b4965c8a3f6309963" },
      ],
      additionalServices:[
        { value: "gym", translation: "Спортивный зал", url: "http://minio.gr-team.ru:9000/image/gym.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=appsuser%2F20211206%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211206T154033Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=3e2b50e8508e60c07ebef14477040bedcdd8f8eb61efc2cd4fc93806a84cc8bd" },
        { value: "cafe", translation: "Кафе", url: "http://minio.gr-team.ru:9000/image/cafe.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=appsuser%2F20211206%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211206T154033Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=f0d94707c255a1ca86b604e417e436537c7fb9091e54a242a1b30b8f56540aa4" },
        { value: "throwingZone", translation: "Бросковая зона", url: "http://minio.gr-team.ru:9000/image/throwingZone.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=appsuser%2F20211206%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211206T154033Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=4e3d18a231471a13aa271921c0d6941ac07889972da70b6b6825e1c377a05a02" },
        { value: "sharpeningSkates", translation: "Заточка коньков", url: "http://minio.gr-team.ru:9000/image/sharpeningSkates.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=appsuser%2F20211206%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211206T154033Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=0eea7ea9d69405f7e19a9dc7359c772bbc6e57104fa7fa0c8b3a68b56ec70d17" },
        { value: "wifi", translation: "Wi-Fi", url: "http://minio.gr-team.ru:9000/image/WiFi.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=appsuser%2F20211206%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211206T154034Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=c76aa19896c99b21f765121d17c99465ec9057ba1311a0adca82e295a0f9e583" },
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
