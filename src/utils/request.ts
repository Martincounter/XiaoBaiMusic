import axios from "axios";
import router from "@/router";
import { showNotify } from "vant";
import "vant/es/notify/style";
import type {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { doLogout } from "@/utils/auth";

// import { message as Message } from "ant-design-vue";
let BASE_URL: string | undefined = "";
/* 服务器返回数据的的类型，根据接口文档确定 */
export interface Result<T = any> {
  code: number;
  message: string;
  data: T;
}
if (process.env.NODE_ENV === "development") {
  BASE_URL = import.meta.env.VITE_APP_BASE_URL;
} else {
  BASE_URL = import.meta.env.VITE_APP_BASE_URL;
}
const service: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  withCredentials: true,
});

/* 请求拦截器 */
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    //  伪代码
    // if (user.token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    if (!config?.headers) {
      throw new Error(
        `Expected 'config' and 'config.headers' not to be undefined`
      );
    }
    const cookie = "fna9f0v9fs9f0anejfuc0s0bjrnaufnb";

    // typeof config.headers.set === "function" &&
    //   config.headers.set("Authorization", cookie);
    // config.headers.Cookie = cookie;
    // config.headers.cookie = `Bearer ${localStorage.getItem("token")}`;
    if (!config.params) config.params = {};
    return config;
  },
  (error: AxiosError) => {
    // Message.error(error.message);
    console.log(error.message);
    return Promise.reject(error);
  }
);

/* 响应拦截器 */
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, message = "success" } = response.data;

    // 根据自定义错误码判断请求是否成功
    if (code === 200) {
      // 将组件用的数据返回
      return response.data;
    } else {
      // 处理业务错误。
      // Message.error(message);
      console.log(message);
      return Promise.reject(new Error(message));
    }
  },
  (error: AxiosError) => {
    // 处理 HTTP 网络错误
    let message = "";
    // HTTP 状态码
    const status = error.response?.status;
    switch (status) {
      case 401:
        message = "token 失效，请重新登录";
        // 这里可以触发退出的 action
        break;
      case 403:
        message = "拒绝访问";
        break;
      case 404:
        message = "请求地址错误";
        break;
      case 500:
        message = "服务器故障";
        break;
      case 301:
        message = "需要登录";
        doLogout();
        router.push({ name: "loginView" });
        break;
      default:
        message = "网络连接故障";
    }
    // showNotify({ type: "danger", message: message });
    showNotify({ message: message, duration: 1500 });

    // alert(message);

    return Promise.reject(error);
  }
);

/* 导出封装的请求方法 */
export const http = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.get(url, config);
  },

  post<T = any>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return service.post(url, data, config);
  },

  put<T = any>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return service.put(url, data, config);
  },

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.delete(url, config);
  },
};

/* 导出 axios 实例 */
export default service;
