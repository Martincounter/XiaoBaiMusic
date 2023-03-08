import { http } from "@/utils/request";
import type { LoginData, LoginRes, hot, hotRes } from "./type";

// const enum USER_API {
//   Login = '/user/login',
//   Userinfo = '/user/info',
// }

/**
 * 登录
 */
export function login(data: LoginData) {
  return http.post<LoginRes>(
    `/login/cellphone?countrycode=${data.countrycode}&phone=${data.phone}&password=${data.password}&md5_password=${data.md5_password}`
  );
}
/**
 * 退出登录
 * 说明 : 调用此接口 , 可退出登录
 */
export function logout() {
  return http.post("/logout");
}

export function hot(data: hot) {
  return http.get<hotRes>(
    `/top/artists?offset=${data.offset}&limit=${data.limit}`
  );
}
