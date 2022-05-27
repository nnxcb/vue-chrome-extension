<template>
  <div>
    是否提醒 <el-switch :value="drinkInfo.open" @change="changeSwitch"></el-switch>
    <div v-if="drinkInfo.open">
      提醒间隔(分钟) <el-input-number :value="drinkInfo.interval" controls-position="right" @input="handleChange" :min="1" :max="60"></el-input-number>
      <el-progress :percentage="getPercentage" :color="customColor"></el-progress>
    </div>
  </div>
</template>

<script>
import { minute } from '../../../utils/const'
let reduceTimeout;
export default {
  name: 'drinkWater',
  data() {
    return {
      leftTime: 0,
      drinkInfo: {
        open: true,
        interval: minute,
      }
    }
  },
  computed: {
    // 计算倒计时百分比
    getPercentage: function() {
      let num = Math.floor(this.leftTime / (this.drinkInfo.interval * 60 * 1000) * 100);
      console.log('this.leftTime', this.leftTime);
      num = num > 100 ? 100 : num; 
      num = num < 0 ? 0 : num; 
      return num;
    }
  },
  created() {
    let that = this;
    chrome.storage.local.get(['noticeTime', 'drinkState'], function(result) {
      console.log('storage==>', result);
      that.leftTime = result.noticeTime - new Date().valueOf();
      that.drinkInfo = result.drinkState;
      that.reduceLeftTime();
    });
  },
  mounted() {
    let that = this;
    chrome.storage.onChanged.addListener(function(changes) {
      if (changes.noticeTime) {
        console.log('获取成功', changes.noticeTime.newValue)
        that.leftTime = changes.noticeTime.newValue - new Date().valueOf();
        that.reduceLeftTime();
      }
      if (changes.drinkState) {
        that.drinkInfo = changes.drinkState.newValue;
      }
    });
  },
  methods: {
    // 开启、关闭喝水提示
    changeSwitch(val) {
      const drinkInfo = {
        ...this.drinkInfo,
        open: val,
      }
      chrome.storage.local.set({drinkState: drinkInfo},function(){
        console.log('set成功', drinkInfo);
        browser.runtime.sendMessage({type: 'resetDrink', info: drinkInfo});
      });
    },
    // 修改喝水提示间隔
    handleChange(currentValue, oldValue) {
      debugger
      if (currentValue !== oldValue && currentValue) {
        const drinkInfo = {
          ...this.drinkInfo,
          interval: currentValue,
        }
        chrome.storage.local.set({drinkState: drinkInfo},function(){
          console.log('set成功', drinkInfo);
          browser.runtime.sendMessage({type: 'resetDrink', info: drinkInfo});
        });
      }
    },
    // 喝水提示剩余时间递减
    reduceLeftTime() {
      if (this.leftTime > 0) {
        this.leftTime -= 1000;
        if (reduceTimeout) {
          clearTimeout(reduceTimeout);
        }
        reduceTimeout = setTimeout(() => {
          this.reduceLeftTime();
        }, 1000);
      }
    },
    // 不同进度下展示不同颜色的进度条
    customColor(percentage) {
      if (percentage < 30) {
        return '#909399';
      } else if (percentage < 70) {
        return '#e6a23c';
      } else {
        return '#67c23a';
      }
    },
  }
}
</script>

<style>

</style>
