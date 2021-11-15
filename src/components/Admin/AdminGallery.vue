<template>
  <div>
    <div class="text-h6 mb-4">Галерея</div>
    <v-row class="pb-6">
      <v-col
        class="pa-2"
        cols="4"
        md="3"
        lg="2"
        v-for="(i, indx) in items"
        :key="indx"
      >
        <v-avatar
          height="160"
          width="100%"
          tile
          v-ripple
          class="mb-3 white rounded-lg"
        >
          <v-img :src="i">
            <v-container class="pa-0">
              <v-row class="ma-2">
                <div></div>
                <v-spacer></v-spacer>
                <v-btn
                  @click.stop="deleteGalleryItem(indx)"
                  x-small
                  class="rounded-lg white"
                  height="30px"
                  elevation="0"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-row>
            </v-container>
          </v-img>
        </v-avatar>
      </v-col>
    </v-row>
    <input
      type="file"
      ref="multifile"
      :name="galleryName"
      @change="selectGalleryItems($event.target.name, $event.target.files)"
      multiple
      style="display: none"
    />
    <v-btn
      class="mr-2 mb-2"
      color="primary"
      large
      elevation="0"
      @click.prevent="triggerMultiFileSelector()"
    >
      Загрузить фотографии
    </v-btn>
    <v-dialog v-model="album_dialog" max-width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mr-2 mb-2"
          large
          color="grey lighten-2"
          elevation="0"
          v-bind="attrs"
          v-on="on"
          disabled
        >
          Добавить ссылку на альбом
        </v-btn>
      </template>

      <v-card class="py-3">
        <v-card-title class="justify-space-between">
          <div class="text-h5 black--text">Добавить ссылку на альбом</div>
          <div class="mb-4">
            <v-icon @click.stop="album_dialog = false">mdi-close</v-icon>
          </div>
        </v-card-title>
        <v-card-text class="mb-4">
          <div class="mb-4">
            Добавьте ссылку на альбом в социальных сетях и фото будут
            автоматически загружатьсяна вашу страницу арены.
          </div>
          <div class="mb-2">
            <v-text-field
              label="Ссылка на альбом"
              outlined
              flat
              hide-details="auto"
              class="rounded-lg"
            ></v-text-field>
          </div>
        </v-card-text>
        <v-card-actions class="mt-n6">
          <v-btn
            class="body-2 px-4"
            @click="contact_dialog = false"
            elevation="0"
          >
            Назад
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn elevation="0" color="primary" class="body-2 px-4">
            Добавить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      galleryName: "multifile",
      album_dialog: false,
    };
  },
  methods: {
    deleteGalleryItem(index) {
      this.items.splice(index, 1);
    },
    selectGalleryItems(fieldName, files) {
      console.log(fieldName, files);
      this.files = files;
      for (let i = 0; i < files.length; i++) {
        const picture = files[i];
        let formData = new FormData();
        formData.append("file", picture);
        axios
          .post("https://file-hockey.herokuapp.com/file/upload", formData)
          .then((response) => {
            console.log(response.data);
            this.items.push(response.data.url);
          });
      }
    },
    triggerMultiFileSelector() {
      console.log(this.$refs.multifile);
      this.$refs.multifile.click();
    },
  },
};
</script>

<style lang="scss" scoped></style>
