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
import Navbar from './components/Navbar.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  components: { Navbar, Header, Footer },
};
</script>
