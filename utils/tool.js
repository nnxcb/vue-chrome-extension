import dayjs from "dayjs";
import store from '../src/store';
import logo from '../src/assets/logo.png';

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

// 开启定时任务提醒
// eslint-disable-next-line no-unused-vars
let drinkInterval;
export function resetDrink(info = store.state.drinkInfo) {
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
  drinkInterval = setInterval(() => {
    console.log('触发提示');
    chrome.storage.local.set({noticeTime: new Date().valueOf() + time},function(){});
    chrome.notifications.create(null, {
      type: "image",
      iconUrl: logo,
      imageUrl: logo,
      title: "提醒喝水小助手",
      message: `看到此消息的人可以和我一起来喝一杯水。及时排便洗手，记得关门。后的我继续提醒大家喝水。和我一起成为一天八杯水的人吧！`,
    });
  }, time);
}
