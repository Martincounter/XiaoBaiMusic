<template>
  <div
    class="music-player"
    @click="full"
    :style="{ height: playerConfig.height }"
  >
    <audio
      ref="audioRef"
      controls
      :src="emptyMusic.url"
      style="display: none"
      @ended="playNext"
    ></audio>
    <div class="controls" :class="playerConfig.class">
      <!--  TODO 这里要加一个从row到column的过度动画  -->
      <div class="flex">
        <van-image
          :src="emptyMusic.imgUrl"
          width="54px"
          height="54px"
          fit="contain"
          radius="6"
        ></van-image>
      </div>
      <span class="music-name ellipsis-1">{{ emptyMusic.musicName }}</span>
      <div>
        <span @click.stop="playAndPause">{{ currIsPlay ? "⏸" : "▶" }}</span>
      </div>
    </div>
  </div>
  <div class="placeholder"></div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, nextTick, toRaw } from "vue";
import { userMusicStore } from "@/stores/musicPlayer.js";
import { randomGetArr } from "@/utils/common";
import { getSongUrlById } from "@/api/play";
import { updateCurrMusic,updateCurrPlay } from "@/utils/storesUtils";
import "vant/es/notify/style";
import { showNotify } from "vant";

const musicStore = userMusicStore();
interface Music {
  id: string;
  url: string;
  imgUrl: string;
  musicName: string;
}
let emptyMusic = reactive<Music>({
  id: "",
  url: "",
  imgUrl: "",
  musicName: "",
});
const audioRef = ref<HTMLAudioElement>();
const playerConfig = reactive({
  status: false,
  height: "64px",
  class: "row",
});
const currIsPlay = ref<boolean>(false);
musicStore.$subscribe((mutation, state) => {
  const { id, url, imgUrl, musicName } = state.currPlay;
  const { isPlay } = state.currPlayListStatus;
  if (!url) {
    playNext();
    return showNotify("error");
  }
  emptyMusic.id = id;
  emptyMusic.url = url;
  emptyMusic.imgUrl = imgUrl;
  emptyMusic.musicName = musicName;
  if(currIsPlay.value != isPlay){
    currIsPlay.value = isPlay;
  }
  nextTick(() => {
    console.log(currIsPlay.value);
    currIsPlay.value ? audioRef.value?.play() : audioRef.value?.pause();
  });
});

const isLoading = ref<boolean>(true);

const playNext = () => {
  console.log("playEnd!!!!");
  const nextMusic = randomGetArr(toRaw(musicStore.currPlayList as []), 1)[0];
  getSongUrl(nextMusic as Music);
};
const getSongUrl = async (item: Music) => {
  const res = await getSongUrlById(item.id);
  const storeParams = {
    id: item.id,
    url: res.data[0].url as string,
    imgUrl: item.imgUrl as string,
    musicName: item.musicName as string,
  };
  const { id, url, imgUrl, musicName } = storeParams;
  emptyMusic.id = id;
  emptyMusic.url = url;
  emptyMusic.imgUrl = imgUrl;
  emptyMusic.musicName = musicName;
  await updateCurrMusic(storeParams);
};
const playAndPause = () => {
  currIsPlay.value = !currIsPlay.value;
  updateCurrPlay(currIsPlay.value);
  // currIsPlay.value ? audioRef.value?.play() : audioRef.value?.pause();
};
const full = () => {
  playerConfig.status = !playerConfig.status;
  playerConfig.height = playerConfig.status ? "calc(100% - 62px)" : "64px";
  playerConfig.class = playerConfig.status ? "column" : "row";
};
onMounted(() => {
  console.log("onMounted!!");
  console.log(toRaw(musicStore.currPlayList));
  const { url, imgUrl, musicName } = musicStore.currPlay;
  emptyMusic.url = url;
  emptyMusic.imgUrl = imgUrl;
  emptyMusic.musicName = musicName;
});
</script>

<style scoped lang="less">
.row-enter-active,
.row-leave-active,
.column-enter-active,
.column-leave-active {
  transition: all 0.5s ease-in-out;
}

.row-enter,
.row-leave-to,
.column-enter,
.column-leave-to {
  opacity: 0;
  transform: translateX(50px);
}

.music-player {
  position: fixed;
  bottom: 62px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 15px;
  backdrop-filter: var(--bg-filter);
  -webkit-backdrop-filter: var(--bg-filter);
  background-color: var(--filter-bg);
  transition: height 0.5s ease;
  z-index: 1;

  .controls {
    display: flex;
    width: 100%;
    align-items: center;
    //margin-top: 20px;
    .music-name {
      flex: 1;
      padding: 0 15px;
      font-size: 16px;
      font-weight: bold;
    }
    button {
      margin-left: 10px;
    }
  }
  .column {
    flex-direction: column;
  }
  .row {
    //transition: flex-direction 0.5s ease; /* 过渡效果 */
    flex-direction: row;
    //transform: translateY(100%);
  }
}
.placeholder {
  height: 64px;
  z-index: -1;
}
.flex {
  display: flex;
}
</style>