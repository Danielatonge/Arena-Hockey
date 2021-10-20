<template>
  <div class="">
    <div class="text-h6 mb-2" style="position: relative">
      <span class="mr-3 text-h5 font-weight-bold"> {{ event.title }}</span>
      <span v-for="(i, indx) in processChoosenDays(event.days)" :key="indx">
        <v-chip class="mx-1" color="primary"> {{ i }} </v-chip>
      </span>
      <slot name="edit-delete" />
    </div>
    <div class="body-1 blue--text mb-2">
      {{ event.type }}
    </div>
    <div class="grey--text lighten-3--text body-1 mb-2">
      {{ event.startDate }} -:- {{ event.endDate }}
    </div>
    <div>
      {{ event.description | descriptionLength }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ArenaEventCard",
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  filters: {
    descriptionLength(value) {
      if (!value) return "";
      if (value.length < 100) {
        return value;
      }
      return value.slice(0, 100) + "...";
    },
  },
  methods: {
    processChoosenDays(indexArray) {
      return indexArray.map((day) => {
        if (day === 1) return "понедельник";
        if (day === 2) return "вторник";
        if (day === 3) return "среда";
        if (day === 4) return "четверг";
        if (day === 5) return "пятница";
        if (day === 6) return "суббота";
        if (day === 0) return "воскресенье";
      });
    },
  },
};
</script>

<style scoped></style>
