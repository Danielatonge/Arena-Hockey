<template>
  <div>
    <div class="text-h6 mb-4">Контакты</div>
    <v-row>
      <v-col cols="6" class="" v-show="contact.tel.length">
        <div>Телефоны:</div>
        <div class="mt-4 my-auto" v-for="(item, i) in contact.tel" :key="i">
          <span class="mr-4 grey--text">{{ item }}</span>
        </div>
      </v-col>
      <v-col cols="6" v-show="contact.mail.length">
        <div>Почты:</div>
        <div class="mt-4 my-auto" v-for="(item, i) in contact.mail" :key="i">
          <span class="mr-4 grey--text">{{ item }}</span>
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
            contact.tel.length || contact.mail.length
              ? "Изменить контакт"
              : "Добавить контакт"
          }}
        </v-btn>
      </template>

      <v-card class="py-3">
        <v-card-title class="justify-space-between">
          <div class="text-h5 black--text">Добавить контакт</div>
          <div class="mb-4">
            <v-icon @click.stop="contact_dialog = false">mdi-close </v-icon>
          </div>
        </v-card-title>
        <v-card-text class="mb-4">
          <v-row>
            <v-col cols="12" class="text-h6 mb-n4">Телефоны</v-col>
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
            </v-col>
            <v-col class="mb-2 d-flex">
              <v-text-field
                placeholder="служба :- номер телефона"
                outlined
                flat
                dense
                autofocus
                v-model="telephone"
                hide-details="auto"
                class="rounded-lg"
                @keyup.enter="addContactTelephone"
              ></v-text-field>
              <v-icon
                class="ml-4"
                v-if="telephone.length"
                @click="addContactTelephone"
              >
                mdi-check
              </v-icon>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" class="text-h6 mb-n4">Почты</v-col>
            <v-col
              cols="12"
              class="mb-n2 my-auto"
              v-for="(item, i) in contact.mail"
              :key="i"
            >
              <span class="mr-4">{{ item }}</span>
              <v-icon class="" @click="removeMailItem(i)"> mdi-delete </v-icon>
            </v-col>
            <v-col class="mb-2 d-flex">
              <v-text-field
                placeholder="служба :- Почта"
                outlined
                flat
                v-model="email"
                dense
                hide-details="auto"
                class="rounded-lg"
                @keyup.enter="addContactMail"
              ></v-text-field>
              <v-icon class="ml-4" v-if="email.length" @click="addContactMail">
                mdi-check
              </v-icon>
            </v-col>
          </v-row>
        </v-card-text>
        <!-- <v-card-actions class="mt-n6 mx-2">
          <v-btn
            class="body-2 px-4"
            @click="contact_dialog = false"
            elevation="0"
          >
            Назад
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            elevation="0"
            color="primary"
            class="body-2 px-4"
            @click="saveContacts"
          >
            Добавить
          </v-btn>
        </v-card-actions> -->
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    contact: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      telephone: "",
      email: "",
      contact_dialog: false,
    };
  },
  methods: {
    saveContacts() {
      this.contact_dialog = false;
    },
    addContactTelephone() {
      if (this.telephone) {
        this.contact.tel.push(this.telephone);
        this.telephone = "";
      }
    },
    removeTelephoneItem(idx) {
      this.contact.tel.splice(idx, 1);
    },
    addContactMail() {
      if (this.email) {
        this.contact.mail.push(this.email);
        this.email = "";
      }
    },
    removeMailItem(idx) {
      this.contact.mail.splice(idx, 1);
    },
  },
};
</script>

<style lang="scss" scoped></style>
