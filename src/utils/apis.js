import { getTian } from './http';
import { city } from './const';
import { weekToday } from './tool';
import dayjs from 'dayjs';

/**
 * 给女朋友发送内容的相关接口
 */
 const LoveMsgURL = {
  // 天气接口：默认获取最近7天的数据
  weather: 'http://api.tianapi.com/tianqi/index',
  // 每日简报
  dailyBriefing: 'http://api.tianapi.com/bulletin/index',
  // 今日头条
  topNews: 'http://api.tianapi.com/topnews/index',
  // 最美宋词
  songLyrics: 'http://api.tianapi.com/zmsc/index',
  // 每日一句美好英语
  dayEnglish: 'http://api.tianapi.com/everyday/index',
  // 韩寒主编的ONE一个杂志，本接口返回每日一句
  oneMagazines: 'http://api.tianapi.com/one/index',
  // 故事大全
  storybook: 'http://api.tianapi.com/story/index',
  // 网易云热评
  netEaseCloud: 'http://api.tianapi.com/hotreview/index',
  // 获取农历信息
  lunarDate: 'http://api.tianapi.com/lunar/index',
  // 土味情话
  saylove: 'http://api.tianapi.com/saylove/index',
  // 彩虹屁
  caihongpi: 'http://api.tianapi.com/caihongpi/index',
  // 励志古言
  inspirationalWord: 'http://api.tianapi.com/lzmy/index',
  // 笑话
  joke: 'http://api.tianapi.com/joke/index',
  // 一言
  oneWord: 'https://v1.hitokoto.cn/?encode=json',
}

export function getCityAndDate() {
  const date = `${dayjs().year()}年${dayjs().month()}月${dayjs().date()}日`
  return new Promise(((resolve) => {
    resolve([`${city} | ${date} | ${weekToday()}`])
  }))
}

// 获取农历信息
export async function getLunarDate(date) {
  const res = await getTian({ url: LoveMsgURL.lunarDate, params: { date } })
  const {
    lubarmonth, // 农历月
    lunarday, // 农历日
    lunar_festival, // 农历节日
    jieqi, // 节气
    fitness, // 适宜
    taboo, // 不宜
  } = res?.[0];

  return [`农历 | ${lubarmonth}${lunarday} | ${lunar_festival ? `${lunar_festival} |` : ''} ${jieqi ? `${jieqi} |` : ''} | 宜${fitness} | 忌${taboo}`];
}

// 获取天气情况
export async function getWeather() {
  const res = await getTian({ url: LoveMsgURL.weather, params: { city } })
  const {
    weather, // 早晚天气变化
    wind, // 风向
    windsc, // 风力
    lowest, // 	最低温
    highest, // 最高温
    humidity, // 湿度
    tips,
  } = res?.[0];
  const txtList = [
    '今日天气状况：',
    `天气：${weather}`,
    `${wind}：${windsc}`,
    `温度：${lowest}-${highest}`,
    `湿度：${humidity}`,
  ]
  if (tips) {
    txtList.push(tips);
  }

  return txtList;
}
