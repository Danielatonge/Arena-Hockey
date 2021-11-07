<template>
  <v-card elevation="0" class="pa-5">
    <div class="d-flex flex-no-wrap">
      <v-card-text class="px-0">
        <div class="body-1 grey--text">
          {{ dateFormat(forum.date) }}
        </div>
        <div class="text-h6 mb-2">{{ forum.title }}</div>
        <!-- <div class="body-2 grey--text">Участников: 19</div> -->
      </v-card-text>
      <slot name="edit-delete"></slot>
    </div>
    <div class="mb-4 text-justify">
      {{ forum.description.slice(0, 290) }}
    </div>
    <p class="bold">Необходимые требования:</p>
    <div class="d-flex mb-2">
      <!-- <div class="body-2 blue--text">Возраст: {{ forum.age }}</div>
                  <div class="body-2 blue--text ml-16">
                    Амплуа: {{ forum.role }}
                  </div> -->
      <div
        v-if="isValid(forum.role)"
        class="body-2 blue--text"
        :class="{ 'mr-16': isValid(forum.role) }"
      >
        Амплуа: {{ forum.role }}
      </div>
      <div class="body-2 blue--text" v-if="isValid(forum.grip)">
        Хват: {{ forum.grip }}
      </div>
    </div>
    <div class="d-flex">
      <!-- <div class="body-2 blue--text">Хват: {{ forum.grip }}</div>
                  <div class="body-2 blue--text ml-16">
                    Уровень: {{ forum.level }}
                  </div> -->
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    forum: {
      type: Object,
      required: true,
    },
  },

  mounted() {},
  data() {
    return {};
  },
  methods: {
    isValid(input) {
      if (input) return true;
      return false;
    },
    dateFormat(date) {
      let newDate = new Date(date);
      let formatter = new Intl.DateTimeFormat("ru", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      return formatter.format(newDate);
    },
  },
  filters: {},
  computed: {},
};
</script>

<style></style>
