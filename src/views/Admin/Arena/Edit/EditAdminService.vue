<template>
  <div>
    <div class="text-h4 pb-5">Платные услуги</div>
    <v-card color="transparent" elevation="0" class="mb-5 d-flex flex-no-wrap">
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
        <v-col>
          <v-row>
            <v-col cols="6">
              <v-text-field
                label="Название"
                v-model="service.title"
                outlined
                flat
                hide-details="auto"
                class="rounded-lg"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                solo
                v-model="service.description"
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
import axios from "axios";
import AdminImageUploader from "@/components/Admin/AdminImageUploader.vue";
import { mapState } from "vuex";
export default {
  components: {
    AdminImageUploader,
  },
  props: {
    arenaId: {
      type: String,
      required: true,
    },
    serviceId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState("arena", ["service"]),
  },
  created() {
    this.$store.dispatch("arena/getService", this.serviceId).then(() => {
      const image = this.service.profilePicture;
      this.avatar = image ? { imageURL: image } : null;
    });
  },
  data() {
    return {
      avatar: null,
    };
  },
  methods: {
    async fetchArenaServices(serviceId) {
      return new Promise((resolve, reject) => {
        axios
          .get(`http://193.187.173.125:8090/service/${serviceId}`)
          .then((response) => {
            resolve(response.data);
          })
          .catch((err) => reject(err));
      });
    },
    saveService() {
      const {
        id,
        title,
        description,
        arenaId,
        type,
        serviceType,
        length,
        width,
      } = this.service;
      const data = {
        title: title,
        description: description ? description : "",
        arenaId: arenaId,
        profilePicture: this.avatar.imageURL,
        type: type,
        serviceType: serviceType,
        length: length,
        width: width,
      };
      console.log(data, id);
      axios
        .put(`http://193.187.173.125:8090/service/${id}`, data)
        .then((response) => {
          console.log(response.data);
          this.$router.push({
            name: "edit-admin-payment-portal",
            params: { arenaId },
          });
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped></style>
