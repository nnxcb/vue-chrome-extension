// import axios from 'axios'
import logo from './assets/logo.png';
import { resetDrink } from '../utils/tool';

resetDrink();

browser.runtime.onMessage.addListener(function (request) {
  const { type, info } = request;
  switch (type) {
    case 'drinkWater': {
      chrome.notifications.create(null, {
        type: "image",
        iconUrl: logo,
        imageUrl: logo,
        title: "提醒喝水小助手",
        message: `看到此消息的人可以和我一起来喝一杯水。及时排便洗手，记得关门。后的我继续提醒大家喝水。和我一起成为一天八杯水的人吧！`,
      });
      break;
    }
    case 'resetDrink': {
      resetDrink(info);
      break;
    }
  }
})
