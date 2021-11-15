<template>
  <div>
    <div class="text-h6">Социальные сети</div>
    <v-row class="mb-2">
      <v-col cols="6" md="12">
        <v-row>
          <v-col
            cols="12"
            sm="5"
            md="3"
            class="d-flex align-center"
            v-for="(item, i) in social_media_display"
            :key="i"
          >
            <v-btn
              elevation="0"
              x-small
              color="grey"
              height="40px"
              class="mr-2"
            >
              <v-icon>{{ item.icon }}</v-icon>
            </v-btn>
            <div>{{ item.link }}</div>
            <v-icon class="ml-4" @click="removeSocialMedia(item)">
              mdi-close
            </v-icon>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-dialog v-model="social_media_dialog" max-width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mr-2 mb-2"
          color="primary"
          large
          elevation="0"
          v-bind="attrs"
          v-on="on"
        >
          Добавить профиль соцсети
        </v-btn>
      </template>

      <v-card class="py-3">
        <v-card-title class="justify-space-between">
          <div class="text-h5 black--text">Добавить социальную сеть</div>
          <div class="mb-4">
            <v-icon @click.stop="social_media_dialog = false"
              >mdi-close
            </v-icon>
          </div>
        </v-card-title>
        <v-card-text>
          <div class="mb-6">
            <v-btn-toggle v-model="toggle_social_media" mandatory>
              <v-btn
                elevation="0"
                x-small
                color="grey"
                height="40px"
                class="mr-2"
                v-for="(item, i) in items"
                :key="i"
              >
                <v-icon> {{ item.icon }}</v-icon>
              </v-btn>
            </v-btn-toggle>
          </div>
          <div class="mb-2">
            <v-text-field
              v-model="social_media_text"
              @keyup.enter="addSocialMedia"
              label="Ссылка на социальную сеть"
              outlined
              autofocus
              :hint="errMessage"
              persistent-hint
              flat
              hide-details="auto"
              class="rounded-lg"
              ref="socialMediaText"
            >
              <template v-slot:message="{ message }">
                <span class="error--text" v-html="message"></span>
              </template>
            </v-text-field>
          </div>
        </v-card-text>
        <v-card-actions class="mt-n3">
          <v-btn
            class="body-2"
            @click="social_media_dialog = false"
            elevation="0"
          >
            Назад
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            elevation="0"
            color="primary"
            class="body-2"
            @click="addSocialMedia"
          >
            Добавить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  watch: {
    toggle_social_media() {
      this.$refs["socialMediaText"].$refs.input.focus();
    },
  },
  computed: {
    social_media_display() {
      return this.items.filter((x) => x.link);
    },
  },

  data() {
    return {
      social_media_dialog: false,
      toggle_social_media: null,
      social_media_text: "",
      errMessage: "",
    };
  },
  methods: {
    removeSocialMedia(item) {
      console.log(item);
      item.link = "";
    },
    addSocialMedia() {
      console.log(this.toggle_social_media);
      const link = this.items[this.toggle_social_media].link;
      if (link === "") {
        this.items[this.toggle_social_media].link = this.social_media_text;
        this.social_media_dialog = false;
      } else {
        this.errMessage = "Ссылка уже существует";
      }
      this.social_media_text = "";
    },
  },
};
</script>

<style lang="scss" scoped></style>
