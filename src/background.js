// import axios from 'axios'
import logo from './assets/logo.png';
import { resetDrink, initDrinkState } from '../utils/tool';

chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === 'test') {
    console.log('触发提示');
    chrome.storage.local.set({noticeTime: new Date().valueOf() + alarm.periodInMinutes * 60 * 1000},function(){});
    chrome.notifications.create(null, {
      type: "image",
      iconUrl: logo,
      imageUrl: logo,
      title: "提醒喝水小助手",
      message: `快去喝水！！！！！`,
    });
  }
})

initDrinkState();
resetDrink();

browser.runtime.onMessage.addListener(function (request) {
  const { type, info } = request;
  switch (type) {
    case 'resetDrink': {
      resetDrink(info);
      break;
    }
  }
})
