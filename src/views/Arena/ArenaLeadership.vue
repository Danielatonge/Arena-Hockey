<template>
  <div></div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["current_arena"]),
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