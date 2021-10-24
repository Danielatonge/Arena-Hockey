<template>
  <v-container class="pb-10">
    <AdminTeamFilter
      :team="userTeam"
      :location="location"
      :types="types"
      :sort="sort_in"
      :display-amount="display_items"
      :fetchTeam="fetchUserTeams"
    />
    <v-row dense class="mx-n4 mb-4">
      <v-col class="pa-4" cols="12" v-for="team in teamList" :key="team.id">
        <AdminTeamCard :arena-team="team"> </AdminTeamCard>
      </v-col>
    </v-row>
    <div class="mb-3" v-if="!teamList.length">
      По вашему запросу ничего не найдено.
    </div>

    <div>
      <v-btn class="rounded-lg mr-2" large depressed color="primary">
        <router-link to="/admin/sport_complex/create" class="reset-link d-flex">
          <v-icon class="mr-2">mdi-plus</v-icon>
          <div class="my-auto">Создать Команду</div>
        </router-link>
      </v-btn>
      <v-btn
        v-show="false"
        :disabled="!selectedList.length"
        class="rounded-lg ml-2"
        color="grey lighten-2"
        @click="deleteSelected"
        large
        depressed
      >
        <div class="my-auto">Удалить</div>
      </v-btn>
    </div>
  </v-container>
  <!-- <div class="text-center py-10">
    <v-pagination
      color="grey"
      v-model="page"
      :length="paginationLength"
      :total-visible="7"
    ></v-pagination>
  </div> -->
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import AdminTeamFilter from "@/components/Admin/Team/AdminTeamFilter";
import AdminTeamCard from "@/components/Admin/Team/AdminTeamCard";

export default {
  name: "AdminTeam",
  computed: {
    ...mapState(["userId"]),
  },
  components: { AdminTeamCard, AdminTeamFilter },
  mounted() {
    const userId = this.userId;
    this.fetchTeams(userId);
    this.fetchUserTeams(userId);
  },
  watch: {},
  methods: {
    fetchUserTeams(userId) {
      const { page, search, numItems, sort_asc, address, type } = this.userTeam;
      const url =
        `/user/${userId}/teams/search?city=${address}&currentPage=${page}&pageSize=${numItems.value}` +
        `&queryString=${search}&sortBy=${sort_asc.key}&type=${type.key}`;
      console.log(url);
      axios
        .get(url)
        .then((response) => {
          console.log(response.data);
          const res = response.data;
          this.userTeam.items = res.content;
          this.userTeam.paginationLength = res.totalPages;
          this.userTeam.numItems = res.totalElements;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    removeFromSelected(teamId) {
      this.selectedList = this.selectedList.filter((x) => x !== teamId);
    },
    addToSelected(teamId) {
      this.selectedList.push(teamId);
    },
    fetchTeams(userId) {
      return new Promise((resolve) => {
        axios
          .get(`/user/${userId}/teams`)
          .then((response) => {
            this.teamList = response.data;
            resolve(this.teamList);
          })
          .catch((err) => console.log(err));
      });
    },
    processTeamListObject(teamList) {
      return teamList.map((item) => item.team);
    },
    deleteSelected() {
      let promiseDeleting = [];
      this.selectedList.forEach((teamId) => {
        promiseDeleting.push(
          new Promise((resolve, reject) => {
            axios
              .delete(`/team/${teamId}`)
              .then((response) => {
                resolve(response.data);
                this.teamList = this.teamList.filter((x) => x.id !== teamId);
              })
              .catch((err) => {
                console.log(err);
                reject(err);
              });
          })
        );
      });
      Promise.all(promiseDeleting).then(() => {
        this.selectedList = [];
      });
    },
  },
  data() {
    return {
      selectedList: [],
      teamList: [],
      userTeam: {
        page: 1,
        search: "",
        paginationLength: 10,
        numItems: { state: "Показывать по 10", value: 10 },
        sort_asc: { key: 0, value: "По именни (от А до Я)" },
        address: "Москва",
        items: [],
        type: {},
      },
      types: [
        { key: 0, value: "Детские" },
        { key: 1, value: "Юношеские" },
        { key: 2, value: "Взрослые" },
        {
          key: 3,
          value: "Женские",
        },
      ],
      sort_in: [
        { key: 0, value: "По именни (от А до Я)" },
        { key: 1, value: "По именни (от Я до А)" },
      ],
      location: ["Москва"],
      display_items: [
        { state: "Показывать по 10", value: 10 },
        { state: "Показывать по 30", value: 30 },
        { state: "Показывать по 50", value: 50 },
        { state: "Показывать по 100", value: 100 },
      ],
    };
  },
};
</script>

<style>
.reset-link {
  text-decoration: none;
  color: unset !important;
}
</style>
