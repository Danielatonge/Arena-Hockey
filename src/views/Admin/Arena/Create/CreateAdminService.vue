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
        { value: "massSkating", translation: "Массовое катание", url: "http://193.187.173.125:9000/image/photo_2021-12-06_11-10-27.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=3J40BS502UOD394NAFLE%2F20211206%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211206T081203Z&X-Amz-Expires=604799&X-Amz-Security-Token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiIzSjQwQlM1MDJVT0QzOTROQUZMRSIsImV4cCI6MzYwMDAwMDAwMDAwMCwicG9saWN5IjoiY29uc29sZUFkbWluIn0.NMowYfdZhwjhqk5yEPwolESjyW6gQegs7au_prR-bFqtqkmTmXI8FPeZXUmCKXvNkHazXhJLk_jVFz1a3UStHA&X-Amz-SignedHeaders=host&versionId=null&X-Amz-Signature=51792a0aef604ecbdcb88537941c3dc054edf25eea17a76a16a4c5f25eeeed30" },
        { value: "figureSkating", translation: "Фигурное катание (платные группы)", url: "http://193.187.173.125:9000/image/photo_2021-12-06_11-10-26.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=3J40BS502UOD394NAFLE%2F20211206%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211206T081215Z&X-Amz-Expires=604799&X-Amz-Security-Token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiIzSjQwQlM1MDJVT0QzOTROQUZMRSIsImV4cCI6MzYwMDAwMDAwMDAwMCwicG9saWN5IjoiY29uc29sZUFkbWluIn0.NMowYfdZhwjhqk5yEPwolESjyW6gQegs7au_prR-bFqtqkmTmXI8FPeZXUmCKXvNkHazXhJLk_jVFz1a3UStHA&X-Amz-SignedHeaders=host&versionId=null&X-Amz-Signature=1e8994a3caced77e7572519571f4fff0a2c965f0a14a9581538bae507a45794f" },
        { value: "hockeySkating", translation: "Хоккей (платные группы)", url: "http://193.187.173.125:9000/image/photo_2021-12-06_11-10-24.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=3J40BS502UOD394NAFLE%2F20211206%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211206T081226Z&X-Amz-Expires=604799&X-Amz-Security-Token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiIzSjQwQlM1MDJVT0QzOTROQUZMRSIsImV4cCI6MzYwMDAwMDAwMDAwMCwicG9saWN5IjoiY29uc29sZUFkbWluIn0.NMowYfdZhwjhqk5yEPwolESjyW6gQegs7au_prR-bFqtqkmTmXI8FPeZXUmCKXvNkHazXhJLk_jVFz1a3UStHA&X-Amz-SignedHeaders=host&versionId=null&X-Amz-Signature=26517827ffdea49f9fd3e842a36667f02dc9c11141e6a689d1b67ba25bca1122" },
        { value: "additionalTasks", translation: "Дополнительные занятия с тренером (подкатки)", url: "http://193.187.173.125:9000/image/photo_2021-12-06_11-10-21.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=3J40BS502UOD394NAFLE%2F20211206%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211206T081237Z&X-Amz-Expires=604799&X-Amz-Security-Token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiIzSjQwQlM1MDJVT0QzOTROQUZMRSIsImV4cCI6MzYwMDAwMDAwMDAwMCwicG9saWN5IjoiY29uc29sZUFkbWluIn0.NMowYfdZhwjhqk5yEPwolESjyW6gQegs7au_prR-bFqtqkmTmXI8FPeZXUmCKXvNkHazXhJLk_jVFz1a3UStHA&X-Amz-SignedHeaders=host&versionId=null&X-Amz-Signature=47f95436aedef92622aa181a0f3a7284615423fcbe5ab10c4f062ceeeac78c4d" },
        { value: "iceRental", translation: "Аренда льда", url: "http://193.187.173.125:9000/image/photo_2021-12-06_11-10-16.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=3J40BS502UOD394NAFLE%2F20211206%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211206T081258Z&X-Amz-Expires=604799&X-Amz-Security-Token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiIzSjQwQlM1MDJVT0QzOTROQUZMRSIsImV4cCI6MzYwMDAwMDAwMDAwMCwicG9saWN5IjoiY29uc29sZUFkbWluIn0.NMowYfdZhwjhqk5yEPwolESjyW6gQegs7au_prR-bFqtqkmTmXI8FPeZXUmCKXvNkHazXhJLk_jVFz1a3UStHA&X-Amz-SignedHeaders=host&versionId=null&X-Amz-Signature=233db7002226efa88c561f283fbe4205be65b99d79be31ebba292a964ece558e" },
      ],
      additionalServices:[
        { value: "gym", translation: "Спортивный зал", url: "http://193.187.173.125:9000/image/photo_2021-12-06_11-10-13.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=3J40BS502UOD394NAFLE%2F20211206%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211206T081310Z&X-Amz-Expires=604799&X-Amz-Security-Token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiIzSjQwQlM1MDJVT0QzOTROQUZMRSIsImV4cCI6MzYwMDAwMDAwMDAwMCwicG9saWN5IjoiY29uc29sZUFkbWluIn0.NMowYfdZhwjhqk5yEPwolESjyW6gQegs7au_prR-bFqtqkmTmXI8FPeZXUmCKXvNkHazXhJLk_jVFz1a3UStHA&X-Amz-SignedHeaders=host&versionId=null&X-Amz-Signature=caf8b0891345ad6a1bccf92a87a0b01517b29f2494b938ab5a61bbff918b5027" },
        { value: "cafe", translation: "Кафе", url: "http://193.187.173.125:9000/image/photo_2021-12-06_11-10-10.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=3J40BS502UOD394NAFLE%2F20211206%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211206T081321Z&X-Amz-Expires=604799&X-Amz-Security-Token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiIzSjQwQlM1MDJVT0QzOTROQUZMRSIsImV4cCI6MzYwMDAwMDAwMDAwMCwicG9saWN5IjoiY29uc29sZUFkbWluIn0.NMowYfdZhwjhqk5yEPwolESjyW6gQegs7au_prR-bFqtqkmTmXI8FPeZXUmCKXvNkHazXhJLk_jVFz1a3UStHA&X-Amz-SignedHeaders=host&versionId=null&X-Amz-Signature=e90cb538ae4b6ed5d96bb866fe2849adc9a562e08af9a4405b54b2956a1fbdd3" },
        { value: "throwingZone", translation: "Бросковая зона", url: "http://193.187.173.125:9000/image/photo_2021-12-06_11-10-08.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=3J40BS502UOD394NAFLE%2F20211206%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211206T081331Z&X-Amz-Expires=604799&X-Amz-Security-Token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiIzSjQwQlM1MDJVT0QzOTROQUZMRSIsImV4cCI6MzYwMDAwMDAwMDAwMCwicG9saWN5IjoiY29uc29sZUFkbWluIn0.NMowYfdZhwjhqk5yEPwolESjyW6gQegs7au_prR-bFqtqkmTmXI8FPeZXUmCKXvNkHazXhJLk_jVFz1a3UStHA&X-Amz-SignedHeaders=host&versionId=null&X-Amz-Signature=3c3f47262e4972b8a5971ee26c2bc1a7d72116eb65da7bdfd329efd321888b79" },
        { value: "sharpeningSkates", translation: "Заточка коньков", url: "http://193.187.173.125:9000/image/photo_2021-12-06_11-10-05.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=3J40BS502UOD394NAFLE%2F20211206%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211206T081352Z&X-Amz-Expires=604799&X-Amz-Security-Token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiIzSjQwQlM1MDJVT0QzOTROQUZMRSIsImV4cCI6MzYwMDAwMDAwMDAwMCwicG9saWN5IjoiY29uc29sZUFkbWluIn0.NMowYfdZhwjhqk5yEPwolESjyW6gQegs7au_prR-bFqtqkmTmXI8FPeZXUmCKXvNkHazXhJLk_jVFz1a3UStHA&X-Amz-SignedHeaders=host&versionId=null&X-Amz-Signature=3fa2846ded7c5827a086a1f5077a5120c7864b5cc3b17fa7236107be1bf09226" },
        { value: "wifi", translation: "Wi-Fi", url: "http://193.187.173.125:9000/image/photo_2021-12-06_11-10-03.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=3J40BS502UOD394NAFLE%2F20211206%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211206T081126Z&X-Amz-Expires=604799&X-Amz-Security-Token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiIzSjQwQlM1MDJVT0QzOTROQUZMRSIsImV4cCI6MzYwMDAwMDAwMDAwMCwicG9saWN5IjoiY29uc29sZUFkbWluIn0.NMowYfdZhwjhqk5yEPwolESjyW6gQegs7au_prR-bFqtqkmTmXI8FPeZXUmCKXvNkHazXhJLk_jVFz1a3UStHA&X-Amz-SignedHeaders=host&versionId=null&X-Amz-Signature=4264c98aee6fb8932baf59ae5330e9bc817415d5eb5392e365130d7c492e6f6c" },
      ],
      allServices: [
        { value: "massSkating", translation: "Массовое катание" },
        { value: "figureSkating", translation: "Фигурное катание (платные группы)" },
        { value: "hockeySkating", translation: "Хоккей (платные группы)" },
        { value: "additionalTasks", translation: "Дополнительные занятия с тренером (подкатки)" },
        { value: "iceRental", translation: "Аренда льда" },
        { value: "gym", translation: "Спортивный зал" },
        { value: "cafe", translation: "Кафе" },
        { value: "throwingZone", translation: "Бросковая зона" },
        { value: "sharpeningSkates", translation: "Заточка коньков" },
        { value: "wifi", translation: "Wi-Fi" },
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
