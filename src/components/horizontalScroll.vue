<template>
  <div class="trainView">
    <div class="trainView-header">
      <div class="trainView-header_title">
        <p class="title">{{ title }}</p>
        <i v-if="more" class="iconfont icon-arrow-drop-right-line"></i>
      </div>
      <div class="tab-bar">
        <slot name="tab-bar"></slot>
      </div>
    </div>
    <div class="trainView-contain">
      <div
        class="trainView-contain_item"
        v-for="(item, index) in props.data"
        :key="index"
        @click="itemClick(item)"
      >
        <van-image
          width="150"
          height="150"
          :src="item[props.param?.imgUrl || 0] || item.picUrl"
          fit="cover"
          lazy-load
          radius="15"
        >
        </van-image>

        <div class="text-origin">
          <p class="name ellipsis-2">{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
type PropsType = {
  data: any[] | undefined;
  title: string | "";
  more?: boolean | false;
  param?: { imgUrl: string } | undefined;
};
const props = defineProps<PropsType>();
const emit = defineEmits(["itemClick"]);
const itemClick = (e: any) => {
  emit("itemClick", e);
};
</script>
<style scoped lang="less">
::-webkit-scrollbar {
  display: none;
}
.trainView {
  &-contain {
    display: flex;
    width: auto;
    overflow-x: auto;
    padding-bottom: 10px;
    scrollbar-width: none;

    &_item {
      border-radius: 15px;
      // background: var(--color-background-mute);
      margin-right: 20px;
      .text-origin {
        padding: 0 10px 5px 10px;
        // display: flex;
        // justify-content: space-between;
        min-height: 20px;
        line-height: 20px;
      }
      .name {
        font-size: 12px;
        // text-align: center;
        font-weight: 600;
      }
    }
  }
  &-header {
    display: flex;
    align-items: center;
    .tab-bar {
      margin-left: 10px;
      font-size: 14px;
      flex: 1;
    }
    &_title {
      display: flex;
      align-items: center;
      min-width: 105px;
    }
    .title {
      font-size: 18px;
      font-weight: 600;
      line-height: 55px;
      // margin-bottom: 10px;
    }

    .iconfont {
      font-size: 32px;
      font-weight: 600;
    }
  }
}
</style>
