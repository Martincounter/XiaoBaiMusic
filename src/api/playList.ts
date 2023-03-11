import { http } from "@/utils/request";
import type { trackAllParams } from "./type";

/**
 * 推荐歌单
 * 参数：limit
 */
export function personalized(limit: number) {
  return http.get(`/personalized?limit=${limit}`);
}

/**
 * 获取所有榜单
 * 说明 : 调用此接口,可获取所有榜单
 * @returns
 */
export function toplist() {
  return http.get(`/toplist`);
}
/**
 * 获取歌单所有歌曲
 * 说明 : 由于网易云接口限制，歌单详情只会提供 10 首歌，通过调用此接口，传入对应的歌单id，即可获得对应的所有歌曲
 * 参数：id：歌单id必填
 * 可选参数：limit : 限制获取歌曲的数量，默认值为当前歌单的歌曲数量
 * offset : 默认值为0
 */
export function trackAll(data: trackAllParams) {
  return http.get(
    `/playlist/track/all?id=${data.id}&limit=${data.limit}&offset=${data.offset}`
  );
}
/**
 * 获取歌单详情D
 * 必选参数 : id : 歌单 id
 */
export function playlistDetail(id: string | number) {
  return http.get(`/playlist/detail?id=${id}`);
}
