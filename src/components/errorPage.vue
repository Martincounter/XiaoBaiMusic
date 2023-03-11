<template>
  <div>error</div>
  <div><van-button type="primary" @click="show">主要按钮</van-button></div>
</template>
<script lang="ts" setup>
import { showNotify } from "vant";
import "vant/es/notify/style";
const show = () => {
  showNotify({ message: "提示12", duration: 1000 });
};
</script>
<style scoped lang="less"></style>
