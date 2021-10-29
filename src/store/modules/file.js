import fileApi from "@/service/fileserver";
export const namespaced = true;

export const state = () => ({
  profilePicture: "",
  gallery: [],
});

export const mutations = {
  SET_FILE(state, profileUrl) {
    state.profilePicture = profileUrl;
  },
  SET_GALLERY(state, gallery) {
    state.gallery = gallery;
  },
};

export const actions = {
  uploadFile({ commit }, formData) {
    fileApi.postFile(formData).then((response) => {
      commit("SET_FILE", response.data);
    });
  },
  setProfilePicture({ commit }, profileUrl) {
    commit("SET_FILE", profileUrl);
  },
  setGallery({ commit }, gallery) {
    commit("SET_GALLERY", gallery);
  },
};

export const getters = {};
