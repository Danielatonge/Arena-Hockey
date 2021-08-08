<template>
  <v-app>
    <Header /> 
    <Navbar />
    <v-main class="grey lighten-4">
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from './components/Layout/Navbar.vue'
import Header from './components/Layout/Header.vue'
import Footer from './components/Layout/Footer.vue'
import "vue-image-lightbox/dist/vue-image-lightbox.min.css";

export default {
  components: { Navbar, Header, Footer },
};
</script>

<style>
.margin-top-big {
    margin-top: 120px;
  }
@media (max-width: 600px) {
  .margin-top-big {
    margin-top: 100px;
  }
}
</style>
