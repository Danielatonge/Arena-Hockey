export const namespaced = true; //вызывать модуль, используя имя sushilka 

export const state = () => ({
  cartCount: 0,
  userRole: "",
  unAuthtorise: false,
});

export const mutations = {
  SET_CART_COUNT: (state, cartCount) => {
    state.cartCount = cartCount
  },
  SER_USER_ROLE: (state, userRole) => {
    state.userRole = userRole
  },
  SET_UNAUTHTORISE: (state) => {
    state.unAuthtorise = true
  },
};

export const actions = {
  CHANGE_CART_COUNT({commit}, res) {
    commit('SET_CART_COUNT', res);
  },
  CHANGE_USER_ROLE({commit}, res) {
    commit('SER_USER_ROLE', res);
  },
  CHANGE_UNAUTHTORISE({commit}) {
    commit('SET_UNAUTHTORISE');
  },
};

export const getters = {
  CART_COUNT(state){
    return state.cartCount
  },
  USER_ROLE(state){
    return state.userRole
  },
  UNAUTHTORISE(state){
    return state.unAuthtorise
  },

};