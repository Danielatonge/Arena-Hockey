import { apiFile as api } from "@/service";
export const namespaced = true;

export const state = () => ({});

export const mutations = {};

export const actions = {
  uploadFile(_commit, formData) {
    return api.postFile(formData).then((response) => {
      return response.data.message;
    });
  },
};

export const getters = {};
