import { userMusicStore } from "@/stores/musicPlayer.js";
import type { musicState, musicStatus } from "@/utils/type/musicStoreType";
const musicStore = userMusicStore();

/**
 * 更新播放歌曲状态
 * 参数musicState播放的歌曲信息
 *   id: string;
 *   url: string;
 *   imgUrl: string;
 *   musicName: string;
 */
export const updateCurrMusic = (
  musicState: musicState // 当前播放的歌曲信息
) => {
  musicStore.updateMusic(musicState);
};

/**
 * 首次点击新的歌单更新列表信息
 * 参数musicState播放的歌曲信息
 *    id: string;
 *   url: string;
 *   imgUrl: string;
 *   musicName: string;
 *   currMusicList播放的歌单列表
 *   currMusicStatus当前播放状态包含歌单id
 *   isPlay: boolean;
 *   listId: string;
 */
export const updateCurrMusics = (
  musicState: musicState, // 当前播放的歌曲信息
  currMusicList: [], // 当前播放的歌单列表
  currMusicStatus: musicStatus //更新当前播放状态包含歌单id
) => {
  musicStore.updateMusics(musicState, currMusicList, currMusicStatus);
};
export const updateCurrPlay = (play: boolean) => {
  musicStore.updatePlay(play);
}