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
      <v-col class="pa-4" cols="12" v-for="team in teams" :key="team.id">
        <AdminTeamCard :arena-team="team">
          <template #button="{ deleteTeam, editTeam }">
            <div class="mt-2">
              <v-btn
                class="rounded-lg mr-2"
                large
                depressed
                color="primary"
                @click.stop="editTeam"
              >
                Редактировать
              </v-btn>
              <v-btn
                class="rounded-lg mr-2"
                large
                depressed
                color="grey lighten-1"
                @click.stop="deleteTeam"
              >
                Удалить
              </v-btn>
            </div>
          </template>
        </AdminTeamCard>
      </v-col>
    </v-row>
    <div class="mb-3" v-if="!teams.length">
      По вашему запросу ничего не найдено.
    </div>

    <div>
      <v-btn
        class="rounded-lg mr-2"
        large
        depressed
        color="primary"
        @click="
          $router.push({
            name: 'admin-team-create',
            params: { userId },
          })
        "
      >
        <div class="my-auto">Создать Команду</div>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import AdminTeamFilter from "@/components/Admin/Team/AdminTeamFilter";
import AdminTeamCard from "@/components/Admin/Team/AdminTeamCard";

export default {
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState("user", ["teams"]),
  },
  components: { AdminTeamCard, AdminTeamFilter },
  mounted() {
    const userId = this.userId;
    this.fetchUserTeams(userId);
  },
  methods: {
    fetchUserTeams(userId) {
      this.$store.dispatch("user/getTeams", userId);
    },
  },
  data() {
    return {
      selectedList: [],
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
