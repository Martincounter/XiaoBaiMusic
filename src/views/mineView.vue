<template>
  <div class="container-com">
    <div class="body">
      <div>mine</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const getData = () => {
  console.log("获取数据");
};
</script>
<style scoped lang="less">
.container-com {
  .body {
    padding: var(--padding-contain);
  }
}
</style>
