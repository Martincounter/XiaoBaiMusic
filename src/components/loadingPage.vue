<template>
  <div class="loading-page">
    <van-loading vertical>
      <template #icon>
        <van-icon name="music-o" size="30" />
      </template>
    </van-loading>
  </div>
</template>
<script lang="ts" setup></script>
<style scoped lang="less">
.loading-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  z-index: 2;
  top: 0;
  background: var(--color-background-soft);
}
</style>
