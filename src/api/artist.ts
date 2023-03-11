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
/**
 * 说明 : 调用此接口,可获取歌手热门 50 首歌曲
 * 必选参数: id : 歌手 id
 */
export function artistTopSong(id: number | string) {
  return http.get(`/artist/top/song?id=${id}`);
}
/**
 * 说明 : 调用此接口,可获取歌手全部歌曲 必选参数 :
 * 必填参数：id : 歌手 id
 * 可选参数 :
 * order : hot ,time 按照热门或者时间排序
 * limit: 取出歌单数量 , 默认为 50
 * offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
 */
export function artistSongs(id: number | string) {
  return http.get(`/artist/songs?id=${id}`);
}