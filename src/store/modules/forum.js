import { apiForum as api } from "@/service";
export const namespaced = true;

export const state = () => ({
  forums: [],
  cities: [],
});

export const mutations = {
  SET_FORUMS(state, forums) {
    state.forums = forums;
  },
  SET_CITIES(state, cities) {
    state.cities = cities;
  },
};

export const actions = {
  getForums({ commit }) {
    api
      .getForums()
      .then((response) => {
        commit("SET_FORUMS", response.data);
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

