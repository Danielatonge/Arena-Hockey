<template>
  <v-select
    :items="items"
    v-model="valueCopied"
    solo
    flat
    hide-details="auto"
    @change="$emit('update:value', valueCopied)"
  ></v-select>
</template>

<script>
export default {
  name: "SimpleSelect",
  props: {
    items: {
      type: Array,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  created() {
    this.valueCopied = this.value;
  },
  data() {
    return {
      valueCopied: "",
    };
  },
};
</script>

<style scoped></style>
