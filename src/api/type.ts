/* 登录接口参数类型 */
export interface LoginData {
  countrycode: string | number;
  md5_password: string | number;
  phone: string;
  password: string;
}

/* 登录接口返回值类型 */
export interface LoginRes {
  token: string;
}
export interface hotRes {
  code: string;
  programs: object[];
}

export interface hot {
  offset?: number;
  limit?: number;
}
/* 获取歌单所有歌曲接口参数 */
export interface trackAllParams {
  id: string | number;
  offset?: number;
  limit?: number;
}
