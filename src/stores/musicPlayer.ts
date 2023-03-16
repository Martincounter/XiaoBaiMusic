import { defineStore } from "pinia";
import type { musicState, musicStatus } from "@/utils/type/musicStoreType";
export const userMusicStore = defineStore("music", {
  state: () => ({
    currPlay: {
      // 当前播放歌曲信息
      id: "",
      url: "",
      imgUrl: "",
      musicName: "",
    },
    currPlayList: [], // 当前播放歌单
    currPlayListStatus: {
      isPlay: false, // 播放状态
      listId: "", // 歌单id用来判断是否需要更新歌单状态
    },
  }),
  persist: true,
  actions: {
    updatePlay(play: boolean) {
      this.currPlayListStatus.isPlay = play;
    },
    updateMusic(e: musicState) {
      this.currPlay = e;
    },
    updateMusics(e: musicState, i: [], z: musicStatus) {
      this.currPlay = e;
      if (z.listId != this.currPlayListStatus.listId) {
        this.currPlayList = i;
      }
      this.currPlayListStatus = z;
    },
  },
});
