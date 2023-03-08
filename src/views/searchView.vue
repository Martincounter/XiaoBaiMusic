<template>
  <div class="container-com">
    <div class="body">
      <div>page1</div>
      <div>page1</div>
      <div>page1</div>
      <div>page1</div>
      <div>page1</div>
      <div>page1</div>
      <div>page1</div>
      <div>page1</div>
      <div>page1</div>
      <div>page1</div>
      <div>page1</div>
      <div>page1</div>
      <div>page1</div>
      <div>page1</div>
      <div>page1</div>
      <div>page1</div>
      <div>page1</div>
      <div>page1</div>
      <div>page1</div>
      <div>page1</div>
      <div>page1</div>
      <div>page1</div>
      <div>page1</div>
      <div>page1</div>
      <div>page1</div>
      <div>page1</div>
      <div>page1</div>
      <div>page1</div>
      <div>page1</div>
      <div>page1</div>
      <div>page1</div>
      <div>page1</div>
      <button @click="num--">-</button>
      <div>{{ num }}</div>
      <button @click="num++">+</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const num = ref<number>(1);
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
