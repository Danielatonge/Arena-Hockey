<template>
  <div class="notificaiton-container">
    <NotificationBar
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
      class="mb-5"
    />
  </div>
</template>

<script>
import NotificationBar from "@/components/AppComposite/NotificationBar.vue";
import { mapState } from "vuex";
export default {
  components: {
    NotificationBar,
  },
  computed: mapState("notification", ["notifications"]),
};
</script>

<style scoped>
.notificaiton-container {
  position: fixed;
  bottom: 40px;
  right: 0;
  padding-right: 40px;
}
</style>
