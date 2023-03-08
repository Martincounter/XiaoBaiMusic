<template>
  <van-tabs :active="props.active" @change="onClickTab">
    <van-tab
      v-for="item in props.data"
      :title="item.title"
      :name="item.name"
      :key="item.title"
    >
    </van-tab>
  </van-tabs>
</template>
<script setup lang="ts">
type propsType = {
  active: string;
  data:
    | {
        title: string | undefined;
        name: string | number;
      }[]
    | undefined;
};
const props = defineProps<propsType>();
const emit = defineEmits(["onClickTab"]);
const onClickTab = (name: number) => {
  // console.log(title);
  emit("onClickTab", name);
  console.log(name);
};
</script>
<style scoped lang="less">
:deep(.van-tabs__nav) {
  background: none;
}
:deep(.van-tab--active) {
  background: #d40e0e21;
  padding: 3px 8px;
  border-radius: 5px;
  .van-tab__text {
    color: var(--color-active);
  }
}
:deep(.van-tab__text) {
  color: var(--color-text);
  font-weight: 600;
}
:deep(.van-tabs__lin)e {
  display: none;
}
:deep(.van-tabs__wrap) {
  height: auto;
}
:deep(.van-tabs__nav--line) {
  padding: 0;
}
:deep(.van-tab) {
  padding: 3px 8px;
}
</style>
