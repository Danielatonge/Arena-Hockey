<template>
  <v-tabs vertical class="pl-4 rounded-lg my-sidetabs" v-model="sidebar">
    <v-tab v-for="(item, i) in items" :key="i" :to="item.link" exact>
      {{ item.text }}
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: "VerticalSidebar",
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      sidebar: null,
    };
  },
};
</script>

<style scoped></style>
