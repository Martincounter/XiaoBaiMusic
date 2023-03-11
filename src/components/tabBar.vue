<template>
  <div class="container">
    <router-view v-slot="{ Component }">
      <KeepAlive>
        <component :is="Component" :key="$route.name" />
      </KeepAlive>
    </router-view>
    <MusicPlayer></MusicPlayer>
    <div class="tab-bar">
      <div
        class="tab-bar__text"
        v-for="(item, index) in menuList"
        :key="item.name"
        @click="change(item.name, index)"
      >
        <i
          :class="[
            `iconfont`,
            `icon-` + item.icon,
            { active: currentIndex === index },
          ]"
        ></i>
      </div>
    </div>
    <div class="placeholder"></div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
//定义路由
import { useSystemStore } from "@/stores/theme.js";
import "@/assets/icon.css";
import MusicPlayer from "./musicPlayer.vue";
const systemStore = useSystemStore();

systemStore.initMode();

const currentIndex = ref<number>(0);
const router = useRouter();
const menuList = reactive([
  {
    icon: "yanchu",
    name: "home",
  },
  {
    icon: "menu-line",
    name: "playList",
  },
  {
    icon: "search-line",
    name: "search",
  },
  {
    icon: "user-3-line",
    name: "mine",
  },
]);
const change = (e: string, i: number) => {
  router.push({ path: e });
  currentIndex.value = i;
};
</script>
<style scoped lang="less">
.container {
  position: relative;
  min-height: 100vh;
  box-sizing: border-box;
  .iconfont {
    font-weight: 600;
    font-size: 22px;
  }
}
.placeholder {
  height: 65px;
  z-index: -1;
}
.tab-bar {
  position: fixed;
  bottom: 0;
  padding: 13px 15px;
  width: 100%;
  display: flex;
  backdrop-filter: var(--bg-filter);
  -webkit-backdrop-filter: var(--bg-filter);
  height: 63px;
  // border-top: 1px solid var(--color-border);
}
.tab-bar__text {
  flex: 1;
  text-align: center;
  color: var(--color-text);
  text-decoration: none;
  .active {
    color: var(--color-active);
  }
}
</style>
