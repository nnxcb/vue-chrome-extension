<template>
  <div>
    <p class="title">这是我们相识第 {{dateLength}} 天</p>
    <div v-for="item in textList" :key="item">{{item}}</div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { getLunarDate, getCityAndDate, getWeather } from '../../../utils/apis';

export default {
  name: 'wonderfulDay',
  data () {
    return {
      toDay: dayjs(new Date()).format('YYYY-MM-DD'),
      textList: [],
      dateLength: dayjs(new Date()).diff(dayjs('2021-08-14'), 'day'),
    }
  },
  mounted() {
    this.getMsgList();
  },
  methods: {
    async getMsgList() {
      let txt;
      txt = await getCityAndDate();
      this.textList.push(...txt);
      txt = await getLunarDate(this.toDay);
      this.textList.push(...txt);
      txt = await getWeather(this.toDay);
      this.textList.push(...txt);
    }
  },
}
</script>

<style scoped>
.title {
  font-size: 14px;
  font-weight: bold;
}
</style>
