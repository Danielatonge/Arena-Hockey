<template>
  <div>
    <v-breadcrumbs :items="items" class="px-3"></v-breadcrumbs>
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
};
</script>

<style scoped></style>
