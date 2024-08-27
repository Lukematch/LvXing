import { sample } from 'lodash'

/**
 * @description: 获取当前时间
 */
export const getCurrentTime = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const date = now.getDate()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()
  return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`
}


/**
 * @description: Tag 标签随机颜色
 */
export const randomTagColor = () => {
  const colors = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple']
  return sample(colors)
}



export const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};