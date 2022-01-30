<template>
  <v-tabs vertical  v-model="sidebar">
    <v-tab
      
     
      v-for="(item, i) in items"
      :key="i"
      
    >
<!-- router
      :to="item.link"
      exact-path -->
    <!-- <v-select
    
          :items="itemSelect"
          :label="item.text"
          solo
        ></v-select> -->
        <v-menu
        bottom
      :offset-y="true"
        :close-on-click="false"
      >
        <template v-slot:activator="{ on, attrs }">
          <span v-bind="attrs"
            v-on="on">{{item.text}}</span>
        </template>
  
        <v-list>
          <v-list-item
            v-for="(item, index) in itemSelect"
            :key="index"
          >
            <v-list-item-title  router  :to="item.link"  exact-path><span>{{ item.text }}</span></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-tab>

  </v-tabs>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      sidebar: null,
      itemSelect: [
          {
          text: "Информация",
          link: { name: "admin-team-test" },
        },
        {
          text: "Команда",
        //   link: { name: "user-profile", params: { userId } },
        },
        {
          text: "Заявки",
        //   link: { name: "user-profile", params: { userId } },
        },
        {
          text: "Мероприятия",
        //   link: { name: "user-profile", params: { userId } },
        },
      ]
    };
  },
};
</script>

<style scoped></style>
