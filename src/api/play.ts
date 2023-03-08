import { http } from "@/utils/request";
/**
必选参数 : id : 音乐 id 
level: 播放音质等级, 分为 standard => 标准,
higher => 较高,
exhigh=>极高,
lossless=>无损,
hires=>Hi-Res
*/
export function getSongUrlById(id: string | number) {
  //TODO 需要设置全局音质变量
  return http.get(`/song/url/v1?id=${id}&level=hires`);
}
