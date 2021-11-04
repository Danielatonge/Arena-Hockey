import { apiForum as api } from "@/service";
export const namespaced = true;

export const state = () => ({
  forums: [],
  _pteam: [],
  _tplayer: [],
  _ttrainer: [],
  _tteam: [],
  cities: [],
});

export const mutations = {
  SET_FORUMS(state, { forums, type }) {
    if (type === "TEAMPLAYER") state._tplayer = forums;
    if (type === "TEAMTRAINER") state._ttrainer = forums;
    if (type === "TRAINERTEAM") state._tteam = forums;
    if (type === "PLAYERTEAM") state._pteam = forums;
  },
  SET_CITIES(state, cities) {
    state.cities = cities;
  },
};

export const actions = {
  filterForums({ commit }, { filter, type }) {
    return api
      .filterForum({ filter, type })
      .then((response) => {
        const res = response.data;
        commit("SET_FORUMS", { forums: res.content, type });
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
