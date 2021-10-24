<template>
  <v-btn
    class="rounded-lg"
    large
    depressed
    height="48px"
    v-on="$listeners"
    :color="color"
  >
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: false,
      default: "grey lighten-2",
    },
  },
};
</script>

<style scoped></style>
