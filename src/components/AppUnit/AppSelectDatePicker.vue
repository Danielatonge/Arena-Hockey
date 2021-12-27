<template>
  <v-menu
    v-model="date_picker"
    :close-on-content-click="false"
    :nudge-left="nudgeLeft"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="dateCopied"
        prepend-inner-icon="mdi-calendar"
        readonly
        :label="label"
        outlined
        :dense="dense"
        class="rounded-lg"
        hide-details="auto"
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="dateCopied"
      @change="$emit('update:date', dateCopied)"
      @input="date_picker = false"
      locale="ru-RU"
      :first-day-of-week="1"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  props: {
    date: {
      type: String,
      required: true,
    },
    dense: {
      type: Boolean,
      required: false,
      default: true,
    },
    nudgeLeft: {
      type: Number,
      required: false,
      default: 120,
    },
    label: {
      type: String,
      required: false,
      default: "",
    },
  },
  created() {
    this.dateCopied = this.date;
  },
  data() {
    return {
      date_picker: null,
      dateCopied: "",
    };
  },
};
</script>

<style scoped></style>
