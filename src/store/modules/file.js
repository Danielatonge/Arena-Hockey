import api from "@/service/fileserver";
export const namespaced = true;

export const state = () => ({});

export const mutations = {};

export const actions = {
  uploadFile(_commit, formData) {
    return api.postFile(formData).then((response) => {
      return response;
    });
  },
};

export const getters = {};
