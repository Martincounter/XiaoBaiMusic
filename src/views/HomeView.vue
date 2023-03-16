<template>
  <div class="container-com">
    <div class="header-placeholder"></div>

    <div class="header">
      <div class="header-user">
        <i class="iconfont icon-account-circle-line"></i>
      </div>
      <p class="header-text">Hi,{{ userName }}</p>
    </div>
    <pull-refresh @getData="getData" :loading="loading">
      <template #main>
        <div class="body">
          <horizontal-scroll
            :data="personalizedList.data"
            title="推荐歌单"
            :more="true"
            @item-click="goMusicListDetails"
          ></horizontal-scroll>
          <horizontal-scroll
            :data="topListOfArtistList.data"
            title="歌手榜"
            :more="true"
            @item-click="goMusicListDetails"
          >
            <template #tab-bar>
              <bar-of-type
                :data="typeBarList"
                :active="typeBarActive"
                @onClickTab="onClickTab"
              ></bar-of-type>
            </template>
          </horizontal-scroll>
          <horizontal-scroll
            :data="allToplist.data"
            :param="{ imgUrl: 'coverImgUrl' }"
            title="排行榜"
            :more="true"
            @item-click="goMusicListDetails"
          ></horizontal-scroll>
          <div
            v-for="item in modeList"
            :key="item.name"
            @click="changeTheme(item.name)"
            class="theme"
          >
            {{ item.title }}
          </div>
          <div v-for="i in 40" :key="i">
            {{ i }}
          </div>
        </div>
      </template>
    </pull-refresh>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { personalized, toplist } from "@/api/playList";
import { topListOfArtist } from "@/api/artist";
import { reactive, ref, onMounted } from "vue";
import { useSystemStore } from "@/stores/theme.js";
import { storeToRefs } from "pinia";
import { randomGetArr } from "@/utils/common";
const systemStore = useSystemStore();
const { currMode, modeList } = storeToRefs(systemStore);
const router = useRouter();

onMounted(() => {
  getData();
});

const loading = ref<boolean>(false);

const typeBarList = reactive([
  { name: "1", title: "华语" },
  { name: "2", title: "欧美" },
  { name: "3", title: "韩国" },
  { name: "4", title: "日本" },
]);
const typeBarActive = ref<string>("1");
const userName = ref<string>("martin");

const getData = async () => {
  await showLoading();
  try {
    const res = await Promise.all([
      getTopList(),
      getTopListOfArtist(1),
      getPersonalized(),
    ]);
    allToplist.data = res[0]; //所有榜单
    topListOfArtistList.data = res[1]; //歌手榜
    personalizedList.data = res[2]; //推荐歌单
  } finally {
    await hideLoading();
  }
};
const showLoading = () => {
  loading.value = true;
};
const hideLoading = () => {
  loading.value = false;
};
const changeTheme = (val: string) => {
  currMode.value = val;
  document.documentElement.setAttribute("prefers-color-scheme", val);
};
//歌手榜切换类型
const onClickTab = async (name: number) => {
  const res = await getTopListOfArtist(name);
  topListOfArtistList.data = res;
};

interface resType {
  picUrl: string;
  name: string;
  id: number;
  [propName: string]: string | number;
}
// 推荐歌单
let personalizedList = reactive({
  data: [] as resType[],
});
const getPersonalized = async () => {
  const res = await personalized(10);
  return res?.result;
};
// 歌手榜
let topListOfArtistList = reactive({
  data: [] as resType[],
});
const getTopListOfArtist = async (type: number) => {
  const res = await topListOfArtist(type);
  return randomGetArr(res.list.artists, 6);
};
// 所有榜单
let allToplist = reactive({
  data: [] as resType[],
});
const getTopList = async () => {
  const res = await toplist();
  return randomGetArr(res.list, 6);
};
const goMusicListDetails = (e: { id: number | string; alias: [] }) => {
  let type = "";
  if (e.alias) {
    type = "artist"; // 有别名就为歌手
  } else {
    type = "playList"; // 否则为歌单
  }
  router.push({
    name: "PlayListDetails",
    params: { id: e.id, type: type },
  });
};


</script>

<style scoped lang="less">
.container-com {
  .header-placeholder{
    height: 77px;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 15px 5px;
    position: fixed;
    z-index: 1;
    width: 100%;
    backdrop-filter: var(--bg-filter);
    -webkit-backdrop-filter: var(--bg-filter);
    background-color: var(--filter-bg);
    top: 0;

    &-text {
      font-size: 20px;
      font-weight: 600;
    }

    &-user {
      .iconfont {
        font-size: 40px;
        color: var(--color-active);
      }
    }
  }
  .body {
    padding: 10px 15px;
  }
}
</style>
