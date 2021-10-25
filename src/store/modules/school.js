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

export const actions = {};

export const getters = {};
