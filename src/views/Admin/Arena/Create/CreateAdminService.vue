<template>
  <div>
    <div class="text-h4 pb-5">Платные услуги</div>
    <v-card color="transparent" elevation="0" class="mb-5 d-flex flex-no-wrap">
      <div class="mr-10 ml-5">
        <admin-image-uploader v-model="avatar">
          <div slot="activator">
            <v-avatar
              size="200px"
              v-ripple
              tile
              v-if="!avatar"
              class="grey lighten-3 mb-3 rounded-lg"
            >
              <span><v-icon large>mdi-upload</v-icon></span>
            </v-avatar>
            <v-avatar size="200px" tile v-ripple v-else class="mb-3 rounded-lg">
              <img :src="avatar.imageURL" alt="avatar" />
            </v-avatar>
          </div>
        </admin-image-uploader>
      </div>
      <v-row>
        <v-col cols="6">
          <v-text-field
            label="Название"
            v-model="item.title"
            outlined
            flat
            hide-details="auto"
            class="rounded-lg"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
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

export default {
  name: "EditAdminService",
  components: {
    AdminImageUploader,
  },
  created() {
    this.arenaId = this.$route.params.id;
  },
  data() {
    return {
      arenaId: "",
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
        profilePicture: this.avatar.imageURL,
        type: type,
        serviceType: serviceType.value,
        length: length,
        width: width,
      };
      console.log(data);
      axios
        .post(`service`, data)
        .then((response) => {
          console.log(response.data);
          this.$router.push({
            name: "edit-admin-payment-portal",
            params: { arenaId: this.arenaId },
          });
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped></style>
