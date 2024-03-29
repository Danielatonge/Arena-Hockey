import { apiSchool as api } from "@/service";

export const namespaced = true;

export const state = () => ({
  com: [],
  state: [],
  cities: [],
  school: {},
});

export const mutations = {
  SET_COM(state, schools) {
    state.com = schools;
  },
  SET_STATE(state, schools) {
    state.state = schools;
  },
  SET_CITIES(state, cities) {
    state.cities = cities;
  },
  SET_SCHOOL(state, school) {
    state.school = school;
  },
};

export const actions = {
  filterSchools({ commit }, { filters, type }) {
    return api
      .filterSchools(filters, type)
      .then((response) => {
        const res = response.data;
        if (type === "STATE") commit("SET_STATE", res.content);
        else commit("SET_COM", res.content);
        return {
          pagination: res.totalPages,
          numFound: res.totalElements,
        };
      })
      .catch((err) => console.log(err));
  },
  getCities({ commit }) {
    return api
      .getCities()
      .then((response) => {
        commit("SET_CITIES", response.data);
        return response.data;
      })
      .catch((err) => console.log(err));
  },
  getSchool({ commit }, schoolId) {
    return api
      .getSchool(schoolId)
      .then((response) => {
        commit("SET_SCHOOL", response.data);
        return response.data;
      })
      .catch((err) => console.log(err));
  },
};

export const getters = {};
