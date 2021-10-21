<template>
  <div class="pb-10">
    <v-row dense>
      <slot name="address"></slot>
      <slot name="search"></slot>
      <slot name="btn-find"></slot>
      <slot name="btn-schedule"></slot>
    </v-row>
    <slot name="secondrow"></slot>
  </div>
</template>

<script>
export default {
  name: "FilterBase",
};
</script>

<style scoped></style>
