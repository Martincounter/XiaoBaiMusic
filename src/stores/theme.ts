import { defineStore } from "pinia";
import { ref } from "vue";

export const useSystemStore = defineStore("theme", {
  state: () => ({
    modeList: [
      {
        name: "auto",
        title: "自动模式",
      },
      {
        name: "light",
        title: "亮色模式",
      },
      {
        name: "dark",
        title: "暗色模式",
      },
    ],
    currMode: "",
  }),
  persist: true,
  actions: {
    initMode() {
      const data = localStorage.getItem("theme");
      if (data) {
        const local_theme = JSON.parse(data);
        if (local_theme.currMode) {
          this.currMode = local_theme.currMode;
          document.documentElement.setAttribute(
            "prefers-color-scheme",
            local_theme.currMode
          );
        } else if (!this.currMode) {
          this.currMode = this.modeList[1].name;
        }
      }
    },
  },
});
// export const useSystemStore = defineStore(
//   "theme",
//   () => {
//     // 模式列表
//     const modeList = ref([
//       {
//         name: "auto",
//         title: "自动模式",
//       },
//       {
//         name: "light",
//         title: "亮色模式",
//       },
//       {
//         name: "dark",
//         title: "暗色模式",
//       },
//     ]);
//     const currMode = ref();
//     const initMode = () => {
//       if (!currMode.value) {
//         currMode.value = modeList.value[0].name;
//       } else {
//         currMode.value = modeList.value.find((item) => {
//           item.name === currMode.value?.name;
//         });
//       }
//     };

//     return { modeList, currMode, initMode };
//   },
//   {
//     persist: true,
//   }
// );
