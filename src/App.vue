<template>
  <v-app>
    <Header /> 
    <Navbar />
    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from './components/Layout/Navbar.vue'
import Header from './components/Layout/Header.vue'
import Footer from './components/Layout/Footer.vue'

export default {
  components: { Navbar, Header, Footer },
};
</script>
