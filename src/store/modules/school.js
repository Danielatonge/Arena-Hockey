import { apiSchool as api } from "@/service";

export const namespaced = true;

export const state = () => ({
  com: [],
  state: [],
  cities: [],
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
};

export const actions = {
  // getSchools({ commit }) {
  //   api
  //     .getSchools()
  //     .then((response) => {
  //       commit("SET_SCHOOLS", response.data);
  //     })
  //     .catch((err) => console.log(err));
  // },
  filterSchools({ commit }, { filters, type }) {
    return api
      .filterSchools(filters, type)
      .then((response) => {
        const res = response.data;
        if (type === 'STATE') commit("SET_STATE", res.content);
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
};

export const getters = {};
