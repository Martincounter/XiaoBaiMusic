<template>
  <div class="container-com">
    <div class="body">
      <div>mine</div>
      <van-button @click="loginFn">登录</van-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { Md5 } from "ts-md5";
import { login } from "@/api/auth";
const getData = () => {
  console.log("获取数据");
};
interface loginParams {
  phone: string;
  password: string;
}
const loginForm = reactive<loginParams>({
  phone: "18933754163",
  password: "yyz000801",
});
const countryCode = ref<string>("+86");

const loginFn = async () => {
  const md5: any = new Md5();
  const params = {
    countrycode: countryCode.value.replace("+", "").replace(/\s/g, ""),
    md5_password: Md5.hashStr(loginForm.password),
    phone: loginForm.phone.replace(/\s/g, ""),
    password: "fakePassword",
  };
  console.log(params);

  const res = await login(params);
  console.log(res);
};
</script>
<style scoped lang="less">
.container-com {
  .body {
    // padding: var(--padding-contain);
  }
}
</style>
