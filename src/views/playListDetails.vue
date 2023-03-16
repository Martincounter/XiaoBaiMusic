<template>
  <div class="container-com">
    <div class="header" id="header">
      <div class="img">
        <van-image
          width="10rem"
          height="10rem"
          fit="contain"
          radius="16"
          :src="detailData.coverImgUrl"
        ></van-image>
        <div
          class="shadow"
          :style="{ backgroundImage: 'url(' + detailData.coverImgUrl + ')' }"
        ></div>
      </div>
      <div class="info">
        <div class="name">{{ detailData.name }}</div>
        <div class="tags">{{ detailData.tags.join("·") }}</div>
        <div class="description ellipsis-2">{{ detailData.description }}</div>
      </div>
      <div>
        <span>播放</span>
        <span>随机播放</span>
      </div>
    </div>
    <div class="list">
      <div
        class="list-item"
        v-for="item in detailData.tracks"
        :key="item.id"
        @click="getSongUrl(item)"
      >
        {{ item.musicName }}
      </div>
    </div>
  </div>
  <loading-page v-show="loading"></loading-page>
</template>

<script lang="ts" setup>
import LoadingPage from "@/components/loadingPage.vue";

import { useRoute } from "vue-router";
import { reactive, ref, onActivated } from "vue";
import { trackAll, playlistDetail } from "@/api/playList";
import { artistTopSong } from "@/api/artist";
import { getSongUrlById } from "@/api/play";
import { updateCurrMusics, updateCurrPlay } from "@/utils/storesUtils";
onActivated(() => {
  const { params } = useRoute();
  listParams.id = params.id as string | number;
  const type = params.type;
  if (type === "artist") {
    getArtistData();
  } else {
    getListData();
  }
});
interface resType {
  id: string | number;
  name: string | number;
  [propName: string]: string | number | [];
}
type paramsType = {
  id: string | number;
  limit?: number;
  offset?: number;
};
const tracks = reactive<resType[]>([]);
let detailData = reactive({
  tracks,
  tags: [],
  name: "",
  coverImgUrl: "",
  description: "",
  id: "",
});
const listParams: paramsType = reactive({
  id: "",
  limit: 10,
  offset: 0,
  //TODO 获取歌单所有歌曲需要分页
});

const loading = ref<boolean>(false);
const getListData = async () => {
  await showLoading();
  try {
    const res = await Promise.all([getPlayListDetail()]); // 查看歌单详情的歌曲只有20首 TODO 登陆后需要调用getMusicList获取全部歌曲
    res[0].playlist.tracks = handlePlayList(res[0].playlist.tracks);
    detailData = res[0].playlist;
    console.log(detailData);
  } finally {
    await hideLoading();
  }
};
const getArtistData = async () => {
  await showLoading();
  try {
    const res = await Promise.all([getArtistTopSong()]);
    detailData = res[0].songs;
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
// 获取歌单中歌曲
const getMusicList = async () => {
  return await trackAll(listParams);
};
// 获取歌单详情
const getPlayListDetail = async () => {
  return await playlistDetail(listParams.id);
};
// 获取歌手热门50歌曲
const getArtistTopSong = async () => {
  return await artistTopSong(listParams.id);
};
const handlePlayList = (data: any) => {
  if (!data) return [];
  let newArr = [];
  for (let i of data) {
    let obj = {
      id: i.id || "",
      imgUrl: i.al?.picUrl || "",
      musicName: i.name || "",
    };
    newArr.push(obj);
  }
  return newArr;
};
// 获取歌曲url
// const url = ref<string>("");
const getSongUrl = async (item: {
  musicName: string;
  imgUrl: string;
  id: string;
}) => {
  console.log(item);
  const res = await getSongUrlById(item.id);
  const stateParams = {
    id: item.id,
    url: res.data[0].url as string,
    imgUrl: item.imgUrl as string,
    musicName: item.musicName as string,
  };
  const statusParams = {
    isPlay: true,
    listId: detailData.id,
  };
  updateCurrMusics(stateParams, detailData.tracks as [], statusParams);
  updateCurrPlay(true)
};
</script>
<style scoped lang="less">
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  .img {
    margin-top: 20px;
    position: relative;
    .shadow {
      position: absolute;
      top: 12px;
      height: 100%;
      width: 100%;
      filter: blur(16px) opacity(0.6);
      transform: scale(0.92, 0.96);
      z-index: -1;
      background-size: cover;
      border-radius: 16px;
      aspect-ratio: 1/1;
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 15px;
    width: 100%;
    .name,
    .tags {
      font-size: 16px;
      font-weight: 600;
    }
    .description {
      font-size: 12px;
      font-weight: 600;
    }
  }
}
.container-com {
  .list {
    // padding: var(--padding-contain);
    &-item {
      padding: 15px 10px;
      border-bottom: 1px solid var(--color-border);
    }
  }
}
</style>