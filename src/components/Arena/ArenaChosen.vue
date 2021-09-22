<template>
  <div>
    <v-card class="rounded-lg" color="#fff" elevation="0">
      <div class="pointer" @click.stop="dialog = true">
        <v-card-title class="text-h6 justify-space-between">
          <div>{{ arena.title }}</div>
          <div>
            <v-icon @click.stop="removeFromSelected(arena)">mdi-close</v-icon>
          </div>
        </v-card-title>
        <v-card-subtitle>
          {{ arena.address }}
        </v-card-subtitle>
      </div>
      <div>
        <v-select
          v-model="katok"
          :items="['1', '2', '3']"
          dense
          single-line
          outlined
          hide-details
          class="pa-4"
          label="Все катки"
        ></v-select>
      </div>
    </v-card>
    <v-dialog v-model="dialog" max-width="600">
      <v-card class="py-3">
        <v-card-title class="justify-space-between">
          <div class="text-caption">Название арены, название катка</div>
          <div>
            <v-icon @click.stop="dialog = false">mdi-close</v-icon>
          </div>
        </v-card-title>
        <v-card-text>
          <div class="mt-n4 mb-2">
            <div class="text-h6 black--text">Тип аренды</div>
            <div class="text-h6">15:30 - 16:00</div>
          </div>
          <div class="mb-2">
            Ut consequat aenean orci, non aliquet gravida arcu volutpat quam
            tempus justo enim quis feugiat dui, scelerisque in quis fringilla
            etiam sit
          </div>
          <div class="mb-2">
            <div>Организатор:</div>
            <div class="text-h6 black--text">Фамилия Имя Отчество</div>
          </div>
          <div>
            <div>Стоимость участия:</div>
            <div class="text-h6 black--text">18 000 РУБ</div>
          </div>
        </v-card-text>
        <v-card-actions class="mt-n3">
          <v-btn
            class="body-2"
            color="primary"
            @click="dialog = false"
            elevation="0"
          >
            Записаться на мероприятие
          </v-btn>

          <v-btn elevation="0" class="body-2" @click="dialog = false">
            Профиль команды
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "ArenaChosen",
  props: {
    arena: Object,
  },
  data() {
    return {
      katok: "",
      dialog: false,
    };
  },
  methods: {
    removeFromSelected(arena) {
      this.$store.dispatch("removeFromSelectedArena", arena);
    },
  },
};
</script>

<style>
.pointer {
  cursor: pointer;
}
</style>
