<template>
  <v-container class="pb-10">
    <AdminTeamFilter
      :team="userTeam"
      :location="cities"
      :types="types"
      :sort="sort_in"
      :display-amount="display_items"
      :fetchTeam="filterTeam"
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
    this.filterTeam();
  },
  methods: {
    filterTeam() {
      const { address, type, sort_asc, numItems, search, page } = this.userTeam;
      const filters = {
        userId: this.userId,
        city: address,
        type: type.value,
        currentPage: page,
        pageSize: numItems.value,
        queryString: search,
        sortBy: sort_asc.key,
      };
      this.$store
        .dispatch("user/filterAdminTeams", filters)
        .then(({ paginationLength, numFound }) => {
          this.userTeam.paginationLength = paginationLength;
          this.userTeam.numFound = numFound;
        });
    },
  },
  data() {
    return {
      selectedList: [],
      userTeam: {
        page: 1,
        search: "",
        paginationLength: 10,
        numFound: 0,
        numItems: { state: "Показывать по 5", value: 5 },
        sort_asc: { key: 1, value: "По именни (от А до Я)" },
        address: "Москва",
        type: { value: "ADULT", text: "Взрослая" },
      },
      cities: ["Москва", "Казань"],
      types: [
        { value: "KID", text: "Детскaя" },
        { value: "ADULT", text: "Взрослая" },
        { value: "YOUTH", text: "Юношеская" },
        { value: "FEMALE", text: "Женская" },
      ],

      sort_in: [
        { key: 1, value: "По именни (от А до Я)" },
        { key: 0, value: "По именни (от Я до А)" },
      ],
      display_items: [
        { state: "Показывать по 5", value: 5 },
        { state: "Показывать по 9", value: 9 },
        { state: "Показывать по 12", value: 12 },
        { state: "Показывать по 24", value: 24 },
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
