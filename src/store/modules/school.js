import { apiSchool as api } from "@/service";

export const namespaced = true;

export const state = () => ({
  schools: [],
  
  cities: [],
});

export const mutations = {
  SET_SCHOOLS(state, schools) {
    state.schools = schools;
  },
  SET_CITIES(state, cities) {
    state.cities = cities;
  },
};

export const actions = {
  getSchools({ commit }) {
    api
      .getSchools()
      .then((response) => {
        commit("SET_SCHOOLS", response.data);
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
};

export const getters = {};
