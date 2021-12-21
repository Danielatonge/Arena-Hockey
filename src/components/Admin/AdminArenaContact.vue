<template>
  <div>
    <div class="text-h6 mb-4">Контакты</div>
    <v-row>
      <v-col cols="6" class="" v-show="contact.length">
        <div class="mt-4 my-auto" v-for="(item, i) in contact" :key="i">
          <span class="mr-4 grey--text">{{ item }}</span>
          <v-icon class="" @click="removeTelephoneItem(i)">
            mdi-close
          </v-icon>
        </div>
      </v-col>
    </v-row>
    <v-dialog v-model="contact_dialog" max-width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mr-2 mt-4"
          color="primary"
          large
          elevation="0"
          v-bind="attrs"
          v-on="on"
        >
          {{
            contact.length
              ? "Изменить контакты"
              : "Добавить контакты"
          }}
        </v-btn>
      </template>

      <v-card class="py-3">
        <v-card-title class="justify-space-between">
          <div class="text-h5 black--text">Добавить контакты</div>
          <div class="mb-4">
            <v-icon @click.stop="contact_dialog = false">mdi-close </v-icon>
          </div>
        </v-card-title>
        <v-card-text class="mb-4">
          <v-row>
            <!-- <v-col cols="12" class="text-h6 mb-n4">Телефоны</v-col>
            <v-col
              cols="12"
              class="mb-n2 my-auto"
              v-for="(item, i) in contact.tel"
              :key="i"
            >
              <span class="mr-4">{{ item }}</span>
              <v-icon class="" @click="removeTelephoneItem(i)">
                mdi-delete
              </v-icon>
            </v-col> -->
            <v-col class="mb-2 d-flex">
                <v-textarea
                outlined
                v-model="telephone"
                name=""
                flat
                elevation="0"
                ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="mt-n6 mx-2">
          <!-- <v-btn
            class="body-2 px-4"
            @click="contact_dialog = false"
            elevation="0"
          >
            Назад
          </v-btn> -->
          <v-spacer></v-spacer>
          <v-btn
            elevation="0"
            color="primary"
            class="body-2 px-4"
            @click="addContactTelephone"
          >
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    contact: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      telephone: "",
      contact_dialog: false,
    };
  },
  methods: {
    saveContacts() {
      this.contact_dialog = false;
    },
    addContactTelephone() {
      if (this.telephone) {
        console.log(this.contact)
        this.contact.push(this.telephone);
        console.log(this.contact)
        this.telephone = "";
        this.contact_dialog = false
      }
    },
    removeTelephoneItem(idx) {
      this.contact.splice(idx, 1);
    },
  },
};
</script>

<style lang="scss" scoped></style>
