<template>
  <div></div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("arena",["arena"]),
  },
  created() {},
  data() {
    return {
      name: "ArenaLeadership",
    };
  },
};
</script>

<style>
</style>