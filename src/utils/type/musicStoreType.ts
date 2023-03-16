export interface musicState {
  // 当前播放信息类型
  id: string;
  url: string;
  imgUrl: string;
  musicName: string;
}

export interface musicStatus {
  // 播放状态类型
  isPlay: boolean;
  listId: string;
}