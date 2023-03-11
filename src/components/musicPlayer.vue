<template>
  <div class="music-player">
    <audio
      ref="audioRef"
      controls
      :src="url"
      @play="onPlay"
      @pause="onPause"
    ></audio>

    <div v-if="!isLoading" class="controls">
      <button @click="play">Play</button>
      <button @click="pause">Pause</button>
    </div>
  </div>
  <div class="placeholder"></div>
</template>

<script lang="ts" setup>
import { watch, ref } from "vue";
import { storeToRefs } from "pinia";
import { userMusicStore } from "@/stores/musicPlayer.js";
const musicStore = userMusicStore();
const { currPlayMusicUrl } = storeToRefs(musicStore);
watch(currPlayMusicUrl, (newValue, oldValue) => {
  console.log(`Counter changed from ${oldValue} to ${newValue}`);
  url.value = newValue;
  isLoading.value = false;
});

const url = ref<string>();
const isLoading = ref<boolean>(true);
const audioRef = ref<HTMLAudioElement>();

const play = () => {
  audioRef.value?.play();
};
const pause = () => {
  audioRef.value?.pause();
};
const onPlay = () => {
  console.log("Playing...");
};
const onPause = () => {
  console.log("Paused.");
};
</script>

<style scoped lang="less">
.music-player {
  height: 64px;
  position: fixed;
  bottom: 63px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  audio {
    background-color: var(--color-background-soft);
  }

  .controls {
    margin-top: 20px;

    button {
      margin-left: 10px;
    }
  }
}
.placeholder {
  height: 65px;
  z-index: -1;
}
</style>
