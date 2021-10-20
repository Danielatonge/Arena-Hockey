<template>
  <div class="text-center py-10" v-if="show">
    <v-pagination
      color="grey"
      v-model="page"
      :length="length"
      :total-visible="7"
    ></v-pagination>
  </div>
</template>

<script>
export default {
  name: "ForumPagination",
  props: {
    page: {
      type: Number,
      required: true,
    },
    length: {
      type: Number,
      required: true,
    },
    show: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped></style>
