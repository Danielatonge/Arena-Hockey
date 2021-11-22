<template>
  <div>
    <div class="text-h4 pb-5">Платные услуги</div>
    <v-card color="transparent" elevation="0" class="mb-5">
      <v-row>
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
      </v-row>
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
import AdminImageUploader from "@/components/Admin/AdminImageUploader.vue";

export default {
  components: {
    AdminImageUploader,
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
        { value: "RENT", translation: "Аренда" },
        { value: "OTHER", translation: "Прочее" },
      ],
      item: {
        title: "",
        description: "",
        type: "",
        serviceType: { value: "RENT", translation: "Аренда" },
        length: "",
        width: "",
      },
      avatar: null,
    };
  },
  methods: {
    saveService() {
      const { title, description, type, serviceType, length, width } =
        this.item;
      const data = {
        title: title,
        description: description ? description : "",
        arenaId: this.arenaId,
        profilePicture: this.avatar ? this.avatar.imageURL : "",
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

<style scoped></style>
