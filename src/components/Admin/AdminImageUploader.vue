<template>
  <div>
    <!-- slot for parent component to activate the file changer -->
    <div @click="launchFilePicker()">
      <slot name="activator"></slot>
    </div>
    <!-- image input: style is set to hidden and assigned a ref so that it can be triggered -->
    <input
      type="file"
      ref="file"
      accept=".png,.jpeg,.jpg"
      :name="uploadFieldName"
      @change="onFileChange($event.target.name, $event.target.files)"
      style="display: none"
    />
    <!-- error dialog displays any potential error messages -->
    <v-dialog v-model="errorDialog" max-width="300">
      <v-card>
        <div class="text-center px-4 pt-6">{{ errorText }}</div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn elevation="0" @click="errorDialog = false" text>OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "AdminImageUploader",
  data: () => ({
    errorDialog: null,
    errorText: "",
    uploadFieldName: "file",
    maxSize: 1024,
  }),
  props: {
    value: Object,
  },
  methods: {
    launchFilePicker() {
      console.log(this.$refs.file);
      this.$refs.file.click();
    },
    onFileChange(fieldName, file) {
      console.log(file[0].name)
      const { maxSize } = this;
      let imageFile = file[0];
      if (file.length > 0) {
        let size = imageFile.size / maxSize / maxSize;
        if (!imageFile.type.match("image.*")) {
          // check whether the upload is an image
          this.errorDialog = true;
          this.errorText = "Пожалуйста, выберите файл изображения";
        } else if (size > 2) {
          // check whether the size is greater than the size limit
          this.errorDialog = true;
          this.errorText =
            "Ваш файл слишком велик! Пожалуйста, выберите изображение размером менее 2 МБ";
        } else {
          // Append file into FormData and turn file into image URL
          let formData = new FormData();

          formData.append("file", imageFile);
          this.$store.dispatch("file/uploadFile", formData).then((response) => {
            console.log(
              "🚀 ~ file: AdminImageUploader.vue ~ line 65 ~ this.$store.dispatch ~ response",
              response
            );
            this.$emit("input", {
              imageURL: response,
              name: imageFile.name,
            });
          });
          console.log(formData, imageFile.name);
        }
      }
    },
  },
};
</script>

<style></style>
