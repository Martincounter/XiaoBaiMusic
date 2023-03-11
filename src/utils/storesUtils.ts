import { storeToRefs } from "pinia";
import { userMusicStore } from "@/stores/musicPlayer.js";
const musicStore = userMusicStore();
const { currPlayMusicUrl } = storeToRefs(musicStore);

export const updateCurrURL = (url: string) => {
  currPlayMusicUrl.value = url;
};
