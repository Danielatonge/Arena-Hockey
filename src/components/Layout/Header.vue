<template>
  <v-container>
    <v-toolbar flat app class="my-2 ">
      <v-toolbar-side-icon class="mr-4 fix-margin-left">
        <div class="my-logo"></div>
      </v-toolbar-side-icon>
      <v-toolbar-title class="">
        <div class="text-h5">Портал любителей хоккея</div>
        <div class="text-body-2">Вся информация в одном месте</div>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <div class="d-none d-md-flex" >
        <v-text-field
          label="Поиск"
          single-line
          prepend-inner-icon="mdi-magnify"
          outlined
          dense
          hide-details="auto"
          class="rounded-lg"></v-text-field>
      

      <v-btn class="ml-4 rounded-lg fix-margin-right" height="40px" depressed color="primary">
        Личный кабинет
      </v-btn>
      </div>
    </v-toolbar>
  </v-container>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style>
.fix-margin-left {
    margin-left: -16px;
}
.fix-margin-right {
    margin-right: -16px;
}
.my-logo {
  width: 40px;
  height: 40px;
  background-color: #eaeaea;
  border-radius: 8px;
}
</style>