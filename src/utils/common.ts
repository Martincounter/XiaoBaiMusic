export const randomGetArr = (data: [], length: number = 1) => {
  // 随机获取数组中的某些项
  const indexArr: number[] = [];
  let result = [];
  while (indexArr.length < length) {
    const tmp = ~~(Math.random() * data.length);
    if (!indexArr.includes(tmp)) indexArr.push(tmp);
  }
  result = data.filter((l: any, index: number) => indexArr.includes(index));
  console.log(result);

  return result;
};