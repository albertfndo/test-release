import { defineStore } from "pinia";

export const useLoading = defineStore("loading", {
  state: () => ({
    isLoading: <boolean>false,
    text: <string | null>null,
  }),

  actions: {
    show(text = "Please Wait...") {
      this.isLoading = true;
      this.text = text;
    },

    hide() {
      this.isLoading = false;
    },
  },
});
