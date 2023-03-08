<template>
  <van-pull-refresh v-model="loading" @refresh="getData">
    <!-- 下拉提示 -->
    <template #pulling>
      <van-loading vertical>
        <template #icon>
          <van-icon name="music-o" size="24" />
        </template>
      </van-loading>
    </template>
    <!-- 释放提示 -->
    <template #loosing>
      <van-loading vertical>
        <template #icon>
          <van-icon name="music-o" size="24" />
        </template>
      </van-loading>
    </template>
    <!-- 加载提示 -->
    <template #loading>
      <van-loading vertical>
        <template #icon>
          <van-icon name="music" size="24" />
        </template>
      </van-loading>
    </template>
    <slot name="main"></slot>
  </van-pull-refresh>
</template>
<script setup lang="ts">
import { defineProps, toRefs } from "vue";
type type = {
  loading?: boolean;
};
const props = defineProps<type>();
const { loading } = toRefs(props);

const emit = defineEmits(["getData"]);
const getData = () => {
  emit("getData");
};
</script>
