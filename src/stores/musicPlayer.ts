import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
export const userMusicStore = defineStore("music", {
  state: () => ({
    currPlayMusicUrl: "",
  }),
  persist: true,
  actions: {
    updateURL(e: string) {
      this.currPlayMusicUrl = e;
    },
  },
});
