<template>
  <div class="container-com">
    <div class="list">
      <div
        class="list-item"
        v-for="item in musicList"
        :key="item.id"
        @click="getSongUrl(item.id)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
  <audio controls :src="url"></audio>
  <loading-page v-show="loading"></loading-page>
</template>

<script lang="ts" setup>
import LoadingPage from "@/components/loadingPage.vue";
import { useRoute } from "vue-router";
import { reactive, ref, onActivated } from "vue";
import { trackAll } from "@/api/playList";
import { getSongUrlById } from "@/api/play";

onActivated(() => {
  const { params } = useRoute();
  listParams.id = params.id as string | number;
  getData();
});
interface resType {
  [propName: string]: string | number;
}
type paramsType = {
  id: string | number;
  limit: number;
  offset: number;
};
let musicList = ref<resType[] | null>(null);
const listParams: paramsType = reactive({
  id: "",
  limit: 10,
  offset: 0,
});
const loading = ref<boolean>(false);
const getData = async () => {
  await showLoading();
  try {
    const res = await Promise.all([getMusicList()]);
    musicList.value = res[0].songs;
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
  const res = await trackAll(listParams);
  return res;
};
// 获取歌曲url
const url = ref<string>("");
const getSongUrl = async (id: string | number) => {
  const res = await getSongUrlById(id);
  url.value = res.data[0].url;
  console.log(url.value);
};
</script>
<style scoped lang="less">
.container-com {
  .list {
    padding: var(--padding-contain);
    &-item {
      padding: 15px 10px;
      border-bottom: 1px solid var(--color-border);
    }
  }
}
</style>
