import { http } from "@/utils/request";
/**
 * 歌手榜
 * 说明 : 调用此接口 , 可获取排行榜中的歌手榜
 * 可选参数 :
 * type : 地区
 * 1: 华语
 * 2: 欧美
 * 3: 韩国
 * 4: 日本
 * 参数：type:number
 */
export function topListOfArtist(type: number | null) {
  return http.get(`/toplist/artist?type=${type}`);
}
