import dayjs from "dayjs";
// import logo from '../src/assets/logo.png';
import { minute } from './const';

const WEEKS = {
  1: '星期一',
  2: '星期二',
  3: '星期三',
  4: '星期四',
  5: '星期五',
  6: '星期六',
  0: '星期日',
}

export const weekToday = () => {
  const week = dayjs().get('days')
  return WEEKS[week]
}

// 初始化喝水参数
export function initDrinkState() {
  const drinkState = {
    open: true,
    interval: minute,
  }
  chrome.storage.local.set({drinkState},function(){
    console.log('初始化喝水参数');
  });
}

// 开启定时任务提醒
// eslint-disable-next-line no-unused-vars
let drinkInterval;
export function resetDrink() {
  chrome.storage.local.get(['drinkState'], function(result) {
    const info = result.drinkState;
    console.log('触发重置', info)
    const { interval, open } = info;
    if (!open && drinkInterval) {
      clearInterval(drinkInterval);
      return;
    }
    if (drinkInterval) {
      clearInterval(drinkInterval);
    }
    let time = interval * 60 * 1000;
    chrome.storage.local.set({noticeTime: new Date().valueOf() + time},function(){
      console.log('set成功', time)
    });
    // 创建喝水定时任务
    chrome.alarms.create('test', {
      // 间隔时间，单位为分钟
      periodInMinutes: interval
    })
  });
}
