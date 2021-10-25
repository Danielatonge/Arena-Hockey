export const namespaced = true;

export const state = () => ({
  forums: [],
  cities: [],
});

export const mutations = {
  SET_FORUMS(state, forums) {
    state.forums = forums;
  },
};

export const actions = {};

export const getters = {};
