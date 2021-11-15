<template>
  <v-sheet
    color="white"
    class="notificaiton-bar pa-8 rounded-xl my-auto"
    :class="notificationTypeClass"
    elevation="10"
  >
    <div class="text-h6 font-weight-bold">{{ notification.message }}</div>
  </v-sheet>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  computed: {
    notificationTypeClass() {
      return `text-${this.notification.type}`;
    },
  },
  mounted() {
    this.timeout = setTimeout(() => this.remove(this.notification), 2000);
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
  data() {
    return {
      timeout: null,
    };
  },
  methods: mapActions("notification", ["remove"]),
};
</script>

<style scoped>
.notification-bar {
  margin: 1em 0 1em;
  z-index: 100;
}
</style>
