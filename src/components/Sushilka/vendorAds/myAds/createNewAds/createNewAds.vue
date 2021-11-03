<template>
  <div style="padding-top: 25px;max-width:1170px;margin:0 auto;">
    <div style="margin-top: 40px; margin-bottom: 20px">
      <v-row>
        <v-col style="padding: 0px; padding-bottom: 30px">
          <v-breadcrumbs style="padding: 0px" :items="path"></v-breadcrumbs>
        </v-col>
      </v-row>
    </div>
    <div
    style="font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 32px;
    line-height: 40px;">
      Создание объявления
    </div>

    <v-btn
    elevation="0"
    color="#0681c8"
    class="create_product_btn"
    :to="`/create-new-product`">
      <p style="margin-top:15px">Создать товар</p>
    </v-btn>

    <router-view />

  </div>
</template>

<script>
export default {
  components: {},
  name: "createNewAds",
  data() {
    return {
      path: [
        {
          text: "Сушилка",
          disabled: false,
          href: "/catalog",
        },
        {
          text: "Мои объявления",
          disabled: false,
          href: "/vendor-ads/my-ads",
        },
        {
          text: "Создание объявления",
          disabled: true,
          href: "/vendor-ads",
        },
      ],
    };
  },
  methods: {},
  created() {},
  computed: {},
  watch: {},
};
</script>


<style scoped>
.v-btn:not(.v-btn--round).v-size--default {
  height: 48px;
}

.create_product_btn{
  color: white;
  border-radius: 8px;
  border: 1px solid #83c0e4;
  box-sizing: border-box;
  margin-top: 40px;
  width: 173px;
  height: 48px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  text-align: center;
}
</style>
